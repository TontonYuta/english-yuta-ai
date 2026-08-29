import { DifficultyLevel } from '../types';

export const LEVEL_METADATA: Record<DifficultyLevel, { label: string; name: string; badge: string }> = {
  A1: {
    label: 'A1 - Mới bắt đầu',
    name: 'Beginner (A1)',
    badge: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  },
  A2: {
    label: 'A2 - Sơ cấp',
    name: 'Elementary (A2)',
    badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
  },
  B1: {
    label: 'B1 - Trung cấp',
    name: 'Intermediate (B1)',
    badge: 'bg-teal-100 text-teal-800 dark:bg-teal-950/80 dark:text-teal-300 border-teal-200 dark:border-teal-800',
  },
  B2: {
    label: 'B2 - Trung cao cấp',
    name: 'Upper-Intermediate (B2)',
    badge: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
  },
  C1: {
    label: 'C1 - Cao cấp',
    name: 'Advanced (C1)',
    badge: 'bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border-purple-200 dark:border-purple-800',
  },
  C2: {
    label: 'C2 - Thành thạo bản ngữ',
    name: 'Mastery (C2)',
    badge: 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border-rose-200 dark:border-rose-800',
  },
  beginner: {
    label: 'A1 - Mới bắt đầu',
    name: 'Beginner (A1)',
    badge: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  },
  elementary: {
    label: 'A2 - Sơ cấp',
    name: 'Elementary (A2)',
    badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
  },
  intermediate: {
    label: 'B1/B2 - Trung cấp',
    name: 'Intermediate (B1/B2)',
    badge: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
  },
  advanced: {
    label: 'C1/C2 - Cao cấp',
    name: 'Advanced (C1/C2)',
    badge: 'bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border-purple-200 dark:border-purple-800',
  },
};

export const formatDuration = (minutes: number): string => {
  return `${minutes} phút`;
};

export const formatPercentage = (value: number, total: number): number => {
  if (total <= 0) return 0;
  return Math.round((value / total) * 100);
};

export const formatDate = (timestamp: number | string): string => {
  const d = new Date(timestamp);
  return d.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};
