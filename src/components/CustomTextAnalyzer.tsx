import React, { useState } from 'react';
import { Sparkles, FileText, ArrowRight, BookOpen, Layers, Zap } from 'lucide-react';
import { Lesson } from '../types';
import { analyzeCustomPassage } from '../utils/chunkAnalyzer';

interface CustomTextAnalyzerProps {
  onStartReadingCustomLesson: (lesson: Lesson) => void;
}

export const CustomTextAnalyzer: React.FC<CustomTextAnalyzerProps> = ({
  onStartReadingCustomLesson,
}) => {
  const [title, setTitle] = useState('');
  const [rawText, setRawText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const sampleTexts = [
    {
      label: '☕ Cà phê và Năng lượng (Daily Life)',
      title: 'The Science of Morning Coffee',
      content: `Drinking coffee in the morning has become an essential ritual for millions of people worldwide. Research suggests that caffeine stimulates the central nervous system, helping you stay alert and focused. However, taking a short walk in the morning sunlight can be equally powerful in waking up your circadian rhythm.`
    },
    {
      label: '🌱 Thói quen tí hon (Atomic Habits)',
      title: 'Building Unstoppable Momentum',
      content: `Small habits don't add up; they compound. When you get one percent better each day for a whole year, you will end up thirty-seven times better by the time you're done. Start with a tiny action that takes less than two minutes, and watch your daily consistency create massive results.`
    },
    {
      label: '🚀 Công nghệ & AI (Tech & Future)',
      title: 'The Evolution of Human-AI Collaboration',
      content: `Artificial intelligence is no longer just a futuristic concept; it is actively transforming how we write, code, and acquire new languages. Instead of replacing human creativity, modern AI tools act as cognitive amplifiers that help us overcome creative blocks and learn faster than ever before.`
    }
  ];

  const handleApplySample = (sample: { title: string; content: string }) => {
    setTitle(sample.title);
    setRawText(sample.content);
  };

  const handleAnalyzeAndRead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawText.trim()) return;

    setIsProcessing(true);
    setTimeout(() => {
      const generatedLesson = analyzeCustomPassage(rawText, title.trim() || 'Bài đọc tự nhập');
      setIsProcessing(false);
      onStartReadingCustomLesson(generatedLesson);
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Title & Introduction */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200 dark:border-stone-800 space-y-2">
        <div className="flex items-center space-x-2">
          <span className="p-2 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300">
            <Zap className="w-5 h-5" />
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 font-serif">
            Nhập bài đọc tùy chỉnh (Custom Article AI)
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
          Dán bất kỳ đoạn văn, bài báo, email hoặc bài luận tiếng Anh nào của bạn. Hệ thống sẽ tự động phân tích câu thành các cụm từ (chunks) tự nhiên kèm phiên âm, nghĩa tiếng Việt và hỗ trợ đọc tương tác 3 chế độ!
        </p>
      </div>

      {/* Main Input Form */}
      <form onSubmit={handleAnalyzeAndRead} className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200 dark:border-stone-800 space-y-5">
        
        {/* Sample text picker pills */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Hoặc chọn nhanh đoạn văn mẫu:</span>
          </span>
          <div className="flex flex-wrap gap-2">
            {sampleTexts.map((st, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplySample(st)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-stone-100 dark:bg-stone-800 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-950 dark:hover:text-emerald-300 border border-stone-200 dark:border-stone-700 transition-colors text-stone-700 dark:text-stone-300"
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* Title Input */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
            Tiêu đề bài đọc (Tùy chọn)
          </label>
          <input
            type="text"
            placeholder="Ví dụ: My Favorite Travel Memory..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Textarea Input */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
            Nội dung tiếng Anh (Paragraphs / Article) *
          </label>
          <textarea
            rows={7}
            required
            placeholder="Dán nội dung tiếng Anh vào đây (ví dụ: I usually go to school every day in the morning...)"
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            className="w-full p-4 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed font-serif"
          ></textarea>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex items-center justify-between">
          <span className="text-xs text-stone-400">
            {rawText.trim() ? `${rawText.trim().split(/\s+/).length} từ` : '0 từ'}
          </span>

          <button
            type="submit"
            disabled={!rawText.trim() || isProcessing}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm shadow-md shadow-emerald-600/25 flex items-center space-x-2 transition-all"
          >
            <BookOpen className="w-4 h-4" />
            <span>{isProcessing ? 'Đang phân tích cụm...' : 'Bắt đầu đọc tương tác'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>

    </div>
  );
};
