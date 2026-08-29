import React, { useState } from 'react';
import { Chunk, Lesson, ReaderSettings, Sentence, UserProgress, WordLearningStatus } from '../types';
import { ReaderHeader } from '../features/reading/ReaderHeader';
import { InteractivePassage } from '../features/reading/InteractivePassage';
import { ChunkDetailModal } from '../features/reading/ChunkDetailModal';
import { ExerciseSection } from '../features/exercises/ExerciseSection';

interface ReaderPageProps {
  lesson: Lesson;
  settings: ReaderSettings;
  onUpdateSettings: (newSettings: Partial<ReaderSettings>) => void;
  progress: UserProgress;
  onBackToLibrary: () => void;
  onToggleKnownChunk: (chunkId: string) => void;
  onSaveWord: (chunk: Chunk, lessonId: string, lessonTitle: string, status: WordLearningStatus) => void;
  onToggleStarred: (chunk: Chunk, lessonId: string, lessonTitle: string) => void;
  onCompleteExercises: (lessonId: string, durationMinutes: number, score: number, total: number) => void;
}

export const ReaderPage: React.FC<ReaderPageProps> = ({
  lesson,
  settings,
  onUpdateSettings,
  progress,
  onBackToLibrary,
  onToggleKnownChunk,
  onSaveWord,
  onToggleStarred,
  onCompleteExercises,
}) => {
  const [activeTab, setActiveTab] = useState<'reading' | 'exercises'>('reading');
  const [activeSentence, setActiveSentence] = useState<Sentence | null>(null);
  const [selectedChunk, setSelectedChunk] = useState<Chunk | null>(null);

  const handleSelectChunk = (chunk: Chunk, sentence: Sentence) => {
    setSelectedChunk(chunk);
    setActiveSentence(sentence);
  };

  const handleSelectSentence = (sentence: Sentence) => {
    setActiveSentence(sentence);
  };

  const isLessonCompleted = progress.completedLessons.includes(lesson.id);
  const savedChunkIds = progress.savedWords.map(w => w.chunkId);

  const activeSavedWord = selectedChunk
    ? progress.savedWords.find(w => w.chunkId === selectedChunk.id || w.text.toLowerCase() === selectedChunk.text.toLowerCase())
    : undefined;

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header Controls */}
      <ReaderHeader
        lesson={lesson}
        settings={settings}
        onUpdateSettings={onUpdateSettings}
        onBack={onBackToLibrary}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isLessonCompleted={isLessonCompleted}
      />

      {/* Main Tab Content */}
      {activeTab === 'reading' ? (
        <InteractivePassage
          paragraphs={lesson.paragraphs}
          settings={settings}
          activeSentenceId={activeSentence?.id || null}
          onSelectSentence={handleSelectSentence}
          onSelectChunk={handleSelectChunk}
          knownChunkIds={progress.knownChunkIds}
          savedChunkIds={savedChunkIds}
          lessonTitle={lesson.title}
        />
      ) : (
        <ExerciseSection
          lesson={lesson}
          onCompleteExercises={(score, total) => {
            onCompleteExercises(lesson.id, lesson.durationMinutes, score, total);
          }}
          onBackToReading={() => setActiveTab('reading')}
        />
      )}

      {/* Chunk Detail Pop-up Modal */}
      {selectedChunk && (
        <ChunkDetailModal
          chunk={selectedChunk}
          lessonId={lesson.id}
          lessonTitle={lesson.title}
          savedWord={activeSavedWord}
          isKnown={progress.knownChunkIds.includes(selectedChunk.id)}
          onClose={() => setSelectedChunk(null)}
          onSaveWord={(chunk, status) => onSaveWord(chunk, lesson.id, lesson.title, status)}
          onToggleKnown={onToggleKnownChunk}
          onToggleStarred={(chunk) => onToggleStarred(chunk, lesson.id, lesson.title)}
        />
      )}
    </div>
  );
};
