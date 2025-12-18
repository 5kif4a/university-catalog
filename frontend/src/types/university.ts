/**
 * University domain types
 */

export interface University {
  id: string;
  name: string;
  country: string;
  city: string;
  description: string;
  logo?: string;
  website: string;
  ranking?: number;
  specialties: string[];
  requirements: UniversityRequirements;
}

export interface UniversityRequirements {
  minScore: number;
  maxScore: number;
  exams: Exam[];
  documents: string[];
  applicationDeadline: string;
  tuitionFee?: {
    min: number;
    max: number;
    currency: string;
  };
}

export interface Exam {
  name: string;
  minScore: number;
  required: boolean;
}

export interface UniversityFilters {
  country?: string;
  specialty?: string;
  minScore?: number;
  maxScore?: number;
}

export type Country = string;
export type Specialty = string;
