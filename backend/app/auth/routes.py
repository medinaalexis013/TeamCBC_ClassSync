from fastapi import APIRouter, HTTPException, Depends, Header
from app.auth import utils, schemas
from supabase import create_client, Client
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/auth", tags=["Auth"])

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# -----------------------------
# REGISTER USER
# -----------------------------
@router.post("/register")
def register(user: schemas.UserCreate):
    """
    Registers a user with Supabase Auth.
    Automatically sends email verification if enabled in Supabase settings.
    """
    try:
        response = utils.register_user(user.email, user.password)
        return {"message": "User registered successfully. Check your email for verification.", "user": response.user.email}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# -----------------------------
# LOGIN USER
# -----------------------------
@router.post("/login")
def login(user: schemas.UserLogin):
    """
    Logs in user with Supabase and returns JWT + refresh tokens.
    """
    try:
        response = utils.login_user(user.email, user.password)
        session = response.session
        return {
            "access_token": session.access_token,
            "refresh_token": session.refresh_token,
            "token_type": "bearer"
        }
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))


# -----------------------------
# CURRENT USER
# -----------------------------
@router.get("/me")
def get_profile(Authorization: str = Header(...)):
    """
    Retrieves the currently authenticated user's profile using the Authorization header.
    """
    if not Authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid Authorization header format")

    token = Authorization.split(" ")[1]
    try:
        user = utils.verify_token(token)
        return {"user": user.user}
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))

# -----------------------------
# FORGOT PASSWORD
# -----------------------------
@router.post("/forgot-password")
def forgot_password(email: str = Body(..., embed=True)):
    """
    Initiates a password reset email via Supabase Auth.
    Supabase automatically emails the user with a reset link.
    """
    try:
        response = supabase.auth.reset_password_for_email(email, options={
            "redirect_to": "http://localhost:3000/reset-password"
        })
        return {"message": f"Password reset link sent to {email}."}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.post("/reset-password")
def reset_password(new_password: str = Body(..., embed=True), access_token: str = Body(..., embed=True)):
    """
    Updates the user's password using Supabase session token.
    """
    try:
        response = supabase.auth.update_user(
            {"password": new_password},
            access_token=access_token
        )
        return {"message": "Password has been reset successfully."}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))