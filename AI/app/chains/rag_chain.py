from langchain_core.prompts import ChatPromptTemplate

from app.context.financial_context import FinancialContextBuilder
from app.router.intent_router import classify_intent, Intent


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

        history = self.memory.get_history(
            user_id
        )

        history_text = ""

        for chat in history:

            history_text += (
                f"User: {chat['user']}\n"
                f"Assistant: {chat['assistant']}\n\n"
            )

        # -----------------------------------------------------
        # Intent classification
        # -----------------------------------------------------

        intent = classify_intent(
            question
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
                    question,
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
                    question,
                    user_id
                )
            )

        # -----------------------------------------------------
        # Build user document context
        # -----------------------------------------------------

        if user_docs:

            user_context = ""

            for index, document in enumerate(
                user_docs
            ):

                user_context += (
                    f"\n--- User Document {index + 1} ---\n"
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
4. Conversation History

For general financial education:

1. Knowledge Information
2. Conversation History

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