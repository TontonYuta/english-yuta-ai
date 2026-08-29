import React, { useState } from 'react';
import { 
  X, 
  RotateCw, 
  Sparkles, 
  Award
} from 'lucide-react';
import { SavedWord, WordLearningStatus } from '../../types';

interface FlashcardDeckProps {
  words: SavedWord[];
  onClose: () => void;
  onUpdateWordStatus: (wordId: string, status: WordLearningStatus) => void;
}

export const FlashcardDeck: React.FC<FlashcardDeckProps> = ({
  words,
  onClose,
  onUpdateWordStatus,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [learnedCount, setLearnedCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (words.length === 0) return null;

  const currentWord = words[currentIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleRate = (status: 'again' | 'good' | 'easy') => {
    if (status === 'easy' || status === 'good') {
      onUpdateWordStatus(currentWord.id, 'known');
      setLearnedCount(prev => prev + 1);
    } else {
      onUpdateWordStatus(currentWord.id, 'learning');
    }

    setIsFlipped(false);

    if (currentIndex + 1 < words.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setLearnedCount(0);
    setIsFinished(false);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 text-stone-900 dark:text-stone-100 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4 mb-6">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
                Luyện Flashcards Cụm Từ
              </h2>
              <p className="text-xs text-stone-500">
                Thẻ {currentIndex + 1} / {words.length}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Finished State */}
        {isFinished ? (
          <div className="text-center py-8 space-y-5">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-inner">
              <Award className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100">
              Hoàn thành phiên ôn tập!
            </h3>

            <p className="text-sm text-stone-600 dark:text-stone-400 max-w-sm mx-auto">
              Bạn đã ôn luyện xong {words.length} cụm từ và ghi nhớ thêm {learnedCount} từ vựng mới.
            </p>

            <div className="flex items-center justify-center space-x-3 pt-4">
              <button
                onClick={handleRestart}
                className="px-5 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 font-semibold text-sm transition-colors cursor-pointer"
              >
                Ôn tập lại
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-colors cursor-pointer"
              >
                Xong
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Progress line */}
            <div className="w-full h-1.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
              ></div>
            </div>

            {/* Flip Card Canvas */}
            <div
              onClick={handleFlip}
              className={`min-h-[260px] p-8 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center text-center select-none shadow-sm ${
                isFlipped
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
                  : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-700 hover:border-emerald-400'
              }`}
            >
              {!isFlipped ? (
                /* Front Side: English Chunk & Audio */
                <div className="space-y-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 text-stone-500 dark:text-stone-300">
                    {currentWord.partOfSpeech || 'Cụm từ'}
                  </span>

                  <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-50 font-serif tracking-tight">
                    {currentWord.text}
                  </h2>

                  <div className="flex items-center justify-center space-x-2 text-sm font-mono text-emerald-700 dark:text-emerald-400">
                    <span className="bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-200/60 dark:border-emerald-800/60">
                      {currentWord.ipa || '/chunk/'}
                    </span>
                  </div>

                  <div className="pt-4 text-xs text-stone-400 flex items-center justify-center space-x-1">
                    <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
                    <span>Chạm vào thẻ để lật xem nghĩa tiếng Việt</span>
                  </div>
                </div>
              ) : (
                /* Back Side: Vietnamese Translation & Examples */
                <div className="space-y-4 animate-in fade-in zoom-in-95 duration-150">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    Nghĩa tiếng Việt
                  </span>

                  <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                    {currentWord.vietnamese}
                  </h3>

                  {currentWord.grammarNote && (
                    <p className="text-xs text-stone-600 dark:text-stone-300 max-w-md mx-auto leading-relaxed bg-white/70 dark:bg-stone-800/80 p-2.5 rounded-xl border border-stone-200/60 dark:border-stone-700">
                      💡 {currentWord.grammarNote}
                    </p>
                  )}

                  {currentWord.exampleSentence && (
                    <div className="text-xs text-stone-700 dark:text-stone-300 italic font-serif max-w-md">
                      "{currentWord.exampleSentence}"
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Rating Buttons */}
            {isFlipped ? (
              <div className="grid grid-cols-3 gap-2.5 pt-2">
                <button
                  onClick={() => handleRate('again')}
                  className="py-3 px-2 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 dark:hover:bg-rose-900/80 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-bold transition-all cursor-pointer"
                >
                  Chưa thuộc (Học lại)
                </button>
                <button
                  onClick={() => handleRate('good')}
                  className="py-3 px-2 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 dark:hover:bg-amber-900/80 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold transition-all cursor-pointer"
                >
                  Tạm nhớ
                </button>
                <button
                  onClick={() => handleRate('easy')}
                  className="py-3 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                >
                  Đã thuộc làu 🎉
                </button>
              </div>
            ) : (
              <button
                onClick={handleFlip}
                className="w-full py-3 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold text-xs hover:opacity-90 transition-opacity cursor-pointer"
              >
                Lật xem đáp án
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
