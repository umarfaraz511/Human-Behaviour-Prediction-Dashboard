from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger
from app.core.config import settings
from app.api.v1.endpoints import analytics, predictions, users, ai_chat

app = FastAPI(
    title=settings.APP_NAME,
    version="1.0.0",
    docs_url="/api/docs",
    redirect_slashes=False,
)

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

app.include_router(analytics.router, prefix="/api/v1")
app.include_router(predictions.router, prefix="/api/v1")
app.include_router(users.router, prefix="/api/v1")
app.include_router(ai_chat.router, prefix="/api/v1")

@app.get("/api/health")
def health(): return {"status":"healthy","service":settings.APP_NAME}
