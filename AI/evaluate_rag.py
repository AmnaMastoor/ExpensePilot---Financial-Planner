from app.embeddings.embedding import EmbeddingModel
from app.vectorstore.chroma_store import ChromaVectorStore

from app.retrieval.knowledge_retriever import KnowledgeBaseRetriever
from app.retrieval.user_document_retriever import UserDocumentRetriever

from app.llm.llm import GroqLLM
from app.chains.rag_chain import RAGChain
from app.memory.conversation_memory import ConversationMemory

from app.database.connection import SessionLocal
from app.database.models.transaction import Transaction


# =========================================================
# CONFIGURATION
# =========================================================

TOP_K_VALUES = [1, 3, 5]

PASS_THRESHOLD = 0.70


# =========================================================
# GET TEST USER
# =========================================================

def get_test_user_id():

    db = SessionLocal()

    try:

        transaction = (
            db.query(Transaction)
            .first()
        )

        if transaction is None:

            raise RuntimeError(
                "No transactions found in database."
            )

        return transaction.user_id

    finally:

        db.close()


# =========================================================
# EVALUATION DATASET
# =========================================================

EVALUATION_DATASET = [

    {
        "question": "What is an emergency fund?",
        "expected_keywords": [
            "emergency",
            "unexpected",
            "expenses",
            "income"
        ],
        "category": "knowledge"
    },

    {
        "question": "How can I save money?",
        "expected_keywords": [
            "saving",
            "savings",
            "pay yourself first",
            "automate"
        ],
        "category": "knowledge"
    },

    {
        "question": "What is a budget?",
        "expected_keywords": [
            "budget",
            "income",
            "expenses"
        ],
        "category": "knowledge"
    },

    {
        "question": "What is the 50/30/20 rule?",
        "expected_keywords": [
            "50",
            "30",
            "20",
            "needs",
            "wants",
            "savings"
        ],
        "category": "knowledge"
    },

    {
        "question": "What is zero-based budgeting?",
        "expected_keywords": [
            "zero-based",
            "budget",
            "income",
            "expenses"
        ],
        "category": "knowledge"
    },

    {
        "question": "What is the envelope budgeting system?",
        "expected_keywords": [
            "envelope",
            "spending",
            "categories"
        ],
        "category": "knowledge"
    },

    {
        "question": "What is a stock?",
        "expected_keywords": [
            "stock",
            "ownership",
            "company"
        ],
        "category": "knowledge"
    },

    {
        "question": "What is the stock market?",
        "expected_keywords": [
            "stock",
            "company",
            "investor"
        ],
        "category": "knowledge"
    },

    {
        "question": "What is a bond?",
        "expected_keywords": [
            "bond",
            "loan",
            "government",
            "company"
        ],
        "category": "knowledge"
    },

    {
        "question": "What is a mutual fund?",
        "expected_keywords": [
            "mutual",
            "fund",
            "investors",
            "diversified"
        ],
        "category": "knowledge"
    },

    {
        "question": "What is an ETF?",
        "expected_keywords": [
            "ETF",
            "exchange",
            "traded",
            "diversified"
        ],
        "category": "knowledge"
    },

    {
        "question": "What is diversification?",
        "expected_keywords": [
            "diversification",
            "different",
            "assets",
            "risk"
        ],
        "category": "knowledge"
    },

    {
        "question": "What is compound growth?",
        "expected_keywords": [
            "compound",
            "returns",
            "time"
        ],
        "category": "knowledge"
    },

    {
        "question": "What is investment risk and return?",
        "expected_keywords": [
            "risk",
            "return",
            "investment"
        ],
        "category": "knowledge"
    },

    {
        "question": "What is investment time horizon?",
        "expected_keywords": [
            "time",
            "horizon",
            "invested"
        ],
        "category": "knowledge"
    },

    {
        "question": "Why is diversification important?",
        "expected_keywords": [
            "diversification",
            "risk",
            "portfolio"
        ],
        "category": "knowledge"
    },

    {
        "question": "How should a beginner start investing?",
        "expected_keywords": [
            "diversified",
            "low-cost",
            "emergency",
            "debt"
        ],
        "category": "knowledge"
    },

    {
        "question": "What is a financial goal?",
        "expected_keywords": [
            "financial",
            "goal",
            "money"
        ],
        "category": "knowledge"
    },

    {
        "question": "What is debt management?",
        "expected_keywords": [
            "debt",
            "repayment"
        ],
        "category": "knowledge"
    },

    {
        "question": "What is a credit score?",
        "expected_keywords": [
            "credit",
            "score"
        ],
        "category": "knowledge"
    },

    {
        "question": "How can I reduce unnecessary spending?",
        "expected_keywords": [
            "spending",
            "subscriptions",
            "expenses"
        ],
        "category": "knowledge"
    },

    {
        "question": "What is a sinking fund?",
        "expected_keywords": [
            "sinking",
            "fund",
            "future",
            "expense"
        ],
        "category": "knowledge"
    },

    {
        "question": "What is the difference between needs and wants?",
        "expected_keywords": [
            "need",
            "want",
            "living",
            "expenses"
        ],
        "category": "knowledge"
    },

    {
        "question": "What are fixed and variable expenses?",
        "expected_keywords": [
            "fixed",
            "variable",
            "expenses"
        ],
        "category": "knowledge"
    },

    {
        "question": "What is the 24-hour rule for spending?",
        "expected_keywords": [
            "24",
            "purchase",
            "waiting",
            "impulse"
        ],
        "category": "knowledge"
    },

    # =====================================================
    # OUT OF DOMAIN
    # =====================================================

    {
        "question": "What is the capital of France?",
        "expected_keywords": [],
        "category": "out_of_domain"
    },

    {
        "question": "Who was the first president of the United States?",
        "expected_keywords": [],
        "category": "out_of_domain"
    },

    {
        "question": "What is photosynthesis?",
        "expected_keywords": [],
        "category": "out_of_domain"
    },
]


