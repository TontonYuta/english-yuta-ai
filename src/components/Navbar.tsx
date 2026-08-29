import React from 'react';
import { BookOpen, Bookmark, Flame, Sparkles, BarChart2, PlusCircle, Wand2, Bot } from 'lucide-react';
import { AppTab, UserProgress } from '../types';

interface NavbarProps {
  currentTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  progress: UserProgress;
  activeLessonTitle?: string;
  onBackToLibrary?: () => void;
  isGeminiOpen?: boolean;
  onToggleGemini?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  progress,
  activeLessonTitle,
  onBackToLibrary,
  isGeminiOpen,
  onToggleGemini,
}) => {
  const savedCount = progress.savedWords.length;
  const masteredCount = progress.savedWords.filter(w => w.status === 'known').length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                if (onBackToLibrary) onBackToLibrary();
                onSelectTab('library');
              }}
              className="flex items-center space-x-2.5 text-left group focus:outline-none cursor-pointer"
              title="Về thư viện bài đọc English Reading AI"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-bold text-stone-900 dark:text-stone-100 text-lg tracking-tight">
                    English Reading <span className="text-emerald-600 dark:text-emerald-400">AI</span>
                  </span>
                  <span className="px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 rounded-md border border-emerald-200 dark:border-emerald-800">
                    CEFR
                  </span>
                </div>
                <p className="text-xs text-stone-700 dark:text-stone-300 hidden sm:block">
                  Đọc hiểu theo cụm tự nhiên & Tạo bài bằng Gemini
                </p>
              </div>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => {
                if (onBackToLibrary) onBackToLibrary();
                onSelectTab('library');
              }}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 cursor-pointer ${
                currentTab === 'library' && !activeLessonTitle
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Thư viện bài đọc</span>
            </button>

            {/* AI Generator Tab */}
            <button
              onClick={() => onSelectTab('ai-generator')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 cursor-pointer ${
                currentTab === 'ai-generator'
                  ? 'bg-amber-50 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 font-bold border border-amber-300/60 dark:border-amber-800/60 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <Wand2 className="w-4 h-4 text-amber-500" />
              <span className="font-semibold text-amber-700 dark:text-amber-400">Tạo bài AI (Gemini)</span>
            </button>

            <button
              onClick={() => onSelectTab('notebook')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 relative cursor-pointer ${
                currentTab === 'notebook'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Sổ tay từ vựng</span>
              {savedCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onSelectTab('custom')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 cursor-pointer ${
                currentTab === 'custom'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>Nhập văn bản</span>
            </button>

            <button
              onClick={() => onSelectTab('stats')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 cursor-pointer ${
                currentTab === 'stats'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <BarChart2 className="w-4 h-4" />
              <span>Tiến độ & Chuỗi</span>
            </button>
          </nav>

          {/* Right Badges: Streak & Stats */}
          <div className="flex items-center space-x-2.5">
            {/* Streak Badge */}
            <div 
              onClick={() => onSelectTab('stats')}
              className="cursor-pointer flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200/80 dark:border-amber-800/80 text-amber-800 dark:text-amber-300 text-xs font-semibold hover:bg-amber-100 transition-colors"
              title={`${progress.streak} ngày học liên tiếp!`}
            >
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
              <span>{progress.streak} ngày</span>
            </div>

            {/* Mastered Words Badge */}
            <div 
              onClick={() => onSelectTab('notebook')}
              className="cursor-pointer hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/80 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 text-xs font-semibold hover:bg-emerald-100 transition-colors"
              title={`${savedCount} từ đã lưu (${masteredCount} đã thuộc)`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{savedCount} từ</span>
            </div>

            {/* Gemini Split View Toggle */}
            {onToggleGemini && (
              <button
                onClick={onToggleGemini}
                className={`cursor-pointer flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all shadow-xs ${
                  isGeminiOpen
                    ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-emerald-500/20 ring-2 ring-emerald-400/40'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
                title={isGeminiOpen ? "Đang mở Gemini (Tỷ lệ 7:3) - Nhấn để ẩn" : "Mở Gemini song song (Tỷ lệ 7:3)"}
              >
                <Bot className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
                <span>AI Assistant 7:3</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-stone-200 dark:border-stone-800 py-2 bg-white dark:bg-stone-900 px-1">
        <button
          onClick={() => {
            if (onBackToLibrary) onBackToLibrary();
            onSelectTab('library');
          }}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-xs font-medium cursor-pointer ${
            currentTab === 'library' && !activeLessonTitle
              ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
              : 'text-stone-500 dark:text-stone-400'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span className="mt-0.5 text-[11px]">Thư viện</span>
        </button>

        <button
          onClick={() => onSelectTab('ai-generator')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-xs font-medium cursor-pointer ${
            currentTab === 'ai-generator'
              ? 'text-amber-600 dark:text-amber-400 font-bold'
              : 'text-amber-600/70 dark:text-amber-400/70'
          }`}
        >
          <Wand2 className="w-5 h-5" />
          <span className="mt-0.5 text-[11px]">Tạo AI</span>
        </button>

        <button
          onClick={() => onSelectTab('notebook')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-xs font-medium relative cursor-pointer ${
            currentTab === 'notebook'
              ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
              : 'text-stone-500 dark:text-stone-400'
          }`}
        >
          <Bookmark className="w-5 h-5" />
          <span className="mt-0.5 text-[11px]">Từ vựng</span>
          {savedCount > 0 && (
            <span className="absolute top-0 right-1 w-2 h-2 rounded-full bg-emerald-500"></span>
          )}
        </button>

        <button
          onClick={() => onSelectTab('custom')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-xs font-medium cursor-pointer ${
            currentTab === 'custom'
              ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
              : 'text-stone-500 dark:text-stone-400'
          }`}
        >
          <PlusCircle className="w-5 h-5" />
          <span className="mt-0.5 text-[11px]">Nhập bài</span>
        </button>

        <button
          onClick={() => onSelectTab('stats')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-xs font-medium cursor-pointer ${
            currentTab === 'stats'
              ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
              : 'text-stone-500 dark:text-stone-400'
          }`}
        >
          <BarChart2 className="w-5 h-5" />
          <span className="mt-0.5 text-[11px]">Tiến độ</span>
        </button>
      </div>
    </header>
  );
};
