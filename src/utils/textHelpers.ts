/**
 * Cleans string for comparison: removes punctuation, trims spaces, converts to lowercase
 */
export const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'–—]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Checks if user translation matches the target answer or any acceptable variations
 */
export const checkTranslationMatch = (
  userAnswer: string,
  correctAnswer: string,
  acceptableAnswers: string[] = []
): boolean => {
  const normUser = normalizeText(userAnswer);
  const normCorrect = normalizeText(correctAnswer);
  if (normUser === normCorrect) return true;

  return acceptableAnswers.some(acc => normalizeText(acc) === normUser);
};
