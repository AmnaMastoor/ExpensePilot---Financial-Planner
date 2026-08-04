from dotenv import load_dotenv
import os

load_dotenv()

# GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

EMBEDDING_MODEL = os.getenv(
    "EMBEDDING_MODEL"
)

CHROMA_DB = os.getenv(
    "CHROMA_DB"
)
# print("GOOGLE_API_KEY:", GOOGLE_API_KEY)
print("EMBEDDING_MODEL:", EMBEDDING_MODEL)
print("CHROMA_DB:", CHROMA_DB)