<<<<<<< HEAD
from app.database.connection import SessionLocal
from app.database.models.transaction import Transaction

from app.embeddings.embedding import EmbeddingModel
from app.vectorstore.chroma_store import ChromaVectorStore

from app.retrieval.knowledge_retriever import KnowledgeBaseRetriever
from app.retrieval.user_document_retriever import UserDocumentRetriever

from app.llm.llm import GroqLLM
from app.chains.rag_chain import RAGChain
from app.memory.conversation_memory import ConversationMemory


# Get a test user
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



# Embedding model
embeddings = EmbeddingModel().get_embedding_model()


# Existing Chroma DB
vector_store = ChromaVectorStore(
    embeddings
)


# Retrievers
knowledge_retriever = KnowledgeBaseRetriever(
    vector_store
)

user_document_retriever = UserDocumentRetriever(
    vector_store
)


# LLM
llm = GroqLLM().get_llm()
memory = ConversationMemory()

# RAG
rag = RAGChain(
    knowledge_retriever,
    user_document_retriever,
    llm,
    memory
)

=======
from app.ingestion.loader import PDFLoader
from app.ingestion.chunker import DocumentChunker
from app.embeddings.embedding import EmbeddingModel
from app.vectorstore.chroma_store import ChromaVectorStore
from app.retrieval.retriever import Retriever
from app.llm.llm import GroqLLM
from app.chains.rag_chain import RAGChain
loader = PDFLoader()
chunker = DocumentChunker()
embedding_model = EmbeddingModel()

documents = loader.load_pdf(
    "data/uploads/Freight_Rate_ML_Report.pdf"
)

chunks = chunker.split_documents(documents)

print(f"Pages : {len(documents)}")
print(f"Chunks : {len(chunks)}")

print("\nFirst Chunk:\n")
print(chunks[0].page_content)

print("\nMetadata:\n")
print(chunks[0].metadata)

embeddings = embedding_model.get_embedding_model()

vector = embeddings.embed_documents(
    [chunk.page_content for chunk in chunks]
)

print("\nEmbedding Length:")
print(len(vector))

print("\nFirst 10 Values:")
print(vector[:10])

# Chroma Vector Store
vector_store = ChromaVectorStore(embeddings)

# Store chunks
vector_store.add_documents(chunks)

# Retriever
retriever = Retriever(vector_store)

llm = GroqLLM().get_llm()

# RAG Chain
rag = RAGChain(retriever, llm)
>>>>>>> origin/main

# Chat Loop
while True:

    question = input("\nAsk a question (type 'exit' to quit): ")

    if question.lower() == "exit":
        break

<<<<<<< HEAD
    answer = rag.ask(
        question,
        user_id
    )
=======
    answer = rag.ask(question)
>>>>>>> origin/main

    print("\nAnswer:\n")
    print(answer)