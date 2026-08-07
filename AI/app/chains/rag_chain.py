<<<<<<< HEAD

from langchain_core.prompts import ChatPromptTemplate

from app.context.financial_context import FinancialContextBuilder
from app.router.intent_router import classify_intent, Intent
from app.memory.conversation_memory import ConversationMemory


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

    def ask(self, question, user_id):

        # ---------------------------------------------------------
        # Conversation History
        # ---------------------------------------------------------

        history = self.memory.get_history(user_id)

        history_text = ""

        for chat in history:
            history_text += (
                f"User: {chat['user']}\n"
                f"Assistant: {chat['assistant']}\n\n"
            )

        # ---------------------------------------------------------
        # Intent Routing
        # ---------------------------------------------------------

        intent = classify_intent(question)

        # ---------------------------------------------------------
        # Knowledge Base
        # ---------------------------------------------------------

        knowledge_docs = []

        if intent in [
            Intent.KNOWLEDGE,
            Intent.GENERAL
        ]:
            knowledge_docs = self.knowledge_retriever.retrieve(
                question
            )

        knowledge_context = ""

        if not knowledge_docs:
            knowledge_context = "No relevant knowledge found."

        else:
            for i, doc in enumerate(knowledge_docs):

                knowledge_context += (
                    f"\n### Knowledge Document {i + 1}\n"
                )

                knowledge_context += (
                    doc.page_content + "\n"
                )

        # ---------------------------------------------------------
        # User Documents
        # ---------------------------------------------------------

        user_docs = []

        if intent in [
            Intent.USER_DOCUMENT,
            Intent.GENERAL
        ]:
            user_docs = self.user_document_retriever.retrieve(
                question,
                user_id
            )

        user_context = ""

        if not user_docs:
            user_context = "No relevant user documents found."

        else:
            for i, doc in enumerate(user_docs):

                user_context += (
                    f"\n### User Document {i + 1}\n"
                )

                user_context += (
                    doc.page_content + "\n"
                )

        # ---------------------------------------------------------
        # Financial Data
        # ---------------------------------------------------------

        financial_context = "No financial data available."

        if intent in [
            Intent.FINANCIAL_DATA,
            Intent.GENERAL
        ]:
            financial_context = self.context_builder.build(
                user_id
            )

        print("INTENT:", intent)

        # ---------------------------------------------------------
        # Prompt
        # ---------------------------------------------------------

        prompt = ChatPromptTemplate.from_template(
            """
You are ExpensePilot AI, a personal financial assistant.

Your goal is to provide accurate, personalized, and helpful
financial guidance using ONLY the provided information.

1. Financial Data

- Contains the user's personal financial information.
- Includes income, expenses, balances, transactions, budgets,
  and financial goals.
- This is the primary source for questions about the user's
  own finances.

2. Knowledge Base

- Contains financial knowledge uploaded by the admin.
- Use it for explanations, saving strategies, budgeting,
  investing concepts, taxes, and financial guidance.
- Use it to support your reasoning instead of copying or
  summarizing documents.

3. User Documents

- Contains documents uploaded by the current user.
- Use these for questions about bank statements, salary slips,
  invoices, receipts, reports, or uploaded PDFs.

Information Priority:

1. User Documents (only when the question is about uploaded files)
2. Financial Data (for personal financial information)
3. Knowledge Base (for general financial guidance)

Combine multiple sources whenever appropriate.

Instructions:

- Answer ONLY using the provided information.
- Never use outside knowledge.
- Never invent numbers, transactions, balances, dates, budgets,
  goals, or financial facts.
- Never mention "Financial Data", "Knowledge Base",
  "User Documents", or "context" in your answer.

- If the required information is missing, reply:

"I don't have enough information to answer this."

For questions about:

- income
- expenses
- balance
- budget
- transaction totals
- monthly spending

Always use the calculated values provided in Financial Data.

Never calculate totals manually from Recent Transactions
if summary values already exist.

Use Recent Transactions only to explain where money was spent.

For recommendation or advice questions:

1. Start by understanding the user's financial situation.
2. Use Financial Data to personalize the answer.
3. Use the Knowledge Base as the source of financial strategies.
4. Apply logical reasoning to connect the user's financial
   situation with the retrieved knowledge.
5. Never invent financial rules, percentages, formulas,
   or recommendations that do not exist in the Knowledge Base.
6. If the Knowledge Base does not specify an exact amount,
   clearly state that no exact amount is provided and that
   it depends on the user's financial goals and priorities.
7. Do not summarize the entire Knowledge Base.
8. Select only the most relevant recommendations.
9. Every recommendation should clearly relate to the user's
   financial situation.

Use the conversation history to understand follow-up questions.

- Connect follow-up questions naturally.
- Do not ask for information already available.
- Reuse previously discussed financial information whenever
  appropriate.

For simple numerical questions:

- Answer directly.
- Keep the response short.
- Do not include unnecessary explanations.
- Do not provide recommendations unless requested.

For explanatory or recommendation questions:

- Start with the user's financial situation.
- Then explain the relevant financial guidance.
- Explain briefly why the recommendation fits the user's situation.
- Use bullet points when helpful.
- Keep the response practical and personalized.
- Do not copy the Knowledge Base word-for-word.

Before answering:

1. Identify facts from Financial Data.
2. Identify relevant guidance from the Knowledge Base.
3. Use User Documents if relevant.
4. Combine the information into one personalized response.
5. Never invent missing information.

Conversation History:
{history}

Financial Data:
{financial_context}

Knowledge Base:
{knowledge_context}

User Documents:
{user_context}

User Question:
{question}

Answer:
"""
        )

        # ---------------------------------------------------------
        # LLM Chain
        # ---------------------------------------------------------

=======
from langchain_core.prompts import ChatPromptTemplate


class RAGChain:

    def __init__(self, retriever, llm):
        self.retriever = retriever
        self.llm = llm

    def ask(self, question):

        documents = self.retriever.retrieve(question)

        context = ""

        for i, doc in enumerate(documents):
            context += f"\n### Document {i+1}\n"
            context += doc.page_content
            context += "\n"

        prompt = ChatPromptTemplate.from_template(
            """
You are a helpful AI assistant using Retrieval-Augmented Generation (RAG).

Your primary source of information is the provided context.

Instructions:
- First, answer using the provided context.
- If the context fully answers the question, base your response on it.
- If the context is incomplete, you may use your general knowledge to provide a helpful answer.
- Clearly distinguish between information from the provided context and your own general knowledge.
- Do not contradict the provided context.
- Combine information from multiple retrieved documents into one coherent answer when necessary.
- Preserve important facts, bullet points, examples, and explanations from the context whenever possible.
- If neither the context nor your general knowledge can answer the question, say:
  "I don't know."

Context:
{context}

Question:
{question}

Detailed Answer:
"""
        )

>>>>>>> origin/main
        chain = prompt | self.llm

        response = chain.invoke(
            {
<<<<<<< HEAD
                "financial_context": financial_context,
                "knowledge_context": knowledge_context,
                "user_context": user_context,
                "question": question,
                "history": history_text,
            }
        )

        answer = response.content

        # ---------------------------------------------------------
        # Save Conversation
        # ---------------------------------------------------------

        self.memory.add_message(
            user_id,
            question,
            answer
        )

        return answer

=======
                "context": context,
                "question": question
            }
        )

        return response.content
>>>>>>> origin/main
