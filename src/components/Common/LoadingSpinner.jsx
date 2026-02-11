/**
 * LoadingSpinner Component
 * Displays animated loading indicator
 */

import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Loading spinner component
 * @param {Object} props - Component props
 * @param {string} [props.size='medium'] - Spinner size (small, medium, large)
 * @param {string} [props.text] - Optional text to display below spinner
 */
export function LoadingSpinner({ size = 'medium', text }) {
  const { t } = useTranslation('common');
  
  const sizeClasses = {
    small: 'w-5 h-5 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4'
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        className={`${sizeClasses[size]} border-primary-200 border-t-primary-600 rounded-full animate-spin`}
        role="status"
        aria-label={t('loading')}
      />
      {text && (
        <p className="mt-3 text-gray-600 text-sm font-medium">{text}</p>
      )}
    </div>
  );
}
