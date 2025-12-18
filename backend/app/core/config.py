from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False
    )

    mongodb_url: str = "mongodb://localhost:27017"
    database_name: str = "university_catalog"
    anthropic_api_key: str = ""
    context7_api_key: str = ""
    context7_base_url: str = "https://api.context7.io"

    app_title: str = "University Aggregator API"
    app_version: str = "1.0.0"
    app_description: str = "Backend API for University Catalog with AI-powered recommendations"


settings = Settings()
