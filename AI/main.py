from app.ingestion.loader import PDFLoader
from app.ingestion.chunker import DocumentChunker
from app.embeddings.embedding import EmbeddingModel
from app.vectorstore.chroma_store import ChromaVectorStore
from app.retrieval.retriever import Retriever
from app.llm.llm import GroqLLM
from app.chains.rag_chain import RAGChain
from app.database.connection import SessionLocal
from app.database.models.transaction import Transaction
from app.database.models.application_user import ApplicationUser


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



loader = PDFLoader()
chunker = DocumentChunker()
embedding_model = EmbeddingModel()

documents = loader.load_pdf(
    "data/uploads/Deep_Learning_Study_Notes.pdf"
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



# Chroma Vector Store
vector_store = ChromaVectorStore(embeddings)

# Store chunks
vector_store.add_documents(chunks)

# Retriever
retriever = Retriever(vector_store)

llm = GroqLLM().get_llm()

# RAG Chain
rag = RAGChain(retriever, llm)

# Chat Loop
while True:

    question = input("\nAsk a question (type 'exit' to quit): ")

    if question.lower() == "exit":
        break

    answer = rag.ask(question, user_id)

    print("\nAnswer:\n")
    print(answer)