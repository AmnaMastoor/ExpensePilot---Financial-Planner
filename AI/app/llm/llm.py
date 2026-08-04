from langchain_ollama import ChatOllama

class OllamaLLM:

    def __init__(self):
        self.llm = ChatOllama(
            model="llama3.2",
            temperature=0.3
        )

    def get_llm(self):
        return self.llm