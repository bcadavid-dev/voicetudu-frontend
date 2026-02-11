/**
 * API Service
 * Handles all HTTP requests to the backend
 * Uses Axios for request/response handling
 */

import axios from 'axios';

// API base URL from environment or default
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 120000, // 2 minutes timeout for long uploads/processing
  headers: {
    'Accept': 'application/json'
  }
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('[API] Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[API] Response error:', error);
    
    // Transform error to consistent format
    if (error.response) {
      const { data, status } = error.response;
      const apiError = new Error(data?.error?.message || 'Request failed');
      apiError.code = data?.error?.code || `HTTP_${status}`;
      apiError.status = status;
      apiError.details = data?.error?.details;
      return Promise.reject(apiError);
    }
    
    if (error.request) {
      const networkError = new Error('Network error - please check your connection');
      networkError.code = 'NETWORK_ERROR';
      return Promise.reject(networkError);
    }
    
    return Promise.reject(error);
  }
);

/**
 * Uploads an audio file for transcription and analysis
 * @param {File} file - Audio file to upload
 * @param {Function} onProgress - Progress callback (0-100)
 * @returns {Promise<Object>} Upload result with transcription, summary, tasks, email
 */
export async function uploadAudio(file, onProgress) {
  const formData = new FormData();
  formData.append('audio', file);

  const response = await apiClient.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(progress);
      }
    }
  });

  return response.data;
}

/**
 * Gets supported audio formats
 * @returns {Promise<Object>} Supported formats info
 */
export async function getSupportedFormats() {
  const response = await apiClient.get('/upload/formats');
  return response.data;
}

/**
 * Checks API health status
 * @returns {Promise<Object>} Health status
 */
export async function checkHealth() {
  const response = await apiClient.get('/health', { baseURL: API_URL.replace('/api', '') });
  return response.data;
}

export default apiClient;
