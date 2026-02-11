/**
 * AudioPreview Component
 * Shows selected file info and upload button
 */

import React, { useMemo } from 'react';
import { Button } from '../Common/Button';

/**
 * Formats file size to human readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted size
 */
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Gets file icon based on type
 * @param {string} fileName - File name
 * @returns {React.ReactNode} Icon component
 */
function getFileIcon(fileName) {
  const ext = fileName.toLowerCase().slice(fileName.lastIndexOf('.'));
  
  const iconClass = "w-8 h-8";
  
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className={`${iconClass} text-primary-600`}
      viewBox="0 0 20 20" 
      fill="currentColor"
    >
      <path 
        fillRule="evenodd" 
        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" 
        clipRule="evenodd" 
      />
    </svg>
  );
}

/**
 * Audio preview component
 * @param {Object} props - Component props
 * @param {File} props.file - Selected file
 * @param {Function} props.onUpload - Upload handler
 * @param {Function} props.onRemove - Remove handler
 * @param {boolean} props.isLoading - Loading state
 */
export function AudioPreview({ file, onUpload, onRemove, isLoading }) {
  const fileInfo = useMemo(() => ({
    name: file.name,
    size: formatFileSize(file.size),
    type: file.type || 'audio/unknown'
  }), [file]);

  return (
    <div className="flex flex-col items-center justify-center py-8">
      {/* File card */}
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        {/* File info */}
        <div className="flex items-center gap-4 mb-6">
          {/* Icon */}
          <div className="w-16 h-16 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
            {getFileIcon(fileInfo.name)}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <h4 
              className="text-lg font-semibold text-gray-900 truncate"
              title={fileInfo.name}
            >
              {fileInfo.name}
            </h4>
            <p className="text-sm text-gray-500 mt-1">
              {fileInfo.size}
            </p>
          </div>
        </div>

        {/* Audio preview */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Vista previa:
          </p>
          <audio 
            controls 
            className="w-full"
            src={URL.createObjectURL(file)}
          >
            Tu navegador no soporta la reproducción de audio.
          </audio>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={onUpload}
            loading={isLoading}
            disabled={isLoading}
            variant="primary"
            className="flex-1"
          >
            {!isLoading && (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-5 h-5 mr-2" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" 
                  clipRule="evenodd" 
                />
              </svg>
            )}
            Procesar Audio
          </Button>

          <Button
            onClick={onRemove}
            disabled={isLoading}
            variant="secondary"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-5 h-5 mr-2" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
            Cancelar
          </Button>
        </div>
      </div>

      {/* Info text */}
      <p className="mt-4 text-sm text-gray-500 text-center">
        Al procesar, el audio será transcrito y analizado con IA
      </p>
    </div>
  );
}
