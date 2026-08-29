import React from 'react';
import { Lesson } from '../types';
import { AILessonGenerator } from '../features/ai-generator/AILessonGenerator';

interface AILessonGeneratorPageProps {
  onSelectLesson: (lesson: Lesson) => void;
}

export const AILessonGeneratorPage: React.FC<AILessonGeneratorPageProps> = ({
  onSelectLesson,
}) => {
  return (
    <div className="space-y-6">
      <AILessonGenerator onStartReading={onSelectLesson} />
    </div>
  );
};
