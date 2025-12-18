import httpx
from typing import List, Dict, Any, Optional
from app.core.config import settings


class Context7Client:
    """
    Context7 integration for AI memory and context management.
    Acts as a memory layer for the AI agent to store and retrieve conversation context.
    """

    def __init__(self):
        self.base_url = settings.context7_base_url
        self.api_key = settings.context7_api_key
        self.enabled = bool(self.api_key)

    async def store_context(
        self,
        session_id: str,
        context_data: Dict[str, Any],
        tags: Optional[List[str]] = None
    ) -> Dict[str, Any]:
        """
        Store context in Context7 memory layer.
        Used to persist user preferences, search history, and recommendations.
        """
        if not self.enabled:
            return {"stored": False, "reason": "Context7 not configured"}

        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(
                    f"{self.base_url}/v1/context",
                    headers={
                        "Authorization": f"Bearer {self.api_key}",
                        "Content-Type": "application/json"
                    },
                    json={
                        "session_id": session_id,
                        "data": context_data,
                        "tags": tags or [],
                        "timestamp": context_data.get("timestamp")
                    },
                    timeout=10.0
                )
                response.raise_for_status()
                return response.json()
            except Exception as e:
                return {"stored": False, "error": str(e)}

    async def retrieve_context(
        self,
        session_id: str,
        limit: int = 10
    ) -> List[Dict[str, Any]]:
        """
        Retrieve historical context from Context7.
        Enables the AI to remember past interactions and preferences.
        """
        if not self.enabled:
            return []

        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(
                    f"{self.base_url}/v1/context/{session_id}",
                    headers={
                        "Authorization": f"Bearer {self.api_key}"
                    },
                    params={"limit": limit},
                    timeout=10.0
                )
                response.raise_for_status()
                result = response.json()
                return result.get("contexts", [])
            except Exception as e:
                return []

    async def search_context(
        self,
        session_id: str,
        query: str,
        limit: int = 5
    ) -> List[Dict[str, Any]]:
        """
        Semantic search through stored contexts.
        Allows AI to find relevant past interactions.
        """
        if not self.enabled:
            return []

        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(
                    f"{self.base_url}/v1/context/search",
                    headers={
                        "Authorization": f"Bearer {self.api_key}",
                        "Content-Type": "application/json"
                    },
                    json={
                        "session_id": session_id,
                        "query": query,
                        "limit": limit
                    },
                    timeout=10.0
                )
                response.raise_for_status()
                result = response.json()
                return result.get("results", [])
            except Exception as e:
                return []

    async def clear_context(self, session_id: str) -> bool:
        """Clear all context for a session."""
        if not self.enabled:
            return False

        async with httpx.AsyncClient() as client:
            try:
                response = await client.delete(
                    f"{self.base_url}/v1/context/{session_id}",
                    headers={
                        "Authorization": f"Bearer {self.api_key}"
                    },
                    timeout=10.0
                )
                response.raise_for_status()
                return True
            except Exception:
                return False
