export type ExerciseType = 'fill-in-blank' | 'sentence-ordering' | 'vietnamese-to-english';

export interface BaseExercise {
  id: string;
  type: ExerciseType;
  instructions: string;
  instructionsVi: string;
  explanation: string;
  relatedChunkText?: string;
}

export interface FillInBlankExercise extends BaseExercise {
  type: 'fill-in-blank';
  sentenceBefore: string;
  sentenceAfter: string;
  correctAnswer: string;
  options: string[];
  vietnameseMeaning: string;
}

export interface SentenceOrderingExercise extends BaseExercise {
  type: 'sentence-ordering';
  vietnamesePrompt: string;
  correctWords: string[];
  scrambledWords: string[];
}

export interface TranslationExercise extends BaseExercise {
  type: 'vietnamese-to-english';
  vietnamesePrompt: string;
  correctAnswer: string;
  acceptableAnswers?: string[];
  wordBank: string[];
  hints: string[];
}

export type Exercise = FillInBlankExercise | SentenceOrderingExercise | TranslationExercise;
