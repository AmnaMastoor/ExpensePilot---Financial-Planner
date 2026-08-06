from dotenv import load_dotenv
import os

from langchain_groq import ChatGroq

load_dotenv(override=True)


class GroqLLM:

    def __init__(self):

        self.llm = ChatGroq(

            api_key=os.getenv("GROQ_API_KEY"),

            model=os.getenv("LLM_MODEL"),

            temperature=0.3

        )

    def get_llm(self):

        return self.llm