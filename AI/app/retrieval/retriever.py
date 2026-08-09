class Retriever:

    def __init__(self, vector_store):
        self.vector_store = vector_store

    def retrieve(
        self,
        query,
        k=5
    ):
        # ---------------------------------------------------------
        # Validate query
        # ---------------------------------------------------------

        if not query or not query.strip():
            return []

        # ---------------------------------------------------------
        # Validate number of results
        # ---------------------------------------------------------

        if k <= 0:
            return []

        # ---------------------------------------------------------
        # Retrieve relevant documents
        # ---------------------------------------------------------

        documents = self.vector_store.similarity_search(
            query=query.strip(),
            k=k
        )

        # ---------------------------------------------------------
        # Safety check
        # ---------------------------------------------------------

        if not documents:
            return []

        return documents