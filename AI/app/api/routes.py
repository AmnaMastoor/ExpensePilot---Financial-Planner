from fastapi import APIRouter, UploadFile, File
from app.admin.service import AdminService

router = APIRouter()

admin_service = AdminService()


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