/**
 * ErrorMessage Component
 * Displays error message with retry/reset options
 */

import React from 'react';

/**
 * Error message component
 * @param {Object} props - Component props
 * @param {Object} props.error - Error object with code and message
 * @param {Function} props.onRetry - Retry handler
 * @param {Function} props.onReset - Reset handler
 */
export function ErrorMessage({ error, onRetry, onReset }) {
  // Error messages by code
  const errorMessages = {
    INVALID_FORMAT: 'Formato de archivo no válido',
    FILE_TOO_LARGE: 'El archivo es demasiado grande',
    AUDIO_TOO_LONG: 'El audio excede el límite de duración',
    TRANSCRIPTION_ERROR: 'Error en la transcripción',
    ANALYSIS_ERROR: 'Error en el análisis',
    NETWORK_ERROR: 'Error de conexión',
    RATE_LIMIT: 'Demasiadas solicitudes',
    TIMEOUT: 'Tiempo de espera agotado',
    API_QUOTA_EXCEEDED: 'Cuota de API agotada'
  };

  const title = errorMessages[error?.code] || 'Ha ocurrido un error';
  const message = error?.message || 'Por favor, inténtalo de nuevo';

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      {/* Error icon */}
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-8 h-8 text-red-500" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
            clipRule="evenodd" 
          />
        </svg>
      </div>

      {/* Error title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>

      {/* Error message */}
      <p className="text-gray-600 text-center mb-6 max-w-md">
        {message}
      </p>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="btn-primary flex items-center justify-center gap-2"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-4 h-4" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" 
                clipRule="evenodd" 
              />
            </svg>
            Reintentar
          </button>
        )}
        
        {onReset && (
          <button
            onClick={onReset}
            className="btn-secondary flex items-center justify-center gap-2"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-4 h-4" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
            Subir otro archivo
          </button>
        )}
      </div>
    </div>
  );
}
