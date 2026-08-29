import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  RotateCw, 
  ExternalLink, 
  ChevronRight, 
  ChevronLeft, 
  Copy, 
  Check, 
  Lightbulb, 
  Bot,
  Globe,
  Cpu,
  ChevronDown
} from 'lucide-react';

export type AIProvider = 'chatgpt' | 'gemini' | 'claude' | 'deepseek' | 'aistudio';

interface AIProviderOption {
  id: AIProvider;
  name: string;
  shortName: string;
  url: string;
  partition: string;
  badge: string;
  gradient: string;
  description: string;
}

const AI_PROVIDERS: AIProviderOption[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT (OpenAI)',
    shortName: 'ChatGPT',
    url: 'https://chatgpt.com',
    partition: 'persist:ai-session',
    badge: 'GPT-4o',
    gradient: 'from-emerald-600 to-teal-700',
    description: 'Trợ lý ChatGPT mạnh mẽ của OpenAI'
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    shortName: 'Gemini',
    url: 'https://gemini.google.com',
    partition: 'persist:gemini-session',
    badge: 'Gemini',
    gradient: 'from-blue-600 via-indigo-600 to-purple-600',
    description: 'Trợ lý AI thông minh của Google'
  },
  {
    id: 'claude',
    name: 'Claude AI (Anthropic)',
    shortName: 'Claude',
    url: 'https://claude.ai',
    partition: 'persist:ai-session',
    badge: 'Claude 3.5',
    gradient: 'from-amber-600 to-orange-700',
    description: 'Trợ lý phân tích văn bản chuyên sâu của Anthropic'
  },
  {
    id: 'deepseek',
    name: 'DeepSeek AI',
    shortName: 'DeepSeek',
    url: 'https://chat.deepseek.com',
    partition: 'persist:ai-session',
    badge: 'DeepSeek R1',
    gradient: 'from-cyan-600 to-blue-700',
    description: 'Trợ lý lập luận & ngôn ngữ DeepSeek'
  },
  {
    id: 'aistudio',
    name: 'Google AI Studio',
    shortName: 'AI Studio',
    url: 'https://aistudio.google.com',
    partition: 'persist:gemini-session',
    badge: 'API Dev',
    gradient: 'from-stone-700 to-stone-900',
    description: 'Môi trường phát triển Prompt & API của Google'
  }
];

interface GeminiSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  ratio: number; // percentage of sidebar, e.g. 30 for 7:3 ratio
  onRatioChange: (newRatio: number) => void;
  activeLessonTitle?: string;
}

const QUICK_PROMPTS = [
  {
    icon: '💡',
    label: 'Giải thích ngữ pháp',
    prompt: 'Hãy giải thích cấu trúc ngữ pháp và điểm lưu ý đặc biệt của câu/cụm từ sau bằng tiếng Việt dễ hiểu:'
  },
  {
    icon: '✨',
    label: 'Collocations & Đồng nghĩa',
    prompt: 'Hãy liệt kê 5 collocations thông dụng nhất và các từ đồng nghĩa (kèm ví dụ ngữ cảnh) của từ/cụm từ sau:'
  },
  {
    icon: '🗣️',
    label: 'IPA & Phát âm chuẩn',
    prompt: 'Hãy cung cấp phiên âm quốc tế (IPA), trọng âm chính/phụ và mẹo nối âm tự nhiên của câu/cụm từ sau:'
  },
  {
    icon: '📝',
    label: '3 Ví dụ thực tế',
    prompt: 'Hãy viết 3 câu ví dụ tiếng Anh thực tế trong đời sống hàng ngày có sử dụng cụm từ sau (kèm dịch nghĩa tiếng Việt):'
  },
  {
    icon: '🎯',
    label: 'Tạo bài tập phản xạ',
    prompt: 'Hãy tạo 2 bài tập điền từ và 1 câu hỏi dịch Anh-Việt dựa trên cụm từ sau để giúp tôi ghi nhớ sâu:'
  }
];

