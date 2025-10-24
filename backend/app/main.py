from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.auth import routes as auth_routes
from app.database import Base, engine

# Create tables in your Supabase Postgres if they don't exist
Base.metadata.create_all(bind=engine)

app = FastAPI(title="ClassSync Backend API (Supabase)")

# Allow your frontend (add more origins if needed)
origins = [
    "http://localhost:3000",   # local React dev server
    "https://your-frontend-domain.com"  # production domain (once deployed)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount routes
app.include_router(auth_routes.router)

@app.get("/")
def health_check():
    return {"status": "ok", "service": "backend", "database": "supabase"}
