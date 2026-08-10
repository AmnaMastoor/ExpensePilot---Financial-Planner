from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Form,
    HTTPException
)

from pydantic import BaseModel

from app.admin.service import AdminService
from app.user_documents.service import UserDocumentService

# =========================================================
# RAG SERVICE
# =========================================================

from app.services.rag_service import rag


router = APIRouter()


# =========================================================
# SERVICES
# =========================================================

admin_service = AdminService()

user_document_service = UserDocumentService()


# =========================================================
# CHAT MODELS
# =========================================================

class ChatRequest(BaseModel):

    question: str
    user_id: str


class ChatResponse(BaseModel):

    answer: str


# =========================================================
# HEALTH
# =========================================================

@router.get("/health")
def health():

    return {
        "status": "running"
    }


# =========================================================
# ADMIN UPLOAD
# =========================================================

@router.post("/documents/upload")
async def upload_document(
    file: UploadFile = File(...)
):

    document = admin_service.save_file(
        file
    )

    total_chunks = admin_service.ingest_document(
        document
    )

    return {

        "message":
            "Upload Successful",

        "document_id":
            document["document_id"],

        "stored_name":
            document["stored_name"],

        "filename":
            document["original_name"],

        "chunks":
            total_chunks
    }


# =========================================================
# ADMIN GET
# =========================================================

@router.get("/documents")
def get_documents():

    return admin_service.get_documents()


# =========================================================
# USER UPLOAD
# =========================================================

@router.post("/user/documents/upload")
async def upload_user_document(

    user_id: str = Form(...),

    document_id: str = Form(...),

    file: UploadFile = File(...)
):

    document = user_document_service.save_file(

        file=file,

        user_id=user_id,

        document_id=document_id
    )

    total_chunks = (
        user_document_service
        .ingest_document(document)
    )

    return {

        "message":
            "User document uploaded successfully.",

        "user_id":
            user_id,

        "document_id":
            document_id,

        "filename":
            document["original_name"],

        "stored_name":
            document["stored_name"],

        "chunks":
            total_chunks
    }


# =========================================================
# USER DELETE
# =========================================================

@router.delete(
    "/user/documents/{document_id}"
)
def delete_user_document(

    document_id: str,

    user_id: str
):

    try:

        deleted = (
            user_document_service
            .delete_document(
                document_id=document_id,
                user_id=user_id
            )
        )

        return {
            "deleted": deleted
        }

    except Exception as error:

        print(
            "Delete document error:",
            error
        )

        raise HTTPException(
            status_code=500,
            detail="Unable to delete document."
        )


# =========================================================
# CHAT / RAG
# =========================================================

@router.post(
    "/ask",
    response_model=ChatResponse
)
def ask_question(
    request: ChatRequest
):

    try:

        print(
            "\n================================="
        )

        print(
            "RAG CHAT REQUEST"
        )

        print(
            "================================="
        )

        print(
            "User ID:",
            request.user_id
        )

        print(
            "Question:",
            request.question
        )


        # -------------------------------------------------
        # Send request to existing RAG service
        # -------------------------------------------------

        answer = rag.ask(

            question=request.question,

            user_id=request.user_id
        )


        print(
            "Answer:",
            answer
        )


        return ChatResponse(
            answer=answer
        )


    except Exception as error:

        import traceback

        print(
            "\n================================="
        )

        print(
            "RAG ERROR"
        )

        print(
            "================================="
        )

        traceback.print_exc()


        raise HTTPException(

            status_code=500,

            detail=
                "Error while processing the question."
        )


# =========================================================
# CHAT HISTORY
# =========================================================

@router.get(
    "/chat/history"
)
def get_chat_history(
    user_id: str
):

    try:

        # -------------------------------------------------
        # Use memory from the existing RAG service
        # -------------------------------------------------

        history = (
            rag.memory
            .get_history(user_id)
        )


        messages = []


        for chat in history:

            messages.append({

                "role":
                    "user",

                "content":
                    chat["user"]
            })


            messages.append({

                "role":
                    "assistant",

                "content":
                    chat["assistant"]
            })


        return {

            "messages":
                messages
        }


    except Exception as error:

        import traceback

        print(
            "\nChat history error:"
        )

        traceback.print_exc()


        raise HTTPException(

            status_code=500,

            detail=
                "Unable to load chat history."
        )


# =========================================================
# REINDEX KNOWLEDGE BASE
# =========================================================

@router.post(
    "/documents/reindex"
)
def reindex_documents():

    try:

        result = (
            admin_service
            .reindex_knowledge_base()
        )


        return {

            "message":
                "Knowledge base re-indexed successfully.",

            **result
        }


    except Exception as error:

        print(
            "Reindex error:",
            error
        )

        raise HTTPException(

            status_code=500,

            detail=
                "Unable to re-index knowledge base."
        )