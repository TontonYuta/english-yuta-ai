import { ChunkCategory } from './chunkCategory';

export type WordLearningStatus = 'learning' | 'known' | 'starred';

export interface SavedWord {
  id: string;
  chunkId: string;
  text: string;
  vietnamese: string;
  ipa: string;
  partOfSpeech: string;
  grammarNote: string;
  exampleSentence: string;
  exampleTranslation: string;
  lessonId: string;
  lessonTitle: string;
  status: WordLearningStatus;
  savedAt: number;
  lastReviewedAt?: number;
  reviewCount: number;
  chunkType?: ChunkCategory;
  usageComparison?: {
    nativeWay: string;
    unnaturalMistake: string;
    whyExplanation: string;
  };
  relatedCollocations?: string[];
}
