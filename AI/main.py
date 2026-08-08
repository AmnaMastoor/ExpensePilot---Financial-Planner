from app.database.connection import SessionLocal
from app.database.models.transaction import Transaction

from app.embeddings.embedding import EmbeddingModel
from app.vectorstore.chroma_store import ChromaVectorStore

from app.retrieval.knowledge_retriever import KnowledgeBaseRetriever
from app.retrieval.user_document_retriever import UserDocumentRetriever

from app.llm.llm import GroqLLM
from app.chains.rag_chain import RAGChain
from app.memory.conversation_memory import ConversationMemory


db = SessionLocal()

try:
    transaction = db.query(Transaction).first()

    if transaction is None:
        print("No transactions found.")
        exit()

    user_id = transaction.user_id

    print(f"Testing User ID: {user_id}")

finally:
    db.close()


embeddings = EmbeddingModel().get_embedding_model()

vector_store = ChromaVectorStore(
    embeddings
)

knowledge_retriever = KnowledgeBaseRetriever(
    vector_store
)

user_document_retriever = UserDocumentRetriever(
    vector_store
)

llm = GroqLLM().get_llm()

memory = ConversationMemory()

rag = RAGChain(
    knowledge_retriever,
    user_document_retriever,
    llm,
    memory
)


while True:

    question = input("\nAsk a question (type 'exit' to quit): ")

    if question.lower() == "exit":
        break

    answer = rag.ask(
        question,
        user_id
    )

    print("\nAnswer:\n")
    print(answer)