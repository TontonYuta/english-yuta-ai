import { DifficultyLevel } from '../types';

export interface CEFRLevelInfo {
  id: DifficultyLevel;
  code: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  nameVi: string;
  nameEn: string;
  shortDescVi: string;
  fullDescVi: string;
  grammarFocus: string[];
  vocabularyFocus: string[];
  typicalLengthWords: string;
  icon: string;
  badgeClass: string;
  bgGradient: string;
  borderClass: string;
  textClass: string;
}

export const CEFR_LEVELS: Record<string, CEFRLevelInfo> = {
  A1: {
    id: 'A1',
    code: 'A1',
    nameVi: 'Người mới bắt đầu',
    nameEn: 'Beginner / Breakthrough',
    shortDescVi: 'Cụm từ sinh hoạt đơn giản, câu ngắn, cấu trúc căn bản hàng ngày.',
    fullDescVi: 'Hiểu và sử dụng các biểu đạt quen thuộc thường nhật, các cụm từ căn bản để đáp ứng nhu cầu cụ thể (giới thiệu bản thân, gọi món ăn đơn giản, hỏi địa điểm, thói quen buổi sáng).',
    grammarFocus: [
      'Thì Hiện tại đơn (Present Simple)',
      'Đại từ nhân xưng & Tính từ sở hữu (I, my, you, your)',
      'Cụm danh từ đơn giản (a hot cup of coffee)',
      'Giới từ chỉ nơi chốn & thời gian cơ bản (at, in, on)'
    ],
    vocabularyFocus: [
      'Chào hỏi, sinh hoạt, đồ ăn, quán cafe, địa điểm quen thuộc',
      'Đo lường cơ bản (a cup of, a slice of)',
      'Tính từ miêu tả trực quan (warm, cozy, quiet, delicious)'
    ],
    typicalLengthWords: '70 - 110 từ',
    icon: '🌱',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
    bgGradient: 'from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-stone-900',
    borderClass: 'border-amber-300 dark:border-amber-800',
    textClass: 'text-amber-700 dark:text-amber-300'
  },
  A2: {
    id: 'A2',
    code: 'A2',
    nameVi: 'Sơ cấp',
    nameEn: 'Elementary / Waystage',
    shortDescVi: 'Giao tiếp tình huống thực tế, ẩm thực, du lịch và thói quen hàng ngày.',
    fullDescVi: 'Hiểu các câu và biểu đạt phổ biến liên quan đến thông tin cá nhân, mua sắm, địa lý địa phương, ẩm thực đường phố, kỳ nghỉ và trải nghiệm quá khứ.',
    grammarFocus: [
      'Thì Quá khứ đơn (Past Simple) & Hiện tại tiếp diễn',
      'Mẫu câu yêu cầu lịch sự (Could I have..., Would you like...)',
      'So sánh hơn và so sánh nhất (better than, the most popular)',
      'Mệnh đề nối cơ bản (because, when, although, while)'
    ],
    vocabularyFocus: [
      'Ẩm thực đường phố, gọi món tại nhà hàng, hỏi đường du lịch',
      'Cảm giác hương vị, mùi thơm (mouth-watering, aroma, crispy)',
      'Cụm động từ chỉ hành động (stop at, look for, pick up)'
    ],
    typicalLengthWords: '100 - 150 từ',
    icon: '🌿',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
    bgGradient: 'from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-stone-900',
    borderClass: 'border-emerald-300 dark:border-emerald-800',
    textClass: 'text-emerald-700 dark:text-emerald-300'
  },
  B1: {
    id: 'B1',
    code: 'B1',
    nameVi: 'Trung cấp',
    nameEn: 'Intermediate / Threshold',
    shortDescVi: 'Trình bày quan điểm cá nhân, công nghệ, giáo dục và công việc.',
    fullDescVi: 'Hiểu các điểm chính của văn bản rõ ràng về các vấn đề quen thuộc trong công việc, trường học, sở thích. Có thể diễn đạt trải nghiệm, ước mơ, hy vọng và đưa ra lý do, giải thích ngắn gọn.',
    grammarFocus: [
      'Thì Hiện tại hoàn thành (Present Perfect)',
      'Câu điều kiện loại 1 & 2 (Conditionals Type 1 & 2)',
      'Cấu trúc mục đích & nguyên nhân (in order to, due to, instead of + V-ing)',
      'Mệnh đề quan hệ xác định (who, which, that)'
    ],
    vocabularyFocus: [
      'Công nghệ, phương pháp học tập, chuyển đổi mô hình (paradigm shift)',
      'Cụm từ liên kết tư duy (bridge the gap, in context, effortless)',
      'Thuật ngữ công việc và giao tiếp văn phòng'
    ],
    typicalLengthWords: '140 - 200 từ',
    icon: '⚡',
    badgeClass: 'bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800',
    bgGradient: 'from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-stone-900',
    borderClass: 'border-teal-300 dark:border-teal-800',
    textClass: 'text-teal-700 dark:text-teal-300'
  },
  B2: {
    id: 'B2',
    code: 'B2',
    nameVi: 'Trung cao cấp',
    nameEn: 'Upper-Intermediate / Vantage',
    shortDescVi: 'Phân tích tâm lý học thói quen, năng suất và lập luận đa chiều.',
    fullDescVi: 'Hiểu ý chính của các văn bản phức tạp về cả chủ đề cụ thể và trừu tượng. Tương tác với độ lưu loát và tự nhiên mà không gây căng thẳng cho người bản ngữ.',
    grammarFocus: [
      'Mệnh đề phân từ rút gọn (Participle Clauses - Having finished, Once overcome)',
      'Câu bị động nâng cao (Passive Voice with modals)',
      'Cấu trúc so sánh lũy tiến (as easy as possible, the more... the more)',
      'Đảo ngữ nhẹ và liên từ tương phản (on the contrary, notwithstanding)'
    ],
    vocabularyFocus: [
      'Phát triển bản thân, tâm lý học thói quen (procrastination, inertia, momentum)',
      'Chiến lược tối ưu hóa hành vi (gateway habit, scale down, compound effect)',
      'Collocations tự nhiên trong môi trường làm việc chuyên nghiệp'
    ],
    typicalLengthWords: '170 - 240 từ',
    icon: '🔥',
    badgeClass: 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800',
    bgGradient: 'from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-stone-900',
    borderClass: 'border-indigo-300 dark:border-indigo-800',
    textClass: 'text-indigo-700 dark:text-indigo-300'
  },
  C1: {
    id: 'C1',
    code: 'C1',
    nameVi: 'Cao cấp',
    nameEn: 'Advanced / Effective Operational',
    shortDescVi: 'Tâm lý học thần kinh, tải nhận thức, phân tích học thuật chuyên sâu.',
    fullDescVi: 'Hiểu nhiều loại văn bản dài và đòi hỏi tư duy khắt khe, nhận biết được các hàm ý ẩn. Sử dụng ngôn ngữ linh hoạt và hiệu quả cho các mục đích xã hội, học thuật và chuyên nghiệp.',
    grammarFocus: [
      'Cấu trúc câu phức hợp đa tầng (Multi-clause Complex Sentences)',
      'Đảo ngữ nhấn mạnh (Inversion: Not only... but, Under no circumstances)',
      'Mệnh đề danh từ & Giả định thức (Subjunctive Mood & Nominal Clauses)',
      'Rút gọn mệnh đề quan hệ với tính từ phân từ (deteriorating quality, endeavors)'
    ],
    vocabularyFocus: [
      'Tải nhận thức và tâm lý điều hành (cognitive bandwidth, decision fatigue)',
      'Sự suy thoái và bảo tồn năng lượng (deplete, willpower reservoir, streamline)',
      'Từ vựng học thuật mang tính phân tích chuyên sâu'
    ],
    typicalLengthWords: '200 - 300 từ',
    icon: '🧠',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800',
    bgGradient: 'from-purple-50 to-fuchsia-50 dark:from-purple-950/20 dark:to-stone-900',
    borderClass: 'border-purple-300 dark:border-purple-800',
    textClass: 'text-purple-700 dark:text-purple-300'
  },
  C2: {
    id: 'C2',
    code: 'C2',
    nameVi: 'Thành thạo bản ngữ',
    nameEn: 'Mastery / Proficiency',
    shortDescVi: 'Văn phong học thuật đỉnh cao, thần kinh học dòng chảy sáng tạo & nghệ thuật diễn đạt.',
    fullDescVi: 'Hiểu dễ dàng hầu như mọi thứ nghe hoặc đọc được. Có thể tóm tắt thông tin từ các nguồn nói và viết khác nhau, tái cấu trúc các lập luận và trình bày một cách mạch lạc, tinh tế.',
    grammarFocus: [
      'Cấu trúc văn phong bản ngữ tinh xảo (Sophisticated Rhetorical Structures)',
      'Ẩn dụ ngữ nghĩa phức hợp & Nhịp điệu câu song hành (Parallelism & Metaphoric Syntax)',
      'Mệnh đề bổ ngữ tuyệt đối (Absolute Clauses & Participial Absolutes)',
      'Các sắc thái biểu cảm tinh tế và biến thể cấu trúc học thuật'
    ],
    vocabularyFocus: [
      'Thần kinh học & Sự thăng hoa sáng tạo (neurobiology of flow, transient hypofrontality)',
      'Lĩnh hội sâu sắc và làm chủ nghệ thuật (cognitive mastery, pinnacle of performance)',
      'Các cụm thành ngữ & collocation văn phong cao cấp nhất'
    ],
    typicalLengthWords: '220 - 350 từ',
    icon: '👑',
    badgeClass: 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800',
    bgGradient: 'from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-stone-900',
    borderClass: 'border-rose-300 dark:border-rose-800',
    textClass: 'text-rose-700 dark:text-rose-300'
  }
};

// Helper chuẩn hóa level sang mã CEFR A1-C2
export function normalizeCEFRLevel(level: DifficultyLevel | string): 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' {
  const upper = level?.toUpperCase();
  if (upper === 'A1' || level === 'beginner') return 'A1';
  if (upper === 'A2' || level === 'elementary') return 'A2';
  if (upper === 'B1') return 'B1';
  if (upper === 'B2' || level === 'intermediate') return 'B2';
  if (upper === 'C1' || level === 'advanced') return 'C1';
  if (upper === 'C2' || level === 'mastery') return 'C2';
  return 'B1';
}

export function getCEFRInfo(level: DifficultyLevel | string): CEFRLevelInfo {
  const normalized = normalizeCEFRLevel(level);
  return CEFR_LEVELS[normalized] || CEFR_LEVELS.B1;
}
