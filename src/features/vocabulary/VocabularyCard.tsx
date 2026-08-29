import React from 'react';
import { Star, CheckCircle2, Trash2 } from 'lucide-react';
import { SavedWord, WordLearningStatus } from '../../types';
import { formatDate } from '../../utils/formatters';

interface VocabularyCardProps {
  word: SavedWord;
  onUpdateStatus: (wordId: string, status: WordLearningStatus) => void;
  onRemoveWord: (wordId: string) => void;
}

export const VocabularyCard: React.FC<VocabularyCardProps> = ({
  word,
  onUpdateStatus,
  onRemoveWord,
}) => {
  const isStarred = word.status === 'starred';
  const isKnown = word.status === 'known';

  return (
    <div className="group bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-xs hover:shadow-md hover:border-emerald-500/40 transition-all space-y-4">
      {/* Header Info */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-serif">
              {word.text}
            </h3>
          </div>

          <div className="flex items-center space-x-2 mt-1">
            <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-200/60 dark:border-emerald-800/60">
              {word.ipa || '/chunk/'}
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400">
              {word.partOfSpeech || 'Cụm từ'}
            </span>
          </div>
        </div>

        {/* Status Actions */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onUpdateStatus(word.id, isStarred ? 'learning' : 'starred')}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              isStarred
                ? 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400'
                : 'text-stone-400 hover:text-amber-500 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
            title="Đánh dấu sao"
          >
            <Star className={`w-4 h-4 ${isStarred ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={() => onRemoveWord(word.id)}
            className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
            title="Xóa khỏi sổ từ vựng"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Meaning */}
      <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/60">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
          Nghĩa tiếng Việt:
        </span>
        <p className="text-sm font-semibold text-emerald-950 dark:text-emerald-100 mt-0.5">
          {word.vietnamese}
        </p>
      </div>

      {/* Grammar Note */}
      {word.grammarNote && (
        <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
          💡 {word.grammarNote}
        </p>
      )}

      {/* Example */}
      {word.exampleSentence && (
        <div className="pt-2 border-t border-stone-100 dark:border-stone-800 text-xs space-y-1">
          <div className="flex items-center justify-between text-stone-500">
            <span className="font-semibold">Ví dụ trong ngữ cảnh:</span>
          </div>
          <p className="font-serif italic text-stone-800 dark:text-stone-200">
            "{word.exampleSentence}"
          </p>
          {word.exampleTranslation && (
            <p className="text-stone-500 italic">
              "{word.exampleTranslation}"
            </p>
          )}
        </div>
      )}

      {/* Footer Toggle Status */}
      <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
        <span className="text-stone-400">
          Lưu ngày: {formatDate(word.savedAt)}
        </span>

        <button
          onClick={() => onUpdateStatus(word.id, isKnown ? 'learning' : 'known')}
          className={`px-2.5 py-1 rounded-lg font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
            isKnown
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
              : 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300 hover:bg-emerald-50 hover:text-emerald-700'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{isKnown ? 'Đã thuộc' : 'Đang học'}</span>
        </button>
      </div>
    </div>
  );
};
