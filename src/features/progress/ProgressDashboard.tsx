import React from 'react';
import { 
  Flame, 
  BookOpen, 
  Bookmark, 
  Clock, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Layers 
} from 'lucide-react';
import { Lesson, UserProgress } from '../../types';
import { SAMPLE_LESSONS } from '../../data/sampleLessons';
import { LEVEL_METADATA } from '../../utils/formatters';

interface ProgressDashboardProps {
  progress: UserProgress;
  onSelectLesson: (lesson: Lesson) => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  progress,
  onSelectLesson,
}) => {
  const totalCompletedLessons = progress.completedLessons.length;
  const totalSavedWords = progress.savedWords.length;
  const masteredWords = progress.savedWords.filter(w => w.status === 'known').length;
  const totalLessonsInCurriculum = SAMPLE_LESSONS.length;

  const completionPercentage = Math.round((totalCompletedLessons / totalLessonsInCurriculum) * 100);

  // Group lessons by level
  const levels = ['beginner', 'elementary', 'intermediate', 'advanced'] as const;

  return (
    <div className="space-y-8">
      {/* Hero Streak Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 rounded-3xl p-6 sm:p-10 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-xs">
              Thói quen đọc mỗi ngày
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif">
              Chuỗi học liên tiếp: {progress.streak} ngày 🔥
            </h1>
            <p className="text-amber-100 text-xs sm:text-sm max-w-md">
              Đọc tiếng Anh 10-15 phút mỗi ngày với phương pháp chia cụm tự nhiên là cách nhanh nhất để xây dựng tư duy tiếng Anh trực tiếp.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <div className="text-center px-3">
              <span className="block text-2xl sm:text-3xl font-extrabold">{totalCompletedLessons}</span>
              <span className="text-[11px] text-amber-200">Bài đọc hoàn thành</span>
            </div>
            <div className="h-8 w-px bg-white/20"></div>
            <div className="text-center px-3">
              <span className="block text-2xl sm:text-3xl font-extrabold">{progress.totalTimeMinutes}m</span>
              <span className="text-[11px] text-amber-200">Tổng thời gian</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Streak */}
        <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <Flame className="w-6 h-6 fill-current" />
          </div>
          <div>
            <span className="text-xs text-stone-500 font-medium">Chuỗi ngày học</span>
            <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">{progress.streak} ngày</h3>
          </div>
        </div>

        {/* Metric 2: Lessons Completed */}
        <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-stone-500 font-medium">Bài đọc hoàn thành</span>
            <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
              {totalCompletedLessons} / {totalLessonsInCurriculum} ({completionPercentage}%)
            </h3>
          </div>
        </div>

        {/* Metric 3: Saved Chunks */}
        <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-950 flex items-center justify-center text-teal-600 dark:text-teal-400">
            <Bookmark className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-stone-500 font-medium">Cụm từ đã lưu</span>
            <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">{totalSavedWords} cụm</h3>
          </div>
        </div>

        {/* Metric 4: Mastered Chunks */}
        <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-stone-500 font-medium">Cụm từ đã thuộc</span>
            <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">{masteredWords} cụm</h3>
          </div>
        </div>

      </div>

      {/* Level Breakdown Section */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-serif">
            Lộ trình học theo cấp độ CEFR
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Tiến độ hoàn thành bài đọc và các bài tập củng cố theo từng trình độ.
          </p>
        </div>

        <div className="space-y-4">
          {levels.map((lvl) => {
            const lessonsInLevel = SAMPLE_LESSONS.filter(l => l.level === lvl);
            const completedInLevel = lessonsInLevel.filter(l => progress.completedLessons.includes(l.id));
            const pct = lessonsInLevel.length > 0 ? Math.round((completedInLevel.length / lessonsInLevel.length) * 100) : 0;
            const meta = LEVEL_METADATA[lvl];

            return (
              <div 
                key={lvl}
                className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold uppercase ${meta.badge}`}>
                      {meta.label}
                    </span>
                    <span className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                      {meta.name}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-stone-600 dark:text-stone-300">
                    {completedInLevel.length}/{lessonsInLevel.length} bài ({pct}%)
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  ></div>
                </div>

                {/* Lesson pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {lessonsInLevel.map((lesson) => {
                    const isDone = progress.completedLessons.includes(lesson.id);
                    const result = progress.exerciseResults[lesson.id];

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => onSelectLesson(lesson)}
                        className={`text-xs px-3 py-1.5 rounded-xl border flex items-center space-x-1.5 transition-all ${
                          isDone
                            ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700'
                            : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-emerald-500'
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-stone-300 dark:bg-stone-600"></span>
                        )}
                        <span className="font-medium">{lesson.title}</span>
                        {result && (
                          <span className="font-mono text-[10px] opacity-75">
                            ({result.score}/{result.total})
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
