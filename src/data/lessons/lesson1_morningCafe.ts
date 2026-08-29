import { Lesson } from '../../types';

export const lesson1_morningCafe: Lesson = {
  id: 'lesson-1',
  title: 'A Morning at a Cozy Cafe',
  titleVi: 'Một buổi sáng tại quán cà phê ấm cúng',
  level: 'A1',
  levelLabel: 'A1 - Người mới bắt đầu',
  category: 'Đời sống hàng ngày',
  durationMinutes: 4,
  wordCount: 85,
  description: 'Learn everyday vocabulary for ordering drinks, describing morning routines, and enjoying peaceful moments.',
  descriptionVi: 'Học từ vựng thường nhật về gọi đồ uống, mô tả thói quen buổi sáng và tận hưởng khoảnh khắc thư thái.',
  icon: '☕',
  badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
  keyVocabulary: ['start my day', 'a hot cup of coffee', 'cozy cafe', 'take a sip', 'listen to acoustic music'],
  paragraphs: [
    {
      id: 'p1',
      sentences: [
        {
          id: 's1-1',
          text: 'I usually start my day with a hot cup of coffee at a cozy cafe.',
          vietnamese: 'Tôi thường bắt đầu ngày mới với một tách cà phê nóng tại một quán cà phê ấm cúng.',
          sentenceGrammarNote: 'Cấu trúc thì Hiện tại đơn: S + usually + V(nguyên mẫu) để diễn tả thói quen lặp đi lặp lại.',
          chunks: [
            {
              id: 'c1-1-1',
              text: 'I',
              vietnamese: 'tôi',
              ipa: '/aɪ/',
              partOfSpeech: 'Đại từ nhân xưng (Personal Pronoun)',
              grammarNote: 'Đóng vai trò chủ ngữ trong câu.',
              exampleSentence: 'I love reading books in the quiet morning.',
              exampleTranslation: 'Tôi thích đọc sách vào buổi sáng yên tĩnh.',
              chunkType: 'general'
            },
            {
              id: 'c1-1-2',
              text: 'usually start my day',
              vietnamese: 'thường bắt đầu ngày mới',
              ipa: '/ˈjuː.ʒu.ə.li stɑːrt maɪ deɪ/',
              partOfSpeech: 'Cụm động từ tự nhiên (Collocation)',
              grammarNote: 'Trạng từ chỉ tần suất "usually" đứng trước động từ chính "start".',
              exampleSentence: 'She usually starts her day with a 15-minute yoga session.',
              exampleTranslation: 'Cô ấy thường bắt đầu ngày mới bằng bài tập yoga 15 phút.',
              chunkType: 'collocation',
              usageComparison: {
                nativeWay: 'start my day / begin my day',
                unnaturalMistake: 'open my day',
                whyExplanation: 'Người bản xứ luôn dùng động từ "start" hoặc "begin" đi cùng với "my day", không dùng "open my day" theo kiểu dịch từng từ tiếng Việt.'
              },
              relatedCollocations: ['start the morning', 'kick off the day', 'early in the day']
            },
            {
              id: 'c1-1-3',
              text: 'with a hot cup of coffee',
              vietnamese: 'với một tách cà phê nóng',
              ipa: '/wɪð ə hɑːt kʌp əv ˈkɑː.fi/',
              partOfSpeech: 'Cụm giới từ (Prepositional Phrase)',
              grammarNote: 'Cụm danh từ đo lường "a cup of + danh từ không đếm được (coffee)".',
              exampleSentence: 'He enjoys sitting with a hot cup of coffee by the fireplace.',
              exampleTranslation: 'Anh ấy thích ngồi bên lò sưởi với một tách cà phê nóng.',
              chunkType: 'lexical-phrase',
              relatedCollocations: ['a freshly brewed cup of coffee', 'a mug of hot tea']
            },
            {
              id: 'c1-1-4',
              text: 'at a cozy cafe',
              vietnamese: 'tại một quán cà phê ấm cúng',
              ipa: '/æt ə ˈkoʊ.zi kæfˈeɪ/',
              partOfSpeech: 'Cụm giới từ chỉ địa điểm (Prepositional Phrase)',
              grammarNote: 'Giới từ "at" dùng cho địa điểm cụ thể, "cozy" là tính từ mang nghĩa ấm cúng, dễ chịu.',
              exampleSentence: 'We met at a cozy cafe near the university.',
              exampleTranslation: 'Chúng tôi đã gặp nhau tại một quán cà phê ấm cúng gần trường đại học.',
              punctuationAfter: '.',
              chunkType: 'collocation',
              usageComparison: {
                nativeWay: 'cozy cafe / quaint cafe',
                unnaturalMistake: 'warm restaurant / hot coffee shop',
                whyExplanation: '"Cozy" mô tả cảm giác ấm cúng, thân thiện, nhỏ xinh vừa vặn của quán cà phê, thay vì chỉ nhiệt độ thể lý như "warm/hot".'
              }
            }
          ]
        },
        {
          id: 's1-2',
          text: 'The warm sunlight shines through the window while soft acoustic music plays in the background.',
          vietnamese: 'Ánh nắng ấm áp chiếu qua khung cửa sổ trong khi điệu nhạc acoustic êm dịu vang lên nhẹ nhàng.',
          sentenceGrammarNote: 'Liên từ "while" (trong khi) nối hai mệnh đề diễn ra song song.',
          chunks: [
            {
              id: 'c1-2-1',
              text: 'The warm sunlight',
              vietnamese: 'ánh nắng ấm áp',
              ipa: '/ðə wɔːrm ˈsʌn.laɪt/',
              partOfSpeech: 'Cụm danh từ (Noun Phrase)',
              grammarNote: 'Tính từ "warm" bổ nghĩa cho danh từ không đếm được "sunlight".',
              exampleSentence: 'The warm sunlight brightened the whole living room.',
              exampleTranslation: 'Ánh nắng ấm áp làm sáng bừng cả phòng khách.',
              chunkType: 'lexical-phrase'
            },
            {
              id: 'c1-2-2',
              text: 'shines through the window',
              vietnamese: 'chiếu qua khung cửa sổ',
              ipa: '/ʃaɪnz θruː ðə ˈwɪn.doʊ/',
              partOfSpeech: 'Cụm động từ (Verb Phrase)',
              grammarNote: 'Động từ "shine" chia thêm "s" vì chủ ngữ số ít (sunlight). Giới từ "through" chỉ sự xuyên qua.',
              exampleSentence: 'Morning rays shine through the green leaves.',
              exampleTranslation: 'Tia nắng ban mai chiếu qua những tán lá xanh.',
              chunkType: 'lexical-phrase'
            },
            {
              id: 'c1-2-3',
              text: 'while soft acoustic music',
              vietnamese: 'trong khi nhạc acoustic êm dịu',
              ipa: '/waɪl sɔːft əˈkuː.stɪk ˈmjuː.zɪk/',
              partOfSpeech: 'Liên từ + Cụm danh từ',
              grammarNote: '"while" nối mệnh đề phụ chỉ thời gian đồng thời.',
              exampleSentence: 'I like studying while soft acoustic music is on.',
              exampleTranslation: 'Tôi thích học bài khi có tiếng nhạc acoustic êm dịu.',
              chunkType: 'lexical-phrase'
            },
            {
              id: 'c1-2-4',
              text: 'plays in the background',
              vietnamese: 'vang lên nhẹ nhàng phía sau',
              ipa: '/pleɪz ɪn ðə ˈbæk.ɡraʊnd/',
              partOfSpeech: 'Cụm động từ tự nhiên (Collocation)',
              grammarNote: '"in the background" nghĩa là làm nền, không quá ồn ào lấn át.',
              exampleSentence: 'Classical melodies played in the background during dinner.',
              exampleTranslation: 'Những giai điệu cổ điển vang lên làm nền trong bữa tối.',
              punctuationAfter: '.',
              chunkType: 'collocation',
              usageComparison: {
                nativeWay: 'music plays in the background',
                unnaturalMistake: 'music sounds in the back',
                whyExplanation: '"Play in the background" là collocation cố định để nói về nhạc nền vang lên êm dịu tạo không khí.'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'p2',
      sentences: [
        {
          id: 's1-3',
          text: 'I take a slow sip and open my favorite English book to practice reading.',
          vietnamese: 'Tôi nhấp một ngụm thật chậm và mở cuốn sách tiếng Anh yêu thích để luyện đọc.',
          sentenceGrammarNote: 'Cấu trúc mục đích: "to + V" (to practice reading = để luyện đọc). Động từ practice đi kèm V-ing (reading).',
          chunks: [
            {
              id: 'c1-3-1',
              text: 'I take a slow sip',
              vietnamese: 'tôi nhấp một ngụm chậm rãi',
              ipa: '/aɪ teɪk ə sloʊ sɪp/',
              partOfSpeech: 'Cụm động từ tự nhiên (Collocation)',
              grammarNote: 'Collocation tự nhiên: "take a sip" (uống một ngụm nhỏ).',
              exampleSentence: 'Take a sip of water whenever you feel thirsty.',
              exampleTranslation: 'Hãy nhấp một ngụm nước bất cứ khi nào bạn thấy khát.',
              chunkType: 'collocation',
              usageComparison: {
                nativeWay: 'take a sip / sip slowly',
                unnaturalMistake: 'drink a little drop',
                whyExplanation: 'Người bản xứ dùng danh từ "sip" kết hợp với động từ "take" ("take a sip") thay vì "drink a small water".'
              },
              relatedCollocations: ['take a bite', 'take a breath', 'take a gulp']
            },
            {
              id: 'c1-3-2',
              text: 'and open my favorite English book',
              vietnamese: 'và mở cuốn sách tiếng Anh yêu thích',
              ipa: '/ænd ˈoʊ.pən maɪ ˈfeɪ.vər.ɪt ˈɪŋ.ɡlɪʃ bʊk/',
              partOfSpeech: 'Cụm động từ + Tân ngữ',
              grammarNote: 'Trật tự tính từ: tính từ sở hữu (my) + tính từ đánh giá (favorite) + tính từ nguồn gốc (English) + danh từ (book).',
              exampleSentence: 'Open your favorite book and immerse yourself.',
              exampleTranslation: 'Hãy mở cuốn sách yêu thích của bạn và đắm mình vào đó.',
              chunkType: 'lexical-phrase'
            },
            {
              id: 'c1-3-3',
              text: 'to practice reading',
              vietnamese: 'để luyện tập việc đọc',
              ipa: '/tuː ˈpræk.tɪs ˈriː.dɪŋ/',
              partOfSpeech: 'Mệnh đề chỉ mục đích (Infinitive of Purpose)',
              grammarNote: 'Quy tắc: Practice + V-ing (danh động từ). Không dùng "practice to read".',
              exampleSentence: 'We gather every Sunday to practice speaking English.',
              exampleTranslation: 'Chúng tôi tụ họp mỗi Chủ Nhật để luyện nói tiếng Anh.',
              punctuationAfter: '.',
              chunkType: 'collocation',
              usageComparison: {
                nativeWay: 'practice reading (practice + V-ing)',
                unnaturalMistake: 'practice to read',
                whyExplanation: 'Động từ "practice" bắt buộc đi với danh động từ V-ing, không đi với "to V".'
              }
            }
          ]
        },
        {
          id: 's1-4',
          text: 'This peaceful morning habit brings me peace of mind and helps me focus better for the day ahead.',
          vietnamese: 'Thói quen buổi sáng yên bình này mang lại cho tôi sự thanh thản trong tâm hồn và giúp tôi tập trung tốt hơn cho ngày mới phía trước.',
          sentenceGrammarNote: 'Cấu trúc song hành với "and": "brings me peace of mind and helps me focus...". Help someone + V(nguyên mẫu).',
          chunks: [
            {
              id: 'c1-4-1',
              text: 'This peaceful morning habit',
              vietnamese: 'thói quen buổi sáng bình yên này',
              ipa: '/ðɪs ˈpiːs.fəl ˈmɔːr.nɪŋ ˈhæb.ɪt/',
              partOfSpeech: 'Cụm danh từ chủ ngữ',
              grammarNote: 'Tính từ "peaceful" và danh từ bổ nghĩa "morning" đứng trước danh từ chính "habit".',
              exampleSentence: 'A healthy morning habit sets the tone for productive work.',
              exampleTranslation: 'Một thói quen buổi sáng lành mạnh tạo đà cho ngày làm việc năng suất.',
              chunkType: 'collocation',
              relatedCollocations: ['morning routine', 'daily ritual', 'healthy habit']
            },
            {
              id: 'c1-4-2',
              text: 'brings me peace of mind',
              vietnamese: 'mang lại cho tôi sự thanh thản trong tâm trí',
              ipa: '/brɪŋz miː piːs əv maɪnd/',
              partOfSpeech: 'Thành ngữ / Cụm diễn đạt bản xứ (Idiomatic Expression)',
              grammarNote: '"peace of mind" là thành ngữ chỉ trạng thái tĩnh tâm, an yên, không lo âu.',
              exampleSentence: 'Having an emergency fund gives you true peace of mind.',
              exampleTranslation: 'Có một khoản quỹ dự phòng mang lại cho bạn sự an tâm thực sự.',
              chunkType: 'idiom',
              usageComparison: {
                nativeWay: 'peace of mind',
                unnaturalMistake: 'quiet heart / silent mind',
                whyExplanation: '"Peace of mind" là thành ngữ kinh điển của tiếng Anh để chỉ trạng thái tinh thần an yên, bình thản.'
              }
            },
            {
              id: 'c1-4-3',
              text: 'and helps me focus better',
              vietnamese: 'và giúp tôi tập trung tốt hơn',
              ipa: '/ænd hɛlps miː ˈfoʊ.kəs ˈbɛt.ər/',
              partOfSpeech: 'Cụm động từ',
              grammarNote: 'Cấu trúc: help + tân ngữ + V(bare): help me focus (không bắt buộc có "to").',
              exampleSentence: 'Green tea helps me focus better during long meetings.',
              exampleTranslation: 'Trà xanh giúp tôi tập trung tốt hơn trong những cuộc họp kéo dài.',
              chunkType: 'collocation'
            },
            {
              id: 'c1-4-4',
              text: 'for the day ahead',
              vietnamese: 'cho cả ngày dài phía trước',
              ipa: '/fɔːr ðə deɪ əˈhɛd/',
              partOfSpeech: 'Cụm giới từ tự nhiên (Collocation)',
              grammarNote: 'Trạng từ "ahead" đứng sau danh từ "the day" mang nghĩa thời gian sắp tới.',
              exampleSentence: 'Get a good night of sleep to prepare for the challenges ahead.',
              exampleTranslation: 'Hãy ngủ một giấc thật ngon để chuẩn bị cho những thử thách phía trước.',
              punctuationAfter: '.',
              chunkType: 'collocation',
              usageComparison: {
                nativeWay: 'the day ahead / the road ahead',
                unnaturalMistake: 'the future day',
                whyExplanation: '"The day ahead" là cách nói bản xứ rất trang nhã để chỉ toàn bộ phần thời gian còn lại của ngày hôm nay.'
              }
            }
          ]
        }
      ]
    }
  ],
  exercises: [
    {
      id: 'ex1-1',
      type: 'fill-in-blank',
      instructions: 'Choose the most natural English phrase to complete the sentence.',
      instructionsVi: 'Chọn cụm từ tiếng Anh tự nhiên phù hợp nhất để hoàn thành câu.',
      sentenceBefore: 'I usually',
      sentenceAfter: 'with a hot cup of coffee at a cozy cafe.',
      correctAnswer: 'start my day',
      options: ['start my day', 'open my day', 'make my morning', 'begin my time'],
      vietnameseMeaning: 'Tôi thường bắt đầu ngày mới với một tách cà phê nóng...',
      explanation: 'Trong tiếng Anh bản xứ, người ta dùng cụm collocation "start my day" (hoặc "begin my day") để diễn tả việc bắt đầu ngày mới.'
    },
    {
      id: 'ex1-2',
      type: 'sentence-ordering',
      instructions: 'Arrange the words in the correct order to form a natural sentence.',
      instructionsVi: 'Sắp xếp các từ theo đúng trật tự câu hoàn chỉnh.',
      vietnamesePrompt: 'Ánh nắng ấm áp chiếu qua khung cửa sổ.',
      correctWords: ['The', 'warm', 'sunlight', 'shines', 'through', 'the', 'window.'],
      scrambledWords: ['shines', 'window.', 'The', 'through', 'warm', 'the', 'sunlight'],
      explanation: 'Cấu trúc câu: [Chủ ngữ: The warm sunlight] + [Động từ: shines] + [Trạng ngữ chỉ nơi chốn: through the window].'
    },
    {
      id: 'ex1-3',
      type: 'vietnamese-to-english',
      instructions: 'Translate the Vietnamese sentence into natural English.',
      instructionsVi: 'Dịch câu tiếng Việt sang tiếng Anh tự nhiên.',
      vietnamesePrompt: 'Thói quen buổi sáng bình yên này mang lại cho tôi sự thanh thản trong tâm hồn.',
      correctAnswer: 'This peaceful morning habit brings me peace of mind.',
      acceptableAnswers: [
        'This peaceful morning habit brings me peace of mind.',
        'This peaceful morning habit gives me peace of mind.',
        'This peaceful morning habit brings me peace of mind'
      ],
      wordBank: ['This', 'peaceful', 'morning', 'habit', 'brings', 'me', 'peace', 'of', 'mind.', 'quiet', 'heart'],
      hints: [
        'Sự thanh thản trong tâm trí: "peace of mind"',
        'Mang lại cho tôi: "brings me..."'
      ],
      explanation: '"Peace of mind" là thành ngữ rất tự nhiên chỉ sự bình yên, thư thái trong tâm hồn.'
    }
  ]
};
