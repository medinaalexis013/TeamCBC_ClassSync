# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.test_routes import router as test_router
# (leave your other imports commented out while in migration mode)

app = FastAPI(title="TeamCBC Backend API (Supabase migration mode)")

# Allow your frontend during dev; add more origins as needed
origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount test routes AFTER app is created
app.include_router(test_router, prefix="/test", tags=["test"])

# Keep legacy bits disabled during migration
# from app.auth.models import Base
# from app.database import engine
# @app.on_event("startup")
# def startup():
#     Base.metadata.create_all(bind=engine)
# from app.auth import routes as auth_routes
# app.include_router(auth_routes.router)

@app.get("/")
def health():
    return {"ok": True, "mode": "supabase-migration"}
