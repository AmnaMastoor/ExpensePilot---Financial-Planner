
from langchain_chroma import Chroma

from app.config import CHROMA_DB


class ChromaVectorStore:

    def __init__(
        self,
        embedding_model
    ):

        self.db = Chroma(
            persist_directory=CHROMA_DB,
            embedding_function=embedding_model
        )

    # =========================================================
    # ADD DOCUMENTS
    # =========================================================

    def add_documents(
        self,
        documents
    ):

        if not documents:
            return

        self.db.add_documents(
            documents
        )

    # =========================================================
    # SIMILARITY SEARCH
    # =========================================================

    def similarity_search(
        self,
        query,
        k=5,
        filter=None,
        score_threshold=1.7
    ):

        if not query or not query.strip():
            return []

        search_kwargs = {
            "k": k
        }

        if filter:
            search_kwargs["filter"] = filter

        results = (
            self.db
                .similarity_search_with_score(
                    query=query.strip(),
                    **search_kwargs
                )
        )

        relevant_documents = []

        for document, distance in results:

            print(
                f"RAG distance: {distance:.4f}"
            )

            if distance <= score_threshold:

                relevant_documents.append(
                    document
                )

        return relevant_documents

    # =========================================================
    # DELETE DOCUMENT BY ID
    # =========================================================

    def delete_document(
        self,
        document_id
    ):

        document_id = str(
            document_id
        )

        print(
            "================================="
        )

        print(
            "CHROMA DELETE"
        )

        print(
            f"Document ID: {document_id}"
        )

        print(
            "================================="
        )

        results = self.db.get(
            where={
                "document_id":
                    document_id
            }
        )

        ids = results.get(
            "ids",
            []
        )

        print(
            f"Found Chroma chunks: {len(ids)}"
        )

        if not ids:

            print(
                "No Chroma chunks found."
            )

            return False

        self.db.delete(
            ids=ids
        )

        print(
            f"Deleted {len(ids)} Chroma chunks."
        )

        return True

    # =========================================================
    # COUNT
    # =========================================================

    def count(self):

        return (
            self.db
                ._collection
                .count()
        )

def get_user_document_chunks(
    self,
    user_id
):

    user_id = str(user_id)

    results = self.db.get(
        where={
            "$and": [
                {
                    "source": "user_document"
                },
                {
                    "user_id": user_id
                }
            ]
        },
        include=["metadatas"]
    )

    return results