# =========================================================
# NORMALIZE TEXT
# =========================================================

def normalize(text):

    if not text:

        return ""

    return text.lower().strip()


# =========================================================
# CHECK RETRIEVAL RELEVANCE
# =========================================================

def document_matches_keywords(
    documents,
    expected_keywords
):

    if not documents:

        return False

    if not expected_keywords:

        return False

    combined_text = " ".join(
        document.page_content
        for document in documents
    )

    combined_text = normalize(
        combined_text
    )

    matched_keywords = 0

    for keyword in expected_keywords:

        if normalize(keyword) in combined_text:

            matched_keywords += 1

    required_matches = max(
        1,
        len(expected_keywords) // 2
    )

    return matched_keywords >= required_matches


# =========================================================
# CALCULATE MRR
# =========================================================

def calculate_reciprocal_rank(
    documents,
    expected_keywords
):

    if not documents:

        return 0.0

    for index, document in enumerate(
        documents,
        start=1
    ):

        text = normalize(
            document.page_content
        )

        matches = 0

        for keyword in expected_keywords:

            if normalize(keyword) in text:

                matches += 1

        required_matches = max(
            1,
            len(expected_keywords) // 2
        )

        if matches >= required_matches:

            return 1.0 / index

    return 0.0


# =========================================================
# INITIALIZE RAG SYSTEM
# =========================================================

def build_rag():

    print("\nInitializing RAG system...\n")

    # -----------------------------------------------------
    # Embeddings
    # -----------------------------------------------------

    embeddings = (
        EmbeddingModel()
        .get_embedding_model()
    )

    # -----------------------------------------------------
    # Vector store
    # -----------------------------------------------------

    vector_store = ChromaVectorStore(
        embeddings
    )

    print(
        f"Chroma documents: "
        f"{vector_store.count()}"
    )

    # -----------------------------------------------------
    # Retrievers
    # -----------------------------------------------------

    knowledge_retriever = (
        KnowledgeBaseRetriever(
            vector_store
        )
    )

    user_document_retriever = (
        UserDocumentRetriever(
            vector_store
        )
    )

    # -----------------------------------------------------
    # LLM
    # -----------------------------------------------------

    llm = (
        GroqLLM()
        .get_llm()
    )

    # -----------------------------------------------------
    # Memory
    # -----------------------------------------------------

    memory = ConversationMemory()

    # -----------------------------------------------------
    # RAG chain
    # -----------------------------------------------------

    rag = RAGChain(
        knowledge_retriever,
        user_document_retriever,
        llm,
        memory
    )

    return (
        vector_store,
        knowledge_retriever,
        rag
    )


# =========================================================
# RETRIEVAL EVALUATION
# =========================================================

