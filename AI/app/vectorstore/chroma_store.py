from langchain_chroma import Chroma

from app.config import CHROMA_DB


class ChromaVectorStore:

    def __init__(self, embedding_model):

        self.db = Chroma(
            persist_directory=CHROMA_DB,
            embedding_function=embedding_model
        )

    # =========================================================
    # ADD DOCUMENTS
    # =========================================================

    def add_documents(self, documents):

        if not documents:
            return

        self.db.add_documents(documents)

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
        """
        Retrieve documents using Chroma semantic distance.

        Chroma distance:
            Lower = better match
            Higher = weaker match

        We use a relatively relaxed threshold because
        some valid finance documents can have distances
        above 1.0 even when they are semantically relevant.
        """

        if not query or not query.strip():
            return []

        search_kwargs = {
            "k": k
        }

        if filter:
            search_kwargs["filter"] = filter

        results = self.db.similarity_search_with_score(
            query=query.strip(),
            **search_kwargs
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
    # DELETE DOCUMENT
    # =========================================================

    def delete_document(
        self,
        document_id
    ):

        results = self.db.get(
            where={
                "document_id": document_id
            }
        )

        ids = results.get(
            "ids",
            []
        )

        if ids:

            self.db.delete(
                ids=ids
            )

            return True

        return False

    # =========================================================
    # COUNT DOCUMENTS
    # =========================================================

    def count(self):

        return self.db._collection.count()