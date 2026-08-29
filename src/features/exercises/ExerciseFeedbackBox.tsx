import React from 'react';
import { CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { Exercise } from '../../types';

interface ExerciseFeedbackBoxProps {
  exercise: Exercise;
  isCorrect: boolean;
}

export const ExerciseFeedbackBox: React.FC<ExerciseFeedbackBoxProps> = ({
  exercise,
  isCorrect,
}) => {
  return (
    <div 
      className={`p-5 rounded-2xl border animate-in fade-in slide-in-from-top-2 duration-200 space-y-3 ${
        isCorrect
          ? 'bg-emerald-50/90 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100'
          : 'bg-rose-50/90 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100'
      }`}
    >
      <div className="flex items-center space-x-2">
        {isCorrect ? (
          <>
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span className="font-extrabold text-sm uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
              Chính xác! Làm rất tốt!
            </span>
          </>
        ) : (
          <>
            <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            <span className="font-extrabold text-sm uppercase tracking-wider text-rose-700 dark:text-rose-300">
              Chưa chính xác — Xem phân tích AI bên dưới
            </span>
          </>
        )}
      </div>

      {/* Correct Answer Display */}
      {!isCorrect && (
        <div className="p-3 rounded-xl bg-white/80 dark:bg-stone-900/80 border border-current/10 text-xs sm:text-sm">
          <span className="font-bold">Đáp án chuẩn: </span>
          <span className="font-serif font-semibold text-emerald-700 dark:text-emerald-400">
            {exercise.type === 'fill-in-blank' && exercise.correctAnswer}
            {exercise.type === 'sentence-ordering' && exercise.correctWords.join(' ')}
            {exercise.type === 'vietnamese-to-english' && exercise.correctAnswer}
          </span>
        </div>
      )}

      {/* In-depth AI Grammar Explanation */}
      <div className="text-xs sm:text-sm leading-relaxed space-y-1">
        <div className="flex items-center space-x-1.5 font-bold opacity-80">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Giải thích chi tiết của AI:</span>
        </div>
        <p className="opacity-95">{exercise.explanation}</p>
      </div>
    </div>
  );
};
