from fastapi import FastAPI
from app.auth import routes as auth_routes
from app.auth.models import Base
from app.database import engine
from fastapi import Depends
from app.auth.dependencies import get_current_user


Base.metadata.create_all(bind=engine)

app = FastAPI(title="TeamCBC Backend API")

app.include_router(auth_routes.router)

@app.get("/protected")
def protected_route(current_user=Depends(get_current_user)):
    return {"message": f"Welcome, {current_user.email}! You have access."}

@app.get("/")
def root():
    return {"message": "Hello from FastAPI!"}