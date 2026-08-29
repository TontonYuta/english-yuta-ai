import React, { useState, useMemo } from 'react';
import { 
  Bookmark, 
  Search, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  Star, 
  BookOpen, 
  Clock 
} from 'lucide-react';
import { SavedWord, WordLearningStatus } from '../../types';
import { VocabularyCard } from './VocabularyCard';
import { FlashcardDeck } from './FlashcardDeck';

interface VocabularyNotebookProps {
  savedWords: SavedWord[];
  onUpdateWordStatus: (wordId: string, status: WordLearningStatus) => void;
  onRemoveWord: (wordId: string) => void;
  onBackToReading?: () => void;
}

export const VocabularyNotebook: React.FC<VocabularyNotebookProps> = ({
  savedWords,
  onUpdateWordStatus,
  onRemoveWord,
  onBackToReading,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'learning' | 'known' | 'starred'>('all');
  const [isFlashcardOpen, setIsFlashcardOpen] = useState(false);

  // Filtered and searched list
  const filteredWords = useMemo(() => {
    return savedWords.filter(word => {
      const matchSearch =
        word.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        word.vietnamese.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchSearch) return false;

      if (activeFilter === 'all') return true;
      if (activeFilter === 'starred') return word.status === 'starred';
      if (activeFilter === 'known') return word.status === 'known';
      if (activeFilter === 'learning') return word.status === 'learning';

      return true;
    });
  }, [savedWords, searchQuery, activeFilter]);

  const knownCount = savedWords.filter(w => w.status === 'known').length;
  const starredCount = savedWords.filter(w => w.status === 'starred').length;
  const learningCount = savedWords.filter(w => w.status === 'learning').length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg border border-emerald-700/50">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-emerald-200 text-xs font-semibold">
              <Bookmark className="w-3.5 h-3.5" />
              <span>Sổ tay từ vựng thông minh</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif">
              Từ Vựng & Cụm Từ Đã Lưu
            </h1>
            <p className="text-emerald-100/80 text-xs sm:text-sm max-w-xl">
              Toàn bộ các cụm từ bạn đã bấm lưu trong các bài đọc. Hãy ôn luyện theo phương pháp Flashcards để ghi nhớ sâu vào phản xạ.
            </p>
          </div>

          {/* Quick Action: Start Flashcards */}
          {savedWords.length > 0 && (
            <button
              onClick={() => setIsFlashcardOpen(true)}
              className="px-6 py-3.5 rounded-2xl bg-white text-emerald-900 hover:bg-emerald-50 font-bold text-sm shadow-xl flex items-center justify-center space-x-2 transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Luyện Flashcards ({savedWords.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Control Bar: Search & Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-stone-900 p-3 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
        
        {/* Search Field */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo cụm từ hoặc nghĩa tiếng Việt..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              activeFilter === 'all'
                ? 'bg-emerald-600 text-white'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            Tất cả ({savedWords.length})
          </button>

          <button
            onClick={() => setActiveFilter('learning')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              activeFilter === 'learning'
                ? 'bg-emerald-600 text-white'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            Đang học ({learningCount})
          </button>

          <button
            onClick={() => setActiveFilter('known')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              activeFilter === 'known'
                ? 'bg-emerald-600 text-white'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            Đã thuộc ({knownCount})
          </button>

          <button
            onClick={() => setActiveFilter('starred')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              activeFilter === 'starred'
                ? 'bg-amber-600 text-white'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            Đã đánh sao ({starredCount})
          </button>
        </div>

      </div>

      {/* Words Grid */}
      {filteredWords.length === 0 ? (
        <div className="bg-white dark:bg-stone-900 rounded-3xl p-12 text-center border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-400">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200">
            {savedWords.length === 0 ? 'Chưa có cụm từ nào được lưu' : 'Không tìm thấy cụm từ phù hợp'}
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            {savedWords.length === 0
              ? 'Khi đọc bài, hãy bấm vào các cụm từ quan trọng và chọn "Lưu vào sổ từ vựng" để ôn tập lại tại đây.'
              : 'Hãy thử tìm kiếm bằng từ khóa khác hoặc chuyển bộ lọc trạng thái.'}
          </p>

          {savedWords.length === 0 && onBackToReading && (
            <button
              onClick={onBackToReading}
              className="mt-2 px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md hover:bg-emerald-700 transition-colors"
            >
              Mở thư viện bài đọc
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWords.map((word) => (
            <VocabularyCard
              key={word.id}
              word={word}
              onUpdateStatus={onUpdateWordStatus}
              onRemoveWord={onRemoveWord}
            />
          ))}
        </div>
      )}

      {/* Spaced Repetition Flashcards Modal */}
      {isFlashcardOpen && (
        <FlashcardDeck
          words={filteredWords.length > 0 ? filteredWords : savedWords}
          onClose={() => setIsFlashcardOpen(false)}
          onUpdateWordStatus={onUpdateWordStatus}
        />
      )}
    </div>
  );
};
