from app.ingestion.loader import PDFLoader
from app.ingestion.chunker import DocumentChunker
from app.embeddings.embedding import EmbeddingModel

loader = PDFLoader()
chunker = DocumentChunker()
embedding_model = EmbeddingModel()

documents = loader.load_pdf(
    "data/uploads/your_pdf_here.pdf"
)

chunks = chunker.split_documents(documents)

print(f"Pages : {len(documents)}")
print(f"Chunks : {len(chunks)}")

print("\nFirst Chunk:\n")
print(chunks[0].page_content)

print("\nMetadata:\n")
print(chunks[0].metadata)

embeddings = embedding_model.get_embedding_model()

vector = embeddings.embed_query(
    chunks[0].page_content
)

print("\nEmbedding Length:")
print(len(vector))

print("\nFirst 10 Values:")
print(vector[:10])