class UserDocumentRetriever:

    # ---------------------------------------------------------
    # Distance threshold
    #
    # Previously 1.7 — too loose. Real irrelevant matches were
    # showing up at 1.62-1.66 and passing through, causing the
    # LLM to answer from unrelated document chunks.
    #
    # Observed good matches: ~0.50 - 0.90
    # Observed bad / irrelevant matches: ~1.5 - 1.9
    #
    # 1.2 gives safe margin above real matches while rejecting
    # off-topic ones.
    # ---------------------------------------------------------

    DISTANCE_THRESHOLD = 1.2

    def __init__(self, vector_store):
        self.vector_store = vector_store

    def retrieve(
        self,
        query,
        user_id,
        k=5
    ):

        # =====================================================
        # VALIDATION
        # =====================================================

        if not query or not query.strip():
            return []

        if user_id is None or not str(user_id).strip():
            return []

        user_id = str(user_id).strip()
        query = query.strip()

        print("\n=================================")
        print("USER DOCUMENT RETRIEVAL")
        print("=================================")
        print("Query:", query)
        print("User ID:", user_id)

        # =====================================================
        # SIMILARITY SEARCH
        # =====================================================

        results = self.vector_store.db.similarity_search_with_score(
            query=query,
            k=k,
            filter={
                "$and": [
                    {
                        "source": "user_document"
                    },
                    {
                        "user_id": user_id
                    }
                ]
            }
        )

        # =====================================================
        # PROCESS RESULTS
        # =====================================================

        documents = []

        for document, distance in results:

            print(
                f"RAG distance: {distance:.4f}"
            )

            print(
                "Filename:",
                document.metadata.get("filename")
            )

            print(
                "Document ID:",
                document.metadata.get("document_id")
            )

            print(
                "User ID:",
                document.metadata.get("user_id")
            )

            print(
                "Source:",
                document.metadata.get("source")
            )

            # ---------------------------------------------
            # Distance threshold
            #
            # Only keep results that are actually close
            # enough to be relevant.
            # ---------------------------------------------

            if distance <= self.DISTANCE_THRESHOLD:

                documents.append(document)

        print(
            "Retrieved documents:",
            len(documents)
        )

        print("=================================\n")

        return documents