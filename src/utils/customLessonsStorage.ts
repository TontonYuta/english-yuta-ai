import { Lesson } from '../types';
import { SAMPLE_LESSONS } from '../data/sampleLessons';

const CUSTOM_LESSONS_STORAGE_KEY = 'english_reading_ai_user_custom_lessons_v1';

export function getStoredCustomLessons(): Lesson[] {
  try {
    const data = localStorage.getItem(CUSTOM_LESSONS_STORAGE_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to load custom lessons from localStorage', e);
    return [];
  }
}

export function saveStoredCustomLesson(lesson: Lesson): Lesson[] {
  try {
    const current = getStoredCustomLessons();
    // Thay thế nếu đã tồn tại hoặc thêm mới lên đầu danh sách
    const filtered = current.filter(l => l.id !== lesson.id);
    const updated = [lesson, ...filtered];
    localStorage.setItem(CUSTOM_LESSONS_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save custom lesson to localStorage', e);
    return getStoredCustomLessons();
  }
}

export function deleteStoredCustomLesson(lessonId: string): Lesson[] {
  try {
    const current = getStoredCustomLessons();
    const updated = current.filter(l => l.id !== lessonId);
    localStorage.setItem(CUSTOM_LESSONS_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to delete custom lesson', e);
    return getStoredCustomLessons();
  }
}

/**
 * Lấy toàn bộ danh sách bài học (kết hợp hệ thống + người dùng tạo)
 */
export function getAllAvailableLessons(): Lesson[] {
  const custom = getStoredCustomLessons();
  return [...custom, ...SAMPLE_LESSONS];
}
