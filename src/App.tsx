import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AppTab, Chunk, Lesson, WordLearningStatus } from './types';
import { useReaderSettings } from './hooks/useReaderSettings';
import { useUserProgress } from './hooks/useUserProgress';
import { Navbar, Footer, GeminiSidebar } from './components';
import { 
  LibraryPage, 
  ReaderPage, 
  NotebookPage, 
  CustomAnalyzerPage, 
  ProgressPage,
  AILessonGeneratorPage
} from './pages';
import { GripVertical } from 'lucide-react';

const STORAGE_KEY_GEMINI_OPEN = 'english_reading_ai_gemini_open';
const STORAGE_KEY_GEMINI_RATIO = 'english_reading_ai_gemini_ratio';

export default function App() {
  const [currentTab, setCurrentTab] = useState<AppTab>('library');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  // Gemini Split View State (default: open with 30% right, 70% left = 7:3 ratio)
  const [isGeminiOpen, setIsGeminiOpen] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_GEMINI_OPEN);
    return saved !== null ? saved === 'true' : true;
  });

  const [geminiRatio, setGeminiRatio] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_GEMINI_RATIO);
    if (saved) {
      const parsed = parseFloat(saved);
      if (!isNaN(parsed) && parsed >= 15 && parsed <= 75) {
        return parsed;
      }
    }
    return 30; // 30% Gemini (Right) : 70% App (Left) -> 7:3
  });

  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_GEMINI_OPEN, String(isGeminiOpen));
  }, [isGeminiOpen]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_GEMINI_RATIO, String(geminiRatio));
  }, [geminiRatio]);

  // Resizing logic
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const totalWidth = rect.width;
    const newLeftRatio = (x / totalWidth) * 100;
    const newRightRatio = 100 - newLeftRatio;

    // Constrain between 18% and 65%
    if (newRightRatio >= 18 && newRightRatio <= 65) {
      setGeminiRatio(newRightRatio);
    }
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
    }
  }, [isDragging]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Custom Hooks for State Management & Local Storage Persistence
  const { settings, updateSettings } = useReaderSettings();
  const { 
    progress, 
    toggleKnownChunk, 
    saveWord, 
    toggleStarred, 
    updateWordStatus, 
    removeWord, 
    completeLesson 
  } = useUserProgress();

  // Navigation handlers
  const handleSelectLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToLibrary = () => {
    setActiveLesson(null);
    setCurrentTab('library');
  };

  const handleTabChange = (tab: AppTab) => {
    setActiveLesson(null);
    setCurrentTab(tab);
  };

  return (
    <div className="h-screen flex flex-col bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors overflow-hidden">
      
      {/* Top Main Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleTabChange}
        progress={progress}
        activeLessonTitle={activeLesson?.title}
        onBackToLibrary={handleBackToLibrary}
        isGeminiOpen={isGeminiOpen}
        onToggleGemini={() => setIsGeminiOpen(prev => !prev)}
      />

      {/* Main Split Layout Container */}
      <div 
        ref={containerRef}
        className="flex-1 flex flex-row overflow-hidden relative"
      >
        {/* Left Side: English Reading AI (70% default) */}
        <div 
          style={{ width: isGeminiOpen ? `${100 - geminiRatio}%` : '100%' }}
          className="h-full overflow-y-auto flex flex-col justify-between transition-all duration-75 select-text"
        >
          <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-7">
            {activeLesson ? (
              /* Active Reading / Exercise View */
              <ReaderPage
                lesson={activeLesson}
                settings={settings}
                onUpdateSettings={updateSettings}
                progress={progress}
                onBackToLibrary={handleBackToLibrary}
                onToggleKnownChunk={toggleKnownChunk}
                onSaveWord={(chunk: Chunk, lessonId: string, lessonTitle: string, status: WordLearningStatus) => {
                  saveWord(chunk, lessonId, lessonTitle, status);
                }}
                onToggleStarred={(chunk: Chunk, lessonId: string, lessonTitle: string) => {
                  toggleStarred(chunk, lessonId, lessonTitle);
                }}
                onCompleteExercises={(lessonId: string, durationMinutes: number, score: number, total: number) => {
                  completeLesson(lessonId, durationMinutes, score, total);
                }}
              />
            ) : (
              /* Tab Navigation Views */
              <>
                {currentTab === 'library' && (
                  <LibraryPage
                    progress={progress}
                    onSelectLesson={handleSelectLesson}
                    onOpenCustomAnalyzer={() => setCurrentTab('custom')}
                    onOpenAIGenerator={() => setCurrentTab('ai-generator')}
                  />
                )}

                {currentTab === 'ai-generator' && (
                  <AILessonGeneratorPage
                    onSelectLesson={handleSelectLesson}
                  />
                )}

                {currentTab === 'notebook' && (
                  <NotebookPage
                    progress={progress}
                    onUpdateWordStatus={updateWordStatus}
                    onRemoveWord={removeWord}
                    onBackToLibrary={handleBackToLibrary}
                  />
                )}

                {currentTab === 'custom' && (
                  <CustomAnalyzerPage
                    onAnalyzeComplete={(customLesson) => {
                      handleSelectLesson(customLesson);
                    }}
                  />
                )}

                {currentTab === 'stats' && (
                  <ProgressPage
                    progress={progress}
                    onSelectLesson={handleSelectLesson}
                  />
                )}
              </>
            )}
          </main>

          {/* Footer */}
          <Footer />
        </div>

        {/* Resizer Divider Bar (Visible when Gemini side panel is open) */}
        {isGeminiOpen && (
          <div
            onMouseDown={handleMouseDown}
            className={`w-1.5 hover:w-2 group bg-stone-200 dark:bg-stone-800 hover:bg-emerald-500 dark:hover:bg-emerald-500 cursor-col-resize flex items-center justify-center transition-all z-30 select-none relative ${
              isDragging ? 'bg-emerald-500 dark:bg-emerald-500 w-2' : ''
            }`}
            title="Kéo sang trái/phải để điều chỉnh tỷ lệ hiển thị. Nhấp đúp để về 7:3"
            onDoubleClick={() => setGeminiRatio(30)}
          >
            <div className="w-4 h-8 rounded-full bg-stone-300 dark:bg-stone-700 group-hover:bg-emerald-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
              <GripVertical className="w-3 h-3 text-white" />
            </div>
          </div>
        )}

        {/* Right Side: Google Gemini AI (30% default) */}
        {isGeminiOpen && (
          <div 
            style={{ width: `${geminiRatio}%` }}
            className="h-full overflow-hidden flex-shrink-0 flex flex-col z-20"
          >
            <GeminiSidebar
              isOpen={isGeminiOpen}
              onToggle={() => setIsGeminiOpen(false)}
              ratio={geminiRatio}
              onRatioChange={(newRatio) => setGeminiRatio(newRatio)}
              activeLessonTitle={activeLesson?.title}
            />
          </div>
        )}

        {/* Invisible Overlay when Dragging so mouse move isn't captured by webview */}
        {isDragging && (
          <div className="fixed inset-0 z-50 cursor-col-resize" />
        )}

        {/* Floating Open Button if sidebar is closed */}
        {!isGeminiOpen && (
          <GeminiSidebar
            isOpen={false}
            onToggle={() => setIsGeminiOpen(true)}
            ratio={geminiRatio}
            onRatioChange={(newRatio) => setGeminiRatio(newRatio)}
          />
        )}

      </div>
    </div>
  );
}

