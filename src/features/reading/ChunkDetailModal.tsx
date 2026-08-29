import React from 'react';
import { 
  X, 
  Bookmark, 
  CheckCircle2, 
  Star, 
  BookOpen, 
  Lightbulb, 
  HelpCircle,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Chunk, SavedWord, WordLearningStatus } from '../../types';
import { ChunkTypeBadge } from '../../components/ChunkTypeBadge';
import { inferChunkCategory, CHUNK_TYPE_DEFINITIONS } from '../../types/chunkCategory';

interface ChunkDetailModalProps {
  chunk: Chunk | null;
  lessonId?: string;
  lessonTitle?: string;
  savedWord?: SavedWord;
  isKnown: boolean;
  onClose: () => void;
  onSaveWord: (chunk: Chunk, status: WordLearningStatus) => void;
  onToggleKnown: (chunkId: string) => void;
  onToggleStarred: (chunk: Chunk) => void;
}

export const ChunkDetailModal: React.FC<ChunkDetailModalProps> = ({
  chunk,
  savedWord,
  isKnown,
  onClose,
  onSaveWord,
  onToggleKnown,
  onToggleStarred,
}) => {
  if (!chunk) return null;

  const isSaved = !!savedWord;
  const isStarred = savedWord?.status === 'starred';
  const chunkCategory = inferChunkCategory(chunk);
  const categoryInfo = CHUNK_TYPE_DEFINITIONS[chunkCategory];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden text-stone-900 dark:text-stone-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ChunkTypeBadge category={chunkCategory} size="sm" />
            {isKnown && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-400 text-emerald-950 flex items-center space-x-1 shadow-2xs">
                <CheckCircle2 className="w-3 h-3" />
                <span>Đã thuộc</span>
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-5">
          
          {/* Main Chunk & Pronunciation */}
          <div className="flex flex-col space-y-2 border-b border-stone-100 dark:border-stone-800 pb-4">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 font-serif">
                  {chunk.text}
                </h2>
              </div>
              <div className="flex items-center space-x-2 mt-1.5 flex-wrap gap-y-1">
                <span className="text-sm font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200/60 dark:border-emerald-800/60">
                  {chunk.ipa || '/chunk/'}
                </span>
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  {chunk.partOfSpeech}
                </span>
              </div>
            </div>

            {/* Vietnamese Meaning Banner */}
            <div className="mt-3 p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/70">
              <div className="text-[11px] font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider mb-1 flex items-center space-x-1">
                <span>Nghĩa tiếng Việt chuẩn ngữ cảnh</span>
              </div>
              <p className="text-lg font-semibold text-emerald-950 dark:text-emerald-100 leading-snug">
                {chunk.vietnamese}
              </p>
            </div>
          </div>

          {/* SỐ 3: PHÂN LOẠI CỤM TỪ & GIẢI THÍCH "TẠI SAO DÙNG CỤM NÀY?" */}
          <div className="space-y-3">
            {/* Category Explanation Banner */}
            <div className={`p-3.5 rounded-2xl border ${categoryInfo.bgLight} ${categoryInfo.borderLight} space-y-1.5`}>
              <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wide">
                <span>{categoryInfo.icon}</span>
                <span className={categoryInfo.colorClass}>Đặc trưng {categoryInfo.labelVi}:</span>
              </div>
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                {categoryInfo.descriptionVi}
              </p>
            </div>

            {/* "Tại sao không dùng từ khác?" / So sánh cách diễn đạt tự nhiên */}
            {chunk.usageComparison ? (
              <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 space-y-2 text-xs">
                <div className="flex items-center space-x-1.5 font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wide text-[11px]">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>Tại sao không dùng từ khác? (Bẫy dịch từ sang từ)</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <div className="p-2.5 rounded-xl bg-emerald-100/60 dark:bg-emerald-950/60 border border-emerald-300/60 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200">
                    <span className="block font-bold text-[11px] text-emerald-800 dark:text-emerald-400">✓ Tự nhiên (Bản xứ):</span>
                    <span className="font-semibold text-xs mt-0.5 block font-serif">"{chunk.usageComparison.nativeWay}"</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-rose-100/60 dark:bg-rose-950/60 border border-rose-300/60 dark:border-rose-800 text-rose-950 dark:text-rose-200">
                    <span className="block font-bold text-[11px] text-rose-800 dark:text-rose-400">✗ Tránh dùng (Gượng gạo):</span>
                    <span className="font-semibold text-xs mt-0.5 block font-serif line-through">"{chunk.usageComparison.unnaturalMistake}"</span>
                  </div>
                </div>

                <p className="text-stone-700 dark:text-stone-300 pt-1 leading-relaxed italic border-t border-amber-200/50 dark:border-amber-900/40">
                  💡 {chunk.usageComparison.whyExplanation}
                </p>
              </div>
            ) : (
              /* Mặc định giải thích phân tích ngữ pháp */
              <div className="space-y-1.5">
                <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                  <span>Ngữ pháp & Bản chất cụm từ</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/80 text-xs text-stone-800 dark:text-stone-200 leading-relaxed">
                  {chunk.grammarNote || 'Cụm từ tự nhiên theo thói quen ngôn ngữ chuẩn xác của người bản xứ.'}
                </div>
              </div>
            )}

            {/* Related Collocations / Cụm từ liên quan nếu có */}
            {chunk.relatedCollocations && chunk.relatedCollocations.length > 0 && (
              <div className="p-3 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-900/40 space-y-1.5">
                <span className="text-[11px] font-bold text-indigo-800 dark:text-indigo-300 uppercase tracking-wider flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-indigo-600" />
                  <span>Collocations / Cụm từ cùng chủ đề:</span>
                </span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {chunk.relatedCollocations.map((colloc, idx) => (
                    <span 
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-stone-800 text-indigo-900 dark:text-indigo-200 border border-indigo-200/60 dark:border-indigo-800 font-medium"
                    >
                      {colloc}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Contextual Example Sentence */}
          {chunk.exampleSentence && (
            <div className="space-y-1.5">
              <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                <BookOpen className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span>Ví dụ ứng dụng trong câu khác</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80 space-y-1">
                <p className="text-xs sm:text-sm font-medium text-stone-900 dark:text-stone-100 font-serif">
                  "{chunk.exampleSentence}"
                </p>
                {chunk.exampleTranslation && (
                  <p className="text-xs text-stone-500 dark:text-stone-400 italic">
                    "{chunk.exampleTranslation}"
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Quick Learning Actions */}
          <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-wrap gap-2">
            
            {/* Save / Unsave Notebook Button */}
            <button
              onClick={() => onSaveWord(chunk, isSaved ? 'known' : 'learning')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center space-x-2 transition-all shadow-xs cursor-pointer ${
                isSaved
                  ? 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-stone-600 dark:fill-stone-300' : ''}`} />
              <span>{isSaved ? 'Đã lưu trong sổ' : 'Lưu vào sổ từ vựng'}</span>
            </button>

            {/* Mark as Known Toggle */}
            <button
              onClick={() => onToggleKnown(chunk.id)}
              className={`py-2.5 px-3.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center space-x-1.5 border transition-all cursor-pointer ${
                isKnown
                  ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700'
                  : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800'
              }`}
              title="Đánh dấu đã biết để ẩn dịch nghĩa tự động"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden sm:inline">{isKnown ? 'Đã thuộc' : 'Đánh dấu đã biết'}</span>
            </button>

            {/* Star / Favorite */}
            <button
              onClick={() => onToggleStarred(chunk)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                isStarred
                  ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 border-amber-300 dark:border-amber-700'
                  : 'bg-white dark:bg-stone-900 text-stone-500 border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800'
              }`}
              title="Thêm vào danh sách yêu thích"
            >
              <Star className={`w-4 h-4 ${isStarred ? 'fill-amber-500 text-amber-500' : ''}`} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
