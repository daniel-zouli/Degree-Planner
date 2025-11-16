'use client';

import { useState } from 'react';
import { ScheduledSemester, Degree, DegreeProgress } from '@/types';
import { X, Lightbulb } from 'lucide-react';

interface AIRecommendationsProps {
  semesters: ScheduledSemester[];
  degree: Degree | null;
  progress: DegreeProgress | null;
  onAddSummerSemester?: () => void;
}

interface Recommendation {
  type: 'warning' | 'suggestion' | 'info' | 'action';
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function AIRecommendations({
  semesters,
  degree,
  progress,
  onAddSummerSemester,
}: AIRecommendationsProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (!degree || semesters.length === 0) {
    return null;
  }

  const generateRecommendations = (): Recommendation[] => {
    const recommendations: Recommendation[] = [];

    // Analyze each semester
    const fallWinterSemesters = semesters.filter(
      s => s.termType === 'fall' || s.termType === 'winter'
    );
    const summerSemesters = semesters.filter(s => s.termType === 'summer');
    const fallWinterCount = fallWinterSemesters.length;
    
    // Calculate total scheduled credits
    const totalScheduledCredits = semesters.reduce(
      (sum, sem) => sum + sem.courses.reduce((s, c) => s + c.credits, 0),
      0
    );
    const remainingCredits = degree.totalCredits - totalScheduledCredits;

    // Check for semesters with more than 5 courses
    const heavySemesters = fallWinterSemesters.filter(s => s.courses.length > 5);
    if (heavySemesters.length > 0) {
      heavySemesters.forEach(semester => {
        recommendations.push({
          type: 'warning',
          title: `Heavy Course Load in ${semester.term}`,
          message: `You have ${semester.courses.length} courses scheduled for ${semester.term}. Consider moving some courses to summer sessions to balance your workload and improve your academic performance.`,
          action: {
            label: 'Add Summer Semester',
            onClick: () => {
              if (onAddSummerSemester) {
                onAddSummerSemester();
              }
            },
          },
        });
      });
    }

    // Check for semesters with exactly 4 courses
    const fourCourseSemesters = fallWinterSemesters.filter(s => s.courses.length === 4);
    if (fourCourseSemesters.length > 0 && summerSemesters.length === 0) {
      const avgCreditsPerSemester = fallWinterSemesters.length > 0 ? totalScheduledCredits / fallWinterSemesters.length : 0;
      const estimatedSemestersNeeded = avgCreditsPerSemester > 0 ? Math.ceil(remainingCredits / avgCreditsPerSemester) : 0;
      
      if (remainingCredits > 12) {
        recommendations.push({
          type: 'suggestion',
          title: 'Consider Summer Courses',
          message: `You're taking 4 courses in ${fourCourseSemesters.map(s => s.term).join(', ')}. With ${remainingCredits} credits remaining, you'll need approximately ${estimatedSemestersNeeded} more fall/winter semesters. Consider adding summer sessions to graduate on time, or plan for an additional year.`,
          action: {
            label: 'Add Summer Semester',
            onClick: () => {
              if (onAddSummerSemester) {
                onAddSummerSemester();
              }
            },
          },
        });
      } else {
        recommendations.push({
          type: 'suggestion',
          title: 'Consider Summer Courses',
          message: `You're taking 4 courses in ${fourCourseSemesters.map(s => s.term).join(', ')}. With only ${remainingCredits} credits remaining, you're close to completion. Consider adding a summer session to finish earlier, or you may need to extend your graduation timeline by an additional year.`,
          action: {
            label: 'Add Summer Semester',
            onClick: () => {
              if (onAddSummerSemester) {
                onAddSummerSemester();
              }
            },
          },
        });
      }
    }

    // Check total credits and progress
    if (progress) {
      if (remainingCredits > 0 && remainingCredits <= 12 && summerSemesters.length === 0) {
        recommendations.push({
          type: 'info',
          title: 'Almost There!',
          message: `You have ${remainingCredits} credits remaining. Consider adding a summer session to complete your degree requirements on time.`,
        });
      }

      // Check if progress is low
      if (progress.overallProgress < 50 && semesters.length >= 3) {
        const avgCreditsPerSemester = progress.completedCredits / semesters.length;
        const remainingSemestersNeeded = Math.ceil((degree.totalCredits - progress.completedCredits) / avgCreditsPerSemester);
        recommendations.push({
          type: 'warning',
          title: 'Progress Alert',
          message: `You've scheduled ${semesters.length} semesters but only completed ${progress.overallProgress}% of your degree requirements. At your current pace, you'll need approximately ${remainingSemestersNeeded} more semesters. Consider adding more courses per semester or planning summer sessions to stay on track.`,
        });
      }

      // Check graduation timeline (inside progress block)
      if (fallWinterCount > 0 && remainingCredits > 0) {
        const avgCreditsPerFallWinter = totalScheduledCredits / fallWinterCount;
        const estimatedYears = Math.ceil(fallWinterCount / 2);
        const creditsPerYear = avgCreditsPerFallWinter * 2;
        
        if (creditsPerYear < 24 && remainingCredits > 0) {
          recommendations.push({
            type: 'suggestion',
            title: 'Graduation Timeline',
            message: `Based on your current schedule, you're averaging ${Math.round(creditsPerYear)} credits per year. To graduate in ${estimatedYears} years, consider taking ${Math.ceil(remainingCredits / Math.max(1, estimatedYears - Math.floor(fallWinterCount / 2)))} more credits per year, or add summer sessions.`,
            action: remainingCredits > 12 && summerSemesters.length === 0 ? {
              label: 'Add Summer Semester',
              onClick: () => {
                if (onAddSummerSemester) {
                  onAddSummerSemester();
                }
              },
            } : undefined,
          });
        }
      }
    }

    // Check for empty semesters
    const emptySemesters = semesters.filter(s => s.courses.length === 0);
    if (emptySemesters.length > 0 && semesters.length > 1) {
      recommendations.push({
        type: 'suggestion',
        title: 'Empty Semesters',
        message: `You have ${emptySemesters.length} semester(s) without courses: ${emptySemesters.map(s => s.term).join(', ')}. Consider removing them or planning courses for those terms to optimize your schedule.`,
      });
    }

    // Check for optimal course distribution
    if (fallWinterSemesters.length >= 2) {
      const courseCounts = fallWinterSemesters.map(s => s.courses.length);
      const minCourses = Math.min(...courseCounts);
      const maxCourses = Math.max(...courseCounts);
      const avgCourses = courseCounts.reduce((a, b) => a + b, 0) / courseCounts.length;
      
      if (maxCourses - minCourses > 2 && avgCourses < 5) {
        recommendations.push({
          type: 'suggestion',
          title: 'Balance Your Course Load',
          message: `Your course load varies significantly across semesters (${minCourses}-${maxCourses} courses). Consider redistributing courses more evenly to balance your workload. Aim for 4-5 courses per fall/winter semester for optimal performance.`,
        });
      }
    }

    // Check if on track for 4-year graduation
    if (fallWinterCount > 0 && remainingCredits > 0) {
      const yearsScheduled = Math.ceil(fallWinterCount / 2);
      const creditsPerYear = totalScheduledCredits / yearsScheduled;
      const yearsNeeded = Math.ceil(degree.totalCredits / creditsPerYear);
      
      if (yearsNeeded > 4 && creditsPerYear < 30) {
        recommendations.push({
          type: 'warning',
          title: 'Graduation Timeline',
          message: `At your current pace of ${Math.round(creditsPerYear)} credits per year, you'll need ${yearsNeeded} years to graduate. To graduate in 4 years, aim for 30+ credits per year or add summer sessions.`,
          action: summerSemesters.length === 0 ? {
            label: 'Add Summer Semester',
            onClick: () => {
              if (onAddSummerSemester) {
                onAddSummerSemester();
              }
            },
          } : undefined,
        });
      } else if (yearsNeeded <= 4 && creditsPerYear >= 30) {
        recommendations.push({
          type: 'info',
          title: 'On Track for 4-Year Graduation',
          message: `Great! You're averaging ${Math.round(creditsPerYear)} credits per year, which puts you on track to graduate in ${yearsNeeded} years. Keep up the good planning!`,
        });
      }
    }

    // General helpful message if no specific recommendations
    if (recommendations.length === 0) {
      recommendations.push({
        type: 'info',
        title: 'Schedule Looking Good!',
        message: 'Your schedule appears well-balanced. Continue adding courses to complete your degree requirements. Remember to check prerequisites and course availability.',
      });
    }

    return recommendations;
  };

  const recommendations = generateRecommendations();

  if (!isOpen || recommendations.length === 0) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-ubc-blue text-white p-3 rounded-full shadow-lg hover:bg-ubc-blue-dark transition-colors z-50"
        title="Show Recommendations"
      >
        <Lightbulb className="w-6 h-6" />
      </button>
    );
  }

  const getTypeStyles = (type: Recommendation['type']) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-900';
      case 'suggestion':
        return 'bg-blue-50 border-blue-200 text-blue-900';
      case 'info':
        return 'bg-green-50 border-green-200 text-green-900';
      case 'action':
        return 'bg-purple-50 border-purple-200 text-purple-900';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-900';
    }
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-2xl border-2 border-ubc-blue z-50 max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-ubc-blue text-white p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            <h3 className="font-bold text-lg">Smart Recommendations</h3>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-ubc-gold-light transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 ${getTypeStyles(rec.type)}`}
            >
              <h4 className="font-semibold mb-2">{rec.title}</h4>
              <p className="text-sm mb-3">{rec.message}</p>
              {rec.action && (
                <button
                  onClick={rec.action.onClick}
                  className="text-sm font-medium underline hover:no-underline"
                >
                  {rec.action.label} →
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

