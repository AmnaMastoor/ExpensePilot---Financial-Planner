from app.database.connection import SessionLocal
from app.database.models.transaction import Transaction

from app.embeddings.embedding import EmbeddingModel
from app.vectorstore.chroma_store import ChromaVectorStore

from app.retrieval.knowledge_retriever import KnowledgeBaseRetriever
from app.retrieval.user_document_retriever import UserDocumentRetriever

from app.llm.llm import GroqLLM
from app.chains.rag_chain import RAGChain
from app.memory.conversation_memory import ConversationMemory


# ---------------------------------------------------------
# Get a real user ID for testing
# ---------------------------------------------------------

db = SessionLocal()

try:

    transaction = (
        db.query(Transaction)
        .first()
    )

    if transaction is None:
        print("No transactions found.")
        raise SystemExit

    user_id = transaction.user_id

    print(
        f"Testing User ID: {user_id}"
    )

finally:
    db.close()


# ---------------------------------------------------------
# Initialize embeddings
# ---------------------------------------------------------

embeddings = (
    EmbeddingModel()
    .get_embedding_model()
)


# ---------------------------------------------------------
# Initialize vector store
# ---------------------------------------------------------

vector_store = ChromaVectorStore(
    embeddings
)


# ---------------------------------------------------------
# Initialize retrievers
# ---------------------------------------------------------

knowledge_retriever = KnowledgeBaseRetriever(
    vector_store
)

user_document_retriever = UserDocumentRetriever(
    vector_store
)


# ---------------------------------------------------------
# Initialize LLM
# ---------------------------------------------------------

llm = (
    GroqLLM()
    .get_llm()
)


# ---------------------------------------------------------
# Initialize conversation memory
# ---------------------------------------------------------

memory = ConversationMemory()


# ---------------------------------------------------------
# Initialize RAG chain
# ---------------------------------------------------------

rag = RAGChain(
    knowledge_retriever,
    user_document_retriever,
    llm,
    memory
)


# ---------------------------------------------------------
# Interactive testing
# ---------------------------------------------------------

print("\nExpensePilot RAG Test")
print("---------------------")
print("Type 'exit' to quit.")


while True:

    question = input(
        "\nAsk a question: "
    ).strip()

    if question.lower() == "exit":
        print("Exiting...")
        break

    if not question:
        print(
            "\nPlease enter a question."
        )
        continue

    try:

        answer = rag.ask(
            question,
            user_id
        )

        print(
            "\nAnswer:\n"
        )

        print(answer)

    except Exception as error:

        print(
            "\nError while processing question:"
        )

        print(error)