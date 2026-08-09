import os
import shutil
import uuid

from app.ingestion.loader import PDFLoader
from app.ingestion.chunker import DocumentChunker
from app.embeddings.embedding import EmbeddingModel
from app.vectorstore.chroma_store import ChromaVectorStore


class UserDocumentService:

    def __init__(self):

        self.base_upload_folder = "data/user_uploads"

        os.makedirs(
            self.base_upload_folder,
            exist_ok=True
        )

        self.loader = PDFLoader()

        self.chunker = DocumentChunker()

        self.embedding_model = EmbeddingModel()

        embeddings = self.embedding_model.get_embedding_model()

        self.vector_store = ChromaVectorStore(
            embeddings
        )

    def save_file(self, file, user_id):

        user_folder = os.path.join(
            self.base_upload_folder,
            str(user_id)
        )

        os.makedirs(
            user_folder,
            exist_ok=True
        )

        extension = os.path.splitext(file.filename)[1]

        filename = f"{uuid.uuid4()}{extension}"

        file_path = os.path.join(
            user_folder,
            filename
        )

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(
                file.file,
                buffer
            )

        return {
            "user_id": user_id,
            "document_id": filename.split(".")[0],
            "original_name": file.filename,
            "stored_name": filename,
            "path": file_path
        }

    def ingest_document(self, document):

        documents = self.loader.load_pdf(
            document["path"]
        )

        if not documents:
            return 0

        chunks = self.chunker.split_documents(
            documents
        )

        if not chunks:
            return 0

        for index, chunk in enumerate(chunks):

            chunk.metadata["source"] = "user_document"

            chunk.metadata["user_id"] = str(
                document["user_id"]
            )

            chunk.metadata["document_id"] = (
                document["document_id"]
            )

            chunk.metadata["filename"] = (
                document["original_name"]
            )

            chunk.metadata["chunk_id"] = (
                f"{document['document_id']}_{index}"
            )

        self.vector_store.add_documents(
            chunks
        )

        return len(chunks)

    def get_documents(self, user_id):

        user_folder = os.path.join(
            self.base_upload_folder,
            str(user_id)
        )

        if not os.path.exists(user_folder):
            return []

        files = []

        for file in os.listdir(user_folder):

            path = os.path.join(
                user_folder,
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
        user_id,
        document_id,
        filename
    ):

        self.vector_store.delete_document(
            document_id
        )

        path = os.path.join(
            self.base_upload_folder,
            str(user_id),
            filename
        )

        if os.path.exists(path):
            os.remove(path)

        return True