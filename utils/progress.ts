import { Degree, DegreeProgress, ScheduledSemester } from '@/types';

export function calculateProgress(
  degree: Degree,
  semesters: ScheduledSemester[]
): DegreeProgress {
  const allCourses = semesters.flatMap(sem => sem.courses);
  const completedCredits = allCourses.reduce((sum, course) => sum + course.credits, 0);
  
  const overallProgress = degree.totalCredits > 0
    ? Math.min(100, (completedCredits / degree.totalCredits) * 100)
    : 0;
  
  return {
    totalCredits: degree.totalCredits,
    completedCredits,
    overallProgress: Math.round(overallProgress),
  };
}
