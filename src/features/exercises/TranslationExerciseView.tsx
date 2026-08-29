import React from 'react';
import { Lightbulb } from 'lucide-react';
import { TranslationExercise } from '../../types';

interface TranslationExerciseViewProps {
  exercise: TranslationExercise;
  selectedWords: string[];
  onWordClick: (word: string, index: number) => void;
  onRemoveWord: (index: number) => void;
  isAnswerChecked: boolean;
}

export const TranslationExerciseView: React.FC<TranslationExerciseViewProps> = ({
  exercise,
  selectedWords,
  onWordClick,
  onRemoveWord,
  isAnswerChecked,
}) => {
  return (
    <div className="space-y-6">
      <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
          Câu gốc cần dịch:
        </span>
        <p className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 mt-1">
          "{exercise.vietnamesePrompt}"
        </p>
      </div>

      {/* Constructed Sentence Box */}
      <div className="min-h-[70px] p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/70 border-2 border-dashed border-stone-300 dark:border-stone-700 flex flex-wrap gap-2 items-center">
        {selectedWords.length === 0 ? (
          <span className="text-xs text-stone-400 italic">
            Ghép các từ bên dưới để tạo thành câu tiếng Anh hoàn chỉnh...
          </span>
        ) : (
          selectedWords.map((word, idx) => (
            <button
              key={idx}
              disabled={isAnswerChecked}
              onClick={() => onRemoveWord(idx)}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-semibold text-sm shadow-xs border border-stone-200 dark:border-stone-700 hover:bg-rose-50 hover:text-rose-600 transition-all flex items-center space-x-1"
              title="Nhấn để xóa từ này"
            >
              <span>{word}</span>
              {!isAnswerChecked && <span className="text-stone-400 text-xs">×</span>}
            </button>
          ))
        )}
      </div>

      {/* Word Bank */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
          Chọn từ tiếng Anh:
        </span>
        <div className="flex flex-wrap gap-2">
          {exercise.wordBank.map((word, wIdx) => {
            const occurrencesInBank = exercise.wordBank.filter(w => w === word).length;
            const occurrencesInSelected = selectedWords.filter(w => w === word).length;
            const isExhausted = occurrencesInSelected >= occurrencesInBank;

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

      {/* Hints */}
      {exercise.hints && exercise.hints.length > 0 && !isAnswerChecked && (
        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-xs text-amber-900 dark:text-amber-300 flex items-start space-x-2">
          <Lightbulb className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
          <div>
            <span className="font-bold">Gợi ý: </span>
            {exercise.hints.join(' • ')}
          </div>
        </div>
      )}
    </div>
  );
};
