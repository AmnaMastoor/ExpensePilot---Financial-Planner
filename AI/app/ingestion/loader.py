from langchain_community.document_loaders import PyPDFLoader
from pathlib import Path


class PDFLoader:

    def load_pdf(self, file_path: str):

        file = Path(file_path)

        if not file.exists():
            raise FileNotFoundError(
                f"{file_path} not found."
            )

        loader = PyPDFLoader(file_path)

        documents = loader.load()

        return documents