const API_URL = process.env.API_URL || 'http://localhost:8000';

/**
 * Get paginated list of universities
 */
export async function getUniversities(page?: number): Promise<any | null> {
  const url = new URL('/api/universities/', API_URL);
  if (page !== undefined) {
    url.searchParams.append('page', page.toString());
  }

  const response = await fetch(url.toString());
  if (!response.ok) return null;
  return response.json();
}

/**
 * Get university by ID
 */
export async function getUniversityById(id: string): Promise<any | null> {
  const response = await fetch(`${API_URL}/api/universities/${id}`);
  if (!response.ok) return null;
  return response.json();
}

/**
 * Search universities by query
 */
export async function searchUniversities(query: string): Promise<any | null> {
  const url = new URL('/api/universities/search', API_URL);
  url.searchParams.append('query', query);

  const response = await fetch(url.toString());
  if (!response.ok) return null;
  return response.json();
}

/**
 * Get list of specialties
 */
export async function getSpecialties(): Promise<any | null> {
  const response = await fetch(`${API_URL}/api/specialties/`);
  if (!response.ok) return null;
  return response.json();
}

/**
 * Get AI agent health status
 */
export async function aiHealth(): Promise<any | null> {
  const response = await fetch(`${API_URL}/api/ai/health`);
  if (!response.ok) return null;
  return response.json();
}

/**
 * Get AI university recommendations
 */
export async function aiRecommend(payload: any): Promise<any | null> {
  const response = await fetch(`${API_URL}/api/ai/recommend`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) return null;
  return response.json();
}
