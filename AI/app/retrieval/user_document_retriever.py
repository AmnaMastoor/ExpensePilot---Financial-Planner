class UserDocumentRetriever:

    def __init__(self, vector_store):
        self.vector_store = vector_store

    def retrieve(self, query, user_id, k=5):

        return self.vector_store.similarity_search(
            query=query,
            k=k,
            filter={
                "$and": [
                    {"source": "user_document"},
                    {"user_id": user_id}
                ]
            }
        )