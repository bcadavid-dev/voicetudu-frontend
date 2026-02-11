/**
 * EmailTab Component
 * Displays generated email with copy button
 */

import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Email tab component
 * @param {Object} props - Component props
 * @param {Object} props.email - Email object with subject and body
 * @param {string} props.email.subject - Email subject
 * @param {string} props.email.body - Email body
 */
export function EmailTab({ email = {} }) {
  const { t } = useTranslation(['results', 'common']);
  const [copied, setCopied] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const { subject = '', body = '' } = email;

  /**
   * Copies full email to clipboard
   */
  const handleCopyFull = useCallback(async () => {
    const fullEmail = `${t('results:email.subject')}: ${subject}\n\n${body}`;
    try {
      await navigator.clipboard.writeText(fullEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [subject, body, t]);

  /**
   * Copies specific field to clipboard
   * @param {string} field - Field to copy ('subject' or 'body')
   */
  const handleCopyField = useCallback(async (field) => {
    const text = field === 'subject' ? subject : body;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [subject, body]);

  if (!subject && !body) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-8 h-8 text-gray-400" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {t('results:email.empty.title')}
        </h3>
        <p className="text-gray-500">
          {t('results:email.empty.description')}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with copy buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {t('results:email.title')}
        </h3>
        <button
          onClick={handleCopyFull}
          className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            copied 
              ? 'bg-green-100 text-green-700' 
              : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
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
              {t('results:email.copyAll')}
            </>
          )}
        </button>
      </div>

      {/* Subject */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">{t('results:email.subject')}:</span>
          <button
            onClick={() => handleCopyField('subject')}
            className={`text-xs px-2 py-1 rounded transition-colors ${
              copiedField === 'subject'
                ? 'bg-green-100 text-green-700'
                : 'text-gray-500 hover:bg-gray-200'
            }`}
          >
            {copiedField === 'subject' ? t('common:actions.copied') : t('common:actions.copy')}
          </button>
        </div>
        <p className="text-gray-900 font-medium">{subject}</p>
      </div>

      {/* Body */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">{t('results:email.body')}:</span>
          <button
            onClick={() => handleCopyField('body')}
            className={`text-xs px-2 py-1 rounded transition-colors ${
              copiedField === 'body'
                ? 'bg-green-100 text-green-700'
                : 'text-gray-500 hover:bg-gray-200'
            }`}
          >
            {copiedField === 'body' ? t('common:actions.copied') : t('common:actions.copy')}
          </button>
        </div>
        <p className="text-gray-700 whitespace-pre-wrap">{body}</p>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
        <div className="flex items-start gap-3">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
              clipRule="evenodd" 
            />
          </svg>
          <p className="text-sm text-blue-700">
            {t('results:email.tip')}
          </p>
        </div>
      </div>
    </div>
  );
}
