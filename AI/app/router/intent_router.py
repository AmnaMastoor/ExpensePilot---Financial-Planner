from enum import Enum


class Intent(Enum):
    FINANCIAL_DATA = "financial_data"
    KNOWLEDGE = "knowledge"
    USER_DOCUMENT = "user_document"
    GENERAL = "general"


def classify_intent(question):

    if not question:
        return Intent.GENERAL

    question = question.lower().strip()

    # ---------------------------------------------------------
    # User document questions
    #
    # Highest priority because questions about uploaded files
    # should not accidentally be treated as general knowledge.
    # ---------------------------------------------------------

    document_keywords = [
        "salary slip",
        "salary slips",
        "payslip",
        "pay slip",
        "bank statement",
        "bank statements",
        "invoice",
        "invoices",
        "receipt",
        "receipts",
        "uploaded document",
        "uploaded documents",
        "uploaded file",
        "uploaded files",
        "uploaded pdf",
        "uploaded pdfs",
        "my uploaded pdf",
        "my document",
        "my documents",
        "my pdf",
        "my file",
        "my files",
        "this document",
        "this pdf",
        "this file",
        "according to my pdf",
        "according to my document",
        "according to my file",
        "according to the uploaded pdf",
        "according to the uploaded document",
        "according to the uploaded file",
        "from my document",
        "from my pdf",
        "from my file",
        "in the context of my uploaded pdf",
        "in the context of my document",
    ]

    if any(
        keyword in question
        for keyword in document_keywords
    ):
        return Intent.USER_DOCUMENT

    # ---------------------------------------------------------
    # Personal financial data questions
    #
    # These should use actual database financial data instead
    # of general financial knowledge.
    # ---------------------------------------------------------

    financial_keywords = [
        "my expense",
        "my expenses",
        "my spending",
        "my income",
        "my salary",
        "my budget",
        "my transaction",
        "my transactions",
        "my balance",
        "my finances",
        "my financial",
        "my goal",
        "my goals",
        "my financial goal",
        "my financial goals",
        "how much did i spend",
        "how much have i spent",
        "how much i spent",
        "how much did i earn",
        "how much do i earn",
        "what is my balance",
        "what's my balance",
        "show my expenses",
        "show my spending",
        "show my income",
        "show my budget",
        "show my transactions",
        "show my goals",
        "total expenses",
        "total spending",
        "total income",
        "monthly spending",
        "monthly expenses",
        "monthly income",
        "monthly budget",
        "recent transactions",
        "recent spending",
        "highest expense",
    ]

    if any(
        keyword in question
        for keyword in financial_keywords
    ):
        return Intent.FINANCIAL_DATA

    # ---------------------------------------------------------
    # General financial knowledge
    #
    # These questions can use the admin knowledge base.
    # ---------------------------------------------------------

    knowledge_keywords = [
        "what is",
        "what are",
        "explain",
        "define",
        "definition",
        "meaning of",
        "how does",
        "how do",
        "how can i save",
        "how to save",
        "saving tips",
        "saving strategy",
        "saving strategies",
        "investment",
        "investing",
        "invest",
        "budgeting",
        "budgeting tips",
        "budgeting strategy",
        "budgeting strategies",
        "financial planning",
        "financial advice",
        "emergency fund",
        "mutual fund",
        "mutual funds",
        "stocks",
        "stock market",
        "compound interest",
        "interest rate",
        "tax",
        "taxes",
        "retirement planning",
        "retirement",
        "debt management",
        "debt",
        "credit score",
        "credit card",
    ]

    if any(
        keyword in question
        for keyword in knowledge_keywords
    ):
        return Intent.KNOWLEDGE

    # ---------------------------------------------------------
    # Unknown question
    #
    # RAGChain decides how to handle GENERAL.
    # ---------------------------------------------------------

    return Intent.GENERAL