import React from 'react';
import { Lesson } from '../types';
import { CustomTextAnalyzer } from '../features/custom/CustomTextAnalyzer';

interface CustomAnalyzerPageProps {
  onAnalyzeComplete: (lesson: Lesson) => void;
}

export const CustomAnalyzerPage: React.FC<CustomAnalyzerPageProps> = ({
  onAnalyzeComplete,
}) => {
  return (
    <CustomTextAnalyzer onAnalyzeComplete={onAnalyzeComplete} />
  );
};
