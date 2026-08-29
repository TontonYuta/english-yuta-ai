import React from 'react';
import { Award, BookOpen, RotateCcw, Sparkles } from 'lucide-react';
import { Lesson } from '../../types';

interface ExerciseSummaryViewProps {
  lesson: Lesson;
  score: number;
  total: number;
  onBackToReading: () => void;
  onRestart: () => void;
}

export const ExerciseSummaryView: React.FC<ExerciseSummaryViewProps> = ({
  lesson,
  score,
  total,
  onBackToReading,
  onRestart,
}) => {
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto shadow-xl border border-stone-200 dark:border-stone-800 animate-in zoom-in-95 duration-200">
      <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 shadow-inner">
        <Award className="w-10 h-10" />
      </div>

      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300">
        Hoàn thành bài tập
      </span>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 mt-3 mb-2 font-serif">
        {percentage >= 80 ? 'Xuất sắc! Bạn đã nắm vững bài đọc 🎉' : 'Hoàn thành tốt! Tiếp tục cố gắng nhé 👏'}
      </h2>

      <p className="text-stone-600 dark:text-stone-400 text-sm max-w-md mx-auto mb-6">
        Bạn đã đạt <strong>{score}/{total}</strong> câu trả lời chính xác ({percentage}%).
      </p>

      {/* Key Vocabulary Highlights */}
      {lesson.keyVocabulary && lesson.keyVocabulary.length > 0 && (
        <div className="mb-8 p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80 text-left">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2 flex items-center space-x-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Cụm từ trọng tâm đã học trong bài:</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {lesson.keyVocabulary.map((vocab, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
              >
                {vocab}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onBackToReading}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center space-x-2"
        >
          <BookOpen className="w-4 h-4" />
          <span>Quay lại bài đọc</span>
        </button>
        
        <button
          onClick={onRestart}
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 font-semibold transition-all flex items-center justify-center space-x-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Làm lại bài tập</span>
        </button>
      </div>
    </div>
  );
};
