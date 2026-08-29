import { Chunk, Lesson, Paragraph, Sentence } from '../types';
import { COMMON_CHUNKS_DICTIONARY, BASIC_WORD_MAP } from '../data/dictionary';

function estimateMeaning(text: string): string {
  const lower = text.toLowerCase();
  const words = lower.split(/\s+/);
  const translations = words.map(w => BASIC_WORD_MAP[w] || w);
  return translations.join(' ');
}

function estimateIpa(text: string): string {
  return `/${text.toLowerCase().replace(/[^a-z\s]/g, '')}/`;
}

// Break raw text into sentences and structured phrase chunks
export function analyzeCustomPassage(rawText: string, title: string = 'Bài đọc tự tạo'): Lesson {
  const clean = rawText.trim();
  const rawParagraphs = clean.split(/\n+/).filter(p => p.trim().length > 0);

  const paragraphs: Paragraph[] = [];
  let chunkCounter = 1;
  let sentenceCounter = 1;
  let totalWordCount = 0;

  rawParagraphs.forEach((pText, pIdx) => {
    // Split paragraph into sentences by punctuation (.!?)
    const sentenceRegex = /[^.!?]+[.!?]+/g;
    const matchedSentences = pText.match(sentenceRegex) || [pText];

    const sentences: Sentence[] = [];

    matchedSentences.forEach((sText) => {
      const trimmedSentence = sText.trim();
      if (!trimmedSentence) return;

      const words = trimmedSentence.split(/\s+/);
      totalWordCount += words.length;

      // Smart grouping of words into natural chunks
      const chunks: Chunk[] = [];
      let i = 0;

      while (i < words.length) {
        let matched = false;
        for (let len = Math.min(4, words.length - i); len >= 2; len--) {
          const testPhrase = words.slice(i, i + len).join(' ').toLowerCase().replace(/[.,!?;:"']/g, '');

          if (COMMON_CHUNKS_DICTIONARY[testPhrase]) {
            const dict = COMMON_CHUNKS_DICTIONARY[testPhrase];
            const originalChunkText = words.slice(i, i + len).join(' ');
            const hasPunctuation = /[.,!?;:]$/.test(originalChunkText);
            const punctuation = hasPunctuation ? originalChunkText.slice(-1) : undefined;
            const cleanChunkText = hasPunctuation ? originalChunkText.slice(0, -1) : originalChunkText;

            chunks.push({
              id: `custom-c-${chunkCounter++}`,
              text: cleanChunkText,
              vietnamese: dict.vi,
              ipa: dict.ipa,
              partOfSpeech: dict.pos,
              grammarNote: dict.grammar,
              exampleSentence: `${cleanChunkText} is frequently used in everyday communication.`,
              exampleTranslation: `(${cleanChunkText}) được sử dụng rất phổ biến trong giao tiếp hàng ngày.`,
              punctuationAfter: punctuation,
            });

            i += len;
            matched = true;
            break;
          }
        }

        if (!matched) {
          const groupSize = Math.min(words.length - i, 2);
          const chunkWords = words.slice(i, i + groupSize);
          const originalChunkText = chunkWords.join(' ');
          const hasPunctuation = /[.,!?;:]$/.test(originalChunkText);
          const punctuation = hasPunctuation ? originalChunkText.slice(-1) : undefined;
          const cleanChunkText = hasPunctuation ? originalChunkText.slice(0, -1) : originalChunkText;

          chunks.push({
            id: `custom-c-${chunkCounter++}`,
            text: cleanChunkText,
            vietnamese: estimateMeaning(cleanChunkText),
            ipa: estimateIpa(cleanChunkText),
            partOfSpeech: 'Cụm từ (Natural Chunk)',
            grammarNote: 'Cụm từ ngữ nghĩa trong câu tiếng Anh.',
            exampleSentence: `Practice using "${cleanChunkText}" in your own sentences.`,
            exampleTranslation: `Hãy luyện tập sử dụng cụm từ "${cleanChunkText}" trong các câu văn của bạn.`,
            punctuationAfter: punctuation,
          });

          i += groupSize;
        }
      }

      sentences.push({
        id: `custom-s-${sentenceCounter++}`,
        text: trimmedSentence,
        vietnamese: `(Bản dịch: ${trimmedSentence})`,
        chunks: chunks,
      });
    });

    if (sentences.length > 0) {
      paragraphs.push({
        id: `custom-p-${pIdx + 1}`,
        sentences,
      });
    }
  });

  return {
    id: `custom-lesson-${Date.now()}`,
    title: title || 'Bài đọc tự nhập',
    titleVi: 'Bài đọc phân tích tự động',
    level: 'intermediate',
    levelLabel: 'Tự chọn - Phân tích tùy biến',
    category: 'Tự nhập',
    durationMinutes: Math.max(2, Math.ceil(totalWordCount / 120)),
    wordCount: totalWordCount,
    description: 'Custom English passage analyzed with chunk-by-chunk bilingual glosses and pronunciation.',
    descriptionVi: 'Bài đọc tiếng Anh do bạn cung cấp, được chia nhỏ thành các cụm từ ngữ nghĩa kèm phát âm và hỗ trợ tương tác.',
    icon: '📝',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
    paragraphs,
    exercises: [
      {
        id: 'custom-ex-1',
        type: 'fill-in-blank',
        instructions: 'Choose the correct chunk from your custom text.',
        instructionsVi: 'Chọn cụm từ chính xác từ bài đọc của bạn.',
        sentenceBefore: 'Read carefully and select',
        sentenceAfter: 'to complete the exercise.',
        correctAnswer: 'the key phrase',
        options: ['the key phrase', 'wrong answer', 'extra words', 'silent notes'],
        vietnameseMeaning: 'Đọc kỹ và chọn cụm từ khóa...',
        explanation: 'Thực hành ghi nhớ các cụm từ chính trong bài đọc vừa nhập.'
      }
    ],
    keyVocabulary: ['natural chunk', 'reading practice', 'comprehension'],
  };
}
