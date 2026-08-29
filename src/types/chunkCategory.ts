export type ChunkCategory = 
  | 'collocation'           // Cụm từ cố định tự nhiên (make a decision, deeply concerned)
  | 'phrasal-verb'          // Cụm động từ (figure out, carry out, look forward to)
  | 'academic-linking'      // Từ nối / Cấu trúc học thuật (in contrast to, as a consequence of)
  | 'idiom'                 // Thành ngữ (in the blink of an eye, piece of cake)
  | 'lexical-phrase'        // Cụm từ vựng ngữ nghĩa thông dụng (noun phrase, prep phrase)
  | 'general';              // Cụm từ chung

export interface ChunkTypeBadgeInfo {
  type: ChunkCategory;
  labelEn: string;
  labelVi: string;
  shortTag: string;
  icon: string;
  colorClass: string;
  bgLight: string;
  borderLight: string;
  badgePill: string;
  descriptionVi: string;
  examples: string[];
}

export const CHUNK_TYPE_DEFINITIONS: Record<ChunkCategory, ChunkTypeBadgeInfo> = {
  'collocation': {
    type: 'collocation',
    labelEn: 'Collocation',
    labelVi: 'Cụm từ tự nhiên bản xứ',
    shortTag: 'Collocation',
    icon: '🔗',
    colorClass: 'text-indigo-700 dark:text-indigo-300',
    bgLight: 'bg-indigo-50 dark:bg-indigo-950/60',
    borderLight: 'border-indigo-200 dark:border-indigo-800/80',
    badgePill: 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800',
    descriptionVi: 'Sự kết hợp từ ngữ tự nhiên mà người bản xứ luôn dùng cùng nhau (Ví dụ: heavy rain thay vì strong rain).',
    examples: ['make a decision', 'heavy rain', 'deeply concerned', 'take a look', 'pay attention'],
  },
  'phrasal-verb': {
    type: 'phrasal-verb',
    labelEn: 'Phrasal Verb',
    labelVi: 'Cụm động từ',
    shortTag: 'Phrasal Verb',
    icon: '⚡',
    colorClass: 'text-amber-700 dark:text-amber-300',
    bgLight: 'bg-amber-50 dark:bg-amber-950/60',
    borderLight: 'border-amber-200 dark:border-amber-800/80',
    badgePill: 'bg-amber-100 text-amber-900 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800',
    descriptionVi: 'Động từ kết hợp với giới từ/trạng từ tạo nên ý nghĩa đặc biệt khác với từ gốc.',
    examples: ['figure out', 'carry out', 'bring about', 'look forward to', 'give up'],
  },
  'academic-linking': {
    type: 'academic-linking',
    labelEn: 'Academic Linking',
    labelVi: 'Từ nối & Cấu trúc học thuật',
    shortTag: 'Academic',
    icon: '🏛️',
    colorClass: 'text-purple-700 dark:text-purple-300',
    bgLight: 'bg-purple-50 dark:bg-purple-950/60',
    borderLight: 'border-purple-200 dark:border-purple-800/80',
    badgePill: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800',
    descriptionVi: 'Cụm từ nối lập luận học thuật, báo chí và bài viết chuyên nghiệp nâng cao tính chặt chẽ.',
    examples: ['in contrast to', 'as a consequence of', 'with respect to', 'furthermore', 'in terms of'],
  },
  'idiom': {
    type: 'idiom',
    labelEn: 'Idiom',
    labelVi: 'Thành ngữ thực tế',
    shortTag: 'Idiom',
    icon: '💡',
    colorClass: 'text-rose-700 dark:text-rose-300',
    bgLight: 'bg-rose-50 dark:bg-rose-950/60',
    borderLight: 'border-rose-200 dark:border-rose-800/80',
    badgePill: 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800',
    descriptionVi: 'Thành ngữ biểu cảm với nghĩa bóng đặc trưng trong văn hóa giao tiếp tiếng Anh.',
    examples: ['in the blink of an eye', 'piece of cake', 'once in a blue moon', 'spill the beans'],
  },
  'lexical-phrase': {
    type: 'lexical-phrase',
    labelEn: 'Lexical Phrase',
    labelVi: 'Cụm danh/giới từ ngữ nghĩa',
    shortTag: 'Lexical',
    icon: '📦',
    colorClass: 'text-emerald-700 dark:text-emerald-300',
    bgLight: 'bg-emerald-50 dark:bg-emerald-950/60',
    borderLight: 'border-emerald-200 dark:border-emerald-800/80',
    badgePill: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800',
    descriptionVi: 'Khối ngữ nghĩa hoàn chỉnh (cụm danh từ, cụm giới từ chỉ địa điểm, thời gian, trạng thái).',
    examples: ['at a cozy cafe', 'a hot cup of coffee', 'in the quiet morning', 'on a regular basis'],
  },
  'general': {
    type: 'general',
    labelEn: 'General Phrase',
    labelVi: 'Cụm từ chung',
    shortTag: 'Phrase',
    icon: '✨',
    colorClass: 'text-stone-700 dark:text-stone-300',
    bgLight: 'bg-stone-50 dark:bg-stone-800/60',
    borderLight: 'border-stone-200 dark:border-stone-700/80',
    badgePill: 'bg-stone-100 text-stone-700 border-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:border-stone-700',
    descriptionVi: 'Cụm từ ngữ thông thường diễn đạt ý trong câu.',
    examples: ['usually start my day', 'very happy', 'to see that'],
  }
};

