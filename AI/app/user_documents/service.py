
import os
import shutil

from app.ingestion.loader import PDFLoader
from app.ingestion.chunker import DocumentChunker
from app.embeddings.embedding import EmbeddingModel
from app.vectorstore.chroma_store import ChromaVectorStore


class UserDocumentService:

    def __init__(self):

        self.base_upload_folder = (
            "data/user_uploads"
        )

        os.makedirs(
            self.base_upload_folder,
            exist_ok=True
        )

        self.loader = PDFLoader()

        self.chunker = DocumentChunker()

        self.embedding_model = EmbeddingModel()

        embeddings = (
            self.embedding_model
            .get_embedding_model()
        )

        self.vector_store = ChromaVectorStore(
            embeddings
        )

    # =========================================================
    # SAVE FILE
    # =========================================================

    def save_file(
        self,
        file,
        user_id,
        document_id
    ):

        user_folder = os.path.join(
            self.base_upload_folder,
            str(user_id)
        )

        os.makedirs(
            user_folder,
            exist_ok=True
        )

        # =====================================================
        # IMPORTANT:
        # Physical file name is based ONLY on document ID
        # =====================================================

        filename = f"{document_id}.pdf"

        file_path = os.path.join(
            user_folder,
            filename
        )

        with open(
            file_path,
            "wb"
        ) as buffer:

            shutil.copyfileobj(
                file.file,
                buffer
            )

        return {

            "user_id":
                str(user_id),

            "document_id":
                str(document_id),

            "original_name":
                file.filename,

            "stored_name":
                filename,

            "path":
                file_path
        }

    # =========================================================
    # INGEST DOCUMENT
    # =========================================================

    def ingest_document(
        self,
        document
    ):

        documents = (
            self.loader.load_pdf(
                document["path"]
            )
        )

        if not documents:
            return 0

        chunks = (
            self.chunker
                .split_documents(documents)
        )

        if not chunks:
            return 0

        for index, chunk in enumerate(chunks):

            # Identify this as user document
            chunk.metadata["source"] = (
                "user_document"
            )

            # User who owns document
            chunk.metadata["user_id"] = str(
                document["user_id"]
            )

            # SAME ID AS ASP.NET
            chunk.metadata["document_id"] = str(
                document["document_id"]
            )

            # Original filename only for display
            chunk.metadata["filename"] = (
                document["original_name"]
            )

            # Chunk ID
            chunk.metadata["chunk_id"] = (
                f"{document['document_id']}_{index}"
            )
            print("\n=================================")
            print("USER DOCUMENT INGESTION")
            print("=================================")

            print(
    "User ID:",
    document["user_id"]
)

            print(
    "Document ID:",
    document["document_id"]
)

            print(
    "Filename:",
    document["original_name"]
)

            print(
    "Total chunks:",
    len(chunks)
)

            print(
    "First chunk metadata:",
    chunks[0].metadata
)

        print("=================================\n")

        self.vector_store.add_documents(
    chunks
)

        print(
    f"Successfully added {len(chunks)} chunks to Chroma."
)

        return len(chunks)
    # =========================================================
    # GET USER DOCUMENTS
    # =========================================================

    def get_documents(
        self,
        user_id
    ):

        user_folder = os.path.join(
            self.base_upload_folder,
            str(user_id)
        )

        if not os.path.exists(
            user_folder
        ):
            return []

        files = []

        for file in os.listdir(
            user_folder
        ):

            path = os.path.join(
                user_folder,
                file
            )

            if os.path.isfile(path):

                files.append({

                    "filename":
                        file,

                    "size":
                        os.path.getsize(path)
                })

        return files

    # =========================================================
    # DELETE BY ID ONLY
    # =========================================================

    def delete_document(
        self,
        document_id,
        user_id
    ):

        document_id = str(
            document_id
        )

        user_id = str(
            user_id
        )

        print(
            "================================="
        )

        print(
            "USER DOCUMENT DELETE"
        )

        print(
            f"Document ID: {document_id}"
        )

        print(
            f"User ID: {user_id}"
        )

        print(
            "================================="
        )

        # =====================================================
        # 1. DELETE CHROMA / RAG CHUNKS
        # =====================================================

        chroma_deleted = (
            self.vector_store
                .delete_document(
                    document_id
                )
        )

        print(
            f"Chroma deleted: {chroma_deleted}"
        )

        # =====================================================
        # 2. DELETE PHYSICAL PDF
        # =====================================================

        user_folder = os.path.join(
            self.base_upload_folder,
            user_id
        )

        file_path = os.path.join(
            user_folder,
            f"{document_id}.pdf"
        )

        print(
            f"File path: {file_path}"
        )

        if os.path.exists(
            file_path
        ):

            os.remove(
                file_path
            )

            print(
                "Physical file deleted."
            )

        else:

            print(
                "Physical file not found."
            )

        return True

