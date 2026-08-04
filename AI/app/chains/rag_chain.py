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

        chain = prompt | self.llm

        response = chain.invoke(
            {
                "context": context,
                "question": question
            }
        )

        return response.content