import { Lesson } from '../../types';
import { lesson1_morningCafe } from './lesson1_morningCafe';
import { lesson2_streetFood } from './lesson2_streetFood';
import { lesson3_aiLanguage } from './lesson3_aiLanguage';
import { lesson4_decisionFatigue } from './lesson4_decisionFatigue';
import { lesson5_atomicHabits } from './lesson5_atomicHabits';
import { lesson6_flowState } from './lesson6_flowState';

// Re-export từng bài học riêng biệt để có thể import độc lập
export {
  lesson1_morningCafe,
  lesson2_streetFood,
  lesson3_aiLanguage,
  lesson4_decisionFatigue,
  lesson5_atomicHabits,
  lesson6_flowState,
};

// Xuất danh sách toàn bộ các bài học trong hệ thống
export const SAMPLE_LESSONS: Lesson[] = [
  lesson1_morningCafe, // A1
  lesson2_streetFood,  // A2
  lesson3_aiLanguage,  // B1
  lesson5_atomicHabits,// B2
  lesson4_decisionFatigue, // C1
  lesson6_flowState,   // C2
];

// Helper tìm kiếm bài học theo ID
export const getLessonById = (id: string): Lesson | undefined => {
  return SAMPLE_LESSONS.find(lesson => lesson.id === id);
};

// Helper lấy danh sách theo độ khó
export const getLessonsByLevel = (level: string): Lesson[] => {
  return SAMPLE_LESSONS.filter(lesson => lesson.level === level);
};

// Mẫu tạo bài học mới
export { newLessonTemplate } from './template';
