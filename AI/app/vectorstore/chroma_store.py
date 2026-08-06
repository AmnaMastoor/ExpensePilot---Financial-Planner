from langchain_chroma import Chroma

from app.config import CHROMA_DB


class ChromaVectorStore:

    def __init__(self, embedding_model):

        self.db = Chroma(
            persist_directory=CHROMA_DB,
            embedding_function=embedding_model
        )

    def add_documents(self, documents):

        self.db.add_documents(documents)

    def similarity_search(self, query, k=3):

        return self.db.similarity_search(
            query,
            k=k
        )

    def delete_document(self, document_id):

        results = self.db.get(
            where={
                "document_id": document_id
            }
        )

        ids = results.get("ids", [])

        if ids:

            self.db.delete(ids=ids)

            return True

        return False

    def count(self):

        return self.db._collection.count()