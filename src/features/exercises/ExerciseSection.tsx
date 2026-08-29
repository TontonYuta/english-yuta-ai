import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowRight } from 'lucide-react';
import { Exercise, Lesson } from '../../types';
import { checkTranslationMatch } from '../../utils/textHelpers';
import { FillInBlankExerciseView } from './FillInBlankExerciseView';
import { SentenceOrderingView } from './SentenceOrderingView';
import { TranslationExerciseView } from './TranslationExerciseView';
import { ExerciseFeedbackBox } from './ExerciseFeedbackBox';
import { ExerciseSummaryView } from './ExerciseSummaryView';

interface ExerciseSectionProps {
  lesson: Lesson;
  onCompleteExercises: (score: number, total: number) => void;
  onBackToReading: () => void;
}

export const ExerciseSection: React.FC<ExerciseSectionProps> = ({
  lesson,
  onCompleteExercises,
  onBackToReading,
}) => {
  const exercises = lesson.exercises;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // States for Sentence Ordering
  const [selectedWordsOrder, setSelectedWordsOrder] = useState<string[]>([]);
  
  // States for Translation with Word Bank
  const [translationSelectedWords, setTranslationSelectedWords] = useState<string[]>([]);

  const currentExercise = exercises[currentIndex];

  const handleSelectOption = (option: string) => {
    if (isAnswerChecked) return;
    setUserAnswers(prev => ({ ...prev, [currentIndex]: option }));
  };

  const handleWordBankClick = (word: string, _index: number, isOrdering: boolean) => {
    if (isAnswerChecked) return;
    if (isOrdering) {
      setSelectedWordsOrder(prev => [...prev, word]);
    } else {
      setTranslationSelectedWords(prev => [...prev, word]);
    }
  };

  const handleRemoveSelectedWord = (indexToRemove: number, isOrdering: boolean) => {
    if (isAnswerChecked) return;
    if (isOrdering) {
      setSelectedWordsOrder(prev => prev.filter((_, idx) => idx !== indexToRemove));
    } else {
      setTranslationSelectedWords(prev => prev.filter((_, idx) => idx !== indexToRemove));
    }
  };

  const handleCheckAnswer = () => {
    if (!currentExercise) return;
    let correct = false;

    if (currentExercise.type === 'fill-in-blank') {
      const selected = userAnswers[currentIndex];
      correct = selected === currentExercise.correctAnswer;
    } else if (currentExercise.type === 'sentence-ordering') {
      const userSentence = selectedWordsOrder.join(' ').trim();
      const correctSentence = currentExercise.correctWords.join(' ').trim();
      correct = userSentence === correctSentence;
    } else if (currentExercise.type === 'vietnamese-to-english') {
      const userSentence = translationSelectedWords.join(' ').trim();
      correct = checkTranslationMatch(userSentence, currentExercise.correctAnswer, currentExercise.acceptableAnswers);
    }

    setIsCorrect(correct);
    setIsAnswerChecked(true);

    if (correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextExercise = () => {
    setIsAnswerChecked(false);
    setSelectedWordsOrder([]);
    setTranslationSelectedWords([]);

    if (currentIndex + 1 < exercises.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
      const finalScore = isCorrect ? score + 1 : score;
      onCompleteExercises(finalScore, exercises.length);
      
      // Fire confetti if high score
      if (finalScore >= exercises.length * 0.7) {
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {
          // confetti fallback
        }
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setUserAnswers({});
    setIsAnswerChecked(false);
    setIsCorrect(false);
    setScore(0);
    setIsFinished(false);
    setSelectedWordsOrder([]);
    setTranslationSelectedWords([]);
  };

  if (!exercises || exercises.length === 0) {
    return (
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-8 text-center max-w-xl mx-auto shadow-sm border border-stone-200 dark:border-stone-800">
        <p className="text-stone-600 dark:text-stone-300">Bài học này chưa có bài tập.</p>
        <button
          onClick={onBackToReading}
          className="mt-4 px-6 py-2 rounded-xl bg-emerald-600 text-white font-semibold"
        >
          Quay lại bài đọc
        </button>
      </div>
    );
  }

  // Finished Screen
  if (isFinished) {
    return (
      <ExerciseSummaryView
        lesson={lesson}
        score={score}
        total={exercises.length}
        onBackToReading={onBackToReading}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-10 shadow-lg border border-stone-200 dark:border-stone-800 space-y-6">
      
      {/* Progress Bar & Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
          <span>Câu hỏi {currentIndex + 1} / {exercises.length}</span>
          <span>Điểm: {score}</span>
        </div>
        
        <div className="w-full h-2.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / exercises.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Exercise Instructions */}
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
            {currentExercise.type === 'fill-in-blank' && 'Điền từ vào chỗ trống'}
            {currentExercise.type === 'sentence-ordering' && 'Sắp xếp trật tự câu'}
            {currentExercise.type === 'vietnamese-to-english' && 'Dịch Việt sang Anh'}
          </span>
        </div>
        <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100">
          {currentExercise.instructionsVi}
        </h3>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          {currentExercise.instructions}
        </p>
      </div>

      {/* 1. FILL IN THE BLANK */}
      {currentExercise.type === 'fill-in-blank' && (
        <FillInBlankExerciseView
          exercise={currentExercise}
          selectedAnswer={userAnswers[currentIndex]}
          onSelectOption={handleSelectOption}
          isAnswerChecked={isAnswerChecked}
          isCorrect={isCorrect}
        />
      )}

      {/* 2. SENTENCE ORDERING */}
      {currentExercise.type === 'sentence-ordering' && (
        <SentenceOrderingView
          exercise={currentExercise}
          selectedWords={selectedWordsOrder}
          onWordClick={(word, idx) => handleWordBankClick(word, idx, true)}
          onRemoveWord={(idx) => handleRemoveSelectedWord(idx, true)}
          isAnswerChecked={isAnswerChecked}
        />
      )}

      {/* 3. VIETNAMESE TO ENGLISH TRANSLATION */}
      {currentExercise.type === 'vietnamese-to-english' && (
        <TranslationExerciseView
          exercise={currentExercise}
          selectedWords={translationSelectedWords}
          onWordClick={(word, idx) => handleWordBankClick(word, idx, false)}
          onRemoveWord={(idx) => handleRemoveSelectedWord(idx, false)}
          isAnswerChecked={isAnswerChecked}
        />
      )}

      {/* AI Grammar Breakdown & Answer Feedback Box */}
      {isAnswerChecked && (
        <ExerciseFeedbackBox
          exercise={currentExercise}
          isCorrect={isCorrect}
        />
      )}

      {/* Footer Action Buttons */}
      <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
        <button
          onClick={onBackToReading}
          className="text-xs font-semibold text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
        >
          Quay lại bài đọc
        </button>

        {!isAnswerChecked ? (
          <button
            onClick={handleCheckAnswer}
            disabled={
              (currentExercise.type === 'fill-in-blank' && !userAnswers[currentIndex]) ||
              (currentExercise.type === 'sentence-ordering' && selectedWordsOrder.length === 0) ||
              (currentExercise.type === 'vietnamese-to-english' && translationSelectedWords.length === 0)
            }
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold shadow-md shadow-emerald-600/20 transition-all"
          >
            Kiểm tra đáp án
          </button>
        ) : (
          <button
            onClick={handleNextExercise}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold shadow-md shadow-emerald-600/20 flex items-center space-x-2 transition-all"
          >
            <span>{currentIndex + 1 < exercises.length ? 'Câu tiếp theo' : 'Xem kết quả'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

    </div>
  );
};
