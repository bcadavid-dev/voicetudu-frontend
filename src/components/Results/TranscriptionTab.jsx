/**
 * TranscriptionTab Component
 * Displays full transcription text
 */

import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Transcription tab component
 * @param {Object} props - Component props
 * @param {string} props.text - Transcription text
 */
export function TranscriptionTab({ text }) {
  const { t } = useTranslation(['results', 'common']);
  const [copied, setCopied] = useState(false);

  /**
   * Copies transcription to clipboard
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

  // Calculate word count
  const wordCount = text ? text.split(/\s+/).filter(w => w.length > 0).length : 0;

  return (
    <div className="space-y-4">
      {/* Header with copy button */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          {t('results:transcription.title')}
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

      {/* Transcription text */}
      <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {text || t('results:transcription.empty')}
        </p>
      </div>

      {/* Word count */}
      <p className="text-sm text-gray-500 text-right">
        {text ? t('results:transcription.words', { count: wordCount }) : ''}
      </p>
    </div>
  );
}
