import { Lesson, Paragraph, Sentence, Chunk, Exercise } from '../types';
import { CEFR_LEVELS, normalizeCEFRLevel } from '../data/cefrLevels';
import { inferChunkCategory } from '../types/chunkCategory';

export interface PromptConfig {
  topic: string;
  level: string; // 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
  length: 'short' | 'medium' | 'long';
  style: 'story' | 'analysis' | 'conversation' | 'news' | 'guide';
  customNotes?: string;
}

const LENGTH_GUIDES = {
  short: { words: '80-120 từ', paragraphs: '1-2 đoạn ngắn' },
  medium: { words: '150-220 từ', paragraphs: '2-3 đoạn' },
  long: { words: '250-350 từ', paragraphs: '3-4 đoạn' },
};

const STYLE_NAMES = {
  story: 'Câu chuyện kể thực tế, giàu cảm xúc và hình ảnh',
  analysis: 'Bài luận phân tích học thuật, logic và tư duy đa chiều',
  conversation: 'Hội thoại giao tiếp tự nhiên giữa 2 người trong đời sống',
  news: 'Bản tin báo chí, thời sự xã hội và xu hướng công nghệ',
  guide: 'Hướng dẫn thực tế, bài học kỹ năng và bí quyết từng bước',
};

/**
 * Tạo Mega-Prompt tối ưu gửi tới Google Gemini (Bao gồm phân loại chuyên sâu Collocations, Phrasal Verbs & So sánh diễn đạt tự nhiên)
 */
