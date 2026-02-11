/**
 * ResultsContainer Component
 * Displays transcription results in tabs
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TranscriptionTab } from './TranscriptionTab';
import { SummaryTab } from './SummaryTab';
import { TasksTab } from './TasksTab';
import { EmailTab } from './EmailTab';
import { Button } from '../Common/Button';

/**
 * Results container component
 * @param {Object} props - Component props
 * @param {Object} props.data - Result data
 * @param {Function} props.onReset - Reset handler
 */
export function ResultsContainer({ data, onReset }) {
  const { t } = useTranslation('results');
  const [activeTab, setActiveTab] = useState('summary');

  const { transcription, summary, tasks, email } = data;

  // Tab definitions
  const TABS = [
    { id: 'summary', label: t('tabs.summary'), icon: '📝' },
    { id: 'tasks', label: t('tabs.tasks'), icon: '✓' },
    { id: 'email', label: t('tabs.email'), icon: '✉' },
    { id: 'transcription', label: t('tabs.transcription'), icon: '🎵' }
  ];

  /**
   * Renders content for active tab
   */
  const renderTabContent = () => {
    switch (activeTab) {
      case 'transcription':
        return <TranscriptionTab text={transcription} />;
      case 'summary':
        return <SummaryTab text={summary} />;
      case 'tasks':
        return <TasksTab tasks={tasks} />;
      case 'email':
        return <EmailTab email={email} />;
      default:
        return null;
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {t('container.title')}
          </h2>
          <p className="text-sm text-gray-500">
            {t('container.successMessage')}
          </p>
        </div>
        
        <Button
          onClick={onReset}
          variant="secondary"
          size="small"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-4 h-4 mr-2" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" 
              clipRule="evenodd" 
            />
          </svg>
          {t('container.newAudio')}
        </Button>
      </div>

      {/* Tabs navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav 
          className="flex gap-1 overflow-x-auto scrollbar-hide"
          role="tablist"
          aria-label={t('container.title')}
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`tabpanel-${tab.id}`}
            >
              <span className="mr-1">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab content */}
      <div
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        className="min-h-[300px]"
      >
        {renderTabContent()}
      </div>
    </div>
  );
}