def evaluate_retrieval(
    knowledge_retriever
):

    print("\n")
    print("=" * 70)
    print("RAG RETRIEVAL EVALUATION")
    print("=" * 70)

    hit_at_1 = 0
    hit_at_3 = 0
    hit_at_5 = 0

    reciprocal_ranks = []

    detailed_results = []

    knowledge_total = 0

    for item in EVALUATION_DATASET:

        question = item["question"]

        expected_keywords = (
            item["expected_keywords"]
        )

        category = item["category"]

        print("\n")
        print("-" * 70)

        print(
            f"Question: {question}"
        )

        print(
            f"Category: {category}"
        )

        # -------------------------------------------------
        # Out of domain
        # -------------------------------------------------

        if category == "out_of_domain":

            documents = (
                knowledge_retriever.retrieve(
                    question,
                    k=5
                )
            )

            if not documents:

                print(
                    "Result: PASS - no relevant documents"
                )

                detailed_results.append(
                    {
                        "question": question,
                        "result": "PASS",
                        "type": "out_of_domain"
                    }
                )

            else:

                print(
                    "Result: REVIEW - documents retrieved"
                )

                detailed_results.append(
                    {
                        "question": question,
                        "result": "REVIEW",
                        "type": "out_of_domain"
                    }
                )

            continue

        knowledge_total += 1

        # -------------------------------------------------
        # Retrieve top 5
        # -------------------------------------------------

        documents = (
            knowledge_retriever.retrieve(
                question,
                k=5
            )
        )

        if not documents:

            print(
                "Result: FAIL - no documents"
            )

            detailed_results.append(
                {
                    "question": question,
                    "result": "FAIL",
                    "type": category
                }
            )

            reciprocal_ranks.append(0.0)

            continue

        # -------------------------------------------------
        # Print distances if available
        # -------------------------------------------------

        for document in documents:

            distance = (
                document.metadata.get(
                    "distance"
                )
            )

            if distance is not None:

                print(
                    f"RAG distance: "
                    f"{distance:.4f}"
                )

        # -------------------------------------------------
        # Hit @ 1
        # -------------------------------------------------

        hit1 = document_matches_keywords(
            documents[:1],
            expected_keywords
        )

        # -------------------------------------------------
        # Hit @ 3
        # -------------------------------------------------

        hit3 = document_matches_keywords(
            documents[:3],
            expected_keywords
        )

        # -------------------------------------------------
        # Hit @ 5
        # -------------------------------------------------

        hit5 = document_matches_keywords(
            documents[:5],
            expected_keywords
        )

        # -------------------------------------------------
        # MRR
        # -------------------------------------------------

        rr = calculate_reciprocal_rank(
            documents,
            expected_keywords
        )

        if hit1:

            hit_at_1 += 1

        if hit3:

            hit_at_3 += 1

        if hit5:

            hit_at_5 += 1

        reciprocal_ranks.append(
            rr
        )

        print(
            f"Hit@1: "
            f"{'PASS' if hit1 else 'FAIL'}"
        )

        print(
            f"Hit@3: "
            f"{'PASS' if hit3 else 'FAIL'}"
        )

        print(
            f"Hit@5: "
            f"{'PASS' if hit5 else 'FAIL'}"
        )

        print(
            f"Reciprocal Rank: "
            f"{rr:.3f}"
        )

        detailed_results.append(
            {
                "question": question,
                "hit1": hit1,
                "hit3": hit3,
                "hit5": hit5,
                "rr": rr,
                "type": category
            }
        )

    # =====================================================
    # FINAL RETRIEVAL METRICS
    # =====================================================

    if knowledge_total == 0:

        knowledge_total = 1

    hit1_score = (
        hit_at_1 /
        knowledge_total
    )

    hit3_score = (
        hit_at_3 /
        knowledge_total
    )

    hit5_score = (
        hit_at_5 /
        knowledge_total
    )

    if reciprocal_ranks:

        mrr_score = (
            sum(reciprocal_ranks) /
            len(reciprocal_ranks)
        )

    else:

        mrr_score = 0.0

    print("\n")
    print("=" * 70)
    print("FINAL RETRIEVAL METRICS")
    print("=" * 70)

    print(
        f"Knowledge questions: "
        f"{knowledge_total}"
    )

    print(
        f"Hit@1: "
        f"{hit1_score:.2%}"
    )

    print(
        f"Hit@3: "
        f"{hit3_score:.2%}"
    )

    print(
        f"Hit@5: "
        f"{hit5_score:.2%}"
    )

    print(
        f"MRR: "
        f"{mrr_score:.3f}"
    )

    return detailed_results


