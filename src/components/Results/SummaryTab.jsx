/**
 * SummaryTab Component
 * Displays executive summary
 */

import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Summary tab component
 * @param {Object} props - Component props
 * @param {string} props.text - Summary text
 */
export function SummaryTab({ text }) {
  const { t } = useTranslation(['results', 'common']);
  const [copied, setCopied] = useState(false);

  /**
   * Copies summary to clipboard
   */
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [text]);

  return (
    <div className="space-y-4">
      {/* Header with copy button */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          {t('results:summary.title')}
        </h3>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
            copied 
              ? 'bg-green-100 text-green-700' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {copied ? (
            <>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-4 h-4" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                  clipRule="evenodd" 
                />
              </svg>
              {t('common:actions.copied')}
            </>
          ) : (
            <>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-4 h-4" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
              {t('common:actions.copy')}
            </>
          )}
        </button>
      </div>

      {/* Summary card */}
      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6 border border-primary-100">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-5 h-5 text-primary-600" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
          <p className="text-gray-700 leading-relaxed">
            {text || t('results:summary.empty')}
          </p>
        </div>
      </div>

      {/* Info */}
      <p className="text-sm text-gray-500">
        {t('results:summary.info')}
      </p>
    </div>
  );
}
