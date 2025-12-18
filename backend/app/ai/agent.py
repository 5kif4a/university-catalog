import json
from typing import List, Dict, Any, Optional
from openai import AsyncOpenAI
from app.core.config import settings
from app.services.university_service import UniversityService


class UniversityAIAgent:
    """
    AI Agent for university recommendations and comparisons.
    Uses OpenAI GPT-4 for intelligent responses with simple in-memory session storage.
    """

    def __init__(self):
        self.client = AsyncOpenAI(api_key=settings.openai_api_key)
        self.model = "gpt-4o-mini"
        # Simple in-memory storage for conversation history
        self.sessions: Dict[str, List[Dict[str, Any]]] = {}

    async def recommend_universities(
        self,
        session_id: str,
        user_query: str,
        user_score: Optional[float] = None,
        preferred_country: Optional[str] = None,
        preferred_specialty: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Main recommendation endpoint.
        Provides personalized university recommendations based on user criteria.
        """

        # Retrieve past context from session storage
        past_messages = self.sessions.get(session_id, [])
        context_summary = self._summarize_context(past_messages)

        # Fetch relevant universities from database
        universities, total = await UniversityService.get_all_universities(
            skip=0,
            limit=50,
            country=preferred_country,
            specialty=preferred_specialty,
            min_score=user_score
        )

        # Filter universities based on score if provided
        if user_score:
            filtered_universities = []
            for uni in universities:
                matching_requirements = [
                    req for req in uni.requirements
                    if req.minimum_score <= user_score
                ]
                if matching_requirements:
                    filtered_universities.append(uni)
            universities = filtered_universities[:10]
        else:
            universities = universities[:10]

        # Prepare university data for GPT
        university_data = [
            {
                "name": uni.name,
                "country": uni.country,
                "city": uni.city,
                "ranking": uni.ranking,
                "specialties": uni.specialty_names,
                "requirements": [
                    {
                        "specialty": req.specialty_name,
                        "min_score": req.minimum_score,
                        "exams": req.exams
                    } for req in uni.requirements
                ],
                "tuition_fee_usd": uni.tuition_fee_usd,
                "acceptance_rate": uni.acceptance_rate
            }
            for uni in universities
        ]

        # Build system prompt
        system_prompt = self._build_system_prompt(
            context_summary,
            user_score,
            preferred_country,
            preferred_specialty
        )

        # Prepare messages for OpenAI
        messages = [
            {"role": "system", "content": system_prompt},
        ]

        # Add conversation history (last 5 messages)
        if past_messages:
            messages.extend(past_messages[-5:])

        messages.append({
            "role": "user",
            "content": f"""User query: {user_query}

Available universities:
{json.dumps(university_data, indent=2)}

Please provide:
1. Top 3-5 recommended universities with reasoning
2. Comparison of pros/cons for each
3. Explanation of why these match the user's criteria
4. Any additional advice for the application process"""
        })

        # Call OpenAI for recommendations
        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                max_tokens=2000,
                temperature=0.7
            )

            response_text = response.choices[0].message.content

            # Store interaction in session
            if session_id not in self.sessions:
                self.sessions[session_id] = []

            self.sessions[session_id].append({"role": "user", "content": user_query})
            self.sessions[session_id].append({"role": "assistant", "content": response_text})

            # Keep only last 20 messages to prevent memory issues
            if len(self.sessions[session_id]) > 20:
                self.sessions[session_id] = self.sessions[session_id][-20:]

            return {
                "success": True,
                "recommendations": response_text,
                "universities_analyzed": len(universities),
                "total_universities_available": total,
                "session_id": session_id
            }

        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "universities_analyzed": len(universities)
            }

    async def compare_universities(
        self,
        session_id: str,
        university_names: List[str],
        comparison_criteria: Optional[List[str]] = None
    ) -> Dict[str, Any]:
        """
        Compare specific universities based on given criteria.
        """

        # Fetch universities by name
        all_universities = []
        for name in university_names:
            universities = await UniversityService.search_universities(name)
            if universities:
                all_universities.extend(universities)

        if not all_universities:
            return {
                "success": False,
                "error": "No universities found with the given names"
            }

        # Prepare data
        university_data = [
            {
                "name": uni.name,
                "country": uni.country,
                "city": uni.city,
                "ranking": uni.ranking,
                "specialties": uni.specialty_names,
                "tuition_fee_usd": uni.tuition_fee_usd,
                "acceptance_rate": uni.acceptance_rate,
                "student_count": uni.student_count,
                "requirements": [
                    {
                        "specialty": req.specialty_name,
                        "min_score": req.minimum_score,
                        "exams": req.exams
                    } for req in uni.requirements
                ]
            }
            for uni in all_universities
        ]

        criteria = comparison_criteria or [
            "ranking", "tuition fees", "acceptance rate", "requirements"
        ]

        messages = [
            {"role": "system", "content": "You are a university advisor. Compare universities objectively."},
            {"role": "user", "content": f"""Compare these universities based on: {', '.join(criteria)}

Universities:
{json.dumps(university_data, indent=2)}

Provide:
1. Side-by-side comparison table
2. Key differences
3. Which university is better for specific goals
4. Overall recommendation"""}
        ]

        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                max_tokens=1500,
                temperature=0.7
            )

            response_text = response.choices[0].message.content

            # Store in session
            if session_id not in self.sessions:
                self.sessions[session_id] = []

            self.sessions[session_id].append({
                "role": "user",
                "content": f"Compare: {', '.join(university_names)}"
            })
            self.sessions[session_id].append({"role": "assistant", "content": response_text})

            return {
                "success": True,
                "comparison": response_text,
                "universities_compared": len(all_universities)
            }

        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }

    def _build_system_prompt(
        self,
        context_summary: str,
        user_score: Optional[float],
        preferred_country: Optional[str],
        preferred_specialty: Optional[str]
    ) -> str:
        """Build system prompt with context."""

        base_prompt = """You are an expert university advisor helping students choose the right university.

Your role:
- Analyze universities based on rankings, requirements, costs, and acceptance rates
- Provide personalized recommendations matching user criteria
- Explain pros and cons clearly
- Consider cultural fit, financial aspects, and academic strength

Be concise, practical, and honest about chances of admission."""

        if context_summary:
            base_prompt += f"\n\nPrevious conversation context:\n{context_summary}"

        criteria = []
        if user_score:
            criteria.append(f"User score: {user_score}")
        if preferred_country:
            criteria.append(f"Preferred country: {preferred_country}")
        if preferred_specialty:
            criteria.append(f"Preferred specialty: {preferred_specialty}")

        if criteria:
            base_prompt += "\n\nUser criteria:\n" + "\n".join(criteria)

        return base_prompt

    def _summarize_context(self, messages: List[Dict[str, Any]]) -> str:
        """Summarize past context for the prompt."""
        if not messages:
            return ""

        # Get last 3 user messages for context
        user_messages = [msg for msg in messages if msg.get("role") == "user"][-3:]
        if not user_messages:
            return ""

        summary_parts = [f"- Previous query: {msg['content'][:100]}" for msg in user_messages]
        return "\n".join(summary_parts)


# Singleton instance
ai_agent = UniversityAIAgent()
