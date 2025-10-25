# app/test_routes.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import text
from sqlalchemy.orm import Session
from app.database import get_db

router = APIRouter()

@router.get("/ping-db")
def ping_db(db: Session = Depends(get_db)):
    try:
        db.execute(text("SELECT 1"))
        return {"db": "ok"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))