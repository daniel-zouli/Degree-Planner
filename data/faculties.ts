import { Degree, DegreeRequirement } from '@/types';

export interface Faculty {
  id: string;
  name: string;
  programs: Degree[];
  requirements?: DegreeRequirement[];
}

export const faculties: Faculty[] = [
  {
    id: 'science',
    name: 'Science',
    programs: [
      {
        id: 'computer-science',
        name: 'Computer Science',
        faculty: 'Science',
        totalCredits: 120,
        description: 'Bachelor of Science',
        requirements: [
          {
            id: 'cpsc-110',
            name: 'CPSC 110 (or 103 and 107)',
            type: 'required',
            credits: 4,
            courses: ['CPSC 110', 'CPSC 103', 'CPSC 107'],
            description: 'CPSC 110 or both CPSC 103 and CPSC 107'
          },
          {
            id: 'cpsc-121',
            name: 'CPSC 121',
            type: 'required',
            credits: 4,
            courses: ['CPSC 121'],
            description: 'Models of Computation'
          },
          {
            id: 'math-100-level',
            name: 'One of MATH 100, 102, 104, 110, 120, 180, or 184',
            type: 'required',
            credits: 3,
            courses: ['MATH 100', 'MATH 102', 'MATH 104', 'MATH 110', 'MATH 120', 'MATH 180', 'MATH 184'],
            description: 'First year calculus'
          },
          {
            id: 'math-101-level',
            name: 'One of MATH 101, 103, 105, or 121',
            type: 'required',
            credits: 3,
            courses: ['MATH 101', 'MATH 103', 'MATH 105', 'MATH 121'],
            description: 'First year calculus continuation'
          },
          {
            id: 'cpsc-210',
            name: 'CPSC 210',
            type: 'required',
            credits: 4,
            courses: ['CPSC 210'],
            description: 'Software Construction'
          },
          {
            id: 'cpsc-213',
            name: 'CPSC 213',
            type: 'required',
            credits: 4,
            courses: ['CPSC 213'],
            description: 'Introduction to Computer Systems'
          },
          {
            id: 'cpsc-221',
            name: 'CPSC 221',
            type: 'required',
            credits: 4,
            courses: ['CPSC 221'],
            description: 'Basic Algorithms and Data Structures'
          },
          {
            id: 'math-200',
            name: 'MATH 200',
            type: 'required',
            credits: 3,
            courses: ['MATH 200'],
            description: 'Calculus III'
          },
          {
            id: 'math-221',
            name: 'MATH 221',
            type: 'required',
            credits: 3,
            courses: ['MATH 221'],
            description: 'Matrix Algebra'
          },
          {
            id: 'stat-241-251',
            name: 'STAT 241 or 251 (or STAT 200 or 201 and MATH/STAT 302)',
            type: 'required',
            credits: 3,
            courses: ['STAT 241', 'STAT 251', 'STAT 200', 'STAT 201', 'MATH 302', 'STAT 302'],
            description: 'Statistics requirement'
          },
          {
            id: 'cpsc-310',
            name: 'CPSC 310',
            type: 'required',
            credits: 4,
            courses: ['CPSC 310'],
            description: 'Introduction to Software Engineering'
          },
          {
            id: 'cpsc-320',
            name: 'CPSC 320',
            type: 'required',
            credits: 3,
            courses: ['CPSC 320'],
            description: 'Intermediate Algorithm Design and Analysis'
          },
          {
            id: 'cpsc-300-level',
            name: '9 Credits of CPSC Courses Numbered 300 or Higher',
            type: 'required',
            credits: 9,
            courses: [],
            description: '9 credits from CPSC courses at 300-level or higher'
          },
          {
            id: 'cpsc-400-level',
            name: '6 Credits of 400 Level CPSC Courses',
            type: 'required',
            credits: 6,
            courses: [],
            description: '6 credits from CPSC courses at 400-level'
          },
          {
            id: 'cpsc-400-lecture',
            name: '3 Credits of 400 Level CPSC Lecture Based Courses',
            type: 'required',
            credits: 3,
            courses: [],
            description: '3 credits from 400-level CPSC lecture-based courses'
          }
        ]
      }
    ],
    requirements: [
      {
        id: 'upper-level-credits',
        name: '48 Upper Level Credits',
        type: 'required',
        credits: 48,
        courses: [],
        description: '48 credits at the 300-400 level'
      },
      {
        id: 'science-credits',
        name: '72 Science Credits',
        type: 'required',
        credits: 72,
        courses: [],
        description: '72 credits in Science courses'
      },
      {
        id: 'upper-level-science',
        name: '30 Upper Level Science Credits',
        type: 'required',
        credits: 30,
        courses: [],
        description: '30 credits in upper-level Science courses'
      },
      {
        id: 'arts-requirement',
        name: '12 Credits Arts Requirement',
        type: 'breadth',
        credits: 12,
        courses: [],
        description: '12 credits in Arts courses'
      },
      {
        id: 'science-breadth',
        name: 'Science Breadth Requirement',
        type: 'breadth',
        credits: 0,
        courses: [],
        description: 'Science breadth requirement - must satisfy at least 6 of 7 categories: Mathematics (all MATH_V courses except MATH_V 302), Chemistry (all CHEM_V courses except CHEM_V 100, CHEM_V 300), Physics (all PHYS_V courses except PHYS_V 100), Life Science (all BIOL_V courses except BIOL_V 140, BIOL_V 300; all BIOC_V, PSYC_V courses numbered 60-89, and MICB_V courses and GEOS_V/GEOB_V 207), Statistics (BIOL_V 300, DSCI_V 100, MATH_V 302, all STAT_V courses), Computer Science (all CPSC_V courses), Earth & Planetary Science (all ASTR_V, ATSC_V, ENVR_V, EOSC_V, GEOS_V/GEOB_V courses except EOSC_V 111 and GEOS_V/GEOB_V 207)'
      },
      {
        id: 'communication-scie113',
        name: 'Communication Requirement - SCIE 113',
        type: 'required',
        credits: 3,
        courses: ['SCIE 113'],
        description: 'Communication requirement'
      },
      {
        id: 'additional-communication',
        name: 'Additional Communication Requirement',
        type: 'required',
        credits: 3,
        courses: ['WRDS 150', 'ENGL 110', 'ENGL 111', 'SCIE 300', 'CHEM 300', 'ENVR 200', 'ARTS 001', 'ASTU 100', 'ENGL 100'],
        description: '3 credits from approved communication courses: WRDS 150, ENGL 110 or 111, SCIE 300, CHEM 300, ENVR 200, ARTS 001, ASTU 100, or ENGL 100'
      },
      {
        id: 'laboratory-science',
        name: 'Laboratory Science Requirement',
        type: 'required',
        credits: 0,
        courses: ['ASTR 101', 'ASTR 102', 'BIOL 140', 'CHEM 111', 'CHEM 115', 'CHEM 121', 'CHEM 123', 'CHEM 135', 'EOSC 111', 'PHYS 101', 'PHYS 107', 'PHYS 109', 'PHYS 119', 'PHYS 159', 'SCIE 001'],
        description: 'One course from approved laboratory science courses: ASTR 101, ASTR 102, BIOL 140, CHEM 111, CHEM 115, CHEM 121, CHEM 123, CHEM 135, EOSC 111, PHYS 101, PHYS 107, PHYS 109, PHYS 119, PHYS 159, or SCIE 001'
      },
      {
        id: 'foundational-biology',
        name: 'Foundational Requirement - Biology',
        type: 'required',
        credits: 3,
        courses: ['BIOL 111', 'BIOL 112', 'BIOL 121', 'BIOL 140'],
        description: '3 credits of 100-level BIOL (usually BIOL 111). Required for students without Biology 11 or 12 credit.'
      },
      {
        id: 'foundational-chemistry',
        name: 'Foundational Requirement - Chemistry',
        type: 'required',
        credits: 3,
        courses: ['CHEM 100', 'CHEM 110', 'CHEM 111', 'CHEM 115', 'CHEM 121', 'CHEM 123', 'CHEM 135'],
        description: '3 credits of 100-level CHEM (usually CHEM 100, CHEM 110 or CHEM 111). Required for students without Chemistry 12 credit.'
      },
      {
        id: 'foundational-physics',
        name: 'Foundation Requirement - Physics',
        type: 'required',
        credits: 3,
        courses: ['PHYS 100', 'PHYS 101', 'PHYS 106', 'PHYS 107', 'PHYS 108', 'PHYS 109', 'PHYS 117', 'PHYS 118', 'PHYS 119', 'PHYS 131', 'PHYS 153', 'PHYS 157', 'PHYS 158', 'PHYS 159'],
        description: '3 credits of 100-level PHYS (usually PHYS 100). Required for students without Physics 12 credit.'
      }
    ]
  },
  {
    id: 'arts',
    name: 'Arts',
    programs: [
      {
        id: 'economics',
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
