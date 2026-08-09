class KnowledgeBaseRetriever:

    def __init__(self, vector_store):

        self.vector_store = vector_store

    def retrieve(
        self,
        query,
        k=5
    ):

        if not query or not query.strip():
            return []

        documents = self.vector_store.similarity_search(
            query=query.strip(),
            k=k,
            filter={
                "source": "knowledge_base"
            },
        )

        if not documents:
            return []

        return documents