/**
 * Footer Component
 * Simple footer with copyright info
 */

import React from 'react';

/**
 * Footer component
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-sm text-gray-500">
            © {currentYear} Voicetudu. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Powered by</span>
            <span className="font-medium text-primary-600">OpenAI Whisper</span>
            <span>&</span>
            <span className="font-medium text-secondary-600">GPT-4o</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
