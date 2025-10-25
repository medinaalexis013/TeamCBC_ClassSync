from pydantic import BaseModel, EmailStr, Field
from typing import Optional

# Request payloads
class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class ChangePassword(BaseModel):
    current_password: str = Field(..., min_length=6)
    new_password: str = Field(..., min_length=8)

# Supabase user object (from supabase.auth.get_user)
class SupabaseUser(BaseModel):
    id: str
    email: EmailStr
    role: Optional[str] = "authenticated"

# Auth responses
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class AuthResponse(BaseModel):
    user: SupabaseUser
    access_token: str
    refresh_token: Optional[str] = None