/**
 * Tự động phân loại loại cụm từ dựa trên cấu trúc, từ khóa và partOfSpeech
 */
export function inferChunkCategory(chunk: {
  text: string;
  partOfSpeech?: string;
  grammarNote?: string;
  chunkType?: ChunkCategory;
}): ChunkCategory {
  if (chunk.chunkType && CHUNK_TYPE_DEFINITIONS[chunk.chunkType]) {
    return chunk.chunkType;
  }

  const text = (chunk.text || '').toLowerCase().trim();
  const pos = (chunk.partOfSpeech || '').toLowerCase();
  const note = (chunk.grammarNote || '').toLowerCase();

  // 1. Check Idiom
  if (
    pos.includes('idiom') || 
    pos.includes('thành ngữ') || 
    note.includes('thành ngữ') ||
    text.includes('blink of an eye') ||
    text.includes('piece of cake') ||
    text.includes('rule of thumb')
  ) {
    return 'idiom';
  }

  // 2. Check Academic Linking
  if (
    pos.includes('linking') || 
    pos.includes('liên từ') || 
    pos.includes('từ nối') ||
    text.startsWith('in contrast') ||
    text.startsWith('as a result') ||
    text.startsWith('as a consequence') ||
    text.startsWith('on the other hand') ||
    text.startsWith('with respect to') ||
    text.startsWith('in terms of') ||
    text.startsWith('furthermore') ||
    text.startsWith('nevertheless') ||
    text.startsWith('in addition') ||
    text.startsWith('by comparison') ||
    text.startsWith('in essence')
  ) {
    return 'academic-linking';
  }

  // 3. Check Phrasal Verb
  const phrasalVerbPatterns = [
    /\b(figure|carry|bring|look|give|take|turn|put|come|go|set|stand|break|call|keep|hold|pick|run|fall|get|make|show|pass|work|step|point)\s+(out|up|in|on|off|down|away|over|back|through|across|along|around|about|forward to|with|into|after)\b/i
  ];
  if (
    pos.includes('phrasal verb') || 
    pos.includes('cụm động từ') || 
    note.includes('cụm động từ') ||
    phrasalVerbPatterns.some(p => p.test(text))
  ) {
    // Nếu có chứa các cụm động từ nổi tiếng
    if (
      text.includes('figure out') ||
      text.includes('carry out') ||
      text.includes('bring about') ||
      text.includes('look forward') ||
      text.includes('give up') ||
      text.includes('break down') ||
      text.includes('turn out') ||
      text.includes('rely on') ||
      text.includes('cope with') ||
      text.includes('set up') ||
      text.includes('take over')
    ) {
      return 'phrasal-verb';
    }
  }

  // 4. Check Collocation
  if (
    pos.includes('collocation') ||
    note.includes('collocation') ||
    note.includes('kết hợp từ') ||
    text.includes('heavy rain') ||
    text.includes('deeply concerned') ||
    text.includes('make a decision') ||
    text.includes('pay attention') ||
    text.includes('take a look') ||
    text.includes('take a sip') ||
    text.includes('compound effect') ||
    text.includes('drastic changes') ||
    text.includes('drastic and overwhelming') ||
    text.includes('decision fatigue') ||
    text.includes('atomic habits') ||
    text.includes('mental bandwidth') ||
    text.includes('intense focus')
  ) {
    return 'collocation';
  }

  // 5. Lexical Phrase (cụm giới từ, cụm danh từ dài)
  if (
    pos.includes('cụm giới từ') ||
    pos.includes('cụm danh từ') ||
    pos.includes('prepositional') ||
    pos.includes('noun phrase') ||
    text.startsWith('at a ') ||
    text.startsWith('in the ') ||
    text.startsWith('with a ') ||
    text.startsWith('of the ')
  ) {
    return 'lexical-phrase';
  }

  return 'general';
}
