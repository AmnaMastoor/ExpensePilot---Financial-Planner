from dotenv import load_dotenv
import os

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

EMBEDDING_MODEL = os.getenv(
    "EMBEDDING_MODEL"
)

CHROMA_DB = os.getenv(
    "CHROMA_DB"
)