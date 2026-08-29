import React, { useState } from 'react';
import { 
  Bookmark, 
  Search, 
  CheckCircle2, 
  Star, 
  Trash2, 
  RotateCw, 
  Layers, 
  ArrowLeft, 
  ArrowRight,
  Filter,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { SavedWord, WordLearningStatus } from '../types';
import { ChunkCategory, CHUNK_TYPE_DEFINITIONS, inferChunkCategory } from '../types/chunkCategory';
import { ChunkTypeBadge } from './ChunkTypeBadge';

interface VocabularyNotebookProps {
  savedWords: SavedWord[];
  onUpdateWordStatus: (wordId: string, status: WordLearningStatus) => void;
  onRemoveWord: (wordId: string) => void;
  onBackToLibrary: () => void;
}

export const VocabularyNotebook: React.FC<VocabularyNotebookProps> = ({
  savedWords,
  onUpdateWordStatus,
  onRemoveWord,
  onBackToLibrary,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'learning' | 'known' | 'starred'>('all');
  const [selectedCategory, setSelectedCategory] = useState<ChunkCategory | 'all'>('all');
  const [isFlashcardMode, setIsFlashcardMode] = useState(false);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // Filtered words based on search, status, and chunk category
  const filteredWords = savedWords.filter((w) => {
    const chunkCat = w.chunkType || inferChunkCategory(w);

    const matchesSearch = 
      w.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.vietnamese.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.partOfSpeech.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    // Status filter
    if (activeFilter === 'starred' && w.status !== 'starred') return false;
    if (activeFilter === 'learning' && w.status !== 'learning') return false;
    if (activeFilter === 'known' && w.status !== 'known') return false;

    // Category filter
    if (selectedCategory !== 'all' && chunkCat !== selectedCategory) return false;

    return true;
  });

  const handleNextFlashcard = () => {
    setIsCardFlipped(false);
    if (currentFlashcardIndex + 1 < filteredWords.length) {
      setCurrentFlashcardIndex(prev => prev + 1);
    } else {
      setCurrentFlashcardIndex(0);
    }
  };

  const handlePrevFlashcard = () => {
    setIsCardFlipped(false);
    if (currentFlashcardIndex > 0) {
      setCurrentFlashcardIndex(prev => prev - 1);
    } else {
      setCurrentFlashcardIndex(filteredWords.length - 1);
    }
  };

  const currentFlashcard = filteredWords[currentFlashcardIndex];
  const currentFlashcardCategory = currentFlashcard ? (currentFlashcard.chunkType || inferChunkCategory(currentFlashcard)) : 'general';
  const currentCategoryInfo = CHUNK_TYPE_DEFINITIONS[currentFlashcardCategory];

  // Category counts
  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = { all: savedWords.length };
    savedWords.forEach((w) => {
      const cat = w.chunkType || inferChunkCategory(w);
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [savedWords]);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-stone-900 rounded-3xl p-6 shadow-sm border border-stone-200 dark:border-stone-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <Bookmark className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 font-serif">
              Sổ tay Cụm từ & Collocations
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Tổng hợp {savedWords.length} cụm từ được phân loại chuyên sâu (Collocations, Phrasal Verbs, Idioms)
          </p>
        </div>

        {savedWords.length > 0 && (
          <button
            onClick={() => {
              setIsFlashcardMode(!isFlashcardMode);
              setIsCardFlipped(false);
              setCurrentFlashcardIndex(0);
            }}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all shadow-xs cursor-pointer ${
              isFlashcardMode
                ? 'bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700'
                : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-600/25 hover:from-emerald-700 hover:to-teal-700'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{isFlashcardMode ? 'Thoát Flashcard' : 'Luyện Flashcard Cụm từ'}</span>
          </button>
        )}
      </div>

      {/* FLASHCARD MODE VIEW */}
      {isFlashcardMode && filteredWords.length > 0 && currentFlashcard && (
        <div className="max-w-xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between text-xs font-bold text-stone-500 uppercase tracking-wider">
            <span>Thẻ {currentFlashcardIndex + 1} / {filteredWords.length}</span>
            <ChunkTypeBadge category={currentFlashcardCategory} size="sm" />
          </div>

          {/* Flip Card Container */}
          <div
            onClick={() => setIsCardFlipped(!isCardFlipped)}
            className="min-h-[360px] bg-white dark:bg-stone-900 rounded-3xl p-8 shadow-xl border-2 border-emerald-500/30 cursor-pointer flex flex-col justify-between hover:border-emerald-500 transition-all text-center group"
          >
            <div className="flex items-center justify-between">
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${currentCategoryInfo.badgePill}`}>
                {currentCategoryInfo.icon} {currentCategoryInfo.labelVi}
              </span>
              <span className="text-xs text-stone-400">Chạm để lật</span>
            </div>

            {/* Front vs Back Content */}
            {!isCardFlipped ? (
              <div className="my-auto space-y-3 py-6">
                <h2 className="text-3xl font-extrabold text-stone-900 dark:text-stone-100 font-serif tracking-tight">
                  {currentFlashcard.text}
                </h2>
                <p className="text-sm font-mono text-emerald-700 dark:text-emerald-400">
                  {currentFlashcard.ipa}
                </p>
                <p className="text-xs text-stone-400 italic pt-2">
                  (Chạm để xem nghĩa tiếng Việt, so sánh diễn đạt & ví dụ)
                </p>
              </div>
            ) : (
              <div className="my-auto space-y-3 py-2 text-left animate-in fade-in duration-150">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 rounded-2xl border border-emerald-200 dark:border-emerald-800">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase">Nghĩa tiếng Việt</span>
                  <p className="text-lg font-bold text-emerald-950 dark:text-emerald-100 mt-0.5">
                    {currentFlashcard.vietnamese}
                  </p>
                </div>

                {/* Usage Comparison if available */}
                {currentFlashcard.usageComparison ? (
                  <div className="p-3 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 text-xs space-y-1.5">
                    <div className="flex items-center space-x-1 font-bold text-amber-900 dark:text-amber-300 text-[11px]">
                      <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                      <span>Tại sao dùng cụm này?</span>
                    </div>
                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-emerald-800 dark:text-emerald-300 font-medium">✓ "{currentFlashcard.usageComparison.nativeWay}"</span>
                      <span className="text-rose-600 line-through">✗ "{currentFlashcard.usageComparison.unnaturalMistake}"</span>
                    </div>
                    <p className="text-[11px] text-stone-600 dark:text-stone-300 italic">
                      💡 {currentFlashcard.usageComparison.whyExplanation}
                    </p>
                  </div>
                ) : currentFlashcard.grammarNote ? (
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed bg-stone-50 dark:bg-stone-800/80 p-2.5 rounded-xl border border-stone-200 dark:border-stone-700">
                    💡 {currentFlashcard.grammarNote}
                  </p>
                ) : null}

                {currentFlashcard.exampleSentence && (
                  <div className="p-2.5 bg-stone-50 dark:bg-stone-800/60 rounded-2xl text-xs space-y-0.5">
                    <span className="font-bold text-stone-600 dark:text-stone-400 text-[11px]">Ví dụ: </span>
                    <p className="font-serif text-stone-900 dark:text-stone-100">"{currentFlashcard.exampleSentence}"</p>
                    {currentFlashcard.exampleTranslation && (
                      <p className="italic text-stone-500 text-[11px]">"{currentFlashcard.exampleTranslation}"</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Bottom Card Footer */}
            <div className="flex items-center justify-between text-xs text-stone-400 pt-2 border-t border-stone-100 dark:border-stone-800">
              <span>Bài: {currentFlashcard.lessonTitle}</span>
              <span className="flex items-center space-x-1 text-emerald-600 font-semibold">
                <RotateCw className="w-3.5 h-3.5" />
                <span>Lật thẻ</span>
              </span>
            </div>
          </div>

          {/* Flashcard Navigation & Rating Controls */}
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={handlePrevFlashcard}
              className="p-3 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 transition-all shadow-xs cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="flex-1 flex gap-2">
              <button
                onClick={() => {
                  onUpdateWordStatus(currentFlashcard.id, 'learning');
                  handleNextFlashcard();
                }}
                className="flex-1 py-3 rounded-2xl bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold transition-all cursor-pointer"
              >
                Cần ôn lại
              </button>

              <button
                onClick={() => {
                  onUpdateWordStatus(currentFlashcard.id, 'known');
                  handleNextFlashcard();
                }}
                className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
              >
                Đã thuộc ✓
              </button>
            </div>

            <button
              onClick={handleNextFlashcard}
              className="p-3 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 transition-all shadow-xs cursor-pointer"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* STANDARD LIST VIEW */}
      {!isFlashcardMode && (
        <div className="space-y-4">
          
          {/* Filter & Search Bar */}
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-5 shadow-sm border border-stone-200 dark:border-stone-800 space-y-4">
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Search Input */}
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm cụm từ, collocation, nghĩa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center space-x-1 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                {[
                  { id: 'all', label: 'Tất cả' },
                  { id: 'learning', label: 'Đang học' },
                  { id: 'known', label: 'Đã thuộc' },
                  { id: 'starred', label: 'Yêu thích ⭐' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setActiveFilter(f.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                      activeFilter === f.id
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* SỐ 3: PHÂN LOẠI CHUYÊN SÂU THEO LOẠI CỤM TỪ (COLLOCATIONS, PHRASAL VERBS, IDIOMS, ACADEMIC) */}
            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="font-bold text-stone-500 dark:text-stone-400 mr-1 flex items-center space-x-1">
                <Filter className="w-3.5 h-3.5 text-emerald-600" />
                <span>Loại cụm từ:</span>
              </span>

              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-2xs'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200'
                }`}
              >
                Tất cả ({categoryCounts.all || 0})
              </button>

              {(['collocation', 'phrasal-verb', 'academic-linking', 'idiom', 'lexical-phrase'] as ChunkCategory[]).map((cat) => {
                const info = CHUNK_TYPE_DEFINITIONS[cat];
                const count = categoryCounts[cat] || 0;
                const isSelected = selectedCategory === cat;

                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(isSelected ? 'all' : cat)}
                    className={`inline-flex items-center space-x-1 px-3 py-1 rounded-lg font-bold border transition-all cursor-pointer ${
                      isSelected
                        ? `${info.badgePill} ring-2 ring-emerald-500 scale-105`
                        : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span>{info.icon}</span>
                    <span>{info.labelVi}</span>
                    {count > 0 && <span className="opacity-70 text-[10px]">({count})</span>}
                  </button>
                );
              })}
            </div>

          </div>

          {/* Empty State */}
          {filteredWords.length === 0 && (
            <div className="bg-white dark:bg-stone-900 rounded-3xl p-12 text-center border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-400">
                <Bookmark className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-stone-800 dark:text-stone-200">
                Không tìm thấy cụm từ nào theo bộ lọc này
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Khi đọc bài, hãy click vào các cụm Collocation hoặc Phrasal Verb để lưu vào sổ tay.
              </p>
              <button
                onClick={onBackToLibrary}
                className="mt-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
              >
                Khám phá bài đọc ngay
              </button>
            </div>
          )}

          {/* Vocabulary Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredWords.map((word) => {
              const isKnown = word.status === 'known';
              const isStarred = word.status === 'starred';
              const chunkCat = word.chunkType || inferChunkCategory(word);
              const catInfo = CHUNK_TYPE_DEFINITIONS[chunkCat];

              return (
                <div
                  key={word.id}
                  className="bg-white dark:bg-stone-900 rounded-2xl p-5 shadow-sm border border-stone-200 dark:border-stone-800 hover:shadow-md transition-all space-y-3 relative group"
                >
                  {/* Top bar */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-serif">
                          {word.text}
                        </h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400">
                          {word.ipa}
                        </span>
                        <ChunkTypeBadge category={chunkCat} size="sm" />
                      </div>
                    </div>

                    <div className="flex items-center space-x-1">
                      {/* Star Button */}
                      <button
                        onClick={() => onUpdateWordStatus(word.id, isStarred ? 'learning' : 'starred')}
                        className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                          isStarred
                            ? 'bg-amber-50 text-amber-500 border-amber-300'
                            : 'text-stone-400 border-transparent hover:bg-stone-100 dark:hover:bg-stone-800'
                        }`}
                        title="Đánh dấu yêu thích"
                      >
                        <Star className={`w-3.5 h-3.5 ${isStarred ? 'fill-amber-500' : ''}`} />
                      </button>

                      {/* Remove Word Button */}
                      <button
                        onClick={() => onRemoveWord(word.id)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors cursor-pointer"
                        title="Xóa từ khỏi sổ tay"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Vietnamese Translation Banner */}
                  <div className="p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60">
                    <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                      {word.vietnamese}
                    </span>
                    <span className="text-[11px] text-stone-500 ml-2">
                      ({word.partOfSpeech})
                    </span>
                  </div>

                  {/* "Tại sao không dùng từ khác?" Section */}
                  {word.usageComparison ? (
                    <div className="p-2.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-xs space-y-1">
                      <div className="flex items-center space-x-1 font-bold text-amber-900 dark:text-amber-300 text-[11px]">
                        <HelpCircle className="w-3 h-3 text-amber-600" />
                        <span>Tại sao không dùng từ khác?</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] pt-0.5">
                        <span className="text-emerald-800 dark:text-emerald-300 font-semibold">✓ "{word.usageComparison.nativeWay}"</span>
                        <span className="text-rose-600 line-through">✗ "{word.usageComparison.unnaturalMistake}"</span>
                      </div>
                      <p className="text-[11px] text-stone-600 dark:text-stone-300 italic">
                        💡 {word.usageComparison.whyExplanation}
                      </p>
                    </div>
                  ) : null}

                  {/* Example */}
                  {word.exampleSentence && (
                    <div className="text-xs text-stone-600 dark:text-stone-300 bg-stone-50 dark:bg-stone-800/50 p-2.5 rounded-xl space-y-0.5">
                      <p className="font-serif font-medium text-stone-900 dark:text-stone-100">
                        "{word.exampleSentence}"
                      </p>
                      {word.exampleTranslation && (
                        <p className="italic text-stone-500 dark:text-stone-400 text-[11px]">
                          "{word.exampleTranslation}"
                        </p>
                      )}
                    </div>
                  )}

                  {/* Action status pill */}
                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800 text-xs">
                    <span className="text-[11px] text-stone-400 truncate max-w-[150px]">
                      {word.lessonTitle}
                    </span>

                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={() => onUpdateWordStatus(word.id, isKnown ? 'learning' : 'known')}
                        className={`px-2.5 py-1 rounded-lg font-semibold flex items-center space-x-1 border transition-all cursor-pointer ${
                          isKnown
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-300'
                            : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700'
                        }`}
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{isKnown ? 'Đã thuộc' : 'Đang học'}</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
};