export function buildGeminiLessonPrompt(config: PromptConfig): string {
  const normLevel = normalizeCEFRLevel(config.level);
  const levelInfo = CEFR_LEVELS[normLevel];
  const lengthInfo = LENGTH_GUIDES[config.length] || LENGTH_GUIDES.medium;
  const styleDesc = STYLE_NAMES[config.style] || STYLE_NAMES.story;

  return `Bạn là một Chuyên gia Biên soạn Giáo trình Tiếng Anh và Nhà Ngôn ngữ học chuyên sâu về phương pháp học theo cụm từ tự nhiên (Natural Chunking & Lexical Approach).

HÃY TẠO MỘT BÀI ĐỌC TIẾNG ANH VÀ CHIA CỤM TỪ CHI TIẾT THEO CÁC YÊU CẦU SAU:

1. THÔNG TIN BÀI ĐỌC:
- Chủ đề: "${config.topic}"
- Trình độ CEFR: ${levelInfo.code} (${levelInfo.nameVi} - ${levelInfo.nameEn})
- Đặc trưng ngôn ngữ cấp ${levelInfo.code}: ${levelInfo.shortDescVi}
- Ngữ pháp trọng tâm: ${levelInfo.grammarFocus.join(', ')}
- Độ dài mong muốn: Khoảng ${lengthInfo.words} (${lengthInfo.paragraphs})
- Phong cách viết: ${styleDesc}
${config.customNotes ? `- Yêu cầu bổ sung: ${config.customNotes}` : ''}

2. NGUYÊN TẮC CHIA CỤM TỪ & PHÂN LOẠI CHUYÊN SÂU (LEXICAL CHUNKING):
- Cực kỳ quan trọng: Chia câu thành các cụm từ ngữ nghĩa tự nhiên (Collocations, Phrasal verbs, Prepositional phrases, Noun phrases, Idioms).
- KHÔNG chia vụn từng từ đơn lẻ vô nghĩa (Tránh: "I" / "go" / "to" / "the" / "school").
- KHÔNG để nguyên cả câu quá dài mà không chia.
- Mỗi Chunk BẮT BUỘC có:
  + text: Cụm từ tiếng Anh nguyên bản
  + vietnamese: Dịch nghĩa tiếng Việt tự nhiên và chuẩn ngữ cảnh của riêng cụm đó
  + ipa: Phiên âm quốc tế IPA chuẩn của cụm từ
  + chunkType: Phân loại cụm từ chính xác: 'collocation' | 'phrasal-verb' | 'academic-linking' | 'idiom' | 'lexical-phrase' | 'general'
  + partOfSpeech: Từ loại / Loại cụm từ chi tiết
  + grammarNote: Chú thích ngữ pháp / cách dùng ngắn gọn dễ hiểu
  + exampleSentence: 1 câu ví dụ tiếng Anh khác có chứa cụm này
  + exampleTranslation: Bản dịch tiếng Việt của câu ví dụ đó
  + usageComparison (Đặc biệt khuyến khích cho Collocations & Phrasal Verbs): So sánh "Tại sao dùng cụm này mà không dùng từ khác?":
    - nativeWay: Cách diễn đạt tự nhiên chuẩn bản xứ
    - unnaturalMistake: Lỗi dịch từng từ vụng về thường gặp của người Việt
    - whyExplanation: Giải thích ngắn gọn vì sao bản xứ nói như vậy
  + relatedCollocations: Mảng 2-3 cụm từ liên quan cùng chủ đề

3. ĐỊNH DẠNG ĐẦU RA BẮT BUỘC:
Hãy trả về DUY NHẤT một khối mã JSON hợp lệ (không kèm theo văn bản chào hỏi hay giải thích bên ngoài). Cấu trúc JSON chuẩn xác như sau:

\`\`\`json
{
  "title": "Tiêu đề tiếng Anh hấp dẫn",
  "titleVi": "Tiêu đề tiếng Việt",
  "level": "${levelInfo.code}",
  "levelLabel": "${levelInfo.code} - ${levelInfo.nameVi}",
  "category": "${config.topic.length > 20 ? config.topic.substring(0, 20) + '...' : config.topic}",
  "durationMinutes": 5,
  "wordCount": 150,
  "description": "Short English summary of the lesson (1-2 sentences).",
  "descriptionVi": "Tóm tắt ngắn gọn nội dung bài học bằng tiếng Việt (1-2 câu).",
  "icon": "✨",
  "badgeColor": "${levelInfo.badgeClass}",
  "keyVocabulary": [
    "cụm từ khóa 1",
    "cụm từ khóa 2",
    "cụm từ khóa 3",
    "cụm từ khóa 4"
  ],
  "paragraphs": [
    {
      "id": "p1",
      "sentences": [
        {
          "id": "s1-1",
          "text": "Câu tiếng Anh thứ nhất đầy đủ.",
          "vietnamese": "Dịch cả câu tiếng Anh thứ nhất sang tiếng Việt trọn vẹn.",
          "sentenceGrammarNote": "Ghi chú ngữ pháp tổng quát cho câu này nếu có.",
          "chunks": [
            {
              "id": "c1-1-1",
              "text": "cụm 1",
              "vietnamese": "nghĩa cụm 1",
              "ipa": "/phiên âm IPA/",
              "chunkType": "collocation",
              "partOfSpeech": "Cụm động từ tự nhiên (Collocation)",
              "grammarNote": "Giải thích ngữ pháp cụm 1",
              "exampleSentence": "Câu ví dụ chứa cụm 1.",
              "exampleTranslation": "Dịch câu ví dụ.",
              "usageComparison": {
                "nativeWay": "start my day",
                "unnaturalMistake": "open my day",
                "whyExplanation": "Bản xứ luôn dùng start my day thay vì open my day."
              },
              "relatedCollocations": ["start the morning", "kick off the day"]
            },
            {
              "id": "c1-1-2",
              "text": "cụm 2",
              "vietnamese": "nghĩa cụm 2",
              "ipa": "/phiên âm IPA/",
              "chunkType": "lexical-phrase",
              "partOfSpeech": "Cụm danh từ",
              "grammarNote": "Giải thích ngữ pháp cụm 2",
              "exampleSentence": "Câu ví dụ chứa cụm 2.",
              "exampleTranslation": "Dịch câu ví dụ."
            }
          ]
        }
      ]
    }
  ],
  "exercises": [
    {
      "id": "ex1",
      "type": "fill-in-blank",
      "instructions": "Choose the most natural English chunk to complete the sentence.",
      "instructionsVi": "Chọn cụm từ tiếng Anh tự nhiên phù hợp nhất để hoàn thành câu.",
      "sentenceBefore": "Đoạn trước chỗ trống",
      "sentenceAfter": "đoạn sau chỗ trống.",
      "correctAnswer": "cụm từ đúng",
      "options": ["cụm từ đúng", "đáp án sai 1", "đáp án sai 2", "đáp án sai 3"],
      "vietnameseMeaning": "Nghĩa tiếng Việt của cả câu hoàn chỉnh.",
      "explanation": "Giải thích chi tiết vì sao chọn đáp án này."
    },
    {
      "id": "ex2",
      "type": "sentence-ordering",
      "instructions": "Arrange the words in the correct order to form a natural sentence.",
      "instructionsVi": "Sắp xếp các từ theo đúng trật tự câu hoàn chỉnh.",
      "vietnamesePrompt": "Câu tiếng Việt yêu cầu dịch.",
      "correctWords": ["Word1", "word2", "word3", "word4."],
      "scrambledWords": ["word3", "Word1", "word4.", "word2"],
      "explanation": "Giải thích cấu trúc ngữ pháp câu."
    },
    {
      "id": "ex3",
      "type": "vietnamese-to-english",
      "instructions": "Translate the Vietnamese sentence into natural English.",
      "instructionsVi": "Dịch câu tiếng Việt sang tiếng Anh tự nhiên.",
      "vietnamesePrompt": "Câu tiếng Việt cần dịch.",
      "correctAnswer": "The full English sentence.",
      "acceptableAnswers": ["The full English sentence.", "The full English sentence"],
      "wordBank": ["The", "full", "English", "sentence.", "wrong1", "wrong2"],
      "hints": ["Gợi ý từ vựng 1", "Gợi ý từ vựng 2"],
      "explanation": "Giải thích cấu trúc và từ vựng của câu."
    }
  ]
}
\`\`\`

Hãy tạo bài đọc ngay bây giờ với chất lượng cao nhất!`;
}

