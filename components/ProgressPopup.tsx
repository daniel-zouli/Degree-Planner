'use client';

import { DegreeProgress } from '@/types';
import { X, Check, XCircle } from 'lucide-react';

interface ProgressPopupProps {
  progress: DegreeProgress;
  isOpen: boolean;
  onClose: () => void;
  onTransferCreditToggle?: (requirementId: string, hasTransferCredit: boolean) => void;
  transferCredits?: Set<string>;
}

export default function ProgressPopup({ 
  progress, 
  isOpen, 
  onClose, 
  onTransferCreditToggle,
  transferCredits = new Set()
}: ProgressPopupProps) {
  if (!isOpen) return null;

  const isTransferCreditEligible = (requirementId: string) => {
    return requirementId === 'laboratory-science' || 
           requirementId === 'foundational-biology' || 
           requirementId === 'foundational-chemistry' || 
           requirementId === 'foundational-physics';
  };

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

          {/* Requirements List */}
          {progress.requirements && progress.requirements.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h3>
              <div className="space-y-4">
                {progress.requirements.map((req) => {
                  const hasTransferCredit = transferCredits.has(req.requirementId);
                  const isCompleted = req.isCompleted || hasTransferCredit;
                  const showTransferCheckbox = isTransferCreditEligible(req.requirementId);
                  
                  return (
                    <div key={req.requirementId} className="border border-gray-200 rounded-lg p-4">
                      {req.isSingleCourse ? (
                        // Single course requirement - show checkbox
                        <div className="flex items-center gap-3">
                          {isCompleted ? (
                            <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                          ) : (
                            <XCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <div className={`font-medium ${isCompleted ? 'text-green-700' : 'text-gray-900'}`}>
                              {req.requirementName}
                            </div>
                            {req.requiredCredits > 0 && (
                              <div className="text-sm text-gray-600">
                                {req.requiredCredits} credit{req.requiredCredits !== 1 ? 's' : ''}
                              </div>
                            )}
                          </div>
                          {showTransferCheckbox && onTransferCreditToggle && (
                            <div className="flex items-center gap-2">
                              <label className="text-xs text-gray-600">Transfer Credit:</label>
                              <input
                                type="checkbox"
                                checked={hasTransferCredit}
                                onChange={(e) => onTransferCreditToggle(req.requirementId, e.target.checked)}
                                className="w-4 h-4 text-ubc-blue border-gray-300 rounded focus:ring-ubc-blue"
                              />
                            </div>
                          )}
                        </div>
                      ) : (
                      // Credit-based requirement - show progress bar
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium text-gray-900">{req.requirementName}</div>
                          {req.requiredCredits > 0 && (
                            <div className="text-sm text-gray-600">
                              {req.completedCredits} / {req.requiredCredits} credits
                            </div>
                          )}
                        </div>
                        {req.requiredCredits > 0 ? (
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${
                                req.isCompleted ? 'bg-green-600' : 'bg-ubc-blue'
                              }`}
                              style={{ 
                                width: `${Math.min(100, (req.completedCredits / req.requiredCredits) * 100)}%` 
                              }}
                            />
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500 italic">
                            {req.isCompleted ? '✓ Completed' : 'Not completed'}
                          </div>
                        )}
                      </div>
                    )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
