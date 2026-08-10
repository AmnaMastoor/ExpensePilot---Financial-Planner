class KnowledgeBaseRetriever:

    # ---------------------------------------------------------
    # Distance threshold
    #
    # Observed good matches: ~0.50 - 0.90
    # Observed bad / irrelevant matches: ~1.5 - 1.7+
    #
    # 1.2 gives safe margin above real matches while still
    # rejecting off-topic results.
    # ---------------------------------------------------------

    DISTANCE_THRESHOLD = 1.2

    def __init__(self, vector_store):

        self.vector_store = vector_store

    def retrieve(
        self,
        query,
        k=5
    ):

        if not query or not query.strip():
            return []

        query = query.strip()

        # =====================================================
        # SIMILARITY SEARCH (WITH SCORE)
        # =====================================================

        results = self.vector_store.db.similarity_search_with_score(
            query=query,
            k=k,
            filter={
                "source": "knowledge_base"
            },
        )

        if not results:
            return []

        print("\n=================================")
        print("KNOWLEDGE BASE RETRIEVAL")
        print("=================================")
        print("Query:", query)

        # =====================================================
        # PROCESS RESULTS
        # =====================================================

        documents = []

        for document, distance in results:

            print(f"RAG distance: {distance:.4f}")

            # ---------------------------------------------
            # Distance threshold
            #
            # Reject results that are too far to actually be
            # relevant, instead of blindly passing everything
            # to the LLM.
            # ---------------------------------------------

            if distance <= self.DISTANCE_THRESHOLD:

                documents.append(document)

        print("Retrieved documents:", len(documents))
        print("=================================\n")

        return documents