from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.auth import utils, models, schemas
from app.database import get_db
from datetime import datetime, timedelta
import secrets

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register", response_model=schemas.Token)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing = db.query(models.User).filter(models.User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pw = utils.hash_password(user.password)
    
    # Generate email verification token
    token = secrets.token_urlsafe(32)
    expiration = datetime.utcnow() + timedelta(hours=1)

    new_user = models.User(
        email=user.email,
        hashed_password=hashed_pw,
        verification_token=token,
        token_expiration=expiration,
        is_verified=False
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User created. Please check your email to verify your account."}

    token = utils.create_token({"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}

@router.post("/login", response_model=schemas.Token)
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or not utils.verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = utils.create_token({"sub": user.email}, timedelta(minutes=60))
    return {"access_token": token, "token_type": "bearer"}
