from enum import Enum


class Intent(Enum):
    FINANCIAL_DATA = "financial_data"
    KNOWLEDGE = "knowledge"
    USER_DOCUMENT = "user_document"
    GENERAL = "general"



def classify_intent(question):

    question = question.lower()


    financial_keywords = [
        "my expense",
        "my spending",
        "my income",
        "my budget",
        "my transaction",
        "how much did i spend",
        "balance",
        "expense",
       
    ]


    document_keywords = [
        "salary slip",
        "bank statement",
        "invoice",
        "uploaded",
        "document",
        "pdf"
    ]


    knowledge_keywords = [
        "what is",
        "explain",
        "how to save",
        "saving tips",
        "investment",
        "budgeting",
        "how to save"
    ]


    if any(k in question for k in financial_keywords):
        return Intent.FINANCIAL_DATA


    if any(k in question for k in document_keywords):
        return Intent.USER_DOCUMENT


    if any(k in question for k in knowledge_keywords):
        return Intent.KNOWLEDGE
    

    return Intent.GENERAL