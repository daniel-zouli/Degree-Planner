'use client';

import { useState } from 'react';
import ScheduleBuilder from '@/components/ScheduleBuilder';
import CourseSearcher from '@/components/CourseSearcher';
import ProgressPopup from '@/components/ProgressPopup';
import { Degree, ScheduledSemester, Course } from '@/types';
import { calculateProgress } from '@/utils/progress';
import { faculties } from '@/data/faculties';
import { BarChart3 } from 'lucide-react';

export default function Home() {
  const [selectedFacultyId, setSelectedFacultyId] = useState<string | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<Degree | null>(null);
  const [semesters, setSemesters] = useState<ScheduledSemester[]>([]);
  const [showProgressPopup, setShowProgressPopup] = useState(false);
  const [activeSemesterId, setActiveSemesterId] = useState<string | null>(null);

  const selectedFaculty = selectedFacultyId 
    ? faculties.find(f => f.id === selectedFacultyId)
    : null;

  const handleFacultyChange = (facultyId: string) => {
    setSelectedFacultyId(facultyId);
    setSelectedProgram(null);
    setSemesters([]);
    setActiveSemesterId(null);
  };

  const handleProgramChange = (programId: string) => {
    if (!selectedFacultyId) return;
    const program = selectedFaculty?.programs.find(p => p.id === programId);
    setSelectedProgram(program || null);
    setSemesters([]);
    setActiveSemesterId(null);
  };

  const handleAddCourse = (semesterId: string, course: Course) => {
    const updatedSemesters = semesters.map(sem => {
      if (sem.id === semesterId) {
        // Check if course already exists
        if (sem.courses.some(c => c.code === course.code)) {
          return sem;
        }
        return {
          ...sem,
          courses: [...sem.courses, course],
        };
      }
      return sem;
    });
    setSemesters(updatedSemesters);
  };

  const progress = selectedProgram
    ? calculateProgress(selectedProgram, semesters)
    : null;

  return (
    <main className="min-h-screen bg-white">
      {/* Header - Full Width */}
      <div className="bg-ubc-blue text-white shadow-lg w-full">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold mb-2">UBC Schedule Creator</h1>
          <p className="text-ubc-gold-light">
            Build your course schedule and track your degree progress
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Degree Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Your Degree</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {/* Faculty Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Faculty
              </label>
              <select
                value={selectedFacultyId || ''}
                onChange={(e) => handleFacultyChange(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-ubc-blue focus:border-ubc-blue text-black bg-white"
              >
                <option value="">Select Faculty</option>
                {faculties.map((faculty) => (
                  <option key={faculty.id} value={faculty.id}>
                    {faculty.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Program Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Program
              </label>
              <select
                value={selectedProgram?.id || ''}
                onChange={(e) => handleProgramChange(e.target.value)}
                disabled={!selectedFacultyId}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-ubc-blue focus:border-ubc-blue text-black bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">Select Program</option>
                {selectedFaculty?.programs.map((program) => (
                  <option key={program.id} value={program.id}>
                    {program.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedProgram && (
            <div className="mb-4">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Selected:</span> {selectedProgram.description} - {selectedProgram.name}
              </p>
            </div>
          )}
        </div>

        {/* Divider */}
        {selectedProgram && <div className="border-t border-gray-500 my-8"></div>}

        {/* Main Content */}
        {selectedProgram && (
          <>
            {/* Action Bar */}
            <div className="mb-6 flex justify-end">
              {progress && (
                <button
                  onClick={() => setShowProgressPopup(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-ubc-blue text-white rounded-lg hover:bg-ubc-blue-dark transition-colors font-semibold shadow-md"
                >
                  <BarChart3 className="w-5 h-5" />
                  <span>View Progress</span>
                </button>
              )}
            </div>

            {/* Two-column layout */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left: Schedule Builder */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <ScheduleBuilder
                  semesters={semesters}
                  onSemestersChange={setSemesters}
                  degree={selectedProgram}
                  activeSemesterId={activeSemesterId}
                  onActiveSemesterChange={setActiveSemesterId}
                />
              </div>

              {/* Right: Course Searcher */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <CourseSearcher
                  degree={selectedProgram}
                  activeSemesterId={activeSemesterId}
                  onAddCourse={handleAddCourse}
                />
              </div>
            </div>

            {/* Progress Popup */}
            {progress && (
              <ProgressPopup
                progress={progress}
                isOpen={showProgressPopup}
                onClose={() => setShowProgressPopup(false)}
              />
            )}
          </>
        )}

        {!selectedProgram && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Please select a faculty and program above to start building your schedule
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
