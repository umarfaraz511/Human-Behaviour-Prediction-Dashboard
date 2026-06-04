from pydantic_settings import BaseSettings
class Settings(BaseSettings):
    APP_NAME: str = "BEHAVR — Human Behavior Prediction Dashboard"
    DATABASE_URL: str = "sqlite:///./behavr.db"
    GROQ_API_KEY: str = ""
    GROQ_MODEL: str = "llama-3.3-70b-versatile"
    SECRET_KEY: str = "dev-secret-key-change-in-production"
    REDIS_URL: str = "redis://localhost:6379/0"
    class Config:
        env_file = ".env"
        extra = "ignore"
settings = Settings()
