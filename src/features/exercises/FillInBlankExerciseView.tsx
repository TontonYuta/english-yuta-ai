import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { FillInBlankExercise } from '../../types';

interface FillInBlankExerciseViewProps {
  exercise: FillInBlankExercise;
  selectedAnswer?: string;
  onSelectOption: (option: string) => void;
  isAnswerChecked: boolean;
  isCorrect: boolean;
}

export const FillInBlankExerciseView: React.FC<FillInBlankExerciseViewProps> = ({
  exercise,
  selectedAnswer,
  onSelectOption,
  isAnswerChecked,
  isCorrect,
}) => {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/70 border border-stone-200 dark:border-stone-700/80 text-center text-lg sm:text-xl font-medium font-serif leading-relaxed text-stone-900 dark:text-stone-100">
        <span>{exercise.sentenceBefore} </span>
        <span className="inline-block min-w-[120px] px-3 py-1 border-b-2 border-dashed border-emerald-500 bg-white dark:bg-stone-900 font-bold text-emerald-700 dark:text-emerald-400 rounded-md">
          {selectedAnswer || '...'}
        </span>
        <span> {exercise.sentenceAfter}</span>

        {exercise.vietnameseMeaning && (
          <p className="text-xs font-sans text-stone-500 dark:text-stone-400 italic mt-3">
            🇻🇳 {exercise.vietnameseMeaning}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {exercise.options.map((option, optIdx) => {
          const isSelected = selectedAnswer === option;
          let btnStyle = 'bg-stone-50 dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200';

          if (isSelected) {
            btnStyle = 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold ring-2 ring-emerald-500/30';
          }

          if (isAnswerChecked) {
            if (option === exercise.correctAnswer) {
              btnStyle = 'bg-emerald-500 text-white font-bold border-emerald-600 shadow-md shadow-emerald-500/30';
            } else if (isSelected && !isCorrect) {
              btnStyle = 'bg-rose-500 text-white font-bold border-rose-600';
            } else {
              btnStyle = 'opacity-50 border-stone-200';
            }
          }

          return (
            <button
              key={optIdx}
              disabled={isAnswerChecked}
              onClick={() => onSelectOption(option)}
              className={`p-4 rounded-xl border text-sm text-left transition-all flex items-center justify-between ${btnStyle}`}
            >
              <span>{option}</span>
              {isAnswerChecked && option === exercise.correctAnswer && (
                <CheckCircle2 className="w-4 h-4 text-white" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
