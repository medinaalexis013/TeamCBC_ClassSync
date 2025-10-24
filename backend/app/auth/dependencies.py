from fastapi import Depends, HTTPException, Header, status
from app.auth.utils import supabase

def get_current_user(Authorization: str = Header(...)):
    """
    Extracts the Supabase access token from the Authorization header,
    verifies it with Supabase, and returns the authenticated user.
    """
    if not Authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or invalid Authorization header"
        )

    token = Authorization.split(" ")[1]
    try:
        user = supabase.auth.get_user(token)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired token"
            )
        return user.user
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(e))
