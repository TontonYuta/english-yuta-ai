import React from 'react';
import { Lesson, UserProgress } from '../types';
import { ProgressDashboard } from '../features/progress/ProgressDashboard';

interface ProgressPageProps {
  progress: UserProgress;
  onSelectLesson: (lesson: Lesson) => void;
}

export const ProgressPage: React.FC<ProgressPageProps> = ({
  progress,
  onSelectLesson,
}) => {
  return (
    <ProgressDashboard
      progress={progress}
      onSelectLesson={onSelectLesson}
    />
  );
};