# =========================================================
# ANSWER EVALUATION
# =========================================================

def evaluate_answers(
    rag,
    user_id
):

    print("\n")
    print("=" * 70)
    print("RAG ANSWER EVALUATION")
    print("=" * 70)

    total = 0
    grounded = 0
    abstained = 0

    for item in EVALUATION_DATASET:

        question = item["question"]

        expected_keywords = (
            item["expected_keywords"]
        )

        category = item["category"]

        print("\n")
        print("-" * 70)

        print(
            f"Question: {question}"
        )

        try:

            # -------------------------------------------------
            # IMPORTANT:
            # Every evaluation question is independent.
            #
            # We do not want Question 1 to affect Question 2.
            # -------------------------------------------------

            rag.memory.clear(
                user_id
            )

            answer = rag.ask(
                question,
                user_id
            )

        except Exception as error:

            print(
                f"ERROR: {error}"
            )

            continue

        answer_normalized = normalize(
            answer
        )

        # -------------------------------------------------
        # Out of domain
        # -------------------------------------------------

        if category == "out_of_domain":

            if (
                "i don't have enough information"
                in answer_normalized
            ):

                abstained += 1

                print(
                    "Abstention: PASS"
                )

            else:

                print(
                    "Abstention: FAIL"
                )

            continue

        total += 1

        # -------------------------------------------------
        # Exact insufficient-information response
        # -------------------------------------------------

        if (
            "i don't have enough information"
            in answer_normalized
        ):

            print(
                "Grounding: FAIL - model abstained"
            )

            print(
                f"\nAnswer:\n{answer}"
            )

            continue

        # -------------------------------------------------
        # Keyword grounding
        # -------------------------------------------------

        matched = 0

        for keyword in expected_keywords:

            if normalize(keyword) in answer_normalized:

                matched += 1

        required = max(
            1,
            len(expected_keywords) // 2
        )

        if matched >= required:

            grounded += 1

            print(
                "Grounding: PASS"
            )

        else:

            print(
                "Grounding: REVIEW"
            )

        print(
            f"\nAnswer:\n{answer}"
        )

    # =====================================================
    # FINAL ANSWER METRICS
    # =====================================================

    if total > 0:

        grounding_score = (
            grounded /
            total
        )

    else:

        grounding_score = 0.0

    print("\n")
    print("=" * 70)
    print("FINAL ANSWER METRICS")
    print("=" * 70)

    print(
        f"Knowledge answers evaluated: "
        f"{total}"
    )

    print(
        f"Grounded answers: "
        f"{grounded}"
    )

    print(
        f"Grounding score: "
        f"{grounding_score:.2%}"
    )

    print(
        f"Out-of-domain abstentions: "
        f"{abstained}"
    )

    return grounding_score


# =========================================================
# MAIN
# =========================================================

def main():

    print("\n")
    print("=" * 70)
    print("EXPENSEPILOT RAG EVALUATION")
    print("=" * 70)

    # -----------------------------------------------------
    # Get test user
    # -----------------------------------------------------

    try:

        user_id = get_test_user_id()

        print(
            f"\nTesting User ID: {user_id}"
        )

    except Exception as error:

        print(
            "\nCould not find test user:"
        )

        print(error)

        return

    # -----------------------------------------------------
    # Build RAG
    # -----------------------------------------------------

    try:

        (
            vector_store,
            knowledge_retriever,
            rag
        ) = build_rag()

    except Exception as error:

        print(
            "\nCould not initialize RAG:"
        )

        print(error)

        return

    # -----------------------------------------------------
    # Retrieval evaluation
    # -----------------------------------------------------

    evaluate_retrieval(
        knowledge_retriever
    )

    # -----------------------------------------------------
    # Answer evaluation
    # -----------------------------------------------------

    evaluate_answers(
        rag,
        user_id
    )

    # -----------------------------------------------------
    # Complete
    # -----------------------------------------------------

    print("\n")
    print("=" * 70)
    print("RAG EVALUATION COMPLETE")
    print("=" * 70)


# =========================================================
# ENTRY POINT
# =========================================================

if __name__ == "__main__":

    main()