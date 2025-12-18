/**
 * API Types
 * Type definitions matching the backend API structure
 */

// University Requirement (from backend)
export interface UniversityRequirement {
  specialty_id: string;
  specialty_name: string;
  minimum_score: number;
  exams: string[];
  additional_requirements?: string;
}

// University (from backend API)
export interface University {
  _id: string; // MongoDB ObjectId as string
  name: string;
  country: string;
  city: string;
  description?: string;
  website?: string;
  ranking?: number;
  specialties: string[]; // Array of specialty IDs
  specialty_names: string[]; // Array of specialty names
  requirements: UniversityRequirement[];
  tuition_fee_usd?: number;
  student_count?: number;
  acceptance_rate?: number;
  logo?: string; // Optional logo URL
}

// Specialty (from backend API)
export interface Specialty {
  _id: string; // MongoDB ObjectId as string
  name: string;
  description?: string;
  category?: string;
}

// Paginated Response
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

// University Filters (for API queries)
export interface UniversityFilters {
  page?: number;
  page_size?: number;
  country?: string;
  specialty?: string;
  min_score?: number;
  sort_by?: 'name' | 'ranking' | 'tuition_fee' | 'acceptance_rate';
  sort_order?: 'asc' | 'desc';
}

// API Error Response
export interface ApiError {
  message: string;
  detail?: string;
  status?: number;
}

// AI Recommendation Request
export interface RecommendationRequest {
  session_id: string;
  query: string;
  user_score?: number;
  preferred_country?: string;
  preferred_specialty?: string;
}

// AI Comparison Request
export interface ComparisonRequest {
  session_id: string;
  university_names: string[];
  comparison_criteria?: string[];
}

// Add Specialty Request
export interface AddSpecialtyRequest {
  specialty_id: string;
  specialty_name: string;
  minimum_score: number;
  exams: string[];
  additional_requirements?: string;
}
