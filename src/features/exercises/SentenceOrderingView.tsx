import React from 'react';
import { SentenceOrderingExercise } from '../../types';

interface SentenceOrderingViewProps {
  exercise: SentenceOrderingExercise;
  selectedWords: string[];
  onWordClick: (word: string, index: number) => void;
  onRemoveWord: (index: number) => void;
  isAnswerChecked: boolean;
}

export const SentenceOrderingView: React.FC<SentenceOrderingViewProps> = ({
  exercise,
  selectedWords,
  onWordClick,
  onRemoveWord,
  isAnswerChecked,
}) => {
  return (
    <div className="space-y-6">
      <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
          Câu tiếng Việt:
        </span>
        <p className="text-base font-semibold text-stone-900 dark:text-stone-100 mt-1">
          "{exercise.vietnamesePrompt}"
        </p>
      </div>

      {/* User Constructed Sentence Area */}
      <div className="min-h-[70px] p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/70 border-2 border-dashed border-stone-300 dark:border-stone-700 flex flex-wrap gap-2 items-center">
        {selectedWords.length === 0 ? (
          <span className="text-xs text-stone-400 italic">
            Chạm vào các thẻ từ bên dưới theo đúng thứ tự...
          </span>
        ) : (
          selectedWords.map((word, idx) => (
            <button
              key={idx}
              disabled={isAnswerChecked}
              onClick={() => onRemoveWord(idx)}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-semibold text-sm shadow-xs border border-stone-200 dark:border-stone-700 hover:bg-rose-50 hover:text-rose-600 transition-all flex items-center space-x-1"
              title="Nhấn để gỡ từ này"
            >
              <span>{word}</span>
              {!isAnswerChecked && <span className="text-stone-400 text-xs">×</span>}
            </button>
          ))
        )}
      </div>

      {/* Word Bank Chips */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
          Ngân hàng từ:
        </span>
        <div className="flex flex-wrap gap-2">
          {exercise.scrambledWords.map((word, wIdx) => {
            const occurrencesInScrambled = exercise.scrambledWords.filter(w => w === word).length;
            const occurrencesInSelected = selectedWords.filter(w => w === word).length;
            const isExhausted = occurrencesInSelected >= occurrencesInScrambled;

            return (
              <button
                key={wIdx}
                disabled={isAnswerChecked || isExhausted}
                onClick={() => onWordClick(word, wIdx)}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all border ${
                  isExhausted
                    ? 'opacity-25 bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700 cursor-not-allowed'
                    : 'bg-white dark:bg-stone-800 hover:bg-emerald-50 hover:border-emerald-400 text-stone-800 dark:text-stone-200 border-stone-200 dark:border-stone-700 shadow-xs active:scale-95'
                }`}
              >
                {word}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
