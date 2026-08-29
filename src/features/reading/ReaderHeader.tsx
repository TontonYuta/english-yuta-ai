import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  Sliders, 
  Eye, 
  Layers,
  Sparkle,
  Split,
  MessageSquareQuote,
  AlignLeft,
  MoveVertical
} from 'lucide-react';
import { Lesson, ReaderSettings } from '../../types';

interface ReaderHeaderProps {
  lesson: Lesson;
  settings: ReaderSettings;
  onUpdateSettings: (newSettings: Partial<ReaderSettings>) => void;
  onBack: () => void;
  activeTab: 'reading' | 'exercises';
  onSelectTab: (tab: 'reading' | 'exercises') => void;
  isLessonCompleted: boolean;
}

export const ReaderHeader: React.FC<ReaderHeaderProps> = ({
  lesson,
  settings,
  onUpdateSettings,
  onBack,
  activeTab,
  onSelectTab,
  isLessonCompleted,
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="space-y-3.5">
      {/* Top Bar with Navigation & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
        
        {/* Back & Title */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 transition-colors"
            title="Quay lại danh sách bài đọc"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider border ${lesson.badgeColor || 'bg-emerald-100 text-emerald-800 border-emerald-200'}`}>
                {lesson.levelLabel}
              </span>
              <span className="text-xs text-stone-400 font-mono hidden sm:inline">
                {lesson.durationMinutes} phút đọc • {lesson.wordCount} từ
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 tracking-tight line-clamp-1">
              {lesson.title}
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          
          {/* Reading / Exercises Toggle */}
          <div className="bg-stone-100 dark:bg-stone-800 p-1 rounded-xl flex items-center space-x-1">
            <button
              onClick={() => onSelectTab('reading')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1 ${
                activeTab === 'reading'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Bài đọc</span>
            </button>

            <button
              onClick={() => onSelectTab('exercises')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1 ${
                activeTab === 'exercises'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Luyện tập ({lesson.exercises?.length || 0})</span>
              {isLessonCompleted && (
                <CheckCircle2 className="w-3 h-3 text-emerald-500 fill-emerald-100 dark:fill-emerald-950" />
              )}
            </button>
          </div>

          {/* Reader Settings Toggle */}
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className={`p-2.5 rounded-xl border transition-colors ${
              isSettingsOpen
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700 dark:bg-emerald-950 dark:border-emerald-700 dark:text-emerald-300'
                : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-50'
            }`}
            title="Tùy chỉnh giao diện đọc"
          >
            <Sliders className="w-4 h-4" />
          </button>

        </div>
      </div>

      {/* Reader Mode Selector Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-stone-100 dark:bg-stone-800/80 p-1.5 rounded-2xl border border-stone-200/80 dark:border-stone-800">
        <button
          onClick={() => onUpdateSettings({ readingMode: 'bilingual' })}
          className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-all ${
            settings.readingMode === 'bilingual'
              ? 'bg-white dark:bg-stone-900 text-emerald-700 dark:text-emerald-300 shadow-xs border border-stone-200 dark:border-stone-700'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>1. Song ngữ (English + Nghĩa cụm)</span>
        </button>

        <button
          onClick={() => onUpdateSettings({ readingMode: 'hidden' })}
          className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-all ${
            settings.readingMode === 'hidden'
              ? 'bg-white dark:bg-stone-900 text-emerald-700 dark:text-emerald-300 shadow-xs border border-stone-200 dark:border-stone-700'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>2. Ẩn nghĩa (Chạm [?] để xem)</span>
        </button>

        <button
          onClick={() => onUpdateSettings({ readingMode: 'english-only' })}
          className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-all ${
            settings.readingMode === 'english-only'
              ? 'bg-white dark:bg-stone-900 text-emerald-700 dark:text-emerald-300 shadow-xs border border-stone-200 dark:border-stone-700'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
          }`}
        >
          <Sparkle className="w-3.5 h-3.5" />
          <span>3. Chỉ Tiếng Anh (Kindle Focus)</span>
        </button>
      </div>

      {/* Expandable Reader Customization Drawer */}
      {isSettingsOpen && (
        <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-md space-y-5 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center space-x-1.5">
              <Sliders className="w-4 h-4 text-emerald-600" />
              <span>Tùy chỉnh đọc thông minh</span>
            </h3>
            <button
              onClick={() => setIsSettingsOpen(false)}
              className="text-xs text-emerald-600 hover:underline font-semibold"
            >
              Đóng lại
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            
            {/* 1. Font Size */}
            <div className="space-y-1.5 bg-stone-50 dark:bg-stone-800/40 p-3 rounded-xl">
              <span className="font-bold text-stone-700 dark:text-stone-300 flex justify-between">
                <span>Cỡ chữ</span>
                <span className="text-emerald-600 font-mono">{settings.fontSize}px</span>
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onUpdateSettings({ fontSize: Math.max(14, settings.fontSize - 2) })}
                  className="px-3 py-1.5 rounded-lg bg-white dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 font-bold border border-stone-200 dark:border-stone-700"
                >
                  A-
                </button>
                <input
                  type="range"
                  min="14"
                  max="28"
                  step="1"
                  value={settings.fontSize}
                  onChange={(e) => onUpdateSettings({ fontSize: Number(e.target.value) })}
                  className="flex-1 accent-emerald-600 cursor-pointer"
                />
                <button
                  onClick={() => onUpdateSettings({ fontSize: Math.min(28, settings.fontSize + 2) })}
                  className="px-3 py-1.5 rounded-lg bg-white dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 font-bold border border-stone-200 dark:border-stone-700"
                >
                  A+
                </button>
              </div>
            </div>

            {/* 2. Theme Paper/Ivory/Dark */}
            <div className="space-y-1.5 bg-stone-50 dark:bg-stone-800/40 p-3 rounded-xl">
              <span className="font-bold text-stone-700 dark:text-stone-300">
                Màu nền trang sách
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => onUpdateSettings({ theme: 'paper' })}
                  className={`py-1.5 px-2 rounded-lg border text-center font-medium transition-all ${
                    settings.theme === 'paper'
                      ? 'bg-white text-stone-900 border-emerald-600 ring-2 ring-emerald-500/20'
                      : 'bg-white text-stone-700 border-stone-200'
                  }`}
                >
                  Trắng
                </button>
                <button
                  onClick={() => onUpdateSettings({ theme: 'ivory' })}
                  className={`py-1.5 px-2 rounded-lg border text-center font-medium transition-all ${
                    settings.theme === 'ivory'
                      ? 'bg-[#f7f2e7] text-[#2c2214] border-amber-600 ring-2 ring-amber-500/20'
                      : 'bg-[#f7f2e7] text-[#2c2214] border-amber-200'
                  }`}
                >
                  Giấy ngà
                </button>
                <button
                  onClick={() => onUpdateSettings({ theme: 'dark' })}
                  className={`py-1.5 px-2 rounded-lg border text-center font-medium transition-all ${
                    settings.theme === 'dark'
                      ? 'bg-[#181d24] text-stone-200 border-emerald-500 ring-2 ring-emerald-500/20'
                      : 'bg-[#181d24] text-stone-300 border-stone-700'
                  }`}
                >
                  Tối dịu
                </button>
              </div>
            </div>

            {/* 3. Phông chữ */}
            <div className="space-y-1.5 bg-stone-50 dark:bg-stone-800/40 p-3 rounded-xl">
              <span className="font-bold text-stone-700 dark:text-stone-300">
                Phông chữ hiển thị
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => onUpdateSettings({ fontFamily: 'sans' })}
                  className={`py-1.5 px-1 rounded-lg border text-center font-sans font-medium transition-all ${
                    settings.fontFamily === 'sans'
                      ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 border-emerald-500'
                      : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                  }`}
                >
                  Hiện đại
                </button>
                <button
                  onClick={() => onUpdateSettings({ fontFamily: 'serif' })}
                  className={`py-1.5 px-1 rounded-lg border text-center font-serif font-medium transition-all ${
                    settings.fontFamily === 'serif'
                      ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 border-emerald-500'
                      : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                  }`}
                >
                  Sách báo
                </button>
                <button
                  onClick={() => onUpdateSettings({ fontFamily: 'lexend' })}
                  className={`py-1.5 px-1 rounded-lg border text-center font-lexend font-medium transition-all ${
                    settings.fontFamily === 'lexend'
                      ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 border-emerald-500'
                      : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                  }`}
                >
                  Lexend
                </button>
              </div>
            </div>

            {/* 4. Line Spacing Controls */}
            <div className="space-y-1.5">
              <span className="font-bold text-stone-700 dark:text-stone-300 flex items-center space-x-1">
                <MoveVertical className="w-3.5 h-3.5 text-emerald-600" />
                <span>Khoảng cách dòng</span>
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { label: 'Gọn (1.5)', value: 1.5 },
                  { label: 'Chuẩn (1.8)', value: 1.8 },
                  { label: 'Rộng (2.2)', value: 2.2 },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => onUpdateSettings({ lineSpacing: item.value })}
                    className={`py-1.5 px-1 rounded-lg border text-center font-medium text-xs transition-all ${
                      (settings.lineSpacing || 1.8) === item.value
                        ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 border-emerald-500 font-semibold'
                        : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Row 2: Advanced Readability Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-3 border-t border-stone-100 dark:border-stone-800">
            
            {/* Inline Gloss Style */}
            <div className="space-y-1.5">
              <span className="font-bold text-stone-700 dark:text-stone-300">
                Kiểu hiển thị nghĩa cụm
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => onUpdateSettings({ inlineBadgeStyle: 'pill' })}
                  className={`py-1.5 px-2 rounded-lg border text-center font-medium ${
                    settings.inlineBadgeStyle === 'pill'
                      ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 border-emerald-500'
                      : 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700'
                  }`}
                >
                  Thẻ Pill [nghĩa]
                </button>
                <button
                  onClick={() => onUpdateSettings({ inlineBadgeStyle: 'parentheses' })}
                  className={`py-1.5 px-2 rounded-lg border text-center font-medium ${
                    settings.inlineBadgeStyle === 'parentheses'
                      ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 border-emerald-500'
                      : 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700'
                  }`}
                >
                  Ngoặc (nghĩa)
                </button>
                <button
                  onClick={() => onUpdateSettings({ inlineBadgeStyle: 'subtext' })}
                  className={`py-1.5 px-2 rounded-lg border text-center font-medium ${
                    settings.inlineBadgeStyle === 'subtext'
                      ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 border-emerald-500'
                      : 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700'
                  }`}
                >
                  Dưới chữ
                </button>
              </div>
            </div>

            {/* Chunk Divider Toggle */}
            <div className="space-y-1.5">
              <span className="font-bold text-stone-700 dark:text-stone-300">
                Dấu phân cách cụm từ
              </span>
              <button
                onClick={() => onUpdateSettings({ showChunkDividers: !settings.showChunkDividers })}
                className={`w-full py-2 px-3 rounded-lg border flex items-center justify-between font-semibold transition-all ${
                  settings.showChunkDividers
                    ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 border-emerald-500'
                    : 'bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700'
                }`}
              >
                <span className="flex items-center space-x-1.5">
                  <Split className="w-3.5 h-3.5" />
                  <span>Ký hiệu phân cụm ( / )</span>
                </span>
                <span>{settings.showChunkDividers ? 'Bật' : 'Tắt'}</span>
              </button>
            </div>

            {/* Sentence Translation Mode */}
            <div className="space-y-1.5">
              <span className="font-bold text-stone-700 dark:text-stone-300">
                Dịch câu tiếng Việt
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => onUpdateSettings({ sentenceTranslationMode: 'hover' })}
                  className={`py-1.5 px-2 rounded-lg border text-center font-medium ${
                    settings.sentenceTranslationMode === 'hover'
                      ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 border-emerald-500'
                      : 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700'
                  }`}
                >
                  Hiện khi rê/chạm
                </button>
                <button
                  onClick={() => onUpdateSettings({ sentenceTranslationMode: 'always' })}
                  className={`py-1.5 px-2 rounded-lg border text-center font-medium ${
                    settings.sentenceTranslationMode === 'always'
                      ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 border-emerald-500'
                      : 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700'
                  }`}
                >
                  Luôn hiển thị
                </button>
              </div>
            </div>

          </div>

        </div>
      )}
    </div>
  );
};
