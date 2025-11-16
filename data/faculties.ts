import { Degree } from '@/types';

export interface Faculty {
  id: string;
  name: string;
  programs: Degree[];
}

export const faculties: Faculty[] = [
  {
    id: 'science',
    name: 'Science',
    programs: [],
  },
  {
    id: 'arts',
    name: 'Arts',
    programs: [
      {
        id: 'econ',
        name: 'Economics',
        faculty: 'Arts',
        totalCredits: 120,
        description: 'Bachelor of Arts',
        requirements: [],
      },
    ],
  },
];

export const getFacultyById = (id: string): Faculty | undefined => {
  return faculties.find(f => f.id === id);
};

export const getProgramById = (facultyId: string, programId: string): Degree | undefined => {
  const faculty = getFacultyById(facultyId);
  return faculty?.programs.find(p => p.id === programId);
};
