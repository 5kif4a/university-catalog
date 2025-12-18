import type { University } from '@/types/university';

/**
 * Mock university data for development
 */

export const mockUniversities: University[] = [
  {
    id: '1',
    name: 'Stanford University',
    country: 'USA',
    city: 'Stanford, California',
    description: 'Stanford University is a private research university known for its academic strength, wealth, proximity to Silicon Valley, and ranking as one of the world\'s top universities.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Seal_of_Leland_Stanford_Junior_University.svg/200px-Seal_of_Leland_Stanford_Junior_University.svg.png',
    website: 'https://www.stanford.edu',
    ranking: 3,
    specialties: ['Computer Science', 'Engineering', 'Business', 'Medicine'],
    requirements: {
      minScore: 1450,
      maxScore: 1600,
      exams: [
        { name: 'SAT', minScore: 1450, required: true },
        { name: 'TOEFL', minScore: 100, required: true },
      ],
      documents: ['Transcript', 'Essays', 'Letters of Recommendation', 'Test Scores'],
      applicationDeadline: '2024-01-05',
      tuitionFee: {
        min: 55000,
        max: 60000,
        currency: 'USD',
      },
    },
  },
  {
    id: '2',
    name: 'Massachusetts Institute of Technology',
    country: 'USA',
    city: 'Cambridge, Massachusetts',
    description: 'MIT is a private research university known for its innovation and excellence in science, technology, and engineering education.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/200px-MIT_logo.svg.png',
    website: 'https://www.mit.edu',
    ranking: 1,
    specialties: ['Computer Science', 'Engineering', 'Physics', 'Mathematics'],
    requirements: {
      minScore: 1500,
      maxScore: 1600,
      exams: [
        { name: 'SAT', minScore: 1500, required: true },
        { name: 'TOEFL', minScore: 90, required: true },
      ],
      documents: ['Transcript', 'Essays', 'Letters of Recommendation', 'Test Scores'],
      applicationDeadline: '2024-01-01',
      tuitionFee: {
        min: 53000,
        max: 58000,
        currency: 'USD',
      },
    },
  },
  {
    id: '3',
    name: 'University of Oxford',
    country: 'UK',
    city: 'Oxford',
    description: 'The University of Oxford is a collegiate research university and the oldest university in the English-speaking world.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Oxford-University-Circlet.svg/200px-Oxford-University-Circlet.svg.png',
    website: 'https://www.ox.ac.uk',
    ranking: 2,
    specialties: ['Law', 'Medicine', 'Philosophy', 'History'],
    requirements: {
      minScore: 38,
      maxScore: 45,
      exams: [
        { name: 'IB', minScore: 38, required: true },
        { name: 'IELTS', minScore: 7.0, required: true },
      ],
      documents: ['Transcript', 'Personal Statement', 'Letters of Recommendation'],
      applicationDeadline: '2024-10-15',
      tuitionFee: {
        min: 9000,
        max: 30000,
        currency: 'GBP',
      },
    },
  },
  {
    id: '4',
    name: 'ETH Zurich',
    country: 'Switzerland',
    city: 'Zurich',
    description: 'ETH Zurich is a public research university known for its engineering, technology, mathematics, and natural sciences programs.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/ETH_Z%C3%BCrich_Logo_black.svg/200px-ETH_Z%C3%BCrich_Logo_black.svg.png',
    website: 'https://ethz.ch',
    ranking: 7,
    specialties: ['Engineering', 'Computer Science', 'Physics', 'Mathematics'],
    requirements: {
      minScore: 85,
      maxScore: 100,
      exams: [
        { name: 'High School Diploma', minScore: 85, required: true },
        { name: 'IELTS', minScore: 6.5, required: true },
      ],
      documents: ['Transcript', 'Language Certificate', 'CV'],
      applicationDeadline: '2024-04-30',
      tuitionFee: {
        min: 730,
        max: 1500,
        currency: 'CHF',
      },
    },
  },
  {
    id: '5',
    name: 'University of Tokyo',
    country: 'Japan',
    city: 'Tokyo',
    description: 'The University of Tokyo is Japan\'s leading research university and one of Asia\'s top universities.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/University_of_Tokyo_logo.svg/200px-University_of_Tokyo_logo.svg.png',
    website: 'https://www.u-tokyo.ac.jp',
    ranking: 23,
    specialties: ['Engineering', 'Science', 'Medicine', 'Economics'],
    requirements: {
      minScore: 650,
      maxScore: 800,
      exams: [
        { name: 'EJU', minScore: 650, required: true },
        { name: 'JLPT N1', minScore: 0, required: true },
      ],
      documents: ['Transcript', 'Entrance Exam', 'Language Certificate'],
      applicationDeadline: '2024-02-28',
      tuitionFee: {
        min: 535800,
        max: 535800,
        currency: 'JPY',
      },
    },
  },
  {
    id: '6',
    name: 'National University of Singapore',
    country: 'Singapore',
    city: 'Singapore',
    description: 'NUS is Singapore\'s flagship university offering a global approach to education and research.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/National_University_of_Singapore_arms.svg/200px-National_University_of_Singapore_arms.svg.png',
    website: 'https://www.nus.edu.sg',
    ranking: 11,
    specialties: ['Computer Science', 'Engineering', 'Business', 'Law'],
    requirements: {
      minScore: 1400,
      maxScore: 1600,
      exams: [
        { name: 'SAT', minScore: 1400, required: false },
        { name: 'IELTS', minScore: 6.5, required: true },
      ],
      documents: ['Transcript', 'Personal Statement', 'Test Scores'],
      applicationDeadline: '2024-02-29',
      tuitionFee: {
        min: 17000,
        max: 35000,
        currency: 'SGD',
      },
    },
  },
];

export const countries = Array.from(new Set(mockUniversities.map(u => u.country))).sort();
export const specialties = Array.from(
  new Set(mockUniversities.flatMap(u => u.specialties))
).sort();
