export interface DictionaryEntry {
  vi: string;
  ipa: string;
  pos: string;
  grammar: string;
}

export const COMMON_CHUNKS_DICTIONARY: Record<string, DictionaryEntry> = {
  'in the morning': {
    vi: 'vào buổi sáng',
    ipa: '/ɪn ðə ˈmɔːr.nɪŋ/',
    pos: 'Cụm giới từ thời gian',
    grammar: 'Giới từ "in" đi với các buổi trong ngày (in the morning/afternoon/evening).'
  },
  'in the afternoon': {
    vi: 'vào buổi chiều',
    ipa: '/ɪn ðə ˌæf.tərˈnuːn/',
    pos: 'Cụm giới từ thời gian',
    grammar: 'Giới từ "in" đi với các buổi trong ngày.'
  },
  'in the evening': {
    vi: 'vào buổi tối',
    ipa: '/ɪn ðə ˈiːv.nɪŋ/',
    pos: 'Cụm giới từ thời gian',
    grammar: 'Cụm giới từ chỉ thời gian buổi tối.'
  },
  'at night': {
    vi: 'vào ban đêm',
    ipa: '/æt naɪt/',
    pos: 'Cụm giới từ',
    grammar: 'Dùng giới từ "at" với "night", không dùng "in the night" khi nói chung.'
  },
  'every day': {
    vi: 'mỗi ngày / hàng ngày',
    ipa: '/ˈɛv.ri deɪ/',
    pos: 'Cụm trạng từ tần suất',
    grammar: '"every day" (2 từ rời) là trạng từ chỉ tần suất; khác với "everyday" (tính từ).'
  },
  'go to school': {
    vi: 'đi học / đến trường',
    ipa: '/ɡoʊ tuː skuːl/',
    pos: 'Cụm động từ',
    grammar: 'Không có mạo từ "the" khi đến trường vì mục đích học tập chính.'
  },
  'go to work': {
    vi: 'đi làm',
    ipa: '/ɡoʊ tuː wɜːrk/',
    pos: 'Cụm động từ',
    grammar: 'Cụm cố định chỉ hành động bắt đầu ca làm việc.'
  },
  'take care of': {
    vi: 'chăm sóc / lo liệu',
    ipa: '/teɪk ker əv/',
    pos: 'Cụm động từ (Phrasal Verb)',
    grammar: 'Take care of = look after (chăm sóc ai/cái gì).'
  },
  'look forward to': {
    vi: 'mong đợi / háo hức',
    ipa: '/lʊk ˈfɔːr.wərd tuː/',
    pos: 'Cụm động từ đặc biệt',
    grammar: 'Cấu trúc Look forward to + V-ing/Noun (mong chờ điều gì).'
  },
  'as soon as possible': {
    vi: 'càng sớm càng tốt',
    ipa: '/æz suːn æz ˈpɑː.sə.bəl/',
    pos: 'Cụm trạng từ',
    grammar: 'Thường viết tắt là ASAP trong công việc.'
  },
  'in order to': {
    vi: 'để mà / nhằm mục đích',
    ipa: '/ɪn ˈɔːr.dər tuː/',
    pos: 'Liên từ chỉ mục đích',
    grammar: 'In order to + V (nguyên mẫu) chỉ mục đích rõ ràng.'
  },
  'pay attention to': {
    vi: 'chú ý / tập trung vào',
    ipa: '/peɪ əˈtɛn.ʃən tuː/',
    pos: 'Cụm động từ',
    grammar: 'Đi kèm giới từ "to" + tân ngữ.'
  },
  'make a decision': {
    vi: 'đưa ra quyết định',
    ipa: '/meɪk ə dɪˈsɪʒ.ən/',
    pos: 'Collocation động từ + danh từ',
    grammar: 'Dùng động từ "make", không dùng "do a decision".'
  },
  'take advantage of': {
    vi: 'tận dụng / khai thác',
    ipa: '/teɪk ədˈvæn.tɪdʒ əv/',
    pos: 'Cụm thành ngữ',
    grammar: 'Mang nghĩa tận dụng cơ hội hoặc lợi thế.'
  },
  'play an important role': {
    vi: 'đóng vai trò quan trọng',
    ipa: '/pleɪ ən ɪmˈpɔːr.tənt roʊl/',
    pos: 'Cụm vị ngữ học thuật',
    grammar: 'Thường đi kèm giới từ "in" (play an important role in sth).'
  },
  'on the other hand': {
    vi: 'mặt khác / ngược lại',
    ipa: '/ɑːn ði ˈʌð.ər hænd/',
    pos: 'Liên từ chuyển tiếp',
    grammar: 'Dùng để đối chiếu hai quan điểm đối lập.'
  },
  'for example': {
    vi: 'ví dụ như',
    ipa: '/fɔːr ɪɡˈzæm.pəl/',
    pos: 'Cụm liên kết',
    grammar: 'Dùng để mở đầu một hoặc nhiều ví dụ minh họa.'
  },
  'according to': {
    vi: 'theo như',
    ipa: '/əˈkɔːr.dɪŋ tuː/',
    pos: 'Cụm giới từ',
    grammar: 'Dùng để trích dẫn nguồn tin hoặc ý kiến.'
  },
  'due to': {
    vi: 'bởi vì / do',
    ipa: '/duː tuː/',
    pos: 'Cụm giới từ nguyên nhân',
    grammar: 'Due to + Noun phrase/Gerund (do nguyên nhân gì).'
  },
  'in terms of': {
    vi: 'xét về mặt / phương diện',
    ipa: '/ɪn tɜːrmz əv/',
    pos: 'Cụm giới từ học thuật',
    grammar: 'Giới hạn phạm vi thảo luận trong một khía cạnh cụ thể.'
  },
};

export const BASIC_WORD_MAP: Record<string, string> = {
  'i': 'tôi',
  'you': 'bạn',
  'we': 'chúng ta',
  'they': 'họ',
  'he': 'anh ấy',
  'she': 'cô ấy',
  'it': 'nó',
  'is': 'là/ở',
  'are': 'là/ở',
  'was': 'đã là',
  'were': 'đã là',
  'have': 'có',
  'has': 'có',
  'had': 'đã có',
  'do': 'làm',
  'does': 'làm',
  'did': 'đã làm',
  'can': 'có thể',
  'will': 'sẽ',
  'would': 'sẽ/muốn',
  'should': 'nên',
  'must': 'phải',
  'and': 'và',
  'but': 'nhưng',
  'or': 'hoặc',
  'because': 'bởi vì',
  'with': 'với',
  'without': 'không có',
  'about': 'về',
  'for': 'cho/dành cho',
  'from': 'từ',
  'to': 'đến',
  'in': 'trong',
  'on': 'trên',
  'at': 'tại',
  'by': 'bởi/bằng',
  'very': 'rất',
  'really': 'thực sự',
  'more': 'nhiều hơn',
  'most': 'nhất',
  'good': 'tốt',
  'great': 'tuyệt vời',
  'new': 'mới',
  'old': 'cũ/già',
  'important': 'quan trọng',
  'difficult': 'khó khăn',
  'easy': 'dễ dàng',
  'time': 'thời gian',
  'day': 'ngày',
  'people': 'con người',
  'world': 'thế giới',
  'life': 'cuộc sống',
  'work': 'công việc',
  'study': 'học tập',
  'learn': 'học hỏi',
  'read': 'đọc',
  'write': 'viết',
  'speak': 'nói',
  'understand': 'hiểu',
};
