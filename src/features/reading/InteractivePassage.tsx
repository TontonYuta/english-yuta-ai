import React, { useState } from 'react';
import { 
  Bookmark, 
  Lightbulb, 
  Eye, 
  EyeOff, 
  Sparkles,
  Layers,
  Filter
} from 'lucide-react';
import { Chunk, Paragraph, ReaderSettings, Sentence } from '../../types';
import { ChunkCategory, CHUNK_TYPE_DEFINITIONS, inferChunkCategory } from '../../types/chunkCategory';
import { ChunkTypeBadge } from '../../components/ChunkTypeBadge';

interface InteractivePassageProps {
  paragraphs: Paragraph[];
  settings: ReaderSettings;
  activeSentenceId: string | null;
  onSelectSentence: (sentence: Sentence) => void;
  onSelectChunk: (chunk: Chunk, sentence: Sentence) => void;
  knownChunkIds: string[];
  savedChunkIds: string[];
  lessonTitle: string;
}

export const InteractivePassage: React.FC<InteractivePassageProps> = ({
  paragraphs,
  settings,
  activeSentenceId,
  onSelectSentence,
  onSelectChunk,
  knownChunkIds,
  savedChunkIds,
}) => {
  const [revealedChunkIds, setRevealedChunkIds] = useState<Record<string, boolean>>({});
  const [expandedSentenceNotes, setExpandedSentenceNotes] = useState<Record<string, boolean>>({});
  const [revealedSentenceTranslations, setRevealedSentenceTranslations] = useState<Record<string, boolean>>({});
  const [highlightedCategory, setHighlightedCategory] = useState<ChunkCategory | 'all'>('all');

  const handleToggleReveal = (e: React.MouseEvent, chunkId: string) => {
    e.stopPropagation();
    setRevealedChunkIds(prev => ({
      ...prev,
      [chunkId]: !prev[chunkId],
    }));
  };

  const handleToggleSentenceNote = (e: React.MouseEvent, sentenceId: string) => {
    e.stopPropagation();
    setExpandedSentenceNotes(prev => ({
      ...prev,
      [sentenceId]: !prev[sentenceId],
    }));
  };

  const handleToggleSentenceTranslation = (e: React.MouseEvent, sentenceId: string) => {
    e.stopPropagation();
    setRevealedSentenceTranslations(prev => ({
      ...prev,
      [sentenceId]: !prev[sentenceId],
    }));
  };

  // Determine theme styles
  const getThemeClass = () => {
    switch (settings.theme) {
      case 'ivory':
        return 'bg-[#f7f2e7] text-[#2c2214] border-amber-200/80';
      case 'dark':
        return 'bg-[#181d24] text-stone-200 border-stone-800';
      case 'oled':
        return 'bg-black text-stone-300 border-stone-900';
      case 'paper':
      default:
        return 'bg-white text-stone-900 border-stone-200';
    }
  };

  // Determine font family
  const getFontFamilyClass = () => {
    switch (settings.fontFamily) {
      case 'serif':
        return 'font-serif';
      case 'vietnam':
        return 'font-vietnam';
      case 'lexend':
        return 'font-lexend';
      case 'sans':
      default:
        return 'font-sans';
    }
  };

  // Collect all unique categories present in the current passage
  const presentCategories = React.useMemo(() => {
    const set = new Set<ChunkCategory>();
    paragraphs.forEach(p => {
      p.sentences.forEach(s => {
        s.chunks.forEach(c => {
          set.add(inferChunkCategory(c));
        });
      });
    });
    return Array.from(set);
  }, [paragraphs]);

  return (
    <div className="space-y-4">
      {/* Category Filter Toolbar - Cho phép người học lọc & làm nổi bật Collocations, Phrasal Verbs, Idioms */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-white/80 dark:bg-stone-900/80 backdrop-blur-xs rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-2xs text-xs">
        <div className="flex items-center space-x-1.5 text-stone-600 dark:text-stone-300 font-bold">
          <Filter className="w-3.5 h-3.5 text-emerald-600" />
          <span>Lọc loại cụm từ:</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setHighlightedCategory('all')}
            className={`px-2.5 py-1 rounded-full font-bold transition-all cursor-pointer ${
              highlightedCategory === 'all'
                ? 'bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 shadow-2xs'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200'
            }`}
          >
            Tất cả
          </button>

          {presentCategories.map(cat => {
            const info = CHUNK_TYPE_DEFINITIONS[cat];
            const isSelected = highlightedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setHighlightedCategory(isSelected ? 'all' : cat)}
                className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full font-bold transition-all border cursor-pointer ${
                  isSelected
                    ? `${info.badgePill} ring-2 ring-emerald-500 scale-105`
                    : 'bg-stone-50 dark:bg-stone-800/80 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700 hover:bg-stone-100'
                }`}
              >
                <span>{info.icon}</span>
                <span>{info.labelVi}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Reading Article */}
      <article 
        className={`rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm border transition-colors duration-300 ${getThemeClass()} ${getFontFamilyClass()}`}
        style={{
          fontSize: `${settings.fontSize}px`,
          lineHeight: settings.lineSpacing || 1.8,
        }}
      >
        <div className="max-w-3xl mx-auto space-y-8">
          
          {/* Paragraphs and Sentences */}
          {paragraphs.map((paragraph, pIndex) => (
            <div key={paragraph.id || `p-${pIndex}`} className="space-y-6">
              {paragraph.sentences.map((sentence) => {
                const isActive = activeSentenceId === sentence.id;
                const hasSentenceNote = !!sentence.sentenceGrammarNote;
                const isNoteOpen = !!expandedSentenceNotes[sentence.id];
                const isTransRevealed = !!revealedSentenceTranslations[sentence.id];

                // Check if translation should be displayed
                const showTranslation = 
                  settings.sentenceTranslationMode === 'always' ||
                  (settings.sentenceTranslationMode === 'hover' && isTransRevealed);

                // Focus mode dimming
                const isDimmed = settings.focusSentenceMode && activeSentenceId && !isActive;

                return (
                  <div
                    key={sentence.id}
                    id={`sentence-${sentence.id}`}
                    onClick={() => onSelectSentence(sentence)}
                    className={`group relative rounded-2xl p-3 sm:p-4 transition-all duration-200 cursor-pointer ${
                      isDimmed ? 'opacity-40 hover:opacity-100' : 'opacity-100'
                    } ${
                      isActive
                        ? settings.theme === 'dark' || settings.theme === 'oled'
                          ? 'bg-emerald-950/40 ring-1 ring-emerald-600/50 shadow-sm'
                          : settings.theme === 'ivory'
                          ? 'bg-amber-200/40 ring-1 ring-amber-400/60 shadow-sm'
                          : 'bg-emerald-50/80 ring-1 ring-emerald-500/40 shadow-sm'
                        : 'hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    {/* Sentence Controls Bar */}
                    <div className="flex items-center justify-between mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center space-x-2">
                        {hasSentenceNote && (
                          <button
                            onClick={(e) => handleToggleSentenceNote(e, sentence.id)}
                            className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 text-xs font-medium hover:bg-amber-200 transition-colors shadow-xs"
                            title="Xem ngữ pháp câu"
                          >
                            <Lightbulb className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                            <span>Ngữ pháp câu</span>
                          </button>
                        )}

                        {settings.sentenceTranslationMode === 'hover' && (
                          <button
                            onClick={(e) => handleToggleSentenceTranslation(e, sentence.id)}
                            className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-stone-200/80 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-medium hover:bg-stone-300 transition-colors"
                            title={isTransRevealed ? 'Ẩn bản dịch' : 'Hiện bản dịch'}
                          >
                            {isTransRevealed ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                            <span>{isTransRevealed ? 'Ẩn dịch' : 'Dịch câu'}</span>
                          </button>
                        )}
                      </div>

                      <span className="text-[11px] opacity-60 hidden sm:inline select-none">
                        Chạm cụm để xem giải thích & Collocation
                      </span>
                    </div>

                    {/* Sentence Grammar Expandable Note */}
                    {hasSentenceNote && isNoteOpen && (
                      <div 
                        className="mb-3 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-900/60 text-xs sm:text-sm text-stone-800 dark:text-stone-200 animate-in fade-in duration-150"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="font-bold text-amber-900 dark:text-amber-300 mb-1 flex items-center space-x-1.5">
                          <Lightbulb className="w-4 h-4 text-amber-600" />
                          <span>Điểm ngữ pháp cần lưu ý trong câu:</span>
                        </div>
                        <p className="leading-relaxed pl-5">{sentence.sentenceGrammarNote}</p>
                      </div>
                    )}

                    {/* Chunks rendering with high legibility & category styles */}
                    <div className="inline flex-wrap items-baseline tracking-normal">
                      {sentence.chunks.map((chunk, cIndex) => {
                        const isKnown = knownChunkIds.includes(chunk.id);
                        const isSaved = savedChunkIds.includes(chunk.id);
                        const isRevealed = !!revealedChunkIds[chunk.id];
                        const chunkCat = inferChunkCategory(chunk);
                        const catInfo = CHUNK_TYPE_DEFINITIONS[chunkCat];
                        const isCategoryHighlighted = highlightedCategory === 'all' || highlightedCategory === chunkCat;

                        return (
                          <span
                            key={chunk.id || `c-${cIndex}`}
                            className={`inline-block mr-1.5 my-1 align-baseline transition-opacity duration-200 ${
                              !isCategoryHighlighted ? 'opacity-30' : 'opacity-100'
                            } ${
                              settings.inlineBadgeStyle === 'subtext' && settings.readingMode === 'bilingual'
                                ? 'align-bottom'
                                : 'align-baseline'
                            }`}
                          >
                            {/* Interactive English Chunk */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectChunk(chunk, sentence);
                              }}
                              className={`group/chunk relative text-left font-medium transition-all rounded-lg px-2 py-1 inline-flex items-baseline focus:outline-none ${
                                isSaved
                                  ? 'bg-amber-100/80 dark:bg-amber-950/60 underline decoration-amber-500 decoration-2 text-amber-950 dark:text-amber-100'
                                  : highlightedCategory !== 'all' && highlightedCategory === chunkCat
                                  ? `${catInfo.bgLight} ring-1.5 ring-emerald-500`
                                  : 'hover:bg-emerald-500/15 dark:hover:bg-emerald-500/25'
                              } ${
                                isKnown
                                  ? 'opacity-85'
                                  : 'font-semibold'
                              }`}
                              title={`[${catInfo.labelVi}] Bấm để xem phân loại, phiên âm và ví dụ`}
                            >
                              {/* Small Category Mini Icon Indicator for special chunks */}
                              {chunkCat !== 'general' && (
                                <span className="text-[10px] mr-1 select-none opacity-80" title={catInfo.labelVi}>
                                  {catInfo.icon}
                                </span>
                              )}

                              <span className="border-b border-dotted border-current/40 group-hover/chunk:border-solid group-hover/chunk:border-emerald-600">
                                {chunk.text}
                              </span>

                              {isSaved && (
                                <Bookmark className="w-2.5 h-2.5 inline-block ml-0.5 fill-amber-500 text-amber-500" />
                              )}
                            </button>

                            {/* Punctuation attached to chunk */}
                            {chunk.punctuationAfter && (
                              <span className="font-normal opacity-90 mr-0.5">
                                {chunk.punctuationAfter}
                              </span>
                            )}

                            {/* 1. BILINGUAL MODE: Direct Natural Translation Gloss */}
                            {settings.readingMode === 'bilingual' && !isKnown && (
                              <span className="ml-1 inline-block align-baseline select-none">
                                {settings.inlineBadgeStyle === 'parentheses' && (
                                  <span className="text-[0.78em] font-normal text-emerald-700 dark:text-emerald-400 opacity-90">
                                    ({chunk.vietnamese})
                                  </span>
                                )}

                                {settings.inlineBadgeStyle === 'pill' && (
                                  <span className="text-[0.74em] font-medium px-1.5 py-0.5 rounded-md bg-emerald-100/90 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60 whitespace-nowrap">
                                    {chunk.vietnamese}
                                  </span>
                                )}

                                {settings.inlineBadgeStyle === 'subtext' && (
                                  <span className="block text-[0.7em] text-emerald-700 dark:text-emerald-400 font-normal leading-tight text-center">
                                    {chunk.vietnamese}
                                  </span>
                                )}
                              </span>
                            )}

                            {/* 2. HIDE TRANSLATION MODE: Peek / Reveal on Hover or Tap */}
                            {settings.readingMode === 'hidden' && (
                              <span 
                                onClick={(e) => handleToggleReveal(e, chunk.id)}
                                className="ml-1 inline-block align-baseline cursor-pointer"
                                title="Nhấn để hiện nghĩa tiếng Việt"
                              >
                                {isRevealed ? (
                                  <span className="text-[0.75em] font-medium px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 animate-in fade-in">
                                    {chunk.vietnamese}
                                  </span>
                                ) : (
                                  <span className="text-[0.7em] px-1 py-0.2 rounded bg-stone-200 dark:bg-stone-800 text-stone-500 select-none hover:bg-stone-300">
                                    ···
                                  </span>
                                )}
                              </span>
                            )}
                          </span>
                        );
                      })}
                    </div>

                    {/* Sentence Full Translation (Bilingual or Hover) */}
                    {showTranslation && (
                      <div className="mt-2.5 pt-2 border-t border-stone-200/60 dark:border-stone-800 text-xs sm:text-sm text-stone-600 dark:text-stone-400 italic flex items-start space-x-2">
                        <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400 select-none mt-0.5">
                          Dịch:
                        </span>
                        <p className="flex-1 leading-relaxed">
                          {sentence.vietnamese}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}

        </div>
      </article>
    </div>
  );
};
