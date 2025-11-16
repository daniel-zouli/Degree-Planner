export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  description?: string;
  prerequisites?: string[];
  corequisites?: string[];
  yearLevel?: number;
  term?: 'fall' | 'winter' | 'summer' | 'any';
  category?: 'required' | 'elective' | 'breadth';
}

export interface DegreeRequirement {
  id: string;
  name: string;
  type: 'required' | 'elective' | 'breadth';
  credits: number;
  courses: string[];
  description?: string;
}

export interface Degree {
  id: string;
  name: string;
  faculty: string;
  totalCredits: number;
  requirements: DegreeRequirement[];
  description?: string;
}

export interface ScheduledSemester {
  id: string;
  term: string;
  year: number;
  termType: 'fall' | 'winter' | 'summer';
  courses: Course[];
}

export interface DegreeProgress {
  totalCredits: number;
  completedCredits: number;
  overallProgress: number;
}
