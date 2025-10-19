from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.auth import utils, models, schemas
from datetime import timedelta
from app.database import get_db
from ..schemas import ChangePassword
from ..dependencies import get_current_user

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register", response_model=schemas.Token)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing = db.query(models.User).filter(models.User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pw = utils.hash_password(user.password)
    new_user = models.User(email=user.email, hashed_password=hashed_pw)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token = utils.create_token({"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}

@router.post("/login", response_model=schemas.Token)
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not utils.verify_password(request.current_password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = utils.create_token({"sub": user.email}, timedelta(minutes=60))
    return {"access_token": token, "token_type": "bearer"}

@router.put("/change-password")
def change_password(request: ChangePassword, db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    user = db.query(models.User).filter(models.User.id == current_user.id).first()

    # Verify old password
    if not utils.verify(request.current_password, user.password):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Current password is incorrect."
        )

    # Hash and set new password
    user.hashed_password = utils.hash_password(request.new_password)
    db.commit()
    return {"message": "Password updated successfully"}