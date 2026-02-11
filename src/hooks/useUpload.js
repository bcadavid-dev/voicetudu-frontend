/**
 * useUpload Hook
 * Manages file upload state and logic
 */

import { useState, useCallback } from 'react';
import { uploadAudio } from '../services/api.service';

/**
 * Hook for managing file uploads
 * @returns {Object} Upload state and functions
 */
export function useUpload() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Uploads a file to the server
   * @param {File} file - File to upload
   * @param {Function} onProgress - Optional progress callback
   * @returns {Promise<Object>} Upload result
   */
  const uploadFile = useCallback(async (file, onProgress) => {
    setIsLoading(true);
    setProgress(0);

    try {
      const result = await uploadAudio(file, (progressValue) => {
        setProgress(progressValue);
        if (onProgress) {
          onProgress(progressValue);
        }
      });

      setProgress(100);
      return result;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Resets upload state
   */
  const reset = useCallback(() => {
    setProgress(0);
    setIsLoading(false);
  }, []);

  return {
    uploadFile,
    progress,
    isLoading,
    reset
  };
}
