class UserDocumentRetriever:

    # ---------------------------------------------------------
    # Adaptive (relative) distance threshold
    #
    # A single fixed absolute threshold doesn't generalize
    # across different PDF types. A prose-heavy document (e.g.
    # study notes) and a structured/tabular one (e.g. a
    # financial statement) can have very different baseline
    # embedding distances even when a chunk is genuinely the
    # right answer. Hardcoding a number tuned to one PDF breaks
    # the moment a differently-styled PDF is uploaded.
    #
    # Instead, we filter RELATIVE to the best match found for
    # this specific query:
    #   - Keep chunks within RELATIVE_MARGIN of the closest
    #     (best) match, regardless of the absolute scale.
    #   - ABSOLUTE_CEILING is only a safety net: if even the
    #     best match is farther than this, nothing in the
    #     document is actually relevant, so we return nothing
    #     rather than force-feeding a weak match to the LLM.
    # ---------------------------------------------------------

    RELATIVE_MARGIN = 0.4
    ABSOLUTE_CEILING = 1.5

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

        if not results:

            print("Retrieved documents: 0")
            print("=================================\n")

            return []

        # ---------------------------------------------
        # Adaptive threshold: compute relative to the
        # best (lowest-distance) match in THIS result set.
        # ---------------------------------------------

        best_distance = min(distance for _, distance in results)

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
            # Keep this chunk only if:
            #   1. The best match overall is close enough to
            #      be plausibly relevant at all (absolute
            #      safety net), AND
            #   2. This specific chunk is close enough to the
            #      best match (relative margin).
            # ---------------------------------------------

            if (
                best_distance <= self.ABSOLUTE_CEILING
                and distance <= best_distance + self.RELATIVE_MARGIN
            ):

                documents.append(document)

        print(
            "Retrieved documents:",
            len(documents)
        )

        print("=================================\n")

        return documents