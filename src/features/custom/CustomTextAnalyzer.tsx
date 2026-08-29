import React, { useState } from 'react';
import { PlusCircle, Sparkles, FileText, ArrowRight, Wand2 } from 'lucide-react';
import { Lesson } from '../../types';
import { analyzeCustomPassage } from '../../utils/chunkAnalyzer';

interface CustomTextAnalyzerProps {
  onAnalyzeComplete: (customLesson: Lesson) => void;
}

const SAMPLE_TEXT_PRESETS = [
  {
    title: 'Daily Coffee Routine',
    text: 'Every morning, I wake up at 6:30 AM and drink a warm cup of black coffee. In order to stay healthy, I always take a brisk walk in the park before starting my workday.',
  },
  {
    title: 'Modern Remote Work',
    text: 'Working from home allows professionals to make a decision about their daily schedule. On the other hand, employees need to pay attention to their physical health and take care of their work-life balance.',
  },
  {
    title: 'Reading Habit Advantages',
    text: 'Reading English every day plays an important role in language acquisition. Due to natural chunking, learners can easily understand full sentences as soon as possible without mechanical word-by-word translation.',
  }
];

export const CustomTextAnalyzer: React.FC<CustomTextAnalyzerProps> = ({
  onAnalyzeComplete,
}) => {
  const [customTitle, setCustomTitle] = useState('');
  const [customText, setCustomText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customText.trim()) return;

    setIsProcessing(true);
    setTimeout(() => {
      const generatedLesson = analyzeCustomPassage(
        customText, 
        customTitle.trim() || 'Bài đọc tự nhập'
      );
      setIsProcessing(false);
      onAnalyzeComplete(generatedLesson);
    }, 400);
  };

  const handleSelectPreset = (preset: { title: string; text: string }) => {
    setCustomTitle(preset.title);
    setCustomText(preset.text);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-800 via-emerald-900 to-teal-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg border border-teal-700/50">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-teal-200 text-xs font-semibold">
            <Wand2 className="w-3.5 h-3.5" />
            <span>Bộ phân tích cụm từ thông minh</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif">
            Nhập Đoạn Văn Tiếng Anh Tùy Ý
          </h1>
          <p className="text-teal-100/80 text-xs sm:text-sm">
            Dán bất kỳ bài báo, đoạn tin tức hoặc đoạn văn tiếng Anh nào vào bên dưới. Thuật toán sẽ tự động nhận diện các cụm từ tự nhiên, gắn phiên âm và nghĩa tiếng Việt kèm chế độ đọc tương tác.
          </p>
        </div>
      </div>

      {/* Preset Suggestions */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
          Hoặc thử nhanh với các đoạn văn mẫu:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {SAMPLE_TEXT_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectPreset(preset)}
              className="p-3 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-left hover:border-emerald-500 hover:shadow-xs transition-all text-xs space-y-1 group"
            >
              <div className="font-bold text-stone-800 dark:text-stone-200 group-hover:text-emerald-600 transition-colors flex items-center justify-between">
                <span>{preset.title}</span>
                <Sparkles className="w-3 h-3 text-amber-500" />
              </div>
              <p className="text-stone-500 line-clamp-2 italic">
                "{preset.text}"
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form 
        onSubmit={handleAnalyze}
        className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4"
      >
        <div className="space-y-1">
          <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
            Tiêu đề bài đọc (Tùy chọn)
          </label>
          <input
            type="text"
            placeholder="Ví dụ: My Favorite Daily Routine..."
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
            className="w-full px-4 py-2.5 text-sm rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider flex items-center justify-between">
            <span>Nội dung đoạn văn tiếng Anh</span>
            <span className="text-stone-400 font-normal">{customText.length} ký tự</span>
          </label>
          <textarea
            rows={7}
            required
            placeholder="Dán đoạn văn tiếng Anh của bạn tại đây..."
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            className="w-full p-4 text-sm font-serif leading-relaxed rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-y"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isProcessing || !customText.trim()}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 text-white font-bold text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center space-x-2 transition-all cursor-pointer"
        >
          {isProcessing ? (
            <span>Đang phân tích các cụm từ...</span>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Phân tích cụm từ & Bắt đầu đọc</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
