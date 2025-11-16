'use client';

import { DegreeProgress } from '@/types';
import { X } from 'lucide-react';

interface ProgressPopupProps {
  progress: DegreeProgress;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProgressPopup({ progress, isOpen, onClose }: ProgressPopupProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />
      
      <div className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Degree Progress</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Close"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Overall Progress</span>
                  <span className="font-semibold">{progress.overallProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-ubc-blue h-4 rounded-full transition-all duration-300"
                    style={{ width: `${progress.overallProgress}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">{progress.completedCredits}</span> / {progress.totalCredits} credits completed
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
