import { Lesson } from '../../types';

/**
 * MẪU TẠO BÀI ĐỌC MỚI (LESSON TEMPLATE)
 * 
 * Hướng dẫn nhanh:
 * 1. Sao chép (copy) file này và đặt tên là `lesson6_tenBai.ts` (hoặc tên tùy chọn).
 * 2. Điền thông tin tiêu đề, cấp độ, đoạn văn (paragraphs), câu (sentences), và chia cụm từ (chunks).
 * 3. Thêm bài học mới vào mảng trong file `src/data/lessons/index.ts`.
 */
export const newLessonTemplate: Lesson = {
  id: 'lesson-new-id', // ID duy nhất (ví dụ: 'lesson-6')
  title: 'English Lesson Title Here',
  titleVi: 'Tiêu đề bài đọc tiếng Việt ở đây',
  level: 'intermediate', // 'beginner' | 'elementary' | 'intermediate' | 'advanced'
  levelLabel: 'B1/B2 - Trung cấp',
  category: 'Chủ đề (ví dụ: Công nghệ / Đời sống / Du lịch)',
  durationMinutes: 5,
  wordCount: 120,
  description: 'Short English description of the lesson content.',
  descriptionVi: 'Mô tả ngắn gọn nội dung bài học bằng tiếng Việt.',
  icon: '📖', // Icon cảm xúc hoặc emoji đại diện
  badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  keyVocabulary: [
    'key chunk 1',
    'key chunk 2',
    'key chunk 3'
  ],
  paragraphs: [
    {
      id: 'p1',
      sentences: [
        {
          id: 's1-1',
          text: 'This is the full English sentence.',
          vietnamese: 'Đây là toàn bộ câu dịch tiếng Việt hoàn chỉnh.',
          sentenceGrammarNote: 'Ghi chú ngữ pháp tổng quát cho câu này nếu có.',
          chunks: [
            {
              id: 'c1-1-1',
              text: 'This is',
              vietnamese: 'Đây là',
              ipa: '/ðɪs ɪz/',
              partOfSpeech: 'Đại từ chỉ định + Động từ to be',
              grammarNote: 'Ghi chú ngữ pháp của cụm.',
              exampleSentence: 'This is an example sentence.',
              exampleTranslation: 'Đây là một câu ví dụ.'
            },
            {
              id: 'c1-1-2',
              text: 'the full English sentence',
              vietnamese: 'câu tiếng Anh hoàn chỉnh',
              ipa: '/ðə fʊl ˈɪŋ.ɡlɪʃ ˈsɛn.təns/',
              partOfSpeech: 'Cụm danh từ',
              grammarNote: 'Bổ ngữ cho câu.',
              exampleSentence: 'Read the full English sentence aloud.',
              exampleTranslation: 'Hãy đọc to câu tiếng Anh hoàn chỉnh.',
              punctuationAfter: '.'
            }
          ]
        }
      ]
    }
  ],
  exercises: [
    {
      id: 'ex-new-1',
      type: 'fill-in-blank',
      instructions: 'Choose the correct chunk to fill in the blank.',
      instructionsVi: 'Chọn cụm từ chính xác để điền vào chỗ trống.',
      sentenceBefore: 'This is',
      sentenceAfter: 'sentence.',
      correctAnswer: 'the full English',
      options: ['the full English', 'a wrong option', 'another choice', 'random word'],
      vietnameseMeaning: 'Đây là câu tiếng Anh hoàn chỉnh.',
      explanation: 'Giải thích chi tiết tại sao chọn đáp án này.',
      relatedChunkText: 'the full English sentence'
    }
  ]
};
