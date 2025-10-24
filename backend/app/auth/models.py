from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
import uuid

Base = declarative_base()

class Profile(Base):
    """
    Represents additional user information for a Supabase-authenticated user.
    Links to Supabase's built-in auth.users table via UUID.
    """
    __tablename__ = "profiles"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), unique=True, nullable=False)  # Matches Supabase auth.users.id
    email = Column(String, unique=True, index=True, nullable=False)
    role = Column(String, default="user")
    full_name = Column(String, nullable=True)
    major = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    is_active = Column(Boolean, default=True)

