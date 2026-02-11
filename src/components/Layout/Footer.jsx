/**
 * Footer Component
 * Simple footer with copyright info
 */

import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Footer component
 */
export function Footer() {
  const { t } = useTranslation('common');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-sm text-gray-500">
            {t('footer.copyright', { year: currentYear })}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{t('footer.poweredBy')}</span>
            <span className="font-medium text-primary-600">OpenAI Whisper</span>
            <span>{t('footer.and')}</span>
            <span className="font-medium text-secondary-600">GPT-4o</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
