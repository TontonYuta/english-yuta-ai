import React from 'react';
import { 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Award, 
  BookOpen, 
  BarChart2, 
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { DifficultyLevel, Lesson, UserProgress } from '../types';

interface ProgressDashboardProps {
  progress: UserProgress;
  lessons: Lesson[];
  onSelectLesson: (lesson: Lesson) => void;
  onGoToNotebook: () => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  progress,
  lessons,
  onSelectLesson,
  onGoToNotebook,
}) => {
  const completedCount = progress.completedLessons.length;
  const totalLessons = lessons.length;
  const savedCount = progress.savedWords.length;
  const masteredCount = progress.savedWords.filter(w => w.status === 'known').length;

  // Level statistics
  const levels: { id: DifficultyLevel; name: string; badge: string }[] = [
    { id: 'beginner', name: 'Beginner (A1)', badge: 'bg-amber-100 text-amber-800' },
    { id: 'elementary', name: 'Elementary (A2)', badge: 'bg-emerald-100 text-emerald-800' },
    { id: 'intermediate', name: 'Intermediate (B1/B2)', badge: 'bg-indigo-100 text-indigo-800' },
    { id: 'advanced', name: 'Advanced (C1/C2)', badge: 'bg-purple-100 text-purple-800' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-semibold">
            <Flame className="w-4 h-4 text-amber-300 fill-amber-300" />
            <span>Chuỗi học tập: {progress.streak} ngày liên tiếp</span>
          </div>
          
          <h1 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight leading-tight">
            Tiến độ đọc hiểu & vốn từ của bạn
          </h1>
          
          <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
            Học tiếng Anh qua phương pháp cụm từ tự nhiên giúp não bộ ghi nhớ ngữ pháp trong tiềm thức mà không cần học vẹt quy tắc.
          </p>
        </div>

        {/* Decorative background shape */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* 4 Core Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Streak */}
        <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
            <Flame className="w-5 h-5 fill-amber-500 text-amber-500" />
          </div>
          <div>
            <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">Chuỗi ngày học</span>
            <p className="text-2xl font-extrabold text-stone-900 dark:text-stone-100 font-serif">
              {progress.streak} ngày
            </p>
          </div>
          <span className="text-[11px] text-amber-600 font-medium block">
            🔥 Giữ vững phong độ!
          </span>
        </div>

        {/* Metric 2: Lessons Completed */}
        <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">Bài đã hoàn thành</span>
            <p className="text-2xl font-extrabold text-stone-900 dark:text-stone-100 font-serif">
              {completedCount} / {totalLessons}
            </p>
          </div>
          <div className="w-full bg-stone-100 dark:bg-stone-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full"
              style={{ width: `${totalLessons ? (completedCount / totalLessons) * 100 : 0}%` }}
            ></div>
          </div>
        </div>

        {/* Metric 3: Saved Words */}
        <div 
          onClick={onGoToNotebook}
          className="bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-xs space-y-2 cursor-pointer hover:border-emerald-500 transition-colors group"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">Từ vựng đã lưu</span>
            <p className="text-2xl font-extrabold text-stone-900 dark:text-stone-100 font-serif">
              {savedCount} cụm từ
            </p>
          </div>
          <span className="text-[11px] text-teal-600 font-medium flex items-center space-x-1">
            <span>{masteredCount} đã thuộc</span>
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>

        {/* Metric 4: Read Time */}
        <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">Thời gian đọc</span>
            <p className="text-2xl font-extrabold text-stone-900 dark:text-stone-100 font-serif">
              {progress.totalTimeMinutes} phút
            </p>
          </div>
          <span className="text-[11px] text-stone-400 font-medium block">
            ~140 từ / phút
          </span>
        </div>

      </div>

      {/* CEFR Level Mastery Breakdown */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-serif flex items-center space-x-2">
          <Award className="w-5 h-5 text-emerald-600" />
          <span>Tiến độ theo trình độ CEFR</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {levels.map((lvl) => {
            const lessonsInLevel = lessons.filter(l => l.level === lvl.id);
            const completedInLevel = lessonsInLevel.filter(l => progress.completedLessons.includes(l.id));
            const pct = lessonsInLevel.length > 0 
              ? Math.round((completedInLevel.length / lessonsInLevel.length) * 100)
              : 0;

            return (
              <div
                key={lvl.id}
                className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${lvl.badge}`}>
                    {lvl.name}
                  </span>
                  <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                    {completedInLevel.length} / {lessonsInLevel.length} bài ({pct}%)
                  </span>
                </div>

                <div className="w-full bg-stone-200 dark:bg-stone-700 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
