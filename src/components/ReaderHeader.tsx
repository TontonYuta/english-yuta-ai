import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Settings2, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  RotateCcw, 
  BookOpen, 
  Eye, 
  EyeOff, 
  Type, 
  Sparkles,
  Award,
  Sun,
  Moon,
  ChevronDown,
  Layers
} from 'lucide-react';
import { Lesson, ReaderFont, ReaderSettings, ReaderTheme, ReadingMode } from '../types';

interface ReaderHeaderProps {
  lesson: Lesson;
  settings: ReaderSettings;
  onUpdateSettings: (newSettings: Partial<ReaderSettings>) => void;
  onBack: () => void;
  isPlayingArticle: boolean;
  onTogglePlayArticle: () => void;
  onJumpToExercises: () => void;
  hasExercises: boolean;
}

export const ReaderHeader: React.FC<ReaderHeaderProps> = ({
  lesson,
  settings,
  onUpdateSettings,
  onBack,
  isPlayingArticle,
  onTogglePlayArticle,
  onJumpToExercises,
  hasExercises,
}) => {
  const [showSettingsPopover, setShowSettingsPopover] = useState(false);

  const readingModes: { id: ReadingMode; label: string; sub: string; icon: React.ReactNode }[] = [
    {
      id: 'bilingual',
      label: 'Song ngữ',
      sub: 'Hiển thị cụm + nghĩa',
      icon: <Layers className="w-4 h-4" />
    },
    {
      id: 'hidden',
      label: 'Ẩn bản dịch',
      sub: 'Chạm/rê chuột để xem',
      icon: <EyeOff className="w-4 h-4" />
    },
    {
      id: 'english-only',
      label: 'Chỉ Tiếng Anh',
      sub: 'Đọc chìm đắm chuẩn',
      icon: <BookOpen className="w-4 h-4" />
    }
  ];

  const themes: { id: ReaderTheme; label: string; bg: string; text: string; ring: string }[] = [
    { id: 'paper', label: 'Giấy sáng', bg: 'bg-[#faf8f5]', text: 'text-stone-900', ring: 'ring-stone-300' },
    { id: 'ivory', label: 'Sepia ấm', bg: 'bg-[#f4ecd8]', text: 'text-[#5f4b32]', ring: 'ring-amber-300' },
    { id: 'dark', label: 'Tối êm mắt', bg: 'bg-[#1e232a]', text: 'text-stone-200', ring: 'ring-stone-600' },
    { id: 'oled', label: 'Đen OLED', bg: 'bg-black', text: 'text-stone-300', ring: 'ring-stone-800' },
  ];

  const fonts: { id: ReaderFont; label: string; class: string }[] = [
    { id: 'sans', label: 'Plus Jakarta Sans', class: 'font-sans' },
    { id: 'serif', label: 'Lora Serif (Kindle)', class: 'font-serif' },
    { id: 'vietnam', label: 'Be Vietnam Pro', class: 'font-vietnam' },
    { id: 'lexend', label: 'Lexend (Dễ đọc)', class: 'font-lexend' },
  ];

  return (
    <div className="sticky top-16 z-30 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 shadow-xs transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          
          {/* Left: Back button and Lesson Title */}
          <div className="flex items-center space-x-3 min-w-0">
            <button
              onClick={onBack}
              className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors focus:outline-none"
              title="Quay lại danh sách bài đọc"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="min-w-0">
              <div className="flex items-center space-x-2">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-md border ${lesson.badgeColor || 'bg-stone-100 text-stone-800 border-stone-200'}`}>
                  {lesson.levelLabel.split(' - ')[0]}
                </span>
                <span className="text-xs text-stone-500 dark:text-stone-400 hidden sm:inline">
                  • {lesson.durationMinutes} phút đọc
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 truncate">
                {lesson.title}
              </h1>
            </div>
          </div>

          {/* Center / Right: Mode Switcher & Controls */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            
            {/* Reading Mode Tabs */}
            <div className="flex items-center p-1 bg-stone-100 dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700">
              {readingModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => onUpdateSettings({ readingMode: mode.id })}
                  className={`flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    settings.readingMode === mode.id
                      ? 'bg-white dark:bg-stone-700 text-emerald-700 dark:text-emerald-300 shadow-xs'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                  }`}
                  title={mode.sub}
                >
                  {mode.icon}
                  <span className="hidden sm:inline">{mode.label}</span>
                </button>
              ))}
            </div>

            {/* Audio Auto-Read Play / Pause */}
            <button
              onClick={onTogglePlayArticle}
              className={`p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all border ${
                isPlayingArticle
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-600/30 animate-pulse'
                  : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-700'
              }`}
              title={isPlayingArticle ? 'Tạm dừng đọc bài' : 'Nghe toàn bộ bài đọc'}
            >
              {isPlayingArticle ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              <span className="hidden md:inline">{isPlayingArticle ? 'Dừng đọc' : 'Nghe bài'}</span>
            </button>

            {/* Kindle-Style Typography & Theme Settings Button */}
            <div className="relative">
              <button
                onClick={() => setShowSettingsPopover(!showSettingsPopover)}
                className={`p-2 rounded-xl text-stone-700 dark:text-stone-200 border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors ${
                  showSettingsPopover ? 'bg-stone-100 dark:bg-stone-800 ring-2 ring-emerald-500' : 'bg-white dark:bg-stone-800'
                }`}
                title="Tùy chỉnh cỡ chữ, phông chữ và giao diện đọc"
              >
                <Settings2 className="w-4 h-4" />
              </button>

              {/* Settings Dropdown Popover */}
              {showSettingsPopover && (
                <div 
                  className="absolute right-0 mt-2 w-72 sm:w-80 bg-white dark:bg-stone-900 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-800 p-4 space-y-4 z-50 animate-in fade-in zoom-in-95 duration-150 text-stone-900 dark:text-stone-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                      Tùy biến hiển thị
                    </span>
                    <button
                      onClick={() => setShowSettingsPopover(false)}
                      className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
                    >
                      Xong
                    </button>
                  </div>

                  {/* Font Size Adjuster */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold text-stone-600 dark:text-stone-400">
                      <span>Cỡ chữ: {settings.fontSize}px</span>
                      <span className="text-[11px] text-stone-400">A- / A+</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onUpdateSettings({ fontSize: Math.max(14, settings.fontSize - 1) })}
                        className="px-3 py-1.5 bg-stone-100 dark:bg-stone-800 rounded-lg text-xs font-bold hover:bg-stone-200 dark:hover:bg-stone-700"
                      >
                        A-
                      </button>
                      <input
                        type="range"
                        min="14"
                        max="26"
                        step="1"
                        value={settings.fontSize}
                        onChange={(e) => onUpdateSettings({ fontSize: Number(e.target.value) })}
                        className="flex-1 accent-emerald-600 cursor-pointer"
                      />
                      <button
                        onClick={() => onUpdateSettings({ fontSize: Math.min(26, settings.fontSize + 1) })}
                        className="px-3 py-1.5 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm font-bold hover:bg-stone-200 dark:hover:bg-stone-700"
                      >
                        A+
                      </button>
                    </div>
                  </div>

                  {/* Reading Theme */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">Chủ đề màu nền</span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {themes.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => onUpdateSettings({ theme: t.id })}
                          className={`p-2 rounded-xl text-xs font-medium border flex items-center space-x-2 transition-all ${t.bg} ${t.text} ${
                            settings.theme === t.id ? `ring-2 ring-emerald-500 border-transparent shadow-xs font-bold` : 'border-stone-200 dark:border-stone-700 opacity-80'
                          }`}
                        >
                          <span className="w-3 h-3 rounded-full border border-stone-400 bg-current"></span>
                          <span>{t.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Font Family */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">Phông chữ</span>
                    <div className="grid grid-cols-1 gap-1">
                      {fonts.map((f) => (
                        <button
                          key={f.id}
                          onClick={() => onUpdateSettings({ fontFamily: f.id })}
                          className={`px-3 py-1.5 rounded-lg text-xs text-left transition-all border flex items-center justify-between ${
                            settings.fontFamily === f.id
                              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 font-semibold'
                              : 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                          }`}
                        >
                          <span className={f.class}>{f.label}</span>
                          {settings.fontFamily === f.id && <span className="text-emerald-600 font-bold">✓</span>}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Inline Translation Style (Parentheses / Pill / Subtext) */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">Kiểu hiển thị nghĩa tiếng Việt</span>
                    <div className="grid grid-cols-3 gap-1">
                      {[
                        { id: 'parentheses', label: '(nghĩa)' },
                        { id: 'pill', label: 'Thẻ tag' },
                        { id: 'subtext', label: 'Chữ nhỏ' },
                      ].map((style) => (
                        <button
                          key={style.id}
                          onClick={() => onUpdateSettings({ inlineBadgeStyle: style.id as any })}
                          className={`py-1.5 px-2 rounded-lg text-xs text-center border transition-all ${
                            settings.inlineBadgeStyle === style.id
                              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 text-emerald-800 dark:text-emerald-300 font-bold'
                              : 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400'
                          }`}
                        >
                          {style.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Speech Rate Slider */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold text-stone-600 dark:text-stone-400">
                      <span>Tốc độ đọc giọng nói AI</span>
                      <span>{settings.speechRate}x</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      {[0.75, 1.0, 1.25].map((rate) => (
                        <button
                          key={rate}
                          onClick={() => onUpdateSettings({ speechRate: rate })}
                          className={`py-1 rounded-lg text-xs font-semibold border ${
                            settings.speechRate === rate
                              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 text-emerald-800 dark:text-emerald-300'
                              : 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400'
                          }`}
                        >
                          {rate}x {rate === 0.75 ? '(Chậm)' : rate === 1.0 ? '(Chuẩn)' : '(Nhanh)'}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* Jump to Exercises Button */}
            {hasExercises && (
              <button
                onClick={onJumpToExercises}
                className="px-3 sm:px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center space-x-1.5 transition-all focus:outline-none"
              >
                <Award className="w-4 h-4" />
                <span>Luyện tập</span>
              </button>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
