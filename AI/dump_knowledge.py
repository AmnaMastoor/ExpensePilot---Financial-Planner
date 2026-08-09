from pathlib import Path

from app.ingestion.loader import PDFLoader


KNOWLEDGE_BASE_FOLDER = Path("data/knowledge_base")
OUTPUT_FILE = Path("knowledge_base_content.txt")


def main():

    print("Reading Knowledge Base PDFs...\n")

    if not KNOWLEDGE_BASE_FOLDER.exists():
        print(
            f"Folder not found: {KNOWLEDGE_BASE_FOLDER}"
        )
        return

    pdf_files = sorted(
        KNOWLEDGE_BASE_FOLDER.glob("*.pdf")
    )

    if not pdf_files:
        print("No PDF files found.")
        return

    loader = PDFLoader()

    with open(
        OUTPUT_FILE,
        "w",
        encoding="utf-8"
    ) as output:

        for index, pdf_file in enumerate(
            pdf_files,
            start=1
        ):

            print(
                f"[{index}/{len(pdf_files)}] "
                f"{pdf_file.name}"
            )

            output.write(
                "\n"
                + "=" * 80
                + "\n"
            )

            output.write(
                f"FILE: {pdf_file.name}\n"
            )

            output.write(
                "=" * 80
                + "\n\n"
            )

            try:

                documents = loader.load_pdf(
                    str(pdf_file)
                )

                for page_number, document in enumerate(
                    documents,
                    start=1
                ):

                    output.write(
                        f"\n--- PAGE {page_number} ---\n\n"
                    )

                    output.write(
                        document.page_content
                    )

                    output.write("\n\n")

            except Exception as error:

                output.write(
                    f"\nERROR: {error}\n"
                )

    print("\nDone.")
    print(
        f"Output created: {OUTPUT_FILE}"
    )


if __name__ == "__main__":
    main()