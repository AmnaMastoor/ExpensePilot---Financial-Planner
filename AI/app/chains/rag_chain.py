from langchain_core.prompts import ChatPromptTemplate
from app.context.financial_context import FinancialContextBuilder
class RAGChain:

    def __init__(self, retriever, llm):
        self.retriever = retriever
        self.llm = llm
        self.context_builder = FinancialContextBuilder()

    def ask(self, question, user_id):

        documents = self.retriever.retrieve(question)

        context = ""

        for i, doc in enumerate(documents):
            context += f"\n### Document {i+1}\n"
            context += doc.page_content
            context += "\n"

        financial_context = self.context_builder.build(user_id)
        financial_text = f"""
Financial Summary:
{financial_context["financial_summary"]}

Dashboard Summary:
{financial_context["dashboard_summary"]}

Budget Summary:
{financial_context["budget_summary"]}

Goal Summary:
{financial_context["goal_summary"]}

Recent Transactions:
{financial_context["recent_transactions"]}

Category Analysis:
{financial_context["category_analysis"]}
"""
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
Financial Data:
{financial_context}
Question:
{question}

Detailed Answer:
"""
        )

        chain = prompt | self.llm

        response = chain.invoke(
            {
                "context": context,
                "financial_context": financial_text,
                "question": question
            }
        )

        return response.content