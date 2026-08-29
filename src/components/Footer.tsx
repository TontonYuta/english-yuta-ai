import React from 'react';
import { BookOpen, Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-stone-200 dark:border-stone-800 py-10 bg-white/50 dark:bg-stone-900/50 text-xs text-stone-500 dark:text-stone-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-600 flex items-center justify-center text-white text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-stone-800 dark:text-stone-200">
            English Reading AI
          </span>
          <span>• Đọc hiểu tiếng Anh theo cụm từ tự nhiên cho người Việt</span>
        </div>

        <div className="flex items-center space-x-4">
          <span>Hỗ trợ 3 chế độ đọc • Phát âm AI • Sổ tay Flashcards • Bài tập tương tác</span>
        </div>
      </div>
    </footer>
  );
};
