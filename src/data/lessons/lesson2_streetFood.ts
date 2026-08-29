import { Lesson } from '../../types';

export const lesson2_streetFood: Lesson = {
  id: 'lesson-2',
  title: 'Ordering Street Food in Hanoi',
  titleVi: 'Gọi món ăn đường phố tại Hà Nội',
  level: 'A2',
  levelLabel: 'A2 - Sơ cấp',
  category: 'Ẩm thực & Du lịch',
  durationMinutes: 5,
  wordCount: 110,
  description: 'Explore vibrant Vietnamese culinary culture while mastering restaurant phrases, adjectives for taste, and polite requests.',
  descriptionVi: 'Khám phá văn hóa ẩm thực đường phố sôi động cùng các mẫu câu gọi món, tính từ chỉ hương vị và cách yêu cầu lịch sự.',
  icon: '🍜',
  badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  keyVocabulary: ['vibrant street vendor', 'mouth-watering aroma', 'could I have', 'extra herbs and chili', 'crispy spring rolls'],
  paragraphs: [
    {
      id: 'p1',
      sentences: [
        {
          id: 's2-1',
          text: 'Walking through the Old Quarter, we stop at a vibrant street vendor.',
          vietnamese: 'Đi dạo qua khu Phố Cổ, chúng tôi dừng chân tại một quán ăn vỉa hè nhộn nhịp.',
          sentenceGrammarNote: 'Mệnh đề phân từ hiện tại (Present Participle Clause): "Walking through..." rút gọn từ "When we are walking through...".',
          chunks: [
            {
              id: 'c2-1-1',
              text: 'Walking through the Old Quarter',
              vietnamese: 'đi dạo qua khu Phố Cổ',
              ipa: '/ˈwɑː.kɪŋ θruː ðə oʊld ˈkwɔːr.tər/',
              partOfSpeech: 'Cụm phân từ hiện tại (Participle Phrase)',
              grammarNote: 'Dùng V-ing đứng đầu câu khi hai hành động có cùng một chủ ngữ (we).',
              exampleSentence: 'Walking through the night market, I tasted many local snacks.',
              exampleTranslation: 'Đi dạo qua chợ đêm, tôi đã nếm thử nhiều món ăn vặt địa phương.',
              chunkType: 'lexical-phrase'
            },
            {
              id: 'c2-1-2',
              text: 'we stop at',
              vietnamese: 'chúng tôi dừng chân tại',
              ipa: '/wiː stɑːp æt/',
              partOfSpeech: 'Cụm động từ + Giới từ (Phrasal Verb / Verb + Prep)',
              grammarNote: '"stop at + địa điểm" nghĩa là ghé lại, dừng chân tại nơi nào.',
              exampleSentence: 'Let us stop at the souvenir shop first.',
              exampleTranslation: 'Hãy dừng chân ở cửa hàng lưu niệm trước nhé.',
              chunkType: 'phrasal-verb',
              usageComparison: {
                nativeWay: 'stop at / drop by',
                unnaturalMistake: 'stand in place of',
                whyExplanation: '"Stop at" dùng tự nhiên khi đang di chuyển và dừng chân ghé vào một quán xá trên đường.'
              }
            },
            {
              id: 'c2-1-3',
              text: 'a vibrant street vendor',
              vietnamese: 'một quán ăn vỉa hè nhộn nhịp',
              ipa: '/ə ˈvaɪ.brənt striːt ˈvɛn.dər/',
              partOfSpeech: 'Cụm danh từ tự nhiên (Collocation)',
              grammarNote: '"vibrant" mang nghĩa tràn đầy sức sống, nhộn nhịp; "street vendor" là người bán hàng rong/quán vỉa hè.',
              exampleSentence: 'Hanoi is famous for its vibrant street food scene.',
              exampleTranslation: 'Hà Nội nổi tiếng với không gian ẩm thực đường phố sôi động.',
              chunkType: 'collocation',
              usageComparison: {
                nativeWay: 'vibrant street vendor / bustling food stall',
                unnaturalMistake: 'crowded pavement restaurant',
                whyExplanation: '"Vibrant street vendor" diễn tả không khí sôi động, đậm chất văn hóa vỉa hè thay vì dịch word-by-word "pavement restaurant".'
              }
            }
          ]
        },
        {
          id: 's2-2',
          text: 'The mouth-watering aroma of grilled pork fills the cool evening air.',
          vietnamese: 'Mùi thơm nức mũi của thịt nướng lan tỏa khắp không khí se lạnh của buổi tối.',
          sentenceGrammarNote: 'Tính từ ghép: "mouth-watering" (thèm chảy nước miếng / thơm nức). Động từ "fills" chia theo chủ ngữ số ít "aroma".',
          chunks: [
            {
              id: 'c2-2-1',
              text: 'The mouth-watering aroma',
              vietnamese: 'mùi thơm nức mũi',
              ipa: '/ðə ˈmaʊθˌwɔː.tər.ɪŋ əˈroʊ.mə/',
              partOfSpeech: 'Cụm danh từ tự nhiên (Collocation)',
              grammarNote: '"aroma" chỉ mùi thơm dễ chịu của thức ăn hoặc cà phê (khác với "smell" chung chung).',
              exampleSentence: 'The mouth-watering aroma of freshly baked bread invited customers inside.',
              exampleTranslation: 'Mùi thơm nức mũi của bánh mì mới nướng đã mời gọi thực khách bước vào.',
              chunkType: 'collocation',
              usageComparison: {
                nativeWay: 'mouth-watering aroma / delicious aroma',
                unnaturalMistake: 'very good smell',
                whyExplanation: '"Mouth-watering aroma" là collocation gợi hình cực cao, mô tả mùi thơm hấp dẫn đến mức thèm chảy nước miếng.'
              }
            },
            {
              id: 'c2-2-2',
              text: 'of grilled pork',
              vietnamese: 'của món thịt nướng',
              ipa: '/əv ɡrɪld pɔːrk/',
              partOfSpeech: 'Cụm giới từ bổ nghĩa (Prepositional Phrase)',
              grammarNote: 'Phân từ hai "grilled" (được nướng) đóng vai trò tính từ bổ nghĩa cho "pork".',
              exampleSentence: 'I ordered grilled pork with garlic rice.',
              exampleTranslation: 'Tôi đã gọi món thịt lợn nướng ăn kèm cơm tỏi.',
              chunkType: 'lexical-phrase'
            },
            {
              id: 'c2-2-3',
              text: 'fills the cool evening air',
              vietnamese: 'lan tỏa khắp không khí se lạnh buổi tối',
              ipa: '/fɪlz ðə kuːl ˈiːv.nɪŋ er/',
              partOfSpeech: 'Cụm vị ngữ tự nhiên (Collocation)',
              grammarNote: 'Collocation: "smell/aroma fills the air" (mùi hương ngập tràn trong không gian).',
              exampleSentence: 'Sweet scent of jasmine filled the room.',
              exampleTranslation: 'Hương thơm ngọt ngào của hoa nhài ngập tràn cả căn phòng.',
              punctuationAfter: '.',
              chunkType: 'collocation'
            }
          ]
        }
      ]
    },
    {
      id: 'p2',
      sentences: [
        {
          id: 's2-3',
          text: '"Could I have two bowls of Bun Cha with extra fresh herbs, please?" I ask politely.',
          vietnamese: '"Làm ơn cho tôi hai bát Bún chả thêm nhiều rau thơm tươi được không ạ?" tôi lịch sự gọi món.',
          sentenceGrammarNote: 'Cấu trúc yêu cầu lịch sự: "Could I have + danh từ, please?" (chuẩn mực khi gọi món tại nhà hàng).',
          chunks: [
            {
              id: 'c2-3-1',
              text: 'Could I have',
              vietnamese: 'làm ơn cho tôi (gọi món)',
              ipa: '/kʊd aɪ hæv/',
              partOfSpeech: 'Cụm mẫu câu giao tiếp bản xứ (Lexical Phrase)',
              grammarNote: 'Mẫu câu lịch sự trang trọng hơn "I want" hoặc "Give me".',
              exampleSentence: 'Could I have a glass of tap water, please?',
              exampleTranslation: 'Làm ơn cho tôi một ly nước lọc được không?',
              chunkType: 'lexical-phrase',
              usageComparison: {
                nativeWay: 'Could I have... / Can I get...',
                unnaturalMistake: 'Give me... / I want to eat...',
                whyExplanation: 'Người bản xứ luôn dùng "Could I have..." để gọi món một cách lịch sự, tránh dùng "Give me" gây cảm giác thô lỗ ra lệnh.'
              }
            },
            {
              id: 'c2-3-2',
              text: 'two bowls of Bun Cha',
              vietnamese: 'hai bát bún chả',
              ipa: '/tuː boʊlz əv bʊn tʃɑː/',
              partOfSpeech: 'Cụm danh từ định lượng',
              grammarNote: 'Cấu trúc đếm số lượng: [Số đếm] + bowls of + [Tên món ăn].',
              exampleSentence: 'We ordered three bowls of hot chicken soup.',
              exampleTranslation: 'Chúng tôi đã gọi ba bát súp gà nóng hổi.',
              chunkType: 'lexical-phrase'
            },
            {
              id: 'c2-3-3',
              text: 'with extra fresh herbs',
              vietnamese: 'kèm thêm nhiều rau sống tươi sạch',
              ipa: '/wɪð ˈɛk.strə frɛʃ ɜːrbz/',
              partOfSpeech: 'Cụm giới từ bổ sung (Collocation)',
              grammarNote: '"extra" dùng trước danh từ nghĩa là gọi thêm, cho thêm.',
              exampleSentence: 'Can you please make it with extra cheese?',
              exampleTranslation: 'Bạn có thể cho thêm nhiều phô mai được không?',
              chunkType: 'collocation',
              usageComparison: {
                nativeWay: 'with extra fresh herbs',
                unnaturalMistake: 'with more vegetables',
                whyExplanation: '"Extra" là từ chuẩn xác nhất khi muốn gọi thêm topping/rau trong ẩm thực, và "herbs" là rau thơm/rau sống.'
              }
            },
            {
              id: 'c2-3-4',
              text: 'I ask politely',
              vietnamese: 'tôi lịch sự yêu cầu',
              ipa: '/aɪ æsk pəˈlaɪt.li/',
              partOfSpeech: 'Chủ ngữ + Động từ + Trạng từ',
              grammarNote: 'Trạng từ "politely" bổ nghĩa cho động từ "ask".',
              exampleSentence: 'She asked politely for the bill.',
              exampleTranslation: 'Cô ấy lịch sự xin hóa đơn thanh toán.',
              punctuationAfter: '.',
              chunkType: 'collocation'
            }
          ]
        },
        {
          id: 's2-4',
          text: 'The crispy spring rolls and savory broth taste absolutely delicious and authentic.',
          vietnamese: 'Những chiếc nem rán giòn rụm cùng nước dùng đậm đà mang hương vị thơm ngon và chuẩn vị vô cùng.',
          sentenceGrammarNote: 'Động từ chỉ giác quan "taste" đi với tính từ (delicious, authentic) chứ không dùng trạng từ.',
          chunks: [
            {
              id: 'c2-4-1',
              text: 'The crispy spring rolls',
              vietnamese: 'những chiếc nem rán giòn rụm',
              ipa: '/ðə ˈkrɪs.pi sprɪŋ roʊlz/',
              partOfSpeech: 'Cụm danh từ tự nhiên (Collocation)',
              grammarNote: '"crispy" mô tả độ giòn tan dễ vỡ của đồ chiên rán.',
              exampleSentence: 'Nothing beats homemade crispy spring rolls.',
              exampleTranslation: 'Không gì sánh bằng món nem rán giòn rụm tự làm tại nhà.',
              chunkType: 'collocation'
            },
            {
              id: 'c2-4-2',
              text: 'and savory broth',
              vietnamese: 'và nước dùng đậm đà',
              ipa: '/ænd ˈseɪ.vər.i brɔːθ/',
              partOfSpeech: 'Cụm danh từ tự nhiên (Collocation)',
              grammarNote: '"savory" (đậm đà vừa miệng); "broth" (nước dùng ninh từ xương thịt).',
              exampleSentence: 'The hot savory broth warmed our stomachs.',
              exampleTranslation: 'Nước dùng nóng hổi đậm đà làm ấm bụng chúng tôi.',
              chunkType: 'collocation',
              usageComparison: {
                nativeWay: 'savory broth / rich broth',
                unnaturalMistake: 'delicious soup water',
                whyExplanation: '"Broth" là từ chuyên dùng chỉ nước dùng hầm xương, kết hợp với "savory" để chỉ vị đậm đà vừa vặn.'
              }
            },
            {
              id: 'c2-4-3',
              text: 'taste absolutely delicious and authentic',
              vietnamese: 'mang hương vị thơm ngon tuyệt hảo và chuẩn vị truyền thống',
              ipa: '/teɪst ˌæb.səˈluːt.li dɪˈlɪʃ.əs ænd ɔːˈθɛn.tɪk/',
              partOfSpeech: 'Cụm vị ngữ tự nhiên (Collocation)',
              grammarNote: 'Trạng từ mức độ "absolutely" bổ nghĩa cho tính từ mạnh "delicious". "authentic" nghĩa là chuẩn vị gốc.',
              exampleSentence: 'Traditional pizza in Naples tastes absolutely authentic.',
              exampleTranslation: 'Bánh pizza truyền thống tại Naples có hương vị chuẩn gốc đích thực.',
              punctuationAfter: '.',
              chunkType: 'collocation'
            }
          ]
        }
      ]
    }
  ],
  exercises: [
    {
      id: 'ex2-1',
      type: 'fill-in-blank',
      instructions: 'Choose the most polite and natural phrase for ordering food.',
      instructionsVi: 'Chọn mẫu câu gọi món ăn lịch sự và tự nhiên nhất.',
      sentenceBefore: '"',
      sentenceAfter: 'two bowls of Bun Cha, please?"',
      correctAnswer: 'Could I have',
      options: ['Could I have', 'Give to me', 'I want now', 'Must bring me'],
      vietnameseMeaning: '"Làm ơn cho tôi hai bát bún chả được không ạ?"',
      explanation: '"Could I have..." là mẫu câu bản xứ chuẩn mực, lịch sự và tự nhiên nhất khi gọi món.'
    },
    {
      id: 'ex2-2',
      type: 'sentence-ordering',
      instructions: 'Arrange the words in the correct order to form a natural sentence.',
      instructionsVi: 'Sắp xếp các từ theo đúng trật tự câu hoàn chỉnh.',
      vietnamesePrompt: 'Mùi thơm nức mũi của thịt nướng lan tỏa khắp không khí buổi tối.',
      correctWords: ['The', 'mouth-watering', 'aroma', 'of', 'grilled', 'pork', 'fills', 'the', 'evening', 'air.'],
      scrambledWords: ['evening', 'aroma', 'pork', 'The', 'fills', 'mouth-watering', 'of', 'air.', 'the', 'grilled'],
      explanation: 'Trật tự câu: [Chủ ngữ: The mouth-watering aroma of grilled pork] + [Động từ: fills] + [Tân ngữ: the evening air].'
    },
    {
      id: 'ex2-3',
      type: 'vietnamese-to-english',
      instructions: 'Translate the sentence into natural English.',
      instructionsVi: 'Dịch câu tiếng Việt sang tiếng Anh tự nhiên.',
      vietnamesePrompt: 'Những chiếc nem rán giòn rụm và nước dùng đậm đà rất ngon.',
      correctAnswer: 'The crispy spring rolls and savory broth taste delicious.',
      acceptableAnswers: [
        'The crispy spring rolls and savory broth taste delicious.',
        'The crispy spring rolls and savory broth taste delicious'
      ],
      wordBank: ['The', 'crispy', 'spring', 'rolls', 'and', 'savory', 'broth', 'taste', 'delicious.', 'bad', 'sour'],
      hints: [
        'Nem rán giòn: "crispy spring rolls"',
        'Nước dùng đậm đà: "savory broth"'
      ],
      explanation: 'Dùng tính từ "crispy" cho đồ chiên giòn và "savory" cho nước dùng đậm đà.'
    }
  ]
};
