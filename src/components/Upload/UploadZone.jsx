/**
 * UploadZone Component
 * Drag & drop zone for audio file upload
 */

import React, { useCallback, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

// Maximum file size in MB
const MAX_FILE_SIZE_MB = 25;

// Allowed file types
const ALLOWED_TYPES = [
  'audio/mpeg',
  'audio/wav',
  'audio/x-wav',
  'audio/mp4',
  'audio/x-m4a',
  'audio/ogg',
  'audio/webm'
];

const ALLOWED_EXTENSIONS = ['.mp3', '.wav', '.m4a', '.ogg', '.webm'];

/**
 * Upload zone component
 * @param {Object} props - Component props
 * @param {Function} props.onFileSelect - File select handler
 * @param {boolean} props.isLoading - Loading state
 */
export function UploadZone({ onFileSelect, isLoading }) {
  const { t } = useTranslation('upload');
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  /**
   * Validates selected file
   * @param {File} file - File to validate
   * @returns {boolean} True if valid
   */
  const validateFile = useCallback((file) => {
    setError(null);

    // Check if file exists
    if (!file) {
      setError(t('errors.noFile'));
      return false;
    }

    // Check file type
    const isValidType = ALLOWED_TYPES.includes(file.type) || 
      ALLOWED_EXTENSIONS.some(ext => 
        file.name.toLowerCase().endsWith(ext)
      );

    if (!isValidType) {
      setError(t('errors.invalidFormat'));
      return false;
    }

    // Check file size
    const maxBytes = MAX_FILE_SIZE_MB * 1024 * 1024;
    if (file.size > maxBytes) {
      setError(t('errors.fileTooLarge', { size: MAX_FILE_SIZE_MB }));
      return false;
    }

    return true;
  }, [t]);

  /**
   * Handles file selection
   * @param {FileList} files - Selected files
   */
  const handleFiles = useCallback((files) => {
    if (files.length === 0) return;

    const file = files[0];
    if (validateFile(file)) {
      onFileSelect(file);
    }
  }, [onFileSelect, validateFile]);

  /**
   * Handles drag enter event
   * @param {DragEvent} e - Drag event
   */
  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }, []);

  /**
   * Handles drag leave event
   * @param {DragEvent} e - Drag event
   */
  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  }, []);

  /**
   * Handles drag over event
   * @param {DragEvent} e - Drag event
   */
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  /**
   * Handles drop event
   * @param {DragEvent} e - Drop event
   */
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const { files } = e.dataTransfer;
    handleFiles(files);
  }, [handleFiles]);

  /**
   * Handles input change event
   * @param {Event} e - Change event
   */
  const handleInputChange = useCallback((e) => {
    const { files } = e.target;
    handleFiles(files);
  }, [handleFiles]);

  /**
   * Opens file input dialog
   */
  const openFileDialog = useCallback(() => {
    inputRef.current?.click();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-8">
      {/* Upload zone */}
      <div
        className={`upload-zone w-full max-w-md ${isDragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={openFileDialog}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            openFileDialog();
          }
        }}
        aria-label={t('zone.ariaLabel')}
      >
        {/* Icon */}
        <div className="mb-4">
          <div className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-8 h-8 text-primary-600" 
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
        </div>

        {/* Text */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {t('zone.title')}
        </h3>
        <p className="text-gray-500 mb-4">
          {t('zone.subtitle')}
        </p>

        {/* Supported formats */}
        <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-400">
          <span className="px-2 py-1 bg-gray-100 rounded">MP3</span>
          <span className="px-2 py-1 bg-gray-100 rounded">WAV</span>
          <span className="px-2 py-1 bg-gray-100 rounded">M4A</span>
          <span className="px-2 py-1 bg-gray-100 rounded">OGG</span>
          <span className="px-2 py-1 bg-gray-100 rounded">WEBM</span>
        </div>

        {/* Size limit */}
        <p className="mt-4 text-xs text-gray-400">
          {t('zone.maxSize', { size: MAX_FILE_SIZE_MB })} • {t('zone.maxDuration', { minutes: 10 })}
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600 flex items-center gap-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-4 h-4" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
                clipRule="evenodd" 
              />
            </svg>
            {error}
          </p>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept={ALLOWED_TYPES.join(',')}
        onChange={handleInputChange}
        className="hidden"
        aria-hidden="true"
      />
    </div>
  );
}
