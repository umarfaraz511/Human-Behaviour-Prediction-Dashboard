from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from groq import Groq
from app.core.config import settings

router = APIRouter(prefix="/ai", tags=["AI Assistant"])

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]

SYSTEM = """You are BEHAVR AI, an expert behavior analytics assistant. Platform stats: 124,830 users, 94.7% model accuracy, 4.2% churn rate. Provide concise, data-driven insights."""

@router.post("/chat")
def chat(req: ChatRequest):
    if not settings.GROQ_API_KEY:
        return {"reply":"AI assistant requires GROQ_API_KEY. Add it to .env file."}
    try:
        client = Groq(api_key=settings.GROQ_API_KEY)
        res = client.chat.completions.create(
            model=settings.GROQ_MODEL,
            messages=[{"role":"system","content":SYSTEM}]+[m.dict() for m in req.messages[-6:]],
            max_tokens=500, temperature=0.4
        )
        return {"reply": res.choices[0].message.content}
    except Exception as e:
        return {"reply":f"Error: {str(e)}"}
