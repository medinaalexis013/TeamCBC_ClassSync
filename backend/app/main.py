from fastapi import FastAPI
from app.auth import routes as auth_routes
from app.auth.models import Base
from app.database import engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="TeamCBC Backend API")

app.include_router(auth_routes.router)
