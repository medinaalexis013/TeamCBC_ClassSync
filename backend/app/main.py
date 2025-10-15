from fastapi import FastAPI
from app.auth import routes as auth_routes
from app.auth.models import Base
from app.database import engine

# create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="TeamCBC Backend API")

# mount routes (note: .router and the closing ')')
app.include_router(auth_routes.router)