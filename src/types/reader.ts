export type ReadingMode = 'bilingual' | 'hidden' | 'english-only';

export type DifficultyLevel = 
  | 'A1' 
  | 'A2' 
  | 'B1' 
  | 'B2' 
  | 'C1' 
  | 'C2' 
  | 'beginner' 
  | 'elementary' 
  | 'intermediate' 
  | 'advanced';

export type ReaderTheme = 'paper' | 'ivory' | 'dark' | 'oled';

export type ReaderFont = 'sans' | 'serif' | 'vietnam' | 'lexend';

export type InlineBadgeStyle = 'subtext' | 'parentheses' | 'pill';

export type SentenceTranslationMode = 'always' | 'hover' | 'hidden';

export interface ReaderSettings {
  readingMode: ReadingMode;
  fontSize: number;
  lineSpacing: number;
  fontFamily: ReaderFont;
  theme: ReaderTheme;
  autoScroll: boolean;
  inlineBadgeStyle: InlineBadgeStyle;
  showChunkDividers: boolean;
  sentenceTranslationMode: SentenceTranslationMode;
  focusSentenceMode: boolean;
  showChunkTypeHighlights?: boolean;
  speechRate?: number;
}


