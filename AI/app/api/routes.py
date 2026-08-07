from fastapi import APIRouter, UploadFile, File, Form

from app.admin.service import AdminService
from app.user_documents.service import UserDocumentService

router = APIRouter()

admin_service = AdminService()
user_document_service = UserDocumentService()


@router.get("/health")
def health():
    return {"status": "running"}


@router.post("/documents/upload")
async def upload_document(file: UploadFile = File(...)):

    document = admin_service.save_file(file)

    total_chunks = admin_service.ingest_document(document)

    return {
        "message": "Upload Successful",
        "document_id": document["document_id"],
        "stored_name": document["stored_name"],
        "filename": document["original_name"],
        "chunks": total_chunks
    }


@router.get("/documents")
def get_documents():

    return admin_service.get_documents()


@router.delete("/documents/{document_id}/{filename}")
def delete_document(
    document_id: str,
    filename: str
):

    deleted = admin_service.delete_document(
        document_id,
        filename
    )

    return {
        "deleted": deleted
    }

@router.post("/user/documents/upload")
async def upload_user_document(
    user_id: str = Form(...),
    file: UploadFile = File(...)
):

    document = user_document_service.save_file(
        file,
        user_id
    )

    total_chunks = user_document_service.ingest_document(
        document
    )

    return {
        "message": "User document uploaded successfully.",
        "user_id": user_id,
        "document_id": document["document_id"],
        "filename": document["original_name"],
        "chunks": total_chunks
    }