export const GeminiSidebar: React.FC<GeminiSidebarProps> = ({
  isOpen,
  onToggle,
  ratio,
  onRatioChange,
  activeLessonTitle,
}) => {
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>('chatgpt');
  const [showProviderMenu, setShowProviderMenu] = useState(false);
  const [isCopied, setIsCopied] = useState<string | null>(null);
  const [showPromptDrawer, setShowPromptDrawer] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [isElectron, setIsElectron] = useState(true);
  const webviewRef = useRef<any>(null);

  const activeProvider = AI_PROVIDERS.find(p => p.id === selectedProvider) || AI_PROVIDERS[0];

  useEffect(() => {
    // Check if running inside Electron
    if (typeof window !== 'undefined') {
      setIsElectron(Boolean(window.electronAPI || navigator.userAgent.toLowerCase().includes('electron')));
    }
  }, []);

  const handleReload = () => {
    if (webviewRef.current && typeof webviewRef.current.reload === 'function') {
      webviewRef.current.reload();
    }
  };

  const handleOpenExternal = () => {
    window.open(activeProvider.url, '_blank');
  };

  const handleCopyPrompt = (text: string, label: string) => {
    const fullText = customInput.trim() ? `${text}\n\n"${customInput.trim()}"` : `${text} `;
    navigator.clipboard.writeText(fullText);
    setIsCopied(label);
    setTimeout(() => {
      setIsCopied(null);
    }, 2500);
  };

  if (!isOpen) {
    return (
      <aside 
        aria-label="Mở trợ lý AI"
        className="fixed bottom-6 right-6 z-50 flex items-center shadow-xl animate-bounce-subtle"
      >
        <button
          onClick={onToggle}
          className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-medium rounded-full shadow-lg hover:shadow-emerald-500/25 transition-all transform hover:scale-105 cursor-pointer"
          title="Mở Trợ lý AI Song Song (Tỷ lệ 7:3)"
        >
          <Bot className="w-5 h-5 animate-pulse" />
          <span className="font-semibold text-sm">Mở AI Assistant (7:3)</span>
          <ChevronLeft className="w-4 h-4" />
        </button>
      </aside>
    );
  }

  return (
    <aside 
      aria-label="Trợ lý AI Song Song"
      className="h-full flex flex-col bg-white dark:bg-stone-900 border-l border-stone-200 dark:border-stone-800 shadow-2xl relative overflow-hidden transition-all duration-150"
      style={{ width: '100%', height: '100%' }}
    >
      {/* Top Header Bar */}
      <div className="flex-shrink-0 px-3 py-2 bg-stone-50 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between gap-2 z-30">
        {/* Left: AI Selector Dropdown */}
        <div className="relative flex items-center space-x-2 min-w-0">
          <button
            onClick={() => setShowProviderMenu(!showProviderMenu)}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-xl bg-gradient-to-r ${activeProvider.gradient} text-white font-bold text-xs shadow-sm hover:opacity-95 transition-all cursor-pointer truncate`}
            title="Đổi nhà cung cấp AI (ChatGPT, Gemini, Claude, DeepSeek...)"
          >
            <Bot className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{activeProvider.shortName}</span>
            <span className="px-1 py-0.2 text-[9px] bg-white/20 rounded font-normal">
              {activeProvider.badge}
            </span>
            <ChevronDown className="w-3 h-3 flex-shrink-0 opacity-80" />
          </button>

          {/* AI Provider Switcher Menu */}
          {showProviderMenu && (
            <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 p-2 z-50 space-y-1">
              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-400">
                Chọn trợ lý AI song song:
              </div>
              {AI_PROVIDERS.map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => {
                    setSelectedProvider(provider.id);
                    setShowProviderMenu(false);
                  }}
                  className={`w-full text-left px-2.5 py-2 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                    selectedProvider === provider.id
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200'
                      : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <div className="flex items-center space-x-2 truncate">
                    <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${provider.gradient}`} />
                    <div className="truncate">
                      <div className="text-xs font-bold truncate">{provider.name}</div>
                      <div className="text-[10px] text-stone-400 truncate">{provider.description}</div>
                    </div>
                  </div>
                  {selectedProvider === provider.id && (
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          )}

          {activeLessonTitle && (
            <p className="hidden xl:block text-[10px] text-stone-500 dark:text-stone-400 truncate max-w-[120px]">
              {activeLessonTitle}
            </p>
          )}
        </div>

        {/* Center/Right Controls */}
        <div className="flex items-center space-x-1 flex-shrink-0">
          {/* Ratio presets */}
          <div className="hidden sm:flex items-center bg-stone-200 dark:bg-stone-800 rounded-lg p-0.5 text-[11px] font-medium text-stone-600 dark:text-stone-300">
            <button
              onClick={() => onRatioChange(30)}
              className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                Math.round(ratio) === 30 
                  ? 'bg-white dark:bg-stone-700 text-emerald-600 dark:text-emerald-400 font-bold shadow-xs' 
                  : 'hover:text-stone-900 dark:hover:text-stone-100'
              }`}
              title="Tỷ lệ chuẩn: 70% App Đọc - 30% AI"
            >
              7:3
            </button>
            <button
              onClick={() => onRatioChange(50)}
              className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                Math.round(ratio) === 50 
                  ? 'bg-white dark:bg-stone-700 text-emerald-600 dark:text-emerald-400 font-bold shadow-xs' 
                  : 'hover:text-stone-900 dark:hover:text-stone-100'
              }`}
              title="Tỷ lệ cân bằng: 50% App Đọc - 50% AI"
            >
              5:5
            </button>
          </div>

          {/* Quick Prompt Drawer Button */}
          <button
            onClick={() => setShowPromptDrawer(!showPromptDrawer)}
            className={`p-1.5 rounded-lg text-xs font-medium flex items-center space-x-1 transition-all cursor-pointer ${
              showPromptDrawer 
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
            title="Gợi ý Prompt học tiếng Anh"
          >
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span className="hidden md:inline text-[11px]">Prompt</span>
          </button>

          {/* Reload Webview */}
          <button
            onClick={handleReload}
            className="p-1.5 rounded-lg text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
            title={`Tải lại ${activeProvider.shortName}`}
          >
            <RotateCw className="w-4 h-4" />
          </button>

          {/* Open External Browser */}
          <button
            onClick={handleOpenExternal}
            className="p-1.5 rounded-lg text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
            title="Mở trên trình duyệt ngoài"
          >
            <ExternalLink className="w-4 h-4" />
          </button>

          {/* Collapse / Close Side Panel */}
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
            title="Ẩn khung AI Assistant"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Prompt Helper Drawer (Accordion when active) */}
      {showPromptDrawer && (
        <div className="flex-shrink-0 bg-stone-100 dark:bg-stone-950/90 border-b border-stone-200 dark:border-stone-800 p-3 max-h-56 overflow-y-auto space-y-2 z-20">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              Gợi ý Prompt học tập 1-Click:
            </span>
            {isCopied && (
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 animate-pulse">
                <Check className="w-3.5 h-3.5" /> Đã sao chép prompt!
              </span>
            )}
          </div>

          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Dán từ / cụm từ / câu bạn muốn hỏi (tùy chọn)..."
            className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
            {QUICK_PROMPTS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleCopyPrompt(item.prompt, item.label)}
                className="flex items-center justify-between px-2.5 py-1.5 text-left bg-white dark:bg-stone-900 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 border border-stone-200 dark:border-stone-800 hover:border-emerald-300 dark:hover:border-emerald-700 rounded-lg text-xs font-medium text-stone-700 dark:text-stone-300 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all cursor-pointer group shadow-2xs"
              >
                <span className="flex items-center space-x-1.5 truncate">
                  <span>{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </span>
                {isCopied === item.label ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-600 flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-stone-500 dark:text-stone-400 text-center pt-1">
            💡 Nhấp để Copy Prompt → Nhấn <b>Ctrl+V</b> vào khung chat {activeProvider.shortName} bên dưới để gửi.
          </p>
        </div>
      )}

      {/* Main Content Area: Embedded Webview in Electron */}
      <div className="flex-1 w-full h-full relative bg-white dark:bg-stone-900 overflow-hidden">
        {isElectron ? (
          <webview
            key={activeProvider.id}
            ref={webviewRef}
            src={activeProvider.url}
            partition={activeProvider.partition}
            allowpopups={true}
            className="w-full h-full border-0"
            style={{ width: '100%', height: '100%' }}
          />
        ) : (
          /* Web Browser Fallback (if opened directly in Chrome instead of Electron app) */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-4 bg-stone-50 dark:bg-stone-900/50">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${activeProvider.gradient} flex items-center justify-center text-white shadow-lg`}>
              <Bot className="w-7 h-7" />
            </div>
            <div className="max-w-xs space-y-1">
              <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">
                {activeProvider.name}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Khi chạy qua Desktop App Linux, {activeProvider.shortName} được nhúng trực tiếp liền mạch tại đây theo tỷ lệ 7:3.
              </p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleOpenExternal}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Mở {activeProvider.shortName} trên trình duyệt</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
