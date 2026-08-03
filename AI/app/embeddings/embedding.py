from langchain_huggingface import HuggingFaceEmbeddings
from app.config import EMBEDDING_MODEL


class EmbeddingModel:

    def __init__(self):

        self.embedding = HuggingFaceEmbeddings(
            model_name=EMBEDDING_MODEL,
            model_kwargs={
                "device": "cpu"
            },
            encode_kwargs={
                "normalize_embeddings": True
            }
        )

    def get_embedding_model(self):
        return self.embedding