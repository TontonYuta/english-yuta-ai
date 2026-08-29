import { Lesson } from '../../types';

export const lesson3_aiLanguage: Lesson = {
  id: 'lesson-3',
  title: 'How AI is Changing Language Learning',
  titleVi: 'Trí tuệ nhân tạo đang thay đổi việc học ngôn ngữ như thế nào',
  level: 'B1',
  levelLabel: 'B1 - Trung cấp',
  category: 'Công nghệ & Giáo dục',
  durationMinutes: 7,
  wordCount: 165,
  description: 'Understand the revolutionary impact of contextual chunking, AI tutors, and spaced repetition on acquiring fluency.',
  descriptionVi: 'Hiểu tác động mang tính cách mạng của việc học theo cụm từ ngữ cảnh, gia sư AI và lặp lại ngắt quãng tới khả năng lưu loát.',
  icon: '🤖',
  badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  keyVocabulary: ['paradigm shift', 'acquire natural fluency', 'break down complex texts', 'spaced repetition algorithms', 'real-time feedback'],
  paragraphs: [
    {
      id: 'p1',
      sentences: [
        {
          id: 's3-1',
          text: 'Recent breakthroughs in artificial intelligence have triggered a paradigm shift in education.',
          vietnamese: 'Những đột phá gần đây trong trí tuệ nhân tạo đã kích hoạt một sự chuyển dịch mô hình mang tính căn bản trong giáo dục.',
          sentenceGrammarNote: 'Thì Hiện tại hoàn thành: "have triggered" diễn tả một hành động đã diễn ra và đang mang lại tác động rõ rệt ở hiện tại.',
          chunks: [
            {
              id: 'c3-1-1',
              text: 'Recent breakthroughs',
              vietnamese: 'những đột phá gần đây',
              ipa: '/ˈriː.sənt ˈbreɪk.θruːz/',
              partOfSpeech: 'Cụm danh từ (Noun Phrase)',
              grammarNote: '"breakthrough" là danh từ ghép chỉ bước tiến vượt bậc mang tính đột phá.',
              exampleSentence: 'Scientific breakthroughs have revolutionized modern medicine.',
              exampleTranslation: 'Những đột phá khoa học đã cách mạng hóa y học hiện đại.'
            },
            {
              id: 'c3-1-2',
              text: 'in artificial intelligence',
              vietnamese: 'trong lĩnh vực trí tuệ nhân tạo',
              ipa: '/ɪn ˌɑːr.t̬ə.fɪʃ.əl ɪnˈtel.ə.dʒəns/',
              partOfSpeech: 'Cụm giới từ chuyên ngành',
              grammarNote: 'Cụm từ cố định viết tắt là AI.',
              exampleSentence: 'Courses in artificial intelligence are gaining popularity worldwide.',
              exampleTranslation: 'Các khóa học về trí tuệ nhân tạo đang ngày càng phổ biến trên toàn cầu.'
            },
            {
              id: 'c3-1-3',
              text: 'have triggered a paradigm shift',
              vietnamese: 'đã kích hoạt một sự thay đổi mô hình căn bản',
              ipa: '/hæv ˈtrɪɡ.ərd ə ˈpær.ə.daɪm ʃɪft/',
              partOfSpeech: 'Cụm động từ học thuật (Academic Verb Phrase)',
              grammarNote: 'Collocation cao cấp: "trigger a paradigm shift" nghĩa là tạo ra một bước ngoặt làm thay đổi hoàn toàn cách nhìn nhận vấn đề.',
              exampleSentence: 'The invention of the internet triggered a paradigm shift in communication.',
              exampleTranslation: 'Sự phát minh ra internet đã kích hoạt một sự thay đổi mô hình căn bản trong giao tiếp.'
            },
            {
              id: 'c3-1-4',
              text: 'in education',
              vietnamese: 'trong ngành giáo dục',
              ipa: '/ɪn ˌedʒ.əˈkeɪ.ʃən/',
              partOfSpeech: 'Cụm giới từ chỉ phạm vi',
              grammarNote: '"education" không đếm được khi nói chung.',
              exampleSentence: 'Investment in education pays the best interest.',
              exampleTranslation: 'Đầu tư vào giáo dục mang lại lợi ích tốt nhất.'
            }
          ]
        },
        {
          id: 's3-2',
          text: 'Instead of memorizing isolated word lists, learners can now absorb meaningful chunks in context.',
          vietnamese: 'Thay vì học vẹt những danh sách từ rời rạc, người học giờ đây có thể tiếp thu các cụm từ giàu ý nghĩa trong ngữ cảnh thực tế.',
          sentenceGrammarNote: 'Cấu trúc "Instead of + V-ing" (thay vì làm gì đó). "absorb" mang nghĩa thẩm thấu tự nhiên.',
          chunks: [
            {
              id: 'c3-2-1',
              text: 'Instead of memorizing',
              vietnamese: 'thay vì ghi nhớ máy móc',
              ipa: '/ɪnˈstɛd əv ˈmɛm.ə.raɪ.zɪŋ/',
              partOfSpeech: 'Cụm giới từ + Danh động từ (Gerund)',
              grammarNote: 'Sau giới từ "of" bắt buộc phải dùng V-ing.',
              exampleSentence: 'Instead of complaining, let us look for viable solutions.',
              exampleTranslation: 'Thay vì phàn nàn, hãy cùng tìm kiếm các giải pháp khả thi.'
            },
            {
              id: 'c3-2-2',
              text: 'isolated word lists',
              vietnamese: 'các danh sách từ vựng đơn lẻ, rời rạc',
              ipa: '/ˈaɪ.sə.leɪ.tɪd wɜːrd lɪsts/',
              partOfSpeech: 'Cụm danh từ (Noun Phrase)',
              grammarNote: '"isolated" là tính từ quá khứ phân từ biểu thị sự tách biệt, cô lập khỏi ngữ cảnh.',
              exampleSentence: 'Relying solely on isolated word lists leads to unnatural speech.',
              exampleTranslation: 'Chỉ dựa vào danh sách từ vựng rời rạc sẽ dẫn đến cách nói chuyện thiếu tự nhiên.'
            },
            {
              id: 'c3-2-3',
              text: 'learners can now absorb',
              vietnamese: 'người học giờ đây có thể thẩm thấu',
              ipa: '/ˈlɜːr.nərz kæn naʊ əbˈzɔːrb/',
              partOfSpeech: 'Mệnh đề chính (Subject + Modal + Verb)',
              grammarNote: 'Động từ "absorb" ẩn dụ cho việc tiếp thu ngôn ngữ sâu sắc như bọt biển hút nước.',
              exampleSentence: 'Young children absorb foreign sounds effortlessly.',
              exampleTranslation: 'Trẻ nhỏ thẩm thấu các âm thanh ngoại ngữ một cách nhẹ nhàng.'
            },
            {
              id: 'c3-2-4',
              text: 'meaningful chunks in context',
              vietnamese: 'các cụm từ mang ý nghĩa trọn vẹn trong ngữ cảnh',
              ipa: '/ˈmiː.nɪŋ.fəl tʃʌŋks ɪn ˈkɑːn.tɛkst/',
              partOfSpeech: 'Cụm danh từ + Giới từ',
              grammarNote: '"in context" là yếu tố then chốt giúp não bộ liên kết ngữ nghĩa và ngữ pháp một cách tự nhiên.',
              exampleSentence: 'Language acquisition happens fastest when you study chunks in context.',
              exampleTranslation: 'Việc thụ đắc ngôn ngữ diễn ra nhanh nhất khi bạn học các cụm từ trong ngữ cảnh.'
            }
          ]
        }
      ]
    },
    {
      id: 'p2',
      sentences: [
        {
          id: 's3-3',
          text: 'This interactive approach bridges the gap between passive reading and active communication.',
          vietnamese: 'Phương pháp tương tác này thu hẹp khoảng cách giữa việc đọc thụ động và khả năng giao tiếp chủ động.',
          sentenceGrammarNote: 'Thành ngữ học thuật: "bridge the gap between A and B" (thu hẹp khoảng cách giữa A và B).',
          chunks: [
            {
              id: 'c3-3-1',
              text: 'This interactive approach',
              vietnamese: 'phương pháp tiếp cận tương tác này',
              ipa: '/ðɪs ˌɪn.tərˈæk.tɪv əˈproʊtʃ/',
              partOfSpeech: 'Cụm danh từ chủ ngữ (Noun Phrase)',
              grammarNote: '"approach" ở đây là danh từ đếm được, nghĩa là phương pháp tiếp cận.',
              exampleSentence: 'This interactive approach keeps students thoroughly engaged.',
              exampleTranslation: 'Phương pháp tương tác này giữ cho học sinh luôn hào hứng tham gia.'
            },
            {
              id: 'c3-3-2',
              text: 'bridges the gap',
              vietnamese: 'thu hẹp khoảng cách',
              ipa: '/ˈbrɪdʒ.ɪz ðə ɡæp/',
              partOfSpeech: 'Cụm động từ thành ngữ (Idiomatic Verb Phrase)',
              grammarNote: 'Động từ "bridge" (bắc cầu, thu hẹp khoảng cách).',
              exampleSentence: 'Mentorship bridges the gap between academic theory and workplace practice.',
              exampleTranslation: 'Sự cố vấn giúp thu hẹp khoảng cách giữa lý thuyết học thuật và thực tiễn công việc.'
            },
            {
              id: 'c3-3-3',
              text: 'between passive reading and active communication',
              vietnamese: 'giữa việc đọc thụ động và giao tiếp chủ động',
              ipa: '/bɪˈtwiːn ˈpæs.ɪv ˈriː.dɪŋ ænd ˈæk.tɪv kəˌmjuː.nəˈkeɪ.ʃən/',
              partOfSpeech: 'Cụm giới từ liên kết song song',
              grammarNote: 'Cặp tính từ đối lập: passive (thụ động) vs active (chủ động).',
              exampleSentence: 'We strive to move from passive listening to active discussion.',
              exampleTranslation: 'Chúng tôi nỗ lực chuyển từ lắng nghe thụ động sang thảo luận chủ động.'
            }
          ]
        }
      ]
    }
  ],
  exercises: [
    {
      id: 'ex3-1',
      type: 'fill-in-blank',
      instructions: 'Choose the advanced academic collocation to complete the sentence.',
      instructionsVi: 'Chọn cụm từ học thuật chuẩn xác để điền vào chỗ trống.',
      sentenceBefore: 'Recent breakthroughs in AI have triggered a',
      sentenceAfter: 'in modern language education.',
      correctAnswer: 'paradigm shift',
      options: ['paradigm shift', 'quick hobby', 'small detail', 'word puzzle'],
      vietnameseMeaning: 'Những đột phá gần đây trong AI đã kích hoạt một sự chuyển biến mô hình căn bản...',
      explanation: '"paradigm shift" là thuật ngữ học thuật cao cấp chỉ sự thay đổi mang tính căn bản trong phương pháp luận hoặc cách tư duy của cả một ngành.',
      relatedChunkText: 'have triggered a paradigm shift'
    },
    {
      id: 'ex3-2',
      type: 'sentence-ordering',
      instructions: 'Reorder the components to form a coherent sentence.',
      instructionsVi: 'Sắp xếp các thành phần thành câu văn mạch lạc.',
      vietnamesePrompt: 'Phương pháp này thu hẹp khoảng cách giữa việc đọc thụ động và giao tiếp chủ động.',
      correctWords: ['This', 'interactive', 'approach', 'bridges', 'the', 'gap', 'between', 'passive', 'reading', 'and', 'active', 'communication.'],
      scrambledWords: ['gap', 'bridges', 'This', 'active', 'approach', 'passive', 'and', 'between', 'communication.', 'reading', 'the', 'interactive'],
      explanation: 'Cấu trúc thành ngữ: [Subject] + bridges the gap + between [A] and [B].'
    },
    {
      id: 'ex3-3',
      type: 'vietnamese-to-english',
      instructions: 'Translate the following sentence into English.',
      instructionsVi: 'Dịch câu sau sang tiếng Anh.',
      vietnamesePrompt: 'Thay vì ghi nhớ máy móc các danh sách từ rời rạc, người học thẩm thấu các cụm từ trong ngữ cảnh.',
      correctAnswer: 'Instead of memorizing isolated word lists, learners absorb chunks in context.',
      acceptableAnswers: [
        'Instead of memorizing isolated word lists, learners absorb chunks in context.',
        'Instead of memorizing isolated word lists, learners absorb chunks in context'
      ],
      wordBank: ['Instead', 'of', 'memorizing', 'isolated', 'word', 'lists,', 'learners', 'absorb', 'chunks', 'in', 'context.', 'translating', 'mechanically'],
      hints: ['Instead of + V-ing = Thay vì làm gì', 'absorb chunks in context = thẩm thấu cụm từ trong ngữ cảnh'],
      explanation: '"Instead of memorizing isolated word lists, learners absorb chunks in context."'
    }
  ]
};
