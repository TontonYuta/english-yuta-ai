import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Copy, 
  ExternalLink, 
  Check, 
  ArrowRight, 
  BookOpen, 
  Layers, 
  Wand2, 
  AlertCircle, 
  HelpCircle,
  FileCode2, 
  RefreshCw, 
  Trash2, 
  Clock, 
  FileText,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { Lesson, DifficultyLevel } from '../../types';
import { CEFR_LEVELS, CEFRLevelInfo } from '../../data/cefrLevels';
import { 
  buildGeminiLessonPrompt, 
  parseGeminiLessonResponse, 
  GEMINI_DEMO_SAMPLE_JSON,
  PromptConfig 
} from '../../utils/geminiPromptBuilder';
import { 
  getStoredCustomLessons, 
  saveStoredCustomLesson, 
  deleteStoredCustomLesson 
} from '../../utils/customLessonsStorage';

interface AILessonGeneratorProps {
  onStartReading: (lesson: Lesson) => void;
}

const TOPIC_PRESETS = [
  {
    topic: 'Kinh nghiệm du lịch ẩm thực và khám phá văn hóa Nhật Bản',
    level: 'A2',
    style: 'story' as const,
    icon: '🍜',
    desc: 'Gọi món, trải nghiệm tàu điện ngầm và khám phá phố cổ'
  },
  {
    topic: 'Tác động của Trí tuệ nhân tạo (AI) tới tương lai nghề nghiệp',
    level: 'B1',
    style: 'analysis' as const,
    icon: '🤖',
    desc: 'Kỹ năng thích ứng, tự động hóa và học tập suốt đời'
  },
  {
    topic: 'Bí quyết rèn luyện thói quen nguyên tử và vượt qua sự trì hoãn',
    level: 'B2',
    style: 'guide' as const,
    icon: '⚡',
    desc: 'Quy tắc 2 phút, hiệu ứng lãi kép và đà tiến tâm lý'
  },
  {
    topic: 'Tâm lý học thần kinh: Nghịch lý của sự lựa chọn và kiệt sức nhận thức',
    level: 'C1',
    style: 'analysis' as const,
    icon: '🧠',
    desc: 'Dung lượng não bộ hữu hạn, bảo tồn ý chí và tối giản quyết định'
  },
  {
    topic: 'Khoa học về trạng thái Dòng chảy sâu (Deep Flow) và làm chủ sáng tạo',
    level: 'C2',
    style: 'analysis' as const,
    icon: '👑',
    desc: 'Ức chế tạm thời thùy trán, đắm chìm nhận thức và thăng hoa nghệ thuật'
  },
  {
    topic: 'Cuộc trò chuyện tại quán cà phê buổi sáng ở Paris',
    level: 'A1',
    style: 'conversation' as const,
    icon: '☕',
    desc: 'Chào hỏi, gọi đồ uống ấm và cảm nhận ánh nắng ban mai'
  }
];

