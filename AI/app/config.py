from dotenv import load_dotenv
import os

load_dotenv(override=True)

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
LLM_MODEL = os.getenv("LLM_MODEL")
EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL")
CHROMA_DB = os.getenv("CHROMA_DB")
DATABASE_URL = os.getenv("DATABASE_URL")