/**
 * UploadProgress Component
 * Shows upload progress bar
 */

import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Upload progress component
 * @param {Object} props - Component props
 * @param {number} props.progress - Upload progress (0-100)
 * @param {string} props.fileName - Name of the file being uploaded
 * @param {string} [props.stage='uploading'] - Current stage (uploading, processing)
 */
export function UploadProgress({ progress, fileName, stage = 'uploading' }) {
  const { t } = useTranslation('upload');

  const stageText = stage === 'uploading' 
    ? t('progress.uploading') 
    : t('progress.processing');

  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Icon */}
      <div className="relative mb-6">
        <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-10 h-10 text-primary-600 animate-pulse" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
        
        {/* Progress ring */}
        <svg 
          className="absolute inset-0 w-20 h-20 -rotate-90"
          viewBox="0 0 80 80"
        >
          <circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke="#e0e7ff"
            strokeWidth="4"
          />
          <circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke="#6366f1"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 36}`}
            strokeDashoffset={`${2 * Math.PI * 36 * (1 - progress / 100)}`}
            className="transition-all duration-300"
          />
        </svg>
      </div>

      {/* Status text */}
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        {stageText}
      </h3>
      
      {fileName && (
        <p 
          className="text-sm text-gray-500 mb-4 max-w-xs truncate"
          title={fileName}
        >
          {fileName}
        </p>
      )}

      {/* Progress bar */}
      <div className="w-full max-w-xs progress-bar mb-2">
        <div 
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Percentage */}
      <p className="text-sm font-medium text-gray-600">
        {Math.round(progress)}%
      </p>

      {/* Warning for large files */}
      {progress < 100 && progress > 50 && (
        <p className="mt-4 text-xs text-gray-400 text-center max-w-xs">
          {t('progress.largeFileWarning')}
        </p>
      )}
    </div>
  );
}
