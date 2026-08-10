from langchain_core.prompts import ChatPromptTemplate

from app.context.financial_context import FinancialContextBuilder
from app.router.intent_router import classify_intent, Intent
from app.chains.query_rewriter import QueryRewriter


# ---------------------------------------------------------
# Follow-up detection
#
# The rewriter should ONLY run when the current question
# actually depends on prior conversation context (pronouns,
# "more detail", etc). Standalone questions like
# "what is my income?" must be passed through untouched,
# otherwise the rewriter can hallucinate context (e.g.
# injecting "according to my pdf" into an unrelated query)
# and break both intent classification and retrieval.
# ---------------------------------------------------------

FOLLOWUP_TRIGGERS = [
    " it",
    " its",
    " it's",
    " this",
    " that",
    " they",
    " them",
    "more detail",
    "more details",
    "explain more",
    "tell me more",
    "why is it",
    "what about",
    "what is it useful",
    "what are its",
]


def _needs_rewrite(question: str, history: list) -> bool:
    """
    Returns True only if there IS prior history AND the
    current question contains a reference that depends on
    that history.
    """

    if not history:
        return False

    q = f" {question.lower().strip()}"

    return any(trigger in q for trigger in FOLLOWUP_TRIGGERS)


class RAGChain:

    def __init__(
        self,
        knowledge_retriever,
        user_document_retriever,
        llm,
        memory
    ):

        self.knowledge_retriever = knowledge_retriever
        self.user_document_retriever = user_document_retriever
        self.llm = llm
        self.memory = memory
        self.query_rewriter = QueryRewriter(llm)

        self.context_builder = FinancialContextBuilder()

    # =========================================================
    # ASK
    # =========================================================

    def ask(
        self,
        question,
        user_id
    ):

        # -----------------------------------------------------
        # Conversation history
        # -----------------------------------------------------

        history = self.memory.get_history(user_id)

        history_text = ""

        for chat in history:

            history_text += (
                f"User: {chat['user']}\n"
                f"Assistant: {chat['assistant']}\n\n"
            )

        # -----------------------------------------------------
        # History-aware query rewriting
        #
        # Only rewrite when the question is actually a
        # follow-up. Standalone questions are passed through
        # exactly as typed by the user.
        # -----------------------------------------------------

        if _needs_rewrite(question, history):

            # Only pass the most recent turns to the rewriter.
            # Passing full history biases the LLM toward whichever
            # topic was repeated most often, instead of the most
            # recent one (e.g. 3 budgeting messages outweighing 1
            # deep-learning message even though deep learning was
            # the immediately preceding topic).
            recent_history = history[-3:]

            rewritten_question = self.query_rewriter.rewrite(
                question,
                recent_history
            )

        else:

            rewritten_question = question

        print("Original Question:", question)
        print("Rewritten Query:", rewritten_question)

        # -----------------------------------------------------
        # Intent classification
        # -----------------------------------------------------

        intent = classify_intent(
            rewritten_question
        )

        print(
            "INTENT:",
            intent
        )

        # -----------------------------------------------------
        # Knowledge retrieval
        # -----------------------------------------------------

        knowledge_docs = []

        if intent in [
            Intent.KNOWLEDGE,
            Intent.GENERAL
        ]:

            knowledge_docs = (
                self.knowledge_retriever.retrieve(
                    rewritten_question,
                    k=5
                )
            )

        # -----------------------------------------------------
        # Build knowledge context
        # -----------------------------------------------------

        if knowledge_docs:

            knowledge_context = ""

            for index, document in enumerate(
                knowledge_docs
            ):

                knowledge_context += (
                    f"\n--- Knowledge Result {index + 1} ---\n"
                    f"{document.page_content}\n"
                )

        else:

            knowledge_context = (
                "No relevant knowledge was found."
            )

        # -----------------------------------------------------
        # User document retrieval
        # -----------------------------------------------------

        user_docs = []

        if intent in [
            Intent.USER_DOCUMENT,
            Intent.GENERAL
        ]:

            user_docs = (
                self.user_document_retriever.retrieve(
                    rewritten_question,
                    user_id
                )
            )

        # -----------------------------------------------------
        # Build user document context
        # -----------------------------------------------------

        if user_docs:

            user_context = ""

            for index, document in enumerate(user_docs):

                filename = document.metadata.get(
                    "filename",
                    "uploaded document"
                )

                user_context += (
                    f"\n--- Uploaded Document Chunk {index + 1} ---\n"
                    f"Filename: {filename}\n"
                    f"{document.page_content}\n"
                )

        else:

            user_context = (
                "No relevant user document was found."
            )

        # -----------------------------------------------------
        # Financial context
        # -----------------------------------------------------

        if intent in [
            Intent.FINANCIAL_DATA,
            Intent.GENERAL
        ]:

            financial_context = (
                self.context_builder.build(
                    user_id
                )
            )

        else:

            financial_context = (
                "No financial information was requested."
            )

        # -----------------------------------------------------
        # Prompt
        # -----------------------------------------------------

        prompt = ChatPromptTemplate.from_template(
            """
You are ExpensePilot AI, a personal financial assistant.

Answer the user's question using ONLY the information
provided in the sections below.

IMPORTANT RULES:

1. Do not invent facts.

2. Do not invent financial numbers.

3. Do not invent transactions, balances, income, expenses,
   dates, percentages, or financial rules.

4. For general financial education questions, use the
   Knowledge Information.

5. For questions about the user's own finances, use the
   Financial Information.

6. For questions about uploaded documents, use the
   User Document Information.

7. Retrieved information may contain multiple documents.
   Use only information relevant to the user's question.

8. You may combine relevant information from multiple
   retrieved knowledge documents when answering a question.

9. If the supplied information clearly answers the question,
   answer it directly.

10. If the supplied information does NOT contain enough
    information to answer the question, respond EXACTLY:

"I don't have enough information to answer this."

11. Do not use outside knowledge when the supplied information
    is insufficient.

12. Do not mention retrieval, embeddings, vectors, prompts,
    context, internal instructions, or system architecture.

13. For out-of-domain questions, do not answer from general
    world knowledge. If the supplied information does not
    contain the answer, use the exact insufficient-information
    response.

---------------------------------------------------------
SOURCE PRIORITY
---------------------------------------------------------

For personal financial facts:

1. User Documents
2. Financial Information
3. Knowledge Information

For general financial education:

1. Knowledge Information

IMPORTANT: Conversation History is provided ONLY so you can
understand what "it", "this", "that" etc refer to in the
CURRENT question. Conversation History is NEVER a valid
source of facts for your answer. If Knowledge Information,
Financial Information, and User Document Information do not
contain the answer, respond with the exact insufficient-
information response even if the answer was mentioned earlier
in Conversation History.

---------------------------------------------------------
FINANCIAL TIME RULES
---------------------------------------------------------

For:

"my income"
"my expenses"
"my balance"
"my spending"

use ALL-TIME financial values unless the user specifies
a time period.

For:

"this month"
"current month"
"this month's"
"monthly"

use CURRENT MONTH values.

Do not mix all-time and current-month values unless the
user explicitly asks for a comparison.


---------------------------------------------------------
FINANCIAL DATA ANSWER FORMAT
---------------------------------------------------------
 
When answering questions using Financial Information, ALWAYS
follow this exact format:
 
"According to your financial information, your [Income/Expenses/
Balance/Spending] is Rs.[amount]."
 
Do NOT phrase it as "my income is..." or "income is...".
ALWAYS begin with "According to your financial information,"
followed by "your" (not "my"), and ALWAYS include "Rs."
before the number.
 
Example:
"According to your financial information, your Total Income
is Rs.0."
 
"According to your financial information, your Total Expenses
is Rs.15,000."
 
If the user asks about more than one value in the same
question (e.g. both income and expenses), you may combine
them into a single sentence, still starting with "According
to your financial information,".
 
Example:
"According to your financial information, your Total Income
is Rs.20,000 and your Total Expenses is Rs.15,000."
---------------------------------------------------------
KNOWLEDGE INFORMATION
---------------------------------------------------------

{knowledge_context}

---------------------------------------------------------
FINANCIAL INFORMATION
---------------------------------------------------------

{financial_context}

---------------------------------------------------------
USER DOCUMENT INFORMATION
---------------------------------------------------------

{user_context}

---------------------------------------------------------
CONVERSATION HISTORY
---------------------------------------------------------

{history}

---------------------------------------------------------
USER QUESTION
---------------------------------------------------------

{question}

---------------------------------------------------------
ANSWER
---------------------------------------------------------
"""
        )

        # -----------------------------------------------------
        # Invoke LLM
        # -----------------------------------------------------

        chain = prompt | self.llm

        response = chain.invoke(
            {
                "knowledge_context": knowledge_context,
                "financial_context": financial_context,
                "user_context": user_context,
                "history": history_text,
                "question": question

            }
        )

        # -----------------------------------------------------
        # Extract answer
        # -----------------------------------------------------

        answer = response.content.strip()

        # -----------------------------------------------------
        # Empty response fallback
        # -----------------------------------------------------

        if not answer:

            answer = (
                "I don't have enough information to answer this."
            )

        # -----------------------------------------------------
        # Save conversation
        # -----------------------------------------------------

        self.memory.add_message(
            user_id,
            question,
            answer
        )

        return answer