/**
 * Header Component
 * Displays the Voicetudu logo and branding with language switcher
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../Language/LanguageSwitcher';

/**
 * Header component with logo and language switcher
 */
export function Header() {
  const { t } = useTranslation('common');

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo with microphone icon */}
          <div className="flex items-center gap-3">
            <div className="relative">
              {/* Sound wave animation */}
              <div className="absolute inset-0 bg-primary-500 rounded-full animate-pulse-ring opacity-20"></div>
              <div className="relative w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-5 h-5 text-white" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
            </div>
            
            {/* Brand name */}
            <div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                {t('app.name')}
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">
                {t('app.tagline')}
              </p>
            </div>
          </div>

          {/* Language Switcher */}
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
