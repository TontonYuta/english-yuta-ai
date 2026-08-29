import React from 'react';
import { ArrowRight, CheckCircle2, Clock, FileText } from 'lucide-react';
import { Lesson } from '../types';

interface LessonCardProps {
  lesson: Lesson;
  isCompleted: boolean;
  onSelect: (lesson: Lesson) => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  isCompleted,
  onSelect,
}) => {
  return (
    <div
      onClick={() => onSelect(lesson)}
      className="group relative bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 hover:border-emerald-500/50 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1.5">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${lesson.badgeColor || 'bg-emerald-100 text-emerald-800 border-emerald-200'}`}>
              {lesson.levelLabel}
            </span>
            {lesson.isUserCreated && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                Gemini AI
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {isCompleted ? (
              <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Đã học</span>
              </span>
            ) : (
              <span className="text-xl">{lesson.icon || '📖'}</span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1 font-serif">
          {lesson.title}
        </h3>

        <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium mt-0.5">
          {lesson.titleVi}
        </p>

        <p className="text-xs text-stone-600 dark:text-stone-400 mt-2.5 line-clamp-2 leading-relaxed">
          {lesson.descriptionVi || lesson.description}
        </p>
      </div>

      {/* Meta Footer */}
      <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{lesson.durationMinutes} phút</span>
          </span>
          <span className="flex items-center space-x-1">
            <FileText className="w-3.5 h-3.5" />
            <span>{lesson.wordCount} từ</span>
          </span>
        </div>

        <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
          <span>Đọc ngay</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
