const dialogueData = {
  categories: [
    {
      id: 'greetings',
      title: '인사 (Greetings)',
      icon: '👋',
      dialogues: [
        {
          id: 1,
          korean: '안녕하세요!',
          english: 'Hello!',
          filipino: 'Kumusta!',
          explanation: '가장 기본적인 인사말입니다.',
          explanationEn: 'The most basic greeting in Korean.',
          explanationFil: 'Ang pinakapangunahing pagbati sa Korean.'
        },
        {
          id: 2,
          korean: '안녕히 가세요.',
          english: 'Goodbye (when someone is leaving).',
          filipino: 'Paalam (kapag umaalis ang tao).',
          explanation: '상대방이 갈 때 사용하는 인사말입니다.',
          explanationEn: 'Used when someone is leaving.',
          explanationFil: 'Ginagamit kapag umaalis ang kausap.'
        },
        {
          id: 3,
          korean: '안녕히 계세요.',
          english: 'Goodbye (when you are leaving).',
          filipino: 'Paalam (kapag ikaw ang umaalis).',
          explanation: '자신이 갈 때 사용하는 인사말입니다.',
          explanationEn: 'Used when you are leaving.',
          explanationFil: 'Ginagamit kapag ikaw ang umaalis.'
        },
        {
          id: 4,
          korean: '좋은 아침이에요.',
          english: 'Good morning.',
          filipino: 'Magandang umaga.',
          explanation: '아침 인사말입니다.',
          explanationEn: 'Morning greeting.',
          explanationFil: 'Pagbati sa umaga.'
        },
        {
          id: 5,
          korean: '좋은 하루 되세요.',
          english: 'Have a good day.',
          filipino: 'Magandang araw sa inyo.',
          explanation: '좋은 하루를 보내라는 인사말입니다.',
          explanationEn: 'Wishing someone a good day.',
          explanationFil: 'Pagbati ng magandang araw.'
        }
      ]
    },
    {
      id: 'daily_life',
      title: '일상생활 (Daily Life)',
      icon: '🏠',
      dialogues: [
        {
          id: 6,
          korean: '오늘 날씨가 좋네요.',
          english: 'The weather is nice today.',
          filipino: 'Maganda ang panahon ngayon.',
          explanation: '날씨에 대한 일상적인 대화입니다.',
          explanationEn: 'Common conversation about weather.',
          explanationFil: 'Karaniwang usapan tungkol sa panahon.'
        },
        {
          id: 7,
          korean: '뭐 하고 계세요?',
          english: 'What are you doing?',
          filipino: 'Ano ang ginagawa mo?',
          explanation: '상대방의 현재 상황을 묻는 질문입니다.',
          explanationEn: 'Asking about someone\'s current situation.',
          explanationFil: 'Pagtanong tungkol sa kasalukuyang sitwasyon.'
        },
        {
          id: 8,
          korean: '집에 가고 있어요.',
          english: 'I\'m going home.',
          filipino: 'Pauwi na ako.',
          explanation: '집으로 가는 상황을 표현합니다.',
          explanationEn: 'Expressing that you\'re going home.',
          explanationFil: 'Pagpapahayag na pauwi ka na.'
        },
        {
          id: 9,
          korean: '배가 고파요.',
          english: 'I\'m hungry.',
          filipino: 'Gutom na ako.',
          explanation: '배고픔을 표현하는 일상적인 말입니다.',
          explanationEn: 'Expressing hunger in daily conversation.',
          explanationFil: 'Pagpapahayag ng gutom sa pang-araw-araw na usapan.'
        },
        {
          id: 10,
          korean: '피곤해요.',
          english: 'I\'m tired.',
          filipino: 'Pagod na ako.',
          explanation: '피로함을 표현하는 말입니다.',
          explanationEn: 'Expressing tiredness.',
          explanationFil: 'Pagpapahayag ng pagod.'
        }
      ]
    },
    {
      id: 'shopping',
      title: '쇼핑 (Shopping)',
      icon: '🛒',
      dialogues: [
        {
          id: 11,
          korean: '이거 얼마예요?',
          english: 'How much is this?',
          filipino: 'Magkano ito?',
          explanation: '물건의 가격을 묻는 질문입니다.',
          explanationEn: 'Asking about the price of an item.',
          explanationFil: 'Pagtanong tungkol sa presyo ng bagay.'
        },
        {
          id: 12,
          korean: '할인해 주세요.',
          english: 'Please give me a discount.',
          filipino: 'Pakibigyan mo ako ng discount.',
          explanation: '할인을 요청하는 말입니다.',
          explanationEn: 'Requesting a discount.',
          explanationFil: 'Paghingi ng discount.'
        },
        {
          id: 13,
          korean: '카드로 결제할게요.',
          english: 'I\'ll pay by card.',
          filipino: 'Magbabayad ako gamit ang card.',
          explanation: '카드 결제를 하겠다는 말입니다.',
          explanationEn: 'Saying you\'ll pay by card.',
          explanationFil: 'Sasabihin na magbabayad gamit ang card.'
        },
        {
          id: 14,
          korean: '영수증 주세요.',
          english: 'Please give me a receipt.',
          filipino: 'Pakibigyan mo ako ng resibo.',
          explanation: '영수증을 요청하는 말입니다.',
          explanationEn: 'Requesting a receipt.',
          explanationFil: 'Paghingi ng resibo.'
        },
        {
          id: 15,
          korean: '다른 색깔 있어요?',
          english: 'Do you have other colors?',
          filipino: 'May ibang kulay ba kayo?',
          explanation: '다른 색깔이 있는지 묻는 질문입니다.',
          explanationEn: 'Asking if there are other colors available.',
          explanationFil: 'Pagtanong kung may ibang kulay.'
        }
      ]
    },
    {
      id: 'food',
      title: '음식 (Food)',
      icon: '🍽️',
      dialogues: [
        {
          id: 16,
          korean: '맛있어요!',
          english: 'It\'s delicious!',
          filipino: 'Masarap!',
          explanation: '음식이 맛있다고 표현하는 말입니다.',
          explanationEn: 'Expressing that food is delicious.',
          explanationFil: 'Pagpapahayag na masarap ang pagkain.'
        },
        {
          id: 17,
          korean: '뭐 드실래요?',
          english: 'What would you like to eat?',
          filipino: 'Ano ang gusto mong kainin?',
          explanation: '무엇을 먹을지 묻는 질문입니다.',
          explanationEn: 'Asking what someone would like to eat.',
          explanationFil: 'Pagtanong kung ano ang gusto mong kainin.'
        },
        {
          id: 18,
          korean: '매운 거 싫어해요.',
          english: 'I don\'t like spicy food.',
          filipino: 'Ayaw ko ng maanghang na pagkain.',
          explanation: '매운 음식을 싫어한다고 표현합니다.',
          explanationEn: 'Expressing dislike for spicy food.',
          explanationFil: 'Pagpapahayag na ayaw ng maanghang na pagkain.'
        },
        {
          id: 19,
          korean: '물 좀 주세요.',
          english: 'Please give me some water.',
          filipino: 'Pakibigyan mo ako ng tubig.',
          explanation: '물을 요청하는 말입니다.',
          explanationEn: 'Requesting water.',
          explanationFil: 'Paghingi ng tubig.'
        },
        {
          id: 20,
          korean: '계산해 주세요.',
          english: 'Please calculate the bill.',
          filipino: 'Pakikwenta mo ang bill.',
          explanation: '계산을 요청하는 말입니다.',
          explanationEn: 'Requesting the bill calculation.',
          explanationFil: 'Paghingi ng pagkukwenta ng bill.'
        }
      ]
    },
    {
      id: 'transportation',
      title: '교통 (Transportation)',
      icon: '🚌',
      dialogues: [
        {
          id: 21,
          korean: '지하철역이 어디예요?',
          english: 'Where is the subway station?',
          filipino: 'Saan ang subway station?',
          explanation: '지하철역의 위치를 묻는 질문입니다.',
          explanationEn: 'Asking for the location of the subway station.',
          explanationFil: 'Pagtanong tungkol sa lokasyon ng subway station.'
        },
        {
          id: 22,
          korean: '버스 타고 가요.',
          english: 'Let\'s take the bus.',
          filipino: 'Sumakay tayo ng bus.',
          explanation: '버스를 이용하자고 제안하는 말입니다.',
          explanationEn: 'Suggesting to take the bus.',
          explanationFil: 'Pagmumungkahi na sumakay ng bus.'
        },
        {
          id: 23,
          korean: '택시 불러 주세요.',
          english: 'Please call a taxi.',
          filipino: 'Pakatawag mo ng taxi.',
          explanation: '택시를 불러달라고 요청하는 말입니다.',
          explanationEn: 'Requesting to call a taxi.',
          explanationFil: 'Paghingi na tawagan ang taxi.'
        },
        {
          id: 24,
          korean: '얼마나 걸려요?',
          english: 'How long does it take?',
          filipino: 'Gaano katagal?',
          explanation: '소요 시간을 묻는 질문입니다.',
          explanationEn: 'Asking about the duration.',
          explanationFil: 'Pagtanong tungkol sa tagal ng oras.'
        },
        {
          id: 25,
          korean: '길을 잃었어요.',
          english: 'I\'m lost.',
          filipino: 'Nawala ako.',
          explanation: '길을 잃었다고 표현하는 말입니다.',
          explanationEn: 'Expressing that you\'re lost.',
          explanationFil: 'Pagpapahayag na nawala ka.'
        }
      ]
    },
    {
      id: 'work_school',
      title: '직장/학교 (Work/School)',
      icon: '🏢',
      dialogues: [
        {
          id: 26,
          korean: '회사에 다녀요.',
          english: 'I work at a company.',
          filipino: 'Nagtatrabaho ako sa kumpanya.',
          explanation: '회사에 다닌다고 표현하는 말입니다.',
          explanationEn: 'Expressing that you work at a company.',
          explanationFil: 'Pagpapahayag na nagtatrabaho sa kumpanya.'
        },
        {
          id: 27,
          korean: '학교에 가요.',
          english: 'I go to school.',
          filipino: 'Pumupunta ako sa paaralan.',
          explanation: '학교에 간다고 표현하는 말입니다.',
          explanationEn: 'Expressing that you go to school.',
          explanationFil: 'Pagpapahayag na pumupunta sa paaralan.'
        },
        {
          id: 28,
          korean: '회의가 있어요.',
          english: 'I have a meeting.',
          filipino: 'May meeting ako.',
          explanation: '회의가 있다고 표현하는 말입니다.',
          explanationEn: 'Expressing that you have a meeting.',
          explanationFil: 'Pagpapahayag na may meeting.'
        },
        {
          id: 29,
          korean: '숙제가 많아요.',
          english: 'I have a lot of homework.',
          filipino: 'Maraming homework.',
          explanation: '숙제가 많다고 표현하는 말입니다.',
          explanationEn: 'Expressing that you have a lot of homework.',
          explanationFil: 'Pagpapahayag na maraming homework.'
        },
        {
          id: 30,
          korean: '시험이 어려워요.',
          english: 'The exam is difficult.',
          filipino: 'Mahirap ang exam.',
          explanation: '시험이 어렵다고 표현하는 말입니다.',
          explanationEn: 'Expressing that the exam is difficult.',
          explanationFil: 'Pagpapahayag na mahirap ang exam.'
        }
      ]
    },
    {
      id: 'health',
      title: '건강 (Health)',
      icon: '🏥',
      dialogues: [
        {
          id: 31,
          korean: '아파요.',
          english: 'It hurts.',
          filipino: 'Masakit.',
          explanation: '아프다고 표현하는 말입니다.',
          explanationEn: 'Expressing that something hurts.',
          explanationFil: 'Pagpapahayag na masakit.'
        },
        {
          id: 32,
          korean: '병원에 가야 해요.',
          english: 'I need to go to the hospital.',
          filipino: 'Kailangan kong pumunta sa ospital.',
          explanation: '병원에 가야 한다고 표현하는 말입니다.',
          explanationEn: 'Expressing that you need to go to the hospital.',
          explanationFil: 'Pagpapahayag na kailangan pumunta sa ospital.'
        },
        {
          id: 33,
          korean: '약을 먹어요.',
          english: 'I take medicine.',
          filipino: 'Umiinom ako ng gamot.',
          explanation: '약을 먹는다고 표현하는 말입니다.',
          explanationEn: 'Expressing that you take medicine.',
          explanationFil: 'Pagpapahayag na umiinom ng gamot.'
        },
        {
          id: 34,
          korean: '감기에 걸렸어요.',
          english: 'I caught a cold.',
          filipino: 'Nakakuha ako ng sipon.',
          explanation: '감기에 걸렸다고 표현하는 말입니다.',
          explanationEn: 'Expressing that you caught a cold.',
          explanationFil: 'Pagpapahayag na nakakuha ng sipon.'
        },
        {
          id: 35,
          korean: '푹 쉬세요.',
          english: 'Please rest well.',
          filipino: 'Magpahinga ka nang mabuti.',
          explanation: '잘 쉬라고 권하는 말입니다.',
          explanationEn: 'Advising someone to rest well.',
          explanationFil: 'Pagpayo na magpahinga nang mabuti.'
        }
      ]
    },
    {
      id: 'family_friends',
      title: '가족/친구 (Family/Friends)',
      icon: '👨‍👩‍👧‍👦',
      dialogues: [
        {
          id: 36,
          korean: '가족이 몇 명이에요?',
          english: 'How many people are in your family?',
          filipino: 'Ilang tao ang pamilya mo?',
          explanation: '가족 구성원 수를 묻는 질문입니다.',
          explanationEn: 'Asking about the number of family members.',
          explanationFil: 'Pagtanong tungkol sa bilang ng miyembro ng pamilya.'
        },
        {
          id: 37,
          korean: '친구를 만나요.',
          english: 'I meet friends.',
          filipino: 'Nakikipagkita ako sa mga kaibigan.',
          explanation: '친구를 만난다고 표현하는 말입니다.',
          explanationEn: 'Expressing that you meet friends.',
          explanationFil: 'Pagpapahayag na nakikipagkita sa mga kaibigan.'
        },
        {
          id: 38,
          korean: '부모님이 계세요.',
          english: 'I have parents.',
          filipino: 'May mga magulang ako.',
          explanation: '부모님이 계신다고 표현하는 말입니다.',
          explanationEn: 'Expressing that you have parents.',
          explanationFil: 'Pagpapahayag na may mga magulang.'
        },
        {
          id: 39,
          korean: '형제자매가 있어요.',
          english: 'I have siblings.',
          filipino: 'May mga kapatid ako.',
          explanation: '형제자매가 있다고 표현하는 말입니다.',
          explanationEn: 'Expressing that you have siblings.',
          explanationFil: 'Pagpapahayag na may mga kapatid.'
        },
        {
          id: 40,
          korean: '가족과 시간을 보내요.',
          english: 'I spend time with family.',
          filipino: 'Gumugugol ako ng oras kasama ang pamilya.',
          explanation: '가족과 시간을 보낸다고 표현하는 말입니다.',
          explanationEn: 'Expressing that you spend time with family.',
          explanationFil: 'Pagpapahayag na gumugugol ng oras kasama ang pamilya.'
        }
      ]
    },
    {
      id: 'hobbies',
      title: '취미 (Hobbies)',
      icon: '🎨',
      dialogues: [
        {
          id: 41,
          korean: '영화를 봐요.',
          english: 'I watch movies.',
          filipino: 'Nanonood ako ng pelikula.',
          explanation: '영화를 본다고 표현하는 말입니다.',
          explanationEn: 'Expressing that you watch movies.',
          explanationFil: 'Pagpapahayag na nanonood ng pelikula.'
        },
        {
          id: 42,
          korean: '음악을 들어요.',
          english: 'I listen to music.',
          filipino: 'Nakikinig ako ng musika.',
          explanation: '음악을 듣는다고 표현하는 말입니다.',
          explanationEn: 'Expressing that you listen to music.',
          explanationFil: 'Pagpapahayag na nakikinig ng musika.'
        },
        {
          id: 43,
          korean: '책을 읽어요.',
          english: 'I read books.',
          filipino: 'Nagbabasa ako ng libro.',
          explanation: '책을 읽는다고 표현하는 말입니다.',
          explanationEn: 'Expressing that you read books.',
          explanationFil: 'Pagpapahayag na nagbabasa ng libro.'
        },
        {
          id: 44,
          korean: '운동을 해요.',
          english: 'I exercise.',
          filipino: 'Nag-eehersisyo ako.',
          explanation: '운동을 한다고 표현하는 말입니다.',
          explanationEn: 'Expressing that you exercise.',
          explanationFil: 'Pagpapahayag na nag-eehersisyo.'
        },
        {
          id: 45,
          korean: '요리를 좋아해요.',
          english: 'I like cooking.',
          filipino: 'Gusto ko ang pagluluto.',
          explanation: '요리를 좋아한다고 표현하는 말입니다.',
          explanationEn: 'Expressing that you like cooking.',
          explanationFil: 'Pagpapahayag na gusto ang pagluluto.'
        }
      ]
    },
    {
      id: 'emotions',
      title: '감정 (Emotions)',
      icon: '😊',
      dialogues: [
        {
          id: 46,
          korean: '기뻐요.',
          english: 'I\'m happy.',
          filipino: 'Masaya ako.',
          explanation: '기쁘다고 표현하는 말입니다.',
          explanationEn: 'Expressing happiness.',
          explanationFil: 'Pagpapahayag ng kaligayahan.'
        },
        {
          id: 47,
          korean: '슬퍼요.',
          english: 'I\'m sad.',
          filipino: 'Malungkot ako.',
          explanation: '슬프다고 표현하는 말입니다.',
          explanationEn: 'Expressing sadness.',
          explanationFil: 'Pagpapahayag ng kalungkutan.'
        },
        {
          id: 48,
          korean: '화가 나요.',
          english: 'I\'m angry.',
          filipino: 'Galit ako.',
          explanation: '화가 난다고 표현하는 말입니다.',
          explanationEn: 'Expressing anger.',
          explanationFil: 'Pagpapahayag ng galit.'
        },
        {
          id: 49,
          korean: '걱정돼요.',
          english: 'I\'m worried.',
          filipino: 'Nag-aalala ako.',
          explanation: '걱정된다고 표현하는 말입니다.',
          explanationEn: 'Expressing worry.',
          explanationFil: 'Pagpapahayag ng pag-aalala.'
        },
        {
          id: 50,
          korean: '신나요.',
          english: 'I\'m excited.',
          filipino: 'Excited ako.',
          explanation: '신난다고 표현하는 말입니다.',
          explanationEn: 'Expressing excitement.',
          explanationFil: 'Pagpapahayag ng excitement.'
        }
      ]
    },
    {
      id: 'time_date',
      title: '시간/날짜 (Time/Date)',
      icon: '⏰',
      dialogues: [
        {
          id: 51,
          korean: '몇 시예요?',
          english: 'What time is it?',
          filipino: 'Anong oras na?',
          explanation: '현재 시간을 묻는 질문입니다.',
          explanationEn: 'Asking about the current time.',
          explanationFil: 'Pagtanong tungkol sa kasalukuyang oras.'
        },
        {
          id: 52,
          korean: '오늘은 몇 일이에요?',
          english: 'What date is today?',
          filipino: 'Anong petsa ngayon?',
          explanation: '오늘 날짜를 묻는 질문입니다.',
          explanationEn: 'Asking about today\'s date.',
          explanationFil: 'Pagtanong tungkol sa petsa ngayon.'
        },
        {
          id: 53,
          korean: '내일 만나요.',
          english: 'Let\'s meet tomorrow.',
          filipino: 'Magkita tayo bukas.',
          explanation: '내일 만나자고 제안하는 말입니다.',
          explanationEn: 'Suggesting to meet tomorrow.',
          explanationFil: 'Pagmumungkahi na magkita bukas.'
        },
        {
          id: 54,
          korean: '주말에 뭐 해요?',
          english: 'What do you do on weekends?',
          filipino: 'Ano ang ginagawa mo sa weekend?',
          explanation: '주말에 무엇을 하는지 묻는 질문입니다.',
          explanationEn: 'Asking what someone does on weekends.',
          explanationFil: 'Pagtanong kung ano ang ginagawa sa weekend.'
        },
        {
          id: 55,
          korean: '늦었어요.',
          english: 'I\'m late.',
          filipino: 'Nahuli ako.',
          explanation: '늦었다고 표현하는 말입니다.',
          explanationEn: 'Expressing that you\'re late.',
          explanationFil: 'Pagpapahayag na nahuli ka.'
        }
      ]
    },
    {
      id: 'weather',
      title: '날씨 (Weather)',
      icon: '🌤️',
      dialogues: [
        {
          id: 56,
          korean: '날씨가 좋아요.',
          english: 'The weather is nice.',
          filipino: 'Maganda ang panahon.',
          explanation: '날씨가 좋다고 표현하는 말입니다.',
          explanationEn: 'Expressing that the weather is nice.',
          explanationFil: 'Pagpapahayag na maganda ang panahon.'
        },
        {
          id: 57,
          korean: '비가 와요.',
          english: 'It\'s raining.',
          filipino: 'Umuulan.',
          explanation: '비가 온다고 표현하는 말입니다.',
          explanationEn: 'Expressing that it\'s raining.',
          explanationFil: 'Pagpapahayag na umuulan.'
        },
        {
          id: 58,
          korean: '춥네요.',
          english: 'It\'s cold.',
          filipino: 'Malamig.',
          explanation: '춥다고 표현하는 말입니다.',
          explanationEn: 'Expressing that it\'s cold.',
          explanationFil: 'Pagpapahayag na malamig.'
        },
        {
          id: 59,
          korean: '더워요.',
          english: 'It\'s hot.',
          filipino: 'Mainit.',
          explanation: '덥다고 표현하는 말입니다.',
          explanationEn: 'Expressing that it\'s hot.',
          explanationFil: 'Pagpapahayag na mainit.'
        },
        {
          id: 60,
          korean: '바람이 불어요.',
          english: 'It\'s windy.',
          filipino: 'Mahangin.',
          explanation: '바람이 분다고 표현하는 말입니다.',
          explanationEn: 'Expressing that it\'s windy.',
          explanationFil: 'Pagpapahayag na mahangin.'
        }
      ]
    },
    {
      id: 'directions',
      title: '길찾기 (Directions)',
      icon: '🗺️',
      dialogues: [
        {
          id: 61,
          korean: '어디에 있어요?',
          english: 'Where is it?',
          filipino: 'Saan ito?',
          explanation: '위치를 묻는 질문입니다.',
          explanationEn: 'Asking about location.',
          explanationFil: 'Pagtanong tungkol sa lokasyon.'
        },
        {
          id: 62,
          korean: '오른쪽으로 가세요.',
          english: 'Go to the right.',
          filipino: 'Pumunta sa kanan.',
          explanation: '오른쪽으로 가라고 안내하는 말입니다.',
          explanationEn: 'Giving directions to go right.',
          explanationFil: 'Pagbibigay ng direksyon na pumunta sa kanan.'
        },
        {
          id: 63,
          korean: '왼쪽으로 가세요.',
          english: 'Go to the left.',
          filipino: 'Pumunta sa kaliwa.',
          explanation: '왼쪽으로 가라고 안내하는 말입니다.',
          explanationEn: 'Giving directions to go left.',
          explanationFil: 'Pagbibigay ng direksyon na pumunta sa kaliwa.'
        },
        {
          id: 64,
          korean: '직진하세요.',
          english: 'Go straight.',
          filipino: 'Tumuloy ka lang.',
          explanation: '직진하라고 안내하는 말입니다.',
          explanationEn: 'Giving directions to go straight.',
          explanationFil: 'Pagbibigay ng direksyon na tumuloy lang.'
        },
        {
          id: 65,
          korean: '돌아가세요.',
          english: 'Go back.',
          filipino: 'Bumalik ka.',
          explanation: '돌아가라고 안내하는 말입니다.',
          explanationEn: 'Giving directions to go back.',
          explanationFil: 'Pagbibigay ng direksyon na bumalik.'
        }
      ]
    },
    {
      id: 'phone_internet',
      title: '전화/인터넷 (Phone/Internet)',
      icon: '📱',
      dialogues: [
        {
          id: 66,
          korean: '전화번호가 뭐예요?',
          english: 'What\'s your phone number?',
          filipino: 'Ano ang numero ng telepono mo?',
          explanation: '전화번호를 묻는 질문입니다.',
          explanationEn: 'Asking for phone number.',
          explanationFil: 'Pagtanong tungkol sa numero ng telepono.'
        },
        {
          id: 67,
          korean: '전화해 주세요.',
          english: 'Please call me.',
          filipino: 'Pakatawag mo ako.',
          explanation: '전화해달라고 요청하는 말입니다.',
          explanationEn: 'Requesting to be called.',
          explanationFil: 'Paghingi na tawagan.'
        },
        {
          id: 68,
          korean: '인터넷이 안 돼요.',
          english: 'The internet isn\'t working.',
          filipino: 'Hindi gumagana ang internet.',
          explanation: '인터넷이 안 된다고 표현하는 말입니다.',
          explanationEn: 'Expressing that the internet isn\'t working.',
          explanationFil: 'Pagpapahayag na hindi gumagana ang internet.'
        },
        {
          id: 69,
          korean: 'WiFi 비밀번호가 뭐예요?',
          english: 'What\'s the WiFi password?',
          filipino: 'Ano ang password ng WiFi?',
          explanation: 'WiFi 비밀번호를 묻는 질문입니다.',
          explanationEn: 'Asking for WiFi password.',
          explanationFil: 'Pagtanong tungkol sa password ng WiFi.'
        },
        {
          id: 70,
          korean: '메시지를 보내요.',
          english: 'I send messages.',
          filipino: 'Nagpapadala ako ng mensahe.',
          explanation: '메시지를 보낸다고 표현하는 말입니다.',
          explanationEn: 'Expressing that you send messages.',
          explanationFil: 'Pagpapahayag na nagpapadala ng mensahe.'
        }
      ]
    },
    {
      id: 'emergency',
      title: '응급상황 (Emergency)',
      icon: '🚨',
      dialogues: [
        {
          id: 71,
          korean: '도와주세요!',
          english: 'Help me!',
          filipino: 'Tulungan mo ako!',
          explanation: '도움을 요청하는 말입니다.',
          explanationEn: 'Requesting help.',
          explanationFil: 'Paghingi ng tulong.'
        },
        {
          id: 72,
          korean: '경찰을 불러주세요.',
          english: 'Please call the police.',
          filipino: 'Pakatawag mo ang pulis.',
          explanation: '경찰을 불러달라고 요청하는 말입니다.',
          explanationEn: 'Requesting to call the police.',
          explanationFil: 'Paghingi na tawagan ang pulis.'
        },
        {
          id: 73,
          korean: '119에 전화해요.',
          english: 'Call 119.',
          filipino: 'Tawagan ang 119.',
          explanation: '119에 전화하라고 안내하는 말입니다.',
          explanationEn: 'Instructing to call 119.',
          explanationFil: 'Pag-uutos na tawagan ang 119.'
        },
        {
          id: 74,
          korean: '위험해요.',
          english: 'It\'s dangerous.',
          filipino: 'Mapanganib.',
          explanation: '위험하다고 표현하는 말입니다.',
          explanationEn: 'Expressing that it\'s dangerous.',
          explanationFil: 'Pagpapahayag na mapanganib.'
        },
        {
          id: 75,
          korean: '빨리 가세요.',
          english: 'Go quickly.',
          filipino: 'Pumunta ka nang mabilis.',
          explanation: '빨리 가라고 안내하는 말입니다.',
          explanationEn: 'Instructing to go quickly.',
          explanationFil: 'Pag-uutos na pumunta nang mabilis.'
        }
      ]
    },
    {
      id: 'compliments',
      title: '칭찬 (Compliments)',
      icon: '👏',
      dialogues: [
        {
          id: 76,
          korean: '잘했어요!',
          english: 'Well done!',
          filipino: 'Magaling!',
          explanation: '잘했다고 칭찬하는 말입니다.',
          explanationEn: 'Complimenting someone\'s work.',
          explanationFil: 'Pagpuri sa trabaho ng isang tao.'
        },
        {
          id: 77,
          korean: '예쁘네요.',
          english: 'You\'re pretty.',
          filipino: 'Maganda ka.',
          explanation: '예쁘다고 칭찬하는 말입니다.',
          explanationEn: 'Complimenting someone\'s appearance.',
          explanationFil: 'Pagpuri sa hitsura ng isang tao.'
        },
        {
          id: 78,
          korean: '멋있어요.',
          english: 'You\'re cool.',
          filipino: 'Astig ka.',
          explanation: '멋있다고 칭찬하는 말입니다.',
          explanationEn: 'Complimenting someone\'s style.',
          explanationFil: 'Pagpuri sa estilo ng isang tao.'
        },
        {
          id: 79,
          korean: '똑똑해요.',
          english: 'You\'re smart.',
          filipino: 'Matalino ka.',
          explanation: '똑똑하다고 칭찬하는 말입니다.',
          explanationEn: 'Complimenting someone\'s intelligence.',
          explanationFil: 'Pagpuri sa talino ng isang tao.'
        },
        {
          id: 80,
          korean: '고마워요.',
          english: 'Thank you.',
          filipino: 'Salamat.',
          explanation: '고맙다고 표현하는 말입니다.',
          explanationEn: 'Expressing gratitude.',
          explanationFil: 'Pagpapahayag ng pasasalamat.'
        }
      ]
    },
    {
      id: 'apologies',
      title: '사과 (Apologies)',
      icon: '🙏',
      dialogues: [
        {
          id: 81,
          korean: '죄송해요.',
          english: 'I\'m sorry.',
          filipino: 'Paumanhin.',
          explanation: '죄송하다고 사과하는 말입니다.',
          explanationEn: 'Apologizing.',
          explanationFil: 'Paghingi ng paumanhin.'
        },
        {
          id: 82,
          korean: '미안해요.',
          english: 'I\'m sorry.',
          filipino: 'Pasensya na.',
          explanation: '미안하다고 사과하는 말입니다.',
          explanationEn: 'Apologizing.',
          explanationFil: 'Paghingi ng pasensya.'
        },
        {
          id: 83,
          korean: '실수했어요.',
          english: 'I made a mistake.',
          filipino: 'Nagkamali ako.',
          explanation: '실수했다고 인정하는 말입니다.',
          explanationEn: 'Acknowledging a mistake.',
          explanationFil: 'Pag-amin ng pagkakamali.'
        },
        {
          id: 84,
          korean: '용서해 주세요.',
          english: 'Please forgive me.',
          filipino: 'Pakipatawad mo ako.',
          explanation: '용서해달라고 요청하는 말입니다.',
          explanationEn: 'Requesting forgiveness.',
          explanationFil: 'Paghingi ng kapatawaran.'
        },
        {
          id: 85,
          korean: '다시는 안 할게요.',
          english: 'I won\'t do it again.',
          filipino: 'Hindi ko na uulitin.',
          explanation: '다시는 안 하겠다고 약속하는 말입니다.',
          explanationEn: 'Promising not to repeat the mistake.',
          explanationFil: 'Pagpangako na hindi na uulitin.'
        }
      ]
    },
    {
      id: 'invitations',
      title: '초대 (Invitations)',
      icon: '🎉',
      dialogues: [
        {
          id: 86,
          korean: '함께 가요.',
          english: 'Let\'s go together.',
          filipino: 'Sabay tayong pumunta.',
          explanation: '함께 가자고 제안하는 말입니다.',
          explanationEn: 'Suggesting to go together.',
          explanationFil: 'Pagmumungkahi na sabay na pumunta.'
        },
        {
          id: 87,
          korean: '초대해 주세요.',
          english: 'Please invite me.',
          filipino: 'Pakimbita mo ako.',
          explanation: '초대해달라고 요청하는 말입니다.',
          explanationEn: 'Requesting to be invited.',
          explanationFil: 'Paghingi na imbitahan.'
        },
        {
          id: 88,
          korean: '파티에 가요.',
          english: 'I go to parties.',
          filipino: 'Pumupunta ako sa party.',
          explanation: '파티에 간다고 표현하는 말입니다.',
          explanationEn: 'Expressing that you go to parties.',
          explanationFil: 'Pagpapahayag na pumupunta sa party.'
        },
        {
          id: 89,
          korean: '생일 파티예요.',
          english: 'It\'s a birthday party.',
          filipino: 'Birthday party ito.',
          explanation: '생일 파티라고 설명하는 말입니다.',
          explanationEn: 'Explaining that it\'s a birthday party.',
          explanationFil: 'Pagpapaliwanag na birthday party ito.'
        },
        {
          id: 90,
          korean: '선물을 가져와요.',
          english: 'I bring a gift.',
          filipino: 'Nagdadala ako ng regalo.',
          explanation: '선물을 가져온다고 표현하는 말입니다.',
          explanationEn: 'Expressing that you bring a gift.',
          explanationFil: 'Pagpapahayag na nagdadala ng regalo.'
        }
      ]
    },
    {
      id: 'shopping_clothes',
      title: '옷 쇼핑 (Clothes Shopping)',
      icon: '👕',
      dialogues: [
        {
          id: 91,
          korean: '이 옷 어때요?',
          english: 'How is this outfit?',
          filipino: 'Kumusta ang damit na ito?',
          explanation: '옷에 대한 의견을 묻는 질문입니다.',
          explanationEn: 'Asking for opinion about clothes.',
          explanationFil: 'Pagtanong tungkol sa opinyon sa damit.'
        },
        {
          id: 92,
          korean: '사이즈가 맞아요.',
          english: 'The size fits.',
          filipino: 'Tama ang sukat.',
          explanation: '사이즈가 맞는다고 표현하는 말입니다.',
          explanationEn: 'Expressing that the size fits.',
          explanationFil: 'Pagpapahayag na tama ang sukat.'
        },
        {
          id: 93,
          korean: '더 큰 사이즈 있어요?',
          english: 'Do you have a bigger size?',
          filipino: 'May mas malaking sukat ba kayo?',
          explanation: '더 큰 사이즈가 있는지 묻는 질문입니다.',
          explanationEn: 'Asking if there\'s a bigger size.',
          explanationFil: 'Pagtanong kung may mas malaking sukat.'
        },
        {
          id: 94,
          korean: '입어봐도 돼요?',
          english: 'Can I try it on?',
          filipino: 'Pwede ko bang subukan?',
          explanation: '입어봐도 되는지 묻는 질문입니다.',
          explanationEn: 'Asking if you can try it on.',
          explanationFil: 'Pagtanong kung pwede subukan.'
        },
        {
          id: 95,
          korean: '이거 사고 싶어요.',
          english: 'I want to buy this.',
          filipino: 'Gusto kong bilhin ito.',
          explanation: '이것을 사고 싶다고 표현하는 말입니다.',
          explanationEn: 'Expressing that you want to buy this.',
          explanationFil: 'Pagpapahayag na gusto bilhin ito.'
        }
      ]
    },
    {
      id: 'restaurant',
      title: '식당 (Restaurant)',
      icon: '🍴',
      dialogues: [
        {
          id: 96,
          korean: '메뉴를 보여주세요.',
          english: 'Please show me the menu.',
          filipino: 'Pakita mo ang menu.',
          explanation: '메뉴를 보여달라고 요청하는 말입니다.',
          explanationEn: 'Requesting to see the menu.',
          explanationFil: 'Paghingi na makita ang menu.'
        },
        {
          id: 97,
          korean: '이거 주문할게요.',
          english: 'I\'ll order this.',
          filipino: 'I-order ko ito.',
          explanation: '이것을 주문하겠다고 표현하는 말입니다.',
          explanationEn: 'Expressing that you\'ll order this.',
          explanationFil: 'Pagpapahayag na i-order ito.'
        },
        {
          id: 98,
          korean: '맵지 않게 해주세요.',
          english: 'Please make it not spicy.',
          filipino: 'Pakigawang hindi maanghang.',
          explanation: '맵지 않게 해달라고 요청하는 말입니다.',
          explanationEn: 'Requesting to make it not spicy.',
          explanationFil: 'Paghingi na gawing hindi maanghang.'
        },
        {
          id: 99,
          korean: '추천해 주세요.',
          english: 'Please recommend something.',
          filipino: 'Pakirekomenda mo ako.',
          explanation: '추천해달라고 요청하는 말입니다.',
          explanationEn: 'Requesting a recommendation.',
          explanationFil: 'Paghingi ng rekomendasyon.'
        },
        {
          id: 100,
          korean: '맛있게 드세요.',
          english: 'Enjoy your meal.',
          filipino: 'Masarap na pagkain.',
          explanation: '맛있게 드리라는 인사말입니다.',
          explanationEn: 'Wishing someone to enjoy their meal.',
          explanationFil: 'Pagbati na masarap na pagkain.'
        }
      ]
    }
  ]
}

export default dialogueData
