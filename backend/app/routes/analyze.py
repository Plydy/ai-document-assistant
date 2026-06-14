from fastapi import  APIRouter, Depends
from pydantic import BaseModel
from pyexpat.errors import messages
from  sqlalchemy.orm import Session
from datetime import date

from app.services.ai_service import analyze_text
from app.database.db import SessionLocal, get_db
from app.models.user import User
from app.utils.jwt_handler import get_current_user

router = APIRouter()

class AnalyzeRequest(BaseModel):
    text: str

@router.post("/analyze")
def analyze(
        data: AnalyzeRequest,
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
):

    if not current_user.is_admin:

        today = date.today()

        if current_user.last_reset_date != today:
            current_user.daily_requests = 0
            current_user.last_reset_date = today
            db.commit()

        if current_user.daily_requests >= 5:
            return {"error": "Daily limit reached"}

        current_user.daily_requests += 1

        db.commit()

    summary = analyze_text(data.text)
    return {"summary": summary}