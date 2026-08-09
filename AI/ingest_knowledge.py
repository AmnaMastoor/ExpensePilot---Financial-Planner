from pathlib import Path

from app.ingestion.loader import PDFLoader
from app.ingestion.chunker import DocumentChunker
from app.embeddings.embedding import EmbeddingModel
from app.vectorstore.chroma_store import ChromaVectorStore


KNOWLEDGE_BASE_FOLDER = Path("data/knowledge_base")


def main():

    print("\n====================================")
    print("ExpensePilot Knowledge Base Ingestion")
    print("====================================\n")

    # ---------------------------------------------------------
    # Check knowledge-base folder
    # ---------------------------------------------------------

    if not KNOWLEDGE_BASE_FOLDER.exists():

        print(
            f"Knowledge-base folder not found: "
            f"{KNOWLEDGE_BASE_FOLDER}"
        )

        return

    # ---------------------------------------------------------
    # Find PDFs
    # ---------------------------------------------------------

    pdf_files = list(
        KNOWLEDGE_BASE_FOLDER.glob("*.pdf")
    )

    if not pdf_files:

        print(
            "No PDF files found in "
            f"{KNOWLEDGE_BASE_FOLDER}"
        )

        return

    print(
        f"Found {len(pdf_files)} PDF file(s).\n"
    )

    # ---------------------------------------------------------
    # Initialize components
    # ---------------------------------------------------------

    print("Loading embedding model...\n")

    embedding_model = EmbeddingModel()
    embeddings = (
        embedding_model
        .get_embedding_model()
    )

    vector_store = ChromaVectorStore(
        embeddings
    )

    loader = PDFLoader()
    chunker = DocumentChunker()

    total_chunks = 0

    # ---------------------------------------------------------
    # Process each PDF
    # ---------------------------------------------------------

    for pdf_file in pdf_files:

        print("------------------------------------")
        print(
            f"Processing: {pdf_file.name}"
        )
        print("------------------------------------")

        try:

            documents = loader.load_pdf(
                str(pdf_file)
            )

            if not documents:

                print(
                    "No pages found.\n"
                )

                continue

            chunks = chunker.split_documents(
                documents
            )

            if not chunks:

                print(
                    "No chunks generated.\n"
                )

                continue

            # -------------------------------------------------
            # Add metadata
            # -------------------------------------------------

            document_id = pdf_file.stem

            for index, chunk in enumerate(
                chunks
            ):

                chunk.metadata["source"] = (
                    "knowledge_base"
                )

                chunk.metadata["document_id"] = (
                    document_id
                )

                chunk.metadata["filename"] = (
                    pdf_file.name
                )

                chunk.metadata["chunk_id"] = (
                    f"{document_id}_{index}"
                )

            # -------------------------------------------------
            # Add to Chroma
            # -------------------------------------------------

            vector_store.add_documents(
                chunks
            )

            total_chunks += len(chunks)

            print(
                f"Pages: {len(documents)}"
            )

            print(
                f"Chunks: {len(chunks)}"
            )

            print(
                "Status: SUCCESS\n"
            )

        except Exception as error:

            print(
                f"ERROR processing "
                f"{pdf_file.name}:"
            )

            print(error)
            print()

    # ---------------------------------------------------------
    # Final result
    # ---------------------------------------------------------

    print("====================================")
    print("Knowledge Base Ingestion Complete")
    print("====================================")

    print(
        f"Total chunks indexed: "
        f"{total_chunks}"
    )

    print(
        f"Chroma documents: "
        f"{vector_store.count()}"
    )

    print("\nDone.")


if __name__ == "__main__":
    main()