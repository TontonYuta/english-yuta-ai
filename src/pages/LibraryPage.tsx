import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  PlusCircle, 
  ArrowRight,
  ExternalLink,
  Layers,
  Wand2,
  Zap,
  Info
} from 'lucide-react';
import { DifficultyLevel, Lesson, UserProgress } from '../types';
import { LessonCard } from '../components/LessonCard';
import { CEFR_LEVELS, normalizeCEFRLevel } from '../data/cefrLevels';
import { getAllAvailableLessons } from '../utils/customLessonsStorage';

interface LibraryPageProps {
  progress: UserProgress;
  onSelectLesson: (lesson: Lesson) => void;
  onOpenCustomAnalyzer: () => void;
  onOpenAIGenerator: () => void;
}

export const LibraryPage: React.FC<LibraryPageProps> = ({
  progress,
  onSelectLesson,
  onOpenCustomAnalyzer,
  onOpenAIGenerator,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  // Lấy toàn bộ bài học (hệ thống + bài do AI tạo được lưu trong máy)
  const allLessons = useMemo(() => {
    return getAllAvailableLessons();
  }, []);

  const filteredLessons = useMemo(() => {
    return allLessons.filter((lesson) => {
      const matchSearch =
        lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.titleVi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.descriptionVi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (lesson.category && lesson.category.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchSearch) return false;

      if (selectedLevel !== 'all') {
        const normLessonLevel = normalizeCEFRLevel(lesson.level);
        if (normLessonLevel !== selectedLevel) {
          return false;
        }
      }

      return true;
    });
  }, [allLessons, searchQuery, selectedLevel]);

  const activeLevelInfo = selectedLevel !== 'all' ? CEFR_LEVELS[selectedLevel] : null;

  return (
    <div className="space-y-8 pb-10">
      
      {/* Top Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-700/40 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-emerald-200 text-xs font-semibold border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Phương pháp học đọc Natural Chunking & Phân cấp CEFR</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif leading-tight">
            Đọc Hiểu Tiếng Anh Theo Cụm Từ Tự Nhiên
          </h1>

          <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed">
            Học ngoại ngữ chuẩn xác qua các cụm từ có nghĩa (Chunks), không dịch ghép từ rời rạc. Luyện tập với lộ trình 6 cấp độ CEFR (A1 - C2) hoặc tạo bài đọc tùy biến tức thì bằng Google Gemini Prompt.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenAIGenerator}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-extrabold text-xs sm:text-sm shadow-lg flex items-center space-x-2 transition-all cursor-pointer transform hover:scale-102 active:scale-98"
            >
              <Wand2 className="w-4 h-4 text-stone-950" />
              <span>Tạo bài đọc mới bằng Gemini Prompt</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onOpenCustomAnalyzer}
              className="px-4 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm shadow-xs flex items-center space-x-2 transition-colors cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-emerald-300" />
              <span>Nhập văn bản tùy chỉnh</span>
            </button>
          </div>
        </div>
      </div>

      {/* CEFR Level Filter Bar & Search */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-white dark:bg-stone-900 p-4 sm:p-5 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-xs">
          
          {/* Search Input */}
          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm bài đọc, chủ đề..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          {/* 6 CEFR Tabs + All */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-thin">
            <button
              onClick={() => setSelectedLevel('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedLevel === 'all'
                  ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              Tất cả ({allLessons.length})
            </button>

            {Object.values(CEFR_LEVELS).map((lvl) => {
              const isSelected = selectedLevel === lvl.code;
              const countInLevel = allLessons.filter(l => normalizeCEFRLevel(l.level) === lvl.code).length;

              return (
                <button
                  key={lvl.code}
                  onClick={() => setSelectedLevel(lvl.code)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-1.5 cursor-pointer ${
                    isSelected
                      ? `${lvl.badgeClass} border-2 shadow-xs scale-102`
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  <span>{lvl.code}</span>
                  <span className="opacity-75 font-normal text-[11px]">({countInLevel})</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Selected Level Description Banner */}
        {activeLevelInfo && (
          <div className={`p-4 sm:p-5 rounded-2xl border ${activeLevelInfo.badgeClass} bg-opacity-30 text-xs space-y-2 animate-in fade-in duration-200`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{activeLevelInfo.icon}</span>
                <span className="font-extrabold text-sm">
                  Cấp độ {activeLevelInfo.code}: {activeLevelInfo.nameVi} ({activeLevelInfo.nameEn})
                </span>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/70 dark:bg-black/40">
                Độ dài chuẩn: {activeLevelInfo.typicalLengthWords}
              </span>
            </div>

            <p className="leading-relaxed opacity-95">
              {activeLevelInfo.fullDescVi}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-stone-300/40 dark:border-stone-700/40 text-[11px]">
              <div>
                <span className="font-bold">Ngữ pháp trọng tâm: </span>
                <span className="opacity-90">{activeLevelInfo.grammarFocus.join(' • ')}</span>
              </div>
              <div>
                <span className="font-bold">Chủ đề từ vựng: </span>
                <span className="opacity-90">{activeLevelInfo.vocabularyFocus.join(' • ')}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lesson Grid */}
      {filteredLessons.length === 0 ? (
        <div className="bg-white dark:bg-stone-900 rounded-3xl p-12 text-center border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
          <BookOpen className="w-12 h-12 mx-auto text-stone-300 dark:text-stone-700" />
          <div className="space-y-1">
            <h3 className="text-base font-bold text-stone-800 dark:text-stone-200">
              Chưa có bài đọc nào ở cấp độ này
            </h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              Bạn có thể dễ dàng tạo ngay một bài đọc mới theo cấp độ này bằng tính năng Tạo bài đọc với Gemini AI.
            </p>
          </div>
          
          <button
            onClick={onOpenAIGenerator}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 font-bold text-xs shadow-md inline-flex items-center space-x-2 transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Tạo bài đọc cấp độ {selectedLevel !== 'all' ? selectedLevel : ''} ngay</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              isCompleted={progress.completedLessons.includes(lesson.id)}
              onSelect={onSelectLesson}
            />
          ))}
        </div>
      )}

      {/* Bottom Floating Promotion Card */}
      <div className="p-6 rounded-3xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center justify-center sm:justify-start space-x-2">
            <Wand2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Bạn muốn đọc về chủ đề yêu thích của riêng mình?</span>
          </h4>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Tạo bài đọc tiếng Anh tùy chọn bất kỳ với Gemini: du lịch, công nghệ, âm nhạc, tài chính, khoa học...
          </p>
        </div>

        <button
          onClick={onOpenAIGenerator}
          className="shrink-0 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center space-x-2 transition-colors cursor-pointer"
        >
          <span>Tạo bài mới với Gemini</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
