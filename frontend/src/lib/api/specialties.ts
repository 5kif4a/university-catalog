/**
 * Specialties API Service
 * API calls for specialty-related operations
 */

import apiClient from './client';
import type { Specialty } from '@/types/api';

/**
 * Get all specialties
 */
export async function getSpecialties(params?: { skip?: number; limit?: number }): Promise<Specialty[]> {
  const { data } = await apiClient.get<Specialty[]>('/specialties/', { params });
  return data;
}

/**
 * Get a single specialty by ID
 */
export async function getSpecialty(id: string): Promise<Specialty> {
  const { data } = await apiClient.get<Specialty>(`/specialties/${id}`);
  return data;
}

/**
 * Search specialties by query
 */
export async function searchSpecialties(query: string): Promise<Specialty[]> {
  const { data } = await apiClient.get<Specialty[]>('/specialties/search', {
    params: { query },
  });
  return data;
}

/**
 * Create a new specialty
 */
export async function createSpecialty(specialty: Partial<Specialty>): Promise<Specialty> {
  const { data } = await apiClient.post<Specialty>('/specialties/', specialty);
  return data;
}

/**
 * Update an existing specialty
 */
export async function updateSpecialty(id: string, specialty: Partial<Specialty>): Promise<Specialty> {
  const { data} = await apiClient.put<Specialty>(`/specialties/${id}`, specialty);
  return data;
}

/**
 * Delete a specialty
 */
export async function deleteSpecialty(id: string): Promise<void> {
  await apiClient.delete(`/specialties/${id}`);
}
