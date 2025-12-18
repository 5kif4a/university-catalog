from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False
    )

    mongodb_url: str = "mongodb://localhost:27017"
    database_name: str = "university_catalog"
    openai_api_key: str = ""

    app_title: str = "University Aggregator API"
    app_version: str = "1.0.0"
    app_description: str = "Backend API for University Catalog with AI-powered recommendations"


settings = Settings()
