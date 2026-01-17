from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # App
    APP_NAME: str = "AgenticMirror API"
    DEBUG: bool = True

    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8001

    # Security
    SECRET_KEY: str = "agentic-mirror-demo-secret-key-change-in-production"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days

    # Database
    DATABASE_URL: str = "sqlite+aiosqlite:///./agentic_mirror.db"

    # CORS
    CORS_ORIGINS: list[str] = ["http://localhost:3001", "http://127.0.0.1:3001"]

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
