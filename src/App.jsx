/**
 * Voicetudu Main App Component
 * Manages the global state and flow of the application
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { UploadZone } from './components/Upload/UploadZone';
import { AudioPreview } from './components/Upload/AudioPreview';
import { UploadProgress } from './components/Upload/UploadProgress';
import { LoadingSpinner } from './components/Common/LoadingSpinner';
import { ErrorMessage } from './components/Common/ErrorMessage';
import { ResultsContainer } from './components/Results/ResultsContainer';
import { useUpload } from './hooks/useUpload';

/**
 * App states:
 * - idle: Initial state, waiting for file upload
 * - preview: File selected, showing preview
 * - uploading: File being uploaded to server
 * - processing: Server transcribing and analyzing
 * - success: Results received
 * - error: Error occurred
 */

function App() {
  const { t } = useTranslation('upload');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadState, setUploadState] = useState('idle');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  
  const { uploadFile, progress, isLoading } = useUpload();

  /**
   * Handles file selection from input or drop
   * @param {File} file - Selected audio file
   */
  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setUploadState('preview');
    setError(null);
  };

  /**
   * Handles file upload start
   */
  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploadState('uploading');
    setError(null);

    try {
      // Upload file
      const response = await uploadFile(selectedFile, (progressEvent) => {
        // Progress is handled by the hook
      });

      // Transition to processing state
      setUploadState('processing');

      // Wait a moment to show processing state
      setTimeout(() => {
        setResult(response.data);
        setUploadState('success');
      }, 500);

    } catch (err) {
      console.error('Upload failed:', err);
      setError({
        code: err.code || 'UNKNOWN_ERROR',
        message: err.message || 'An unexpected error occurred'
      });
      setUploadState('error');
    }
  };

  /**
   * Handles retry after error
   */
  const handleRetry = () => {
    setError(null);
    setUploadState('preview');
  };

  /**
   * Handles reset to upload new file
   */
  const handleReset = () => {
    setSelectedFile(null);
    setResult(null);
    setError(null);
    setUploadState('idle');
  };

  /**
   * Handles file removal
   */
  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadState('idle');
    setError(null);
  };

  // Render content based on current state
  const renderContent = () => {
    switch (uploadState) {
      case 'idle':
        return (
          <UploadZone 
            onFileSelect={handleFileSelect}
            isLoading={isLoading}
          />
        );

      case 'preview':
        return (
          <AudioPreview
            file={selectedFile}
            onUpload={handleUpload}
            onRemove={handleRemoveFile}
            isLoading={isLoading}
          />
        );

      case 'uploading':
        return (
          <UploadProgress
            progress={progress}
            fileName={selectedFile?.name}
            stage="uploading"
          />
        );

      case 'processing':
        return (
          <div className="flex flex-col items-center justify-center py-12">
            <LoadingSpinner 
              size="large" 
              text={t('progress.transcribing')}
            />
            <p className="mt-4 text-gray-600 text-center">
              {t('progress.waitMessage')}
            </p>
          </div>
        );

      case 'success':
        return (
          <ResultsContainer
            data={result}
            onReset={handleReset}
          />
        );

      case 'error':
        return (
          <ErrorMessage
            error={error}
            onRetry={handleRetry}
            onReset={handleReset}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-primary-50">
      <Header />
      
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card p-6 sm:p-8 min-h-[400px]">
          {renderContent()}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
