from app.embeddings.embedding import EmbeddingModel
from app.vectorstore.chroma_store import ChromaVectorStore

from app.retrieval.knowledge_retriever import KnowledgeBaseRetriever
from app.retrieval.user_document_retriever import UserDocumentRetriever

from app.llm.llm import GroqLLM
from app.chains.rag_chain import RAGChain
from app.memory.conversation_memory import ConversationMemory


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