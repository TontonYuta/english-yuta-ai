import { DifficultyLevel } from './reader';
import { Exercise } from './exercise';
import { ChunkCategory } from './chunkCategory';

export interface Chunk {
  id: string;
  text: string;
  vietnamese: string;
  ipa: string;
  partOfSpeech: string;
  grammarNote: string;
  exampleSentence: string;
  exampleTranslation: string;
  synonyms?: string[];
  punctuationAfter?: string;
  chunkType?: ChunkCategory;
  usageComparison?: {
    nativeWay: string;
    unnaturalMistake: string;
    whyExplanation: string;
  };
  relatedCollocations?: string[];
}

export interface Sentence {
  id: string;
  text: string;
  vietnamese: string;
  chunks: Chunk[];
  sentenceGrammarNote?: string;
}

export interface Paragraph {
  id: string;
  sentences: Sentence[];
}

export interface Lesson {
  id: string;
  title: string;
  titleVi: string;
  level: DifficultyLevel;
  levelLabel: string;
  category: string;
  durationMinutes: number;
  wordCount: number;
  description: string;
  descriptionVi: string;
  icon: string;
  badgeColor: string;
  paragraphs: Paragraph[];
  exercises: Exercise[];
  keyVocabulary: string[];
  isUserCreated?: boolean;
  createdAt?: number;
  promptUsed?: string;
}
