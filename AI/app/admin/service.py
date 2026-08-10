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

    # =========================================================
    # SAVE FILE
    # =========================================================

    def save_file(self, file):

        extension = os.path.splitext(
            file.filename
        )[1]

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

    # =========================================================
    # INGEST DOCUMENT
    # =========================================================

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

            chunk.metadata["source"] = "knowledge_base"

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

    # =========================================================
    # GET DOCUMENTS
    # =========================================================

    def get_documents(self):

        files = []

        if not os.path.exists(
            self.upload_folder
        ):
            return files

        for file in os.listdir(
            self.upload_folder
        ):

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

    # =========================================================
    # DELETE DOCUMENT
    # =========================================================

    def delete_document(
        self,
        document_id,
        filename
    ):

        # Delete chunks from Chroma
        self.vector_store.delete_document(
            document_id
        )

        # Delete physical PDF
        path = os.path.join(
            self.upload_folder,
            filename
        )

        if os.path.exists(path):
            os.remove(path)

        return True

    # =========================================================
    # REINDEX KNOWLEDGE BASE
    # =========================================================

    def reindex_knowledge_base(self):

        total_documents = 0
        total_chunks = 0

        if not os.path.exists(
            self.upload_folder
        ):
            return {
                "documents": 0,
                "chunks": 0
            }

        for filename in os.listdir(
            self.upload_folder
        ):

            path = os.path.join(
                self.upload_folder,
                filename
            )

            # Ignore folders
            if not os.path.isfile(path):
                continue

            # Only process PDFs
            extension = os.path.splitext(
                filename
            )[1].lower()

            if extension != ".pdf":
                continue

            # UUID filename without .pdf
            document_id = os.path.splitext(
                filename
            )[0]

            document = {
                "document_id": document_id,
                "original_name": filename,
                "stored_name": filename,
                "path": path
            }

            chunks = self.ingest_document(
                document
            )

            if chunks > 0:

                total_documents += 1
                total_chunks += chunks

                print(
                    f"Reindexed: {filename} "
                    f"({chunks} chunks)"
                )

        return {
            "documents": total_documents,
            "chunks": total_chunks
        }

