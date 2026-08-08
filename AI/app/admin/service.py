import os
import shutil
import uuid

from app.ingestion.loader import PDFLoader
from app.ingestion.chunker import DocumentChunker
from app.embeddings.embedding import EmbeddingModel
from app.vectorstore.chroma_store import ChromaVectorStore


class AdminService:

    def __init__(self):
        self.upload_folder = "data/knowledge_base"

        os.makedirs(
            self.upload_folder,
            exist_ok=True
        )

        self.loader = PDFLoader()
        self.chunker = DocumentChunker()
        self.embedding_model = EmbeddingModel()

        embeddings = self.embedding_model.get_embedding_model()

        self.vector_store = ChromaVectorStore(
            embeddings
        )

    def save_file(self, file):

        extension = os.path.splitext(file.filename)[1]

        filename = f"{uuid.uuid4()}{extension}"

        file_path = os.path.join(
            self.upload_folder,
            filename
        )

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(
                file.file,
                buffer
            )

        return {
            "document_id": filename.split(".")[0],
            "original_name": file.filename,
            "stored_name": filename,
            "path": file_path
        }

    def ingest_document(self, document):

        documents = self.loader.load_pdf(
            document["path"]
        )

        chunks = self.chunker.split_documents(
            documents
        )

        for chunk in chunks:
            chunk.metadata["source"] = "knowledge_base"
            chunk.metadata["document_id"] = document["document_id"]
            chunk.metadata["filename"] = document["original_name"]

        self.vector_store.add_documents(
            chunks
        )

        return len(chunks)

    def get_documents(self):

        files = []

        for file in os.listdir(self.upload_folder):

            path = os.path.join(
                self.upload_folder,
                file
            )

            if os.path.isfile(path):
                files.append({
                    "filename": file,
                    "size": os.path.getsize(path)
                })

        return files

    def delete_document(
        self,
        document_id,
        filename
    ):

        self.vector_store.delete_document(
            document_id
        )

        path = os.path.join(
            self.upload_folder,
            filename
        )

        if os.path.exists(path):
            os.remove(path)

        return True