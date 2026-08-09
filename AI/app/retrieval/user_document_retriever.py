class UserDocumentRetriever:

    def __init__(self, vector_store):
        self.vector_store = vector_store

    def retrieve(
        self,
        query,
        user_id,
        k=5
    ):
        # ---------------------------------------------------------
        # Validate query
        # ---------------------------------------------------------

        if not query or not query.strip():
            return []

        # ---------------------------------------------------------
        # Validate user
        # ---------------------------------------------------------

        if user_id is None or str(user_id).strip() == "":
            return []

        # ---------------------------------------------------------
        # Validate number of results
        # ---------------------------------------------------------

        if k <= 0:
            return []

        # ---------------------------------------------------------
        # Retrieve ONLY documents belonging to this user
        # ---------------------------------------------------------

        documents = self.vector_store.similarity_search(
            query=query.strip(),
            k=k,
            filter={
                "$and": [
                    {
                        "source": "user_document"
                    },
                    {
                        "user_id": str(user_id)
                    }
                ]
            }
        )

        # ---------------------------------------------------------
        # Safety check
        # ---------------------------------------------------------

        if not documents:
            return []

        return documents