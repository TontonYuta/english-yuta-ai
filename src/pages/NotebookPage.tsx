import React from 'react';
import { UserProgress, WordLearningStatus } from '../types';
import { VocabularyNotebook } from '../features/vocabulary/VocabularyNotebook';

interface NotebookPageProps {
  progress: UserProgress;
  onUpdateWordStatus: (wordId: string, status: WordLearningStatus) => void;
  onRemoveWord: (wordId: string) => void;
  onBackToLibrary: () => void;
}

export const NotebookPage: React.FC<NotebookPageProps> = ({
  progress,
  onUpdateWordStatus,
  onRemoveWord,
  onBackToLibrary,
}) => {
  return (
    <VocabularyNotebook
      savedWords={progress.savedWords}
      onUpdateWordStatus={onUpdateWordStatus}
      onRemoveWord={onRemoveWord}
      onBackToReading={onBackToLibrary}
    />
  );
};
