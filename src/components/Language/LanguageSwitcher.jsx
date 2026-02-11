/**
 * LanguageSwitcher Component
 * Allows users to switch between available languages
 */

import React from 'react';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'es', label: 'ES', flag: '🇪🇸' },
  { code: 'en', label: 'EN', flag: '🇬🇧' }
];

/**
 * Language switcher component
 */
export function LanguageSwitcher() {
  const { i18n, t } = useTranslation('common');
  const currentLanguage = i18n.language?.split('-')[0] || 'es';

  const handleLanguageChange = (langCode) => {
    if (langCode !== currentLanguage) {
      i18n.changeLanguage(langCode);
    }
  };

  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`
            flex items-center gap-1 px-2 py-1 text-sm font-medium rounded-md transition-all duration-200
            ${currentLanguage === lang.code 
              ? 'bg-white text-primary-600 shadow-sm' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
            }
          `}
          aria-label={t(`language.${lang.code}`)}
          title={t(`language.${lang.code}`)}
        >
          <span className="text-base">{lang.flag}</span>
          <span className="hidden sm:inline">{lang.label}</span>
        </button>
      ))}
    </div>
  );
}
