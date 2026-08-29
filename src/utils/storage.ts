import { ReaderSettings, SavedWord, UserProgress } from '../types';

const STORAGE_KEYS = {
  SETTINGS: 'english_reading_ai_settings_v1',
  PROGRESS: 'english_reading_ai_progress_v1',
};

export const DEFAULT_SETTINGS: ReaderSettings = {
  readingMode: 'bilingual',
  fontSize: 18,
  lineSpacing: 1.8,
  fontFamily: 'sans',
  theme: 'paper',
  autoScroll: true,
  inlineBadgeStyle: 'pill',
  showChunkDividers: true,
  sentenceTranslationMode: 'hover',
  focusSentenceMode: false,
  speechRate: 1.0,
};


export const DEFAULT_PROGRESS: UserProgress = {
  completedLessons: [],
  knownChunkIds: [],
  savedWords: [],
  streak: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  totalTimeMinutes: 28,
  exerciseResults: {},
};

export const getStoredSettings = (): ReaderSettings => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
};

export const saveStoredSettings = (settings: ReaderSettings): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings to localStorage', e);
  }
};

export const getStoredProgress = (): UserProgress => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    if (!data) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(data);
    
    // Check and update streak logic
    const today = new Date().toISOString().split('T')[0];
    const lastActive = parsed.lastActiveDate || today;
    
    let currentStreak = parsed.streak || 1;
    const diffDays = Math.floor((new Date(today).getTime() - new Date(lastActive).getTime()) / (1000 * 3600 * 24));
    
    if (diffDays === 1) {
      currentStreak += 1;
    } else if (diffDays > 1) {
      currentStreak = 1;
    }
    
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      streak: currentStreak,
      lastActiveDate: today,
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
};

export const saveStoredProgress = (progress: UserProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress to localStorage', e);
  }
};
