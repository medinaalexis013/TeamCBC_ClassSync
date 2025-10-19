from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from app.auth import routes as auth_routes
from app.auth.models import Base
from app.database import engine
from app.auth.dependencies import get_current_user

app = FastAPI(title="TeamCBC Backend API")

# Allow frontend access (CORS)
origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables when app starts
@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)

# Include authentication routes
app.include_router(auth_routes.router)

# Example protected route
@app.get("/protected")
def protected_route(current_user=Depends(get_current_user)):
    return {"message": f"Welcome, {current_user.email}! You have access."}

# Root endpoint for health check
@app.get("/")
def root():
    return {"message": "Hello from FastAPI!"}