/**
 * Trích xuất và phân tích JSON từ phản hồi của Gemini
 */
export function parseGeminiLessonResponse(rawText: string, fallbackTopic: string = 'Bài đọc AI'): Lesson {
  if (!rawText || !rawText.trim()) {
    throw new Error('Nội dung phản hồi từ Gemini trống. Vui lòng dán lại phản hồi.');
  }

  let cleaned = rawText.trim();

  // Bóc tách Markdown ```json ... ``` nếu có
  const jsonBlockRegex = /```(?:json)?\s*([\s\S]*?)\s*```/;
  const match = cleaned.match(jsonBlockRegex);
  if (match && match[1]) {
    cleaned = match[1].trim();
  } else {
    // Tìm cặp ngoặc { ... } lớn nhất
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      cleaned = cleaned.substring(firstBrace, lastBrace + 1);
    }
  }

  let parsedData: any;
  try {
    parsedData = JSON.parse(cleaned);
  } catch (e: any) {
    // Thử làm sạch các dấu phẩy thừa trailing commas
    const fixedComma = cleaned.replace(/,\s*([\]}])/g, '$1');
    try {
      parsedData = JSON.parse(fixedComma);
    } catch (innerError) {
      throw new Error(`Không thể đọc định dạng JSON từ Gemini. Lỗi: ${e.message}. Hãy đảm bảo bạn đã copy đầy đủ toàn bộ phản hồi JSON.`);
    }
  }

  // Chuẩn hóa và bổ sung dữ liệu mặc định để không bị crash
  const lessonId = `ai-lesson-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const levelNorm = normalizeCEFRLevel(parsedData.level || 'B1');
  const levelInfo = CEFR_LEVELS[levelNorm];

  const paragraphs: Paragraph[] = Array.isArray(parsedData.paragraphs)
    ? parsedData.paragraphs.map((p: any, pIdx: number) => ({
        id: p.id || `p-${pIdx + 1}`,
        sentences: Array.isArray(p.sentences)
          ? p.sentences.map((s: any, sIdx: number) => ({
              id: s.id || `s-${pIdx + 1}-${sIdx + 1}`,
              text: s.text || '',
              vietnamese: s.vietnamese || '',
              sentenceGrammarNote: s.sentenceGrammarNote || '',
              chunks: Array.isArray(s.chunks)
                ? s.chunks.map((c: any, cIdx: number) => ({
                    id: c.id || `c-${pIdx + 1}-${sIdx + 1}-${cIdx + 1}`,
                    text: c.text || '',
                    vietnamese: c.vietnamese || '',
                    ipa: c.ipa || '',
                    partOfSpeech: c.partOfSpeech || 'Cụm từ',
                    grammarNote: c.grammarNote || '',
                    exampleSentence: c.exampleSentence || '',
                    exampleTranslation: c.exampleTranslation || '',
                    punctuationAfter: c.punctuationAfter,
                    chunkType: c.chunkType || inferChunkCategory(c),
                    usageComparison: c.usageComparison,
                    relatedCollocations: Array.isArray(c.relatedCollocations) ? c.relatedCollocations : undefined,
                  }))
                : [],
            }))
          : [],
      }))
    : [];

  // Tính tổng số từ
  let totalWordCount = parsedData.wordCount;
  if (!totalWordCount || totalWordCount === 0) {
    const fullText = paragraphs
      .flatMap(p => p.sentences)
      .map(s => s.text)
      .join(' ');
    totalWordCount = fullText.split(/\s+/).filter(Boolean).length;
  }

  // Xử lý bài tập an toàn
  const exercises: Exercise[] = Array.isArray(parsedData.exercises)
    ? parsedData.exercises.map((ex: any, idx: number) => ({
        id: ex.id || `ex-${idx + 1}`,
        type: ex.type || 'fill-in-blank',
        instructions: ex.instructions || 'Answer the question.',
        instructionsVi: ex.instructionsVi || 'Trả lời câu hỏi bài tập.',
        sentenceBefore: ex.sentenceBefore,
        sentenceAfter: ex.sentenceAfter,
        correctAnswer: ex.correctAnswer || '',
        options: Array.isArray(ex.options) ? ex.options : [ex.correctAnswer || 'Option A', 'Option B', 'Option C', 'Option D'],
        vietnameseMeaning: ex.vietnameseMeaning,
        explanation: ex.explanation || 'Đáp án chính xác.',
        vietnamesePrompt: ex.vietnamesePrompt,
        correctWords: Array.isArray(ex.correctWords) ? ex.correctWords : undefined,
        scrambledWords: Array.isArray(ex.scrambledWords) ? ex.scrambledWords : undefined,
        acceptableAnswers: Array.isArray(ex.acceptableAnswers) ? ex.acceptableAnswers : undefined,
        wordBank: Array.isArray(ex.wordBank) ? ex.wordBank : undefined,
        hints: Array.isArray(ex.hints) ? ex.hints : undefined,
      }))
    : [];

  const finalLesson: Lesson = {
    id: lessonId,
    title: parsedData.title || fallbackTopic || 'Bài đọc AI Mới',
    titleVi: parsedData.titleVi || 'Bản dịch tiêu đề bài đọc',
    level: levelNorm,
    levelLabel: parsedData.levelLabel || `${levelNorm} - ${levelInfo.nameVi}`,
    category: parsedData.category || 'Chủ đề tùy chọn',
    durationMinutes: parsedData.durationMinutes || Math.max(3, Math.ceil(totalWordCount / 30)),
    wordCount: totalWordCount,
    description: parsedData.description || 'An engaging English reading lesson created with Gemini AI.',
    descriptionVi: parsedData.descriptionVi || 'Bài đọc tiếng Anh sinh động được tạo bằng Gemini AI.',
    icon: parsedData.icon || levelInfo.icon || '✨',
    badgeColor: parsedData.badgeColor || levelInfo.badgeClass,
    paragraphs,
    exercises,
    keyVocabulary: Array.isArray(parsedData.keyVocabulary) ? parsedData.keyVocabulary : [],
    isUserCreated: true,
    createdAt: Date.now(),
  };

  return finalLesson;
}

/**
 * Bài đọc mẫu demo từ Gemini để người dùng kiểm tra nhanh 1-click
 */
export const GEMINI_DEMO_SAMPLE_JSON = `{
  "title": "The Power of Micro-Habits in Everyday Life",
  "titleVi": "Sức mạnh của những thói quen siêu nhỏ trong đời sống hàng ngày",
  "level": "B2",
  "levelLabel": "B2 - Trung cao cấp",
  "category": "Phát triển bản thân & Năng suất",
  "durationMinutes": 5,
  "wordCount": 135,
  "description": "Discover how tiny two-minute changes create massive compound growth in your career and well-being.",
  "descriptionVi": "Khám phá cách những thay đổi 2 phút nhỏ bé tạo nên sự tăng trưởng lũy tiến vượt bậc cho sự nghiệp và sức khỏe.",
  "icon": "⚡",
  "badgeColor": "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800",
  "keyVocabulary": [
    "compound effect",
    "drastic life changes",
    "seamlessly integrate",
    "unwavering consistency"
  ],
  "paragraphs": [
    {
      "id": "p1",
      "sentences": [
        {
          "id": "s1-1",
          "text": "Most people believe that massive success requires drastic and overwhelming life changes.",
          "vietnamese": "Hầu hết mọi người tin rằng thành công vang dội đòi hỏi những thay đổi cuộc sống quyết liệt và choáng ngợp.",
          "sentenceGrammarNote": "Mệnh đề danh từ làm tân ngữ: 'that massive success requires...'",
          "chunks": [
            {
              "id": "c1-1-1",
              "text": "Most people believe",
              "vietnamese": "Hầu hết mọi người tin rằng",
              "ipa": "/moʊst ˈpiː.pəl bɪˈliːv/",
              "chunkType": "lexical-phrase",
              "partOfSpeech": "Chủ ngữ + Động từ nhận thức",
              "grammarNote": "'Most + danh từ số nhiều' chỉ đa số đối tượng nói chung.",
              "exampleSentence": "Most people enjoy listening to soothing music after work.",
              "exampleTranslation": "Hầu hết mọi người đều thích nghe nhạc nhẹ sau giờ làm."
            },
            {
              "id": "c1-1-2",
              "text": "that massive success",
              "vietnamese": "rằng thành công vang dội",
              "ipa": "/ðæt ˈmæs.ɪv səkˈsɛs/",
              "chunkType": "collocation",
              "partOfSpeech": "Liên từ + Cụm danh từ tự nhiên (Collocation)",
              "grammarNote": "'massive' là tính từ đi cùng 'success' biểu thị thành công vang dội.",
              "exampleSentence": "Achieving massive success requires patience.",
              "exampleTranslation": "Đạt được thành công to lớn đòi hỏi sự kiên nhẫn.",
              "usageComparison": {
                "nativeWay": "massive success / remarkable success",
                "unnaturalMistake": "big victory / heavy winning",
                "whyExplanation": "'Massive success' là collocation kinh điển dùng trong phát triển bản thân và kinh doanh."
              },
              "relatedCollocations": ["achieve success", "overnight success"]
            },
            {
              "id": "c1-1-3",
              "text": "requires drastic and overwhelming life changes",
              "vietnamese": "đòi hỏi những thay đổi cuộc sống mang tính quyết liệt và quá sức",
              "ipa": "/rɪˈkwaɪərz ˈdræs.tɪk ænd ˌoʊ.vərˈwɛl.mɪŋ laɪf ˈtʃeɪn.dʒɪz/",
              "chunkType": "collocation",
              "partOfSpeech": "Cụm vị ngữ tự nhiên (Collocation)",
              "grammarNote": "'drastic' (quyết liệt, mạnh mẽ); 'overwhelming' (choáng ngợp, quá tải).",
              "exampleSentence": "Do not attempt drastic diets without consulting a doctor.",
              "exampleTranslation": "Đừng thử những chế độ ăn kiêng quá ngặt nghèo mà chưa hỏi ý kiến bác sĩ.",
              "usageComparison": {
                "nativeWay": "drastic life changes",
                "unnaturalMistake": "strong changes of life",
                "whyExplanation": "'Drastic' mang sắc thái thay đổi quyết liệt, tác động sâu rộng thay vì 'strong'."
              },
              "punctuationAfter": "."
            }
          ]
        },
        {
          "id": "s1-2",
          "text": "In reality, the compound effect of tiny micro-habits yields far greater long-term results.",
          "vietnamese": "Trên thực tế, hiệu ứng lãi kép của những thói quen siêu nhỏ mang lại kết quả lâu dài vượt trội hơn nhiều.",
          "sentenceGrammarNote": "Cấu trúc nhấn mạnh so sánh hơn: 'far greater + Noun' (vượt trội hơn rất nhiều).",
          "chunks": [
            {
              "id": "c1-2-1",
              "text": "In reality",
              "vietnamese": "Trên thực tế",
              "ipa": "/ɪn riˈæl.ə.ti/",
              "chunkType": "academic-linking",
              "partOfSpeech": "Từ nối lập luận học thuật (Academic Linking)",
              "grammarNote": "Dùng để đối lập giữa định kiến và sự thật thực tế.",
              "exampleSentence": "In reality, consistent practice beats natural talent.",
              "exampleTranslation": "Trên thực tế, sự luyện tập đều đặn đánh bại tài năng bẩm sinh."
            },
            {
              "id": "c1-2-2",
              "text": "the compound effect of tiny micro-habits",
              "vietnamese": "hiệu ứng lãi kép của các thói quen siêu nhỏ",
              "ipa": "/ðə ˈkɑːm.paʊnd ɪˈfɛkt əv ˈtaɪ.ni ˈmaɪ.kroʊ ˈhæb.ɪts/",
              "chunkType": "collocation",
              "partOfSpeech": "Cụm danh từ chuyên ngành (Collocation)",
              "grammarNote": "'compound effect' là hiệu ứng tích lũy cấp số nhân theo thời gian.",
              "exampleSentence": "Investing early unleashes the compound effect of capital.",
              "exampleTranslation": "Đầu tư sớm sẽ khai phóng hiệu ứng lãi kép của dòng vốn.",
              "usageComparison": {
                "nativeWay": "compound effect / compound growth",
                "unnaturalMistake": "adding result / plus effect",
                "whyExplanation": "'Compound effect' là thuật ngữ chuẩn xác dùng trong kinh tế học và tâm lý học hành vi."
              }
            },
            {
              "id": "c1-2-3",
              "text": "yields far greater long-term results",
              "vietnamese": "mang lại các kết quả lâu dài vượt trội hơn rất nhiều",
              "ipa": "/jiːldz fɑːr ˈɡreɪ.tər lɔːŋ tɜːrm rɪˈzʌlts/",
              "chunkType": "collocation",
              "partOfSpeech": "Cụm vị ngữ nâng cao (Collocation)",
              "grammarNote": "'yield' = sinh ra, mang lại; 'far greater' = lớn hơn rất nhiều.",
              "exampleSentence": "Patience yields remarkable rewards.",
              "exampleTranslation": "Sự kiên nhẫn sẽ mang lại những phần thưởng đáng kinh ngạc.",
              "punctuationAfter": "."
            }
          ]
        }
      ]
    }
  ],
  "exercises": [
    {
      "id": "ex1",
      "type": "fill-in-blank",
      "instructions": "Select the financial and psychological term for exponential accumulation.",
      "instructionsVi": "Chọn thuật ngữ chỉ sự tích lũy cấp số nhân theo thời gian.",
      "sentenceBefore": "The",
      "sentenceAfter": "of tiny habits leads to profound transformation.",
      "correctAnswer": "compound effect",
      "options": ["compound effect", "heavy burden", "sudden accident", "random luck"],
      "vietnameseMeaning": "Hiệu ứng tích lũy lãi kép của những thói quen nhỏ...",
      "explanation": "'compound effect' là khái niệm cốt lõi chỉ sự cộng dồn mang lại kết quả khổng lồ."
    },
    {
      "id": "ex2",
      "type": "sentence-ordering",
      "instructions": "Arrange the words into the correct order.",
      "instructionsVi": "Sắp xếp các từ theo đúng trật tự câu.",
      "vietnamesePrompt": "Trên thực tế, thói quen nhỏ mang lại kết quả lâu dài lớn hơn nhiều.",
      "correctWords": ["In", "reality,", "tiny", "micro-habits", "yield", "far", "greater", "results."],
      "scrambledWords": ["results.", "greater", "micro-habits", "reality,", "In", "yield", "far", "tiny"],
      "explanation": "Cấu trúc: In reality, [Subject] + yield + [far greater results]."
    },
    {
      "id": "ex3",
      "type": "vietnamese-to-english",
      "instructions": "Translate the sentence into natural English.",
      "instructionsVi": "Dịch câu tiếng Việt sang tiếng Anh tự nhiên.",
      "vietnamesePrompt": "Hầu hết mọi người tin rằng thành công đòi hỏi những thay đổi lớn.",
      "correctAnswer": "Most people believe that success requires drastic changes.",
      "acceptableAnswers": [
        "Most people believe that success requires drastic changes.",
        "Most people believe that success requires drastic changes"
      ],
      "wordBank": ["Most", "people", "believe", "that", "success", "requires", "drastic", "changes.", "small", "rare"],
      "hints": ["Most people believe that...", "drastic changes = những thay đổi mạnh mẽ"],
      "explanation": "Cấu trúc: Most people believe that + [S + V + O]."
    }
  ]
}`;
