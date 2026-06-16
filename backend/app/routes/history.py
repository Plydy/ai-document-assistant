from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.document import Document
from app.models.user import User
from app.utils.jwt_handler import get_current_user

router = APIRouter()

@router.get("/history")
def get_history(
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    documents = (
        db.query(Document)
        .filter(Document.user_id == current_user.id)
        .order_by(Document.created_at.desc())
        .all()
    )
    return documents

@router.delete("/history/{document_id}")
def delete_history(
        document_id: int,
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    document = (
        db.query(Document).filter(
            Document.id == document_id, Document.user_id == current_user.id
        )
        .first()
    )

    db.delete(document)
    db.commit()

    return {"message": "Document deleted"}

@router.delete("/history")
def delete_all_history(
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    (
        db.query(Document)
        .filter(Document.user_id == current_user.id)
        .delete()
    )

    db.commit()

    return {"message": "History cleared"}