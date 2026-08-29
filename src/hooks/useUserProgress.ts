import { useState, useEffect, useCallback } from 'react';
import { Chunk, SavedWord, UserProgress, WordLearningStatus } from '../types';
import { getStoredProgress, saveStoredProgress } from '../utils/storage';

export function useUserProgress() {
  const [progress, setProgress] = useState<UserProgress>(getStoredProgress);

  // Persist on change
  useEffect(() => {
    saveStoredProgress(progress);
  }, [progress]);

  // Toggle chunk known/unknown status
  const toggleKnownChunk = useCallback((chunkId: string) => {
    setProgress(prev => {
      const isKnown = prev.knownChunkIds.includes(chunkId);
      const newKnownIds = isKnown
        ? prev.knownChunkIds.filter(id => id !== chunkId)
        : [...prev.knownChunkIds, chunkId];

      const updatedSavedWords = prev.savedWords.map(w => {
        if (w.chunkId === chunkId) {
          return { ...w, status: isKnown ? ('learning' as WordLearningStatus) : ('known' as WordLearningStatus) };
        }
        return w;
      });

      return {
        ...prev,
        knownChunkIds: newKnownIds,
        savedWords: updatedSavedWords,
      };
    });
  }, []);

  // Save word or toggle saved state
  const saveWord = useCallback((chunk: Chunk, lessonId: string = 'custom', lessonTitle: string = 'Bài đọc', status: WordLearningStatus = 'learning') => {
    setProgress(prev => {
      const existing = prev.savedWords.find(
        w => w.chunkId === chunk.id || w.text.toLowerCase() === chunk.text.toLowerCase()
      );

      if (existing) {
        // Toggle off if already present
        return {
          ...prev,
          savedWords: prev.savedWords.filter(w => w.id !== existing.id),
        };
      }

      const newWord: SavedWord = {
        id: `word-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        chunkId: chunk.id,
        text: chunk.text,
        vietnamese: chunk.vietnamese,
        ipa: chunk.ipa,
        partOfSpeech: chunk.partOfSpeech,
        grammarNote: chunk.grammarNote,
        exampleSentence: chunk.exampleSentence,
        exampleTranslation: chunk.exampleTranslation,
        lessonId,
        lessonTitle,
        status,
        savedAt: Date.now(),
        reviewCount: 0,
      };

      return {
        ...prev,
        savedWords: [newWord, ...prev.savedWords],
      };
    });
  }, []);

  // Toggle star status
  const toggleStarred = useCallback((chunk: Chunk, lessonId: string = 'custom', lessonTitle: string = 'Bài đọc') => {
    setProgress(prev => {
      const existing = prev.savedWords.find(
        w => w.chunkId === chunk.id || w.text.toLowerCase() === chunk.text.toLowerCase()
      );

      if (existing) {
        const newStatus: WordLearningStatus = existing.status === 'starred' ? 'learning' : 'starred';
        return {
          ...prev,
          savedWords: prev.savedWords.map(w => (w.id === existing.id ? { ...w, status: newStatus } : w)),
        };
      }

      const newWord: SavedWord = {
        id: `word-${Date.now()}`,
        chunkId: chunk.id,
        text: chunk.text,
        vietnamese: chunk.vietnamese,
        ipa: chunk.ipa,
        partOfSpeech: chunk.partOfSpeech,
        grammarNote: chunk.grammarNote,
        exampleSentence: chunk.exampleSentence,
        exampleTranslation: chunk.exampleTranslation,
        lessonId,
        lessonTitle,
        status: 'starred',
        savedAt: Date.now(),
        reviewCount: 0,
      };

      return {
        ...prev,
        savedWords: [newWord, ...prev.savedWords],
      };
    });
  }, []);

  // Update word status from notebook
  const updateWordStatus = useCallback((wordId: string, status: WordLearningStatus) => {
    setProgress(prev => {
      const updated = prev.savedWords.map(w => {
        if (w.id === wordId) {
          return { ...w, status, lastReviewedAt: Date.now(), reviewCount: w.reviewCount + 1 };
        }
        return w;
      });

      const targetWord = prev.savedWords.find(w => w.id === wordId);
      let newKnownIds = [...prev.knownChunkIds];
      if (targetWord) {
        if (status === 'known' && !newKnownIds.includes(targetWord.chunkId)) {
          newKnownIds.push(targetWord.chunkId);
        } else if (status !== 'known') {
          newKnownIds = newKnownIds.filter(id => id !== targetWord.chunkId);
        }
      }

      return {
        ...prev,
        savedWords: updated,
        knownChunkIds: newKnownIds,
      };
    });
  }, []);

  // Remove word from notebook
  const removeWord = useCallback((wordId: string) => {
    setProgress(prev => ({
      ...prev,
      savedWords: prev.savedWords.filter(w => w.id !== wordId),
    }));
  }, []);

  // Record completed lesson and exercises
  const recordLessonCompleted = useCallback((lessonId: string, durationMinutes: number, score: number, total: number) => {
    setProgress(prev => {
      const isAlreadyCompleted = prev.completedLessons.includes(lessonId);
      const newCompleted = isAlreadyCompleted ? prev.completedLessons : [...prev.completedLessons, lessonId];

      return {
        ...prev,
        completedLessons: newCompleted,
        totalTimeMinutes: prev.totalTimeMinutes + (durationMinutes || 3),
        exerciseResults: {
          ...prev.exerciseResults,
          [lessonId]: {
            score,
            total,
            completedAt: new Date().toISOString(),
          },
        },
      };
    });
  }, []);

  return {
    progress,
    toggleKnownChunk,
    saveWord,
    toggleStarred,
    updateWordStatus,
    removeWord,
    recordLessonCompleted,
    completeLesson: recordLessonCompleted,
  };
}
