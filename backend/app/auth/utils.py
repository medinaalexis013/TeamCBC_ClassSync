from supabase import create_client, Client
from fastapi import HTTPException, status
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Supabase credentials not set in .env file")

# Create Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


# -----------------------------
# Authentication Helpers
# -----------------------------

def register_user(email: str, password: str) -> dict:
    """
    Register a new user using Supabase Auth.
    Sends verification email automatically if configured in Supabase project.
    """
    try:
        response = supabase.auth.sign_up({"email": email, "password": password})
        if not response.user:
            raise HTTPException(status_code=400, detail="Registration failed")
        return {
            "message": "User registered successfully. Check your email to verify your account.",
            "user": {"id": response.user.id, "email": response.user.email},
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Supabase registration error: {e}")


def login_user(email: str, password: str) -> dict:
    """
    Log in a user via Supabase Auth and return access/refresh tokens.
    """
    try:
        response = supabase.auth.sign_in_with_password({"email": email, "password": password})
        if not response.session:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        return {
            "access_token": response.session.access_token,
            "refresh_token": response.session.refresh_token,
            "user": {"id": response.user.id, "email": response.user.email},
        }
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Supabase login error: {e}")


def verify_token(access_token: str) -> dict:
    """
    Verify the provided Supabase access token and return user info.
    """
    try:
        user = supabase.auth.get_user(access_token)
        if not user or not user.user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")
        return {
            "id": user.user.id,
            "email": user.user.email,
        }
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=f"Token verification failed: {e}")
