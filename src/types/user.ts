import { SavedWord } from './vocabulary';

export interface ExerciseResult {
  score: number;
  total: number;
  completedAt: string;
}

export interface UserProgress {
  completedLessons: string[];
  knownChunkIds: string[];
  savedWords: SavedWord[];
  streak: number;
  lastActiveDate: string;
  totalTimeMinutes: number;
  exerciseResults: Record<string, ExerciseResult>;
}

export type AppTab = 'library' | 'ai-generator' | 'notebook' | 'custom' | 'stats';
