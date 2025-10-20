from datetime import datetime, timedelta
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr, Field
from sqlalchemy.orm import Session
import secrets

from database import get_db
import models
import utils

router = APIRouter(prefix="/auth", tags=["Auth"])

RESET_TOKEN_TTL_MINUTES = 30

class ForgotPasswordIn(BaseModel):
    email: EmailStr

class ResetPasswordIn(BaseModel):
    token: str
    new_password: str = Field(..., min_length=8)

def _issue_reset_token(user: models.User) -> str:
    token = secrets.token_urlsafe(32)
    user.verification_token = token
    user.token_expiration = datetime.utcnow() + timedelta(minutes=RESET_TOKEN_TTL_MINUTES)
    return token

@router.post("/forgot-password")
def forgot_password(payload: ForgotPasswordIn, db: Session = Depends(get_db)):
    user: Optional[models.User] = db.query(models.User).filter(models.User.email == payload.email).first()

    if not user:
        return {"message": "If that email exists, a password reset link has been sent."}

    _issue_reset_token(user)
    db.add(user)
    db.commit()

    return {
        "message": "If that email exists, a password reset link has been sent.",
        "dev_preview": {
            "token_expires_minutes": RESET_TOKEN_TTL_MINUTES,
            "reset_token": user.verification_token,
            "reset_link_example": f"/auth/reset-password?token={user.verification_token}",
        },
    }

@router.get("/verify-reset-token")
def verify_reset_token(token: str, db: Session = Depends(get_db)):
    user: Optional[models.User] = db.query(models.User).filter(models.User.verification_token == token).first()
    if not user or not user.token_expiration or user.token_expiration < datetime.utcnow():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid or expired token")
    return {"valid": True, "expires_at": user.token_expiration.isoformat()}

@router.post("/reset-password")
def reset_password(payload: ResetPasswordIn, db: Session = Depends(get_db)):
    user: Optional[models.User] = db.query(models.User).filter(models.User.verification_token == payload.token).first()
    if not user or not user.token_expiration or user.token_expiration < datetime.utcnow():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid or expired token")

    user.hashed_password = utils.hash_password(payload.new_password)
    user.verification_token = None
    user.token_expiration = None
    db.add(user)
    db.commit()

    return {"message": "Password has been reset successfully. You may now log in."}