export const AILessonGenerator: React.FC<AILessonGeneratorProps> = ({
  onStartReading,
}) => {
  // Config state
  const [topic, setTopic] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('B1');
  const [length, setLength] = useState<'short' | 'medium' | 'long'>('medium');
  const [style, setStyle] = useState<'story' | 'analysis' | 'conversation' | 'news' | 'guide'>('story');
  const [customNotes, setCustomNotes] = useState('');

  // UI state
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [showPromptPreview, setShowPromptPreview] = useState(false);
  const [rawGeminiResponse, setRawGeminiResponse] = useState('');
  const [parsedPreviewLesson, setParsedPreviewLesson] = useState<Lesson | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [customLessons, setCustomLessons] = useState<Lesson[]>(getStoredCustomLessons);

  // Sinh prompt tự động dựa trên cấu hình hiện tại
  const generatedPrompt = useMemo(() => {
    const activeTopic = topic.trim() || 'Thói quen học tiếng Anh hiệu quả mỗi ngày';
    return buildGeminiLessonPrompt({
      topic: activeTopic,
      level: selectedLevel,
      length,
      style,
      customNotes: customNotes.trim() || undefined,
    });
  }, [topic, selectedLevel, length, style, customNotes]);

  // Hành động chính: Copy Prompt và mở Gemini
  const handleCopyPromptAndOpenGemini = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopiedPrompt(true);
      setActiveStep(2);

      // Mở Google Gemini trong tab mới
      window.open('https://gemini.google.com/app', '_blank', 'noopener,noreferrer');

      setTimeout(() => {
        setCopiedPrompt(false);
      }, 4000);
    } catch (e) {
      console.error('Không thể copy vào clipboard', e);
      // Fallback: Mở tab
      window.open('https://gemini.google.com/app', '_blank', 'noopener,noreferrer');
    }
  };

  // Chỉ copy prompt
  const handleCopyOnly = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  // Phân tích kết quả JSON từ Gemini
  const handleParseResponse = (textToParse?: string) => {
    const text = textToParse !== undefined ? textToParse : rawGeminiResponse;
    setParseError(null);
    try {
      const lesson = parseGeminiLessonResponse(text, topic.trim() || 'Bài đọc AI');
      lesson.promptUsed = generatedPrompt;
      setParsedPreviewLesson(lesson);
      setActiveStep(3);
    } catch (err: any) {
      setParseError(err.message || 'Lỗi phân tích cú pháp JSON.');
      setParsedPreviewLesson(null);
    }
  };

  // Thử nghiệm bằng JSON demo có sẵn
  const handleLoadDemoJSON = () => {
    setRawGeminiResponse(GEMINI_DEMO_SAMPLE_JSON);
    handleParseResponse(GEMINI_DEMO_SAMPLE_JSON);
  };

  // Lưu bài đọc và bắt đầu đọc ngay
  const handleSaveAndStartReading = () => {
    if (!parsedPreviewLesson) return;
    const updatedList = saveStoredCustomLesson(parsedPreviewLesson);
    setCustomLessons(updatedList);
    onStartReading(parsedPreviewLesson);
  };

  // Xóa bài đọc tự tạo
  const handleDeleteLesson = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = deleteStoredCustomLesson(id);
    setCustomLessons(updated);
    if (parsedPreviewLesson?.id === id) {
      setParsedPreviewLesson(null);
    }
  };

  const currentLevelInfo: CEFRLevelInfo = CEFR_LEVELS[selectedLevel] || CEFR_LEVELS.B1;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-900 via-emerald-900 to-stone-950 text-white p-6 sm:p-10 border border-emerald-700/50 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-emerald-200 text-xs font-semibold border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
            <span>Tạo bài đọc chuyên sâu với Google Gemini AI</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight leading-tight">
            Tạo Bài Đọc & Chia Cụm Từ Bằng Gemini Prompt
          </h1>

          <p className="text-emerald-100/80 text-xs sm:text-sm leading-relaxed">
            Chọn chủ đề và cấp độ bạn mong muốn. Nhấn <strong>"Sao chép Prompt & Mở Gemini"</strong>, dán vào Gemini để AI tự động biên soạn văn bản, phân tích từng cụm từ kèm phiên âm IPA, nghĩa tiếng Việt và bài tập thực hành.
          </p>

          {/* Stepper Wizard Bar */}
          <div className="pt-3 flex items-center space-x-2 text-xs">
            <div className={`px-3 py-1.5 rounded-xl flex items-center space-x-1.5 font-bold transition-all ${
              activeStep >= 1 ? 'bg-emerald-500 text-white' : 'bg-white/10 text-stone-300'
            }`}>
              <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">1</span>
              <span>Thiết lập chủ đề & Level</span>
            </div>

            <ArrowRight className="w-3 h-3 text-emerald-400" />

            <div className={`px-3 py-1.5 rounded-xl flex items-center space-x-1.5 font-bold transition-all ${
              activeStep >= 2 ? 'bg-emerald-500 text-white' : 'bg-white/10 text-stone-300'
            }`}>
              <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">2</span>
              <span>Gửi Prompt sang Gemini</span>
            </div>

            <ArrowRight className="w-3 h-3 text-emerald-400" />

            <div className={`px-3 py-1.5 rounded-xl flex items-center space-x-1.5 font-bold transition-all ${
              activeStep >= 3 ? 'bg-emerald-500 text-white' : 'bg-white/10 text-stone-300'
            }`}>
              <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">3</span>
              <span>Dán kết quả & Đọc ngay</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Generator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Configuration & Prompt (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* STEP 1: Topic and CEFR Level Selection */}
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-7 border border-stone-200 dark:border-stone-800 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xs font-black">
                  1
                </span>
                <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
                  Chọn chủ đề & Cấp độ CEFR cụ thể
                </h2>
              </div>
            </div>

            {/* Topic Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                Chủ đề bạn muốn đọc
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Ví dụ: Du lịch Đà Lạt, Bí quyết quản lý thời gian, Tâm lý học..."
                className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            {/* Topic Presets */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-stone-500">
                Gợi ý chủ đề hay theo cấp độ:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {TOPIC_PRESETS.slice(0, 4).map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setTopic(item.topic);
                      setSelectedLevel(item.level);
                      setStyle(item.style);
                    }}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-start space-x-2.5 cursor-pointer ${
                      topic === item.topic
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 shadow-xs'
                        : 'bg-stone-50/50 dark:bg-stone-800/40 border-stone-200 dark:border-stone-700 hover:border-emerald-400'
                    }`}
                  >
                    <span className="text-base mt-0.5">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-bold text-stone-800 dark:text-stone-200 truncate">
                          {item.topic}
                        </span>
                        <span className="px-1.5 py-0.2 text-[10px] font-bold rounded bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 shrink-0">
                          {item.level}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 truncate mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* CEFR Level Selector Tabs */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider flex items-center justify-between">
                <span>Trình độ CEFR phân cấp cụ thể:</span>
                <span className="text-emerald-600 font-bold text-xs">
                  {currentLevelInfo.code} - {currentLevelInfo.nameVi}
                </span>
              </label>

              {/* 6 CEFR Tabs */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                {Object.values(CEFR_LEVELS).map((lvl) => {
                  const isSelected = selectedLevel === lvl.code;
                  return (
                    <button
                      key={lvl.code}
                      type="button"
                      onClick={() => setSelectedLevel(lvl.code)}
                      className={`p-2 rounded-xl text-center border transition-all cursor-pointer ${
                        isSelected
                          ? `${lvl.badgeClass} border-2 shadow-xs scale-102`
                          : 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-stone-400'
                      }`}
                    >
                      <div className="text-sm font-black">{lvl.code}</div>
                      <div className="text-[10px] font-semibold truncate">{lvl.nameVi}</div>
                    </button>
                  );
                })}
              </div>

              {/* Level Details Card */}
              <div className={`p-3.5 rounded-2xl border ${currentLevelInfo.badgeClass} bg-opacity-40 text-xs space-y-2 mt-2`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-base">{currentLevelInfo.icon}</span>
                    <span className="font-extrabold text-sm">
                      Khung năng lực {currentLevelInfo.code} ({currentLevelInfo.nameEn})
                    </span>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/60 dark:bg-black/40">
                    {currentLevelInfo.typicalLengthWords}
                  </span>
                </div>

                <p className="leading-relaxed text-stone-700 dark:text-stone-200">
                  {currentLevelInfo.fullDescVi}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-stone-300/40 dark:border-stone-700/40 text-[11px]">
                  <div>
                    <span className="font-bold">Trọng tâm ngữ pháp: </span>
                    <span className="opacity-90">{currentLevelInfo.grammarFocus.slice(0, 2).join(', ')}</span>
                  </div>
                  <div>
                    <span className="font-bold">Chủ đề từ vựng: </span>
                    <span className="opacity-90">{currentLevelInfo.vocabularyFocus.slice(0, 2).join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Length & Style Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                  Độ dài bài đọc
                </label>
                <select
                  value={length}
                  onChange={(e: any) => setLength(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option value="short">Ngắn (~80 - 120 từ)</option>
                  <option value="medium">Vừa phải (~150 - 220 từ - Khuyên dùng)</option>
                  <option value="long">Dài chuyên sâu (~250 - 350 từ)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                  Phong cách văn bản
                </label>
                <select
                  value={style}
                  onChange={(e: any) => setStyle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option value="story">Câu chuyện kể thực tế & Cảm xúc</option>
                  <option value="analysis">Bài luận phân tích khoa học/tâm lý</option>
                  <option value="conversation">Hội thoại giao tiếp hàng ngày</option>
                  <option value="news">Bản tin báo chí & Xu hướng</option>
                  <option value="guide">Hướng dẫn kỹ năng & Lời khuyên</option>
                </select>
              </div>
            </div>

            {/* Custom Notes */}
            <div className="space-y-1 pt-1">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                Yêu cầu bổ sung cho Gemini (Tùy chọn)
              </label>
              <input
                type="text"
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="Ví dụ: Tập trung vào từ vựng phỏng vấn xin việc, thêm các cụm thành ngữ..."
                className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none"
              />
            </div>
          </div>

          {/* STEP 2: Main Action Buttons: Copy Prompt & Open Gemini */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 rounded-3xl p-6 text-white shadow-lg space-y-4">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-white/20 text-white flex items-center justify-center text-xs font-black">
                2
              </span>
              <h3 className="font-bold text-base">
                Sao chép Prompt & Mở Google Gemini
              </h3>
            </div>

            <p className="text-xs text-emerald-100 leading-relaxed">
              Nhấn nút bên dưới để tự động copy toàn bộ cấu trúc Prompt tối ưu và mở tab Google Gemini. Tại Gemini, bạn chỉ cần nhấn <kbd className="bg-black/30 px-1.5 py-0.5 rounded text-[11px] font-mono">Ctrl + V</kbd> (hoặc <kbd className="bg-black/30 px-1.5 py-0.5 rounded text-[11px] font-mono">Cmd + V</kbd>) và gửi!
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
              <button
                type="button"
                onClick={handleCopyPromptAndOpenGemini}
                className="w-full sm:flex-1 py-3.5 px-5 rounded-2xl bg-white text-emerald-900 hover:bg-emerald-50 font-extrabold text-xs sm:text-sm shadow-md flex items-center justify-center space-x-2 transition-all cursor-pointer active:scale-98"
              >
                {copiedPrompt ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Đã Copy & Đang mở Gemini...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Sao chép Prompt & Mở Gemini</span>
                    <ExternalLink className="w-4 h-4 text-emerald-700" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleCopyOnly}
                className="w-full sm:w-auto py-3.5 px-4 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                title="Chỉ sao chép nội dung prompt mà không mở tab mới"
              >
                <Copy className="w-4 h-4" />
                <span>Chỉ Copy</span>
              </button>
            </div>

            {/* Toggle Prompt Text Details */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowPromptPreview(!showPromptPreview)}
                className="text-xs text-emerald-200 hover:text-white flex items-center space-x-1 underline cursor-pointer"
              >
                <FileCode2 className="w-3.5 h-3.5" />
                <span>{showPromptPreview ? 'Ẩn nội dung Prompt' : 'Xem trước toàn bộ Prompt gửi cho Gemini'}</span>
              </button>

              {showPromptPreview && (
                <div className="mt-3 p-3.5 rounded-xl bg-black/40 text-emerald-100 text-[11px] font-mono whitespace-pre-wrap max-h-60 overflow-y-auto leading-relaxed border border-white/10">
                  {generatedPrompt}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Column: STEP 3 - Paste & Preview Gemini Result (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* STEP 3 Box */}
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-7 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xs font-black">
                  3
                </span>
                <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
                  Dán kết quả từ Gemini & Xem trước
                </h2>
              </div>

              {/* Quick Demo Load */}
              <button
                type="button"
                onClick={handleLoadDemoJSON}
                className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center space-x-1 cursor-pointer"
                title="Tải nhanh kết quả mẫu demo mà không cần mở tab"
              >
                <Wand2 className="w-3 h-3" />
                <span>Thử bài mẫu Demo</span>
              </button>
            </div>

            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
              Sau khi Gemini tạo xong, hãy <strong>nhấn nút sao chép (Copy)</strong> câu trả lời trên Gemini và dán vào khung bên dưới:
            </p>

            {/* Textarea for JSON result */}
            <div className="space-y-1.5">
              <textarea
                rows={8}
                value={rawGeminiResponse}
                onChange={(e) => setRawGeminiResponse(e.target.value)}
                placeholder='Dán kết quả JSON từ Gemini vào đây (ví dụ: { "title": "...", "paragraphs": [...] })'
                className="w-full p-3 text-xs font-mono rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-y"
              />
            </div>

            {/* Error banner if parsing fails */}
            {parseError && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <div className="space-y-1">
                  <p className="font-bold">Không thể phân tích dữ liệu:</p>
                  <p className="opacity-90">{parseError}</p>
                </div>
              </div>
            )}

            {/* Parse / Preview Button */}
            <button
              type="button"
              onClick={() => handleParseResponse()}
              disabled={!rawGeminiResponse.trim()}
              className="w-full py-3 px-4 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-white disabled:opacity-40 font-bold text-xs shadow-xs flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Kiểm tra & Xem trước bài đọc</span>
            </button>
          </div>

          {/* Live Preview Card if Parsed Successfully */}
          {parsedPreviewLesson && (
            <div className="bg-emerald-50/70 dark:bg-emerald-950/40 rounded-3xl p-6 border-2 border-emerald-500/50 shadow-md space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                    Bài đọc đã sẵn sàng!
                  </span>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${parsedPreviewLesson.badgeColor}`}>
                  {parsedPreviewLesson.levelLabel}
                </span>
              </div>

              {/* Title & Stats */}
              <div>
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-serif">
                  {parsedPreviewLesson.title}
                </h3>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                  {parsedPreviewLesson.titleVi}
                </p>
                <div className="flex items-center space-x-3 text-xs text-stone-500 mt-2">
                  <span className="flex items-center space-x-1">
                    <FileText className="w-3.5 h-3.5" />
                    <span>{parsedPreviewLesson.wordCount} từ</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>~{parsedPreviewLesson.durationMinutes} phút</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>{parsedPreviewLesson.exercises.length} bài tập</span>
                  </span>
                </div>
              </div>

              {/* Sample Chunks Highlight */}
              <div className="p-3 rounded-xl bg-white dark:bg-stone-900 border border-emerald-200 dark:border-emerald-800/80 space-y-2 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                  Xem trước các cụm từ (Natural Chunks):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {parsedPreviewLesson.paragraphs[0]?.sentences[0]?.chunks.map((c, i) => (
                    <span 
                      key={i}
                      className="px-2 py-1 rounded-lg bg-emerald-100/70 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 text-xs font-medium border border-emerald-300/60"
                      title={`${c.vietnamese} (${c.ipa})`}
                    >
                      {c.text}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action: Save & Read Now */}
              <button
                type="button"
                onClick={handleSaveAndStartReading}
                className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-emerald-600/20 hover:from-emerald-700 hover:to-teal-700 flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <span>Lưu & Bắt đầu đọc bài học này ngay</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* User's Previously Generated AI Lessons */}
          {customLessons.length > 0 && (
            <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 flex items-center space-x-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Bài đọc AI bạn đã lưu ({customLessons.length})</span>
                </h3>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {customLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    onClick={() => onStartReading(lesson)}
                    className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-emerald-500 bg-stone-50/50 dark:bg-stone-800/50 flex items-center justify-between cursor-pointer group transition-all"
                  >
                    <div className="min-w-0 flex-1 pr-2">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-sm">{lesson.icon || '📖'}</span>
                        <h4 className="font-bold text-xs text-stone-800 dark:text-stone-200 truncate group-hover:text-emerald-600">
                          {lesson.title}
                        </h4>
                      </div>
                      <p className="text-[11px] text-stone-500 truncate mt-0.5">
                        {lesson.titleVi} • {lesson.levelLabel}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => handleDeleteLesson(e, lesson.id)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors"
                        title="Xóa bài đọc này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
