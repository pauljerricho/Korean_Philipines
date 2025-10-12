const dialogueData = {
  beginner: {
    title: "Beginner (초급)",
    description: "Basic Korean phrases for daily life",
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
          },
          {
            id: 6,
            korean: '좋은 저녁이에요.',
            english: 'Good evening.',
            filipino: 'Magandang gabi.',
            explanation: '저녁 인사말입니다.',
            explanationEn: 'Evening greeting.',
            explanationFil: 'Pagbati sa gabi.'
          },
          {
            id: 7,
            korean: '좋은 밤 되세요.',
            english: 'Good night.',
            filipino: 'Magandang gabi.',
            explanation: '밤 인사말입니다.',
            explanationEn: 'Night greeting.',
            explanationFil: 'Pagbati sa gabi.'
          },
          {
            id: 8,
            korean: '처음 뵙겠습니다.',
            english: 'Nice to meet you (first time).',
            filipino: 'Kakilala kita sa unang pagkakataon.',
            explanation: '처음 만날 때 사용하는 인사말입니다.',
            explanationEn: 'Used when meeting someone for the first time.',
            explanationFil: 'Ginagamit kapag unang pagkakataon na magkikita.'
          },
          {
            id: 9,
            korean: '반갑습니다.',
            english: 'Nice to meet you.',
            filipino: 'Masaya akong makilala ka.',
            explanation: '만나서 반갑다는 인사말입니다.',
            explanationEn: 'Expressing pleasure in meeting someone.',
            explanationFil: 'Pagpapahayag ng kasiyahan sa pagkikita.'
          },
          {
            id: 10,
            korean: '오랜만이에요.',
            english: 'Long time no see.',
            filipino: 'Matagal na tayong hindi nagkita.',
            explanation: '오랫동안 만나지 못했을 때 사용하는 인사말입니다.',
            explanationEn: 'Used when you haven\'t seen someone for a long time.',
            explanationFil: 'Ginagamit kapag matagal na hindi nagkita.'
          },
          {
            id: 11,
            korean: '어떻게 지내세요?',
            english: 'How are you?',
            filipino: 'Kumusta ka?',
            explanation: '상대방의 안부를 묻는 인사말입니다.',
            explanationEn: 'Asking about someone\'s well-being.',
            explanationFil: 'Pagtanong tungkol sa kalagayan ng isang tao.'
          },
          {
            id: 12,
            korean: '잘 지내고 있어요.',
            english: 'I\'m doing well.',
            filipino: 'Mabuti naman ako.',
            explanation: '잘 지내고 있다고 답하는 말입니다.',
            explanationEn: 'Responding that you\'re doing well.',
            explanationFil: 'Pagsagot na mabuti ang kalagayan.'
          },
          {
            id: 13,
            korean: '수고하셨습니다.',
            english: 'Good work / Thank you for your hard work.',
            filipino: 'Magaling! / Salamat sa inyong pagsisikap.',
            explanation: '상대방의 노고를 인정하는 인사말입니다.',
            explanationEn: 'Acknowledging someone\'s hard work.',
            explanationFil: 'Pagkilala sa pagsisikap ng isang tao.'
          },
          {
            id: 14,
            korean: '다음에 또 봐요.',
            english: 'See you next time.',
            filipino: 'Magkita tayo sa susunod.',
            explanation: '다음에 또 만나자는 인사말입니다.',
            explanationEn: 'Saying goodbye with intention to meet again.',
            explanationFil: 'Pagpaalam na may balak na magkita ulit.'
          },
          {
            id: 15,
            korean: '조심히 가세요.',
            english: 'Take care / Be careful.',
            filipino: 'Mag-ingat ka.',
            explanation: '조심하라는 배려의 인사말입니다.',
            explanationEn: 'A caring farewell wishing someone to be careful.',
            explanationFil: 'Pagpaalam na may pag-aalala sa kaligtasan.'
          }
        ]
      },
      {
        id: 'daily_life',
        title: '일상생활 (Daily Life)',
        icon: '🏠',
        dialogues: [
          {
            id: 16,
            korean: '오늘 날씨가 좋네요.',
            english: 'The weather is nice today.',
            filipino: 'Maganda ang panahon ngayon.',
            explanation: '날씨에 대한 일상적인 대화입니다.',
            explanationEn: 'Common conversation about weather.',
            explanationFil: 'Karaniwang usapan tungkol sa panahon.'
          },
          {
            id: 17,
            korean: '뭐 하고 계세요?',
            english: 'What are you doing?',
            filipino: 'Ano ang ginagawa mo?',
            explanation: '상대방의 현재 상황을 묻는 질문입니다.',
            explanationEn: 'Asking about someone\'s current situation.',
            explanationFil: 'Pagtanong tungkol sa kasalukuyang sitwasyon.'
          },
          {
            id: 18,
            korean: '집에 가고 있어요.',
            english: 'I\'m going home.',
            filipino: 'Pauwi na ako.',
            explanation: '집으로 가는 상황을 표현합니다.',
            explanationEn: 'Expressing that you\'re going home.',
            explanationFil: 'Pagpapahayag na pauwi ka na.'
          },
          {
            id: 19,
            korean: '배가 고파요.',
            english: 'I\'m hungry.',
            filipino: 'Gutom na ako.',
            explanation: '배고픔을 표현하는 일상적인 말입니다.',
            explanationEn: 'Expressing hunger in daily conversation.',
            explanationFil: 'Pagpapahayag ng gutom sa pang-araw-araw na usapan.'
          },
          {
            id: 20,
            korean: '피곤해요.',
            english: 'I\'m tired.',
            filipino: 'Pagod na ako.',
            explanation: '피로함을 표현하는 말입니다.',
            explanationEn: 'Expressing tiredness.',
            explanationFil: 'Pagpapahayag ng pagod.'
          },
          {
            id: 21,
            korean: '잠이 와요.',
            english: 'I\'m sleepy.',
            filipino: 'Inaantok na ako.',
            explanation: '졸림을 표현하는 말입니다.',
            explanationEn: 'Expressing sleepiness.',
            explanationFil: 'Pagpapahayag ng antok.'
          },
          {
            id: 22,
            korean: '목이 말라요.',
            english: 'I\'m thirsty.',
            filipino: 'Nauuhaw ako.',
            explanation: '목마름을 표현하는 말입니다.',
            explanationEn: 'Expressing thirst.',
            explanationFil: 'Pagpapahayag ng uhaw.'
          },
          {
            id: 23,
            korean: '더워요.',
            english: 'It\'s hot.',
            filipino: 'Mainit.',
            explanation: '더위를 표현하는 말입니다.',
            explanationEn: 'Expressing that it\'s hot.',
            explanationFil: 'Pagpapahayag na mainit.'
          },
          {
            id: 24,
            korean: '추워요.',
            english: 'It\'s cold.',
            filipino: 'Malamig.',
            explanation: '추위를 표현하는 말입니다.',
            explanationEn: 'Expressing that it\'s cold.',
            explanationFil: 'Pagpapahayag na malamig.'
          },
          {
            id: 25,
            korean: '바빠요.',
            english: 'I\'m busy.',
            filipino: 'Abala ako.',
            explanation: '바쁨을 표현하는 말입니다.',
            explanationEn: 'Expressing that you\'re busy.',
            explanationFil: 'Pagpapahayag na abala ka.'
          },
          {
            id: 26,
            korean: '한가해요.',
            english: 'I\'m free.',
            filipino: 'Libre ako.',
            explanation: '한가함을 표현하는 말입니다.',
            explanationEn: 'Expressing that you\'re free.',
            explanationFil: 'Pagpapahayag na libre ka.'
          },
          {
            id: 27,
            korean: '심심해요.',
            english: 'I\'m bored.',
            filipino: 'Nababagot ako.',
            explanation: '심심함을 표현하는 말입니다.',
            explanationEn: 'Expressing boredom.',
            explanationFil: 'Pagpapahayag ng pagkabagot.'
          },
          {
            id: 28,
            korean: '즐거워요.',
            english: 'I\'m having fun.',
            filipino: 'Masaya ako.',
            explanation: '즐거움을 표현하는 말입니다.',
            explanationEn: 'Expressing enjoyment.',
            explanationFil: 'Pagpapahayag ng kasiyahan.'
          },
          {
            id: 29,
            korean: '편해요.',
            english: 'I\'m comfortable.',
            filipino: 'Komportable ako.',
            explanation: '편안함을 표현하는 말입니다.',
            explanationEn: 'Expressing comfort.',
            explanationFil: 'Pagpapahayag ng ginhawa.'
          },
          {
            id: 30,
            korean: '불편해요.',
            english: 'I\'m uncomfortable.',
            filipino: 'Hindi ako komportable.',
            explanation: '불편함을 표현하는 말입니다.',
            explanationEn: 'Expressing discomfort.',
            explanationFil: 'Pagpapahayag ng hindi ginhawa.'
          }
        ]
      }
    ]
  },
  intermediate: {
    title: "Intermediate (중급)",
    description: "More complex Korean phrases for various situations",
    categories: [
      {
        id: 'business',
        title: '비즈니스 (Business)',
        icon: '💼',
        dialogues: [
          {
            id: 301,
            korean: '회의가 언제예요?',
            english: 'When is the meeting?',
            filipino: 'Kailan ang meeting?',
            explanation: '회의 시간을 묻는 질문입니다.',
            explanationEn: 'Asking about meeting time.',
            explanationFil: 'Pagtanong tungkol sa oras ng meeting.'
          },
          {
            id: 302,
            korean: '프레젠테이션을 준비하고 있어요.',
            english: 'I\'m preparing a presentation.',
            filipino: 'Naghahanda ako ng presentation.',
            explanation: '프레젠테이션 준비 상황을 표현합니다.',
            explanationEn: 'Expressing that you\'re preparing a presentation.',
            explanationFil: 'Pagpapahayag na naghahanda ng presentation.'
          },
          {
            id: 303,
            korean: '계약서를 검토해 주세요.',
            english: 'Please review the contract.',
            filipino: 'Pakirepaso mo ang kontrata.',
            explanation: '계약서 검토를 요청하는 말입니다.',
            explanationEn: 'Requesting contract review.',
            explanationFil: 'Paghingi ng pagrepaso sa kontrata.'
          },
          {
            id: 304,
            korean: '예산이 얼마예요?',
            english: 'What\'s the budget?',
            filipino: 'Magkano ang budget?',
            explanation: '예산을 묻는 질문입니다.',
            explanationEn: 'Asking about the budget.',
            explanationFil: 'Pagtanong tungkol sa budget.'
          },
          {
            id: 305,
            korean: '데드라인이 언제예요?',
            english: 'When is the deadline?',
            filipino: 'Kailan ang deadline?',
            explanation: '마감일을 묻는 질문입니다.',
            explanationEn: 'Asking about the deadline.',
            explanationFil: 'Pagtanong tungkol sa deadline.'
          },
          {
            id: 306,
            korean: '고객과 미팅이 있어요.',
            english: 'I have a meeting with a client.',
            filipino: 'May meeting ako sa client.',
            explanation: '고객과의 미팅이 있다고 표현합니다.',
            explanationEn: 'Expressing that you have a client meeting.',
            explanationFil: 'Pagpapahayag na may meeting sa client.'
          },
          {
            id: 307,
            korean: '제안서를 작성하고 있어요.',
            english: 'I\'m writing a proposal.',
            filipino: 'Nagsusulat ako ng proposal.',
            explanation: '제안서 작성 상황을 표현합니다.',
            explanationEn: 'Expressing that you\'re writing a proposal.',
            explanationFil: 'Pagpapahayag na nagsusulat ng proposal.'
          },
          {
            id: 308,
            korean: '품질 검사를 해야 해요.',
            english: 'We need to do quality inspection.',
            filipino: 'Kailangan nating mag-quality inspection.',
            explanation: '품질 검사가 필요하다고 표현합니다.',
            explanationEn: 'Expressing that quality inspection is needed.',
            explanationFil: 'Pagpapahayag na kailangan ng quality inspection.'
          },
          {
            id: 309,
            korean: '마케팅 전략을 논의해요.',
            english: 'We discuss marketing strategy.',
            filipino: 'Pinag-uusapan namin ang marketing strategy.',
            explanation: '마케팅 전략 논의 상황을 표현합니다.',
            explanationEn: 'Expressing discussion of marketing strategy.',
            explanationFil: 'Pagpapahayag ng pag-uusapan ng marketing strategy.'
          },
          {
            id: 310,
            korean: '성과를 평가해야 해요.',
            english: 'We need to evaluate performance.',
            filipino: 'Kailangan nating i-evaluate ang performance.',
            explanation: '성과 평가가 필요하다고 표현합니다.',
            explanationEn: 'Expressing that performance evaluation is needed.',
            explanationFil: 'Pagpapahayag na kailangan i-evaluate ang performance.'
          }
        ]
      },
      {
        id: 'travel',
        title: '여행 (Travel)',
        icon: '✈️',
        dialogues: [
          {
            id: 311,
            korean: '여행 계획을 세우고 있어요.',
            english: 'I\'m making travel plans.',
            filipino: 'Gumagawa ako ng travel plans.',
            explanation: '여행 계획을 세우는 상황을 표현합니다.',
            explanationEn: 'Expressing that you\'re making travel plans.',
            explanationFil: 'Pagpapahayag na gumagawa ng travel plans.'
          },
          {
            id: 312,
            korean: '비행기 표를 예약했어요.',
            english: 'I booked a flight ticket.',
            filipino: 'Nag-book ako ng flight ticket.',
            explanation: '비행기 표 예약 상황을 표현합니다.',
            explanationEn: 'Expressing that you booked a flight ticket.',
            explanationFil: 'Pagpapahayag na nag-book ng flight ticket.'
          },
          {
            id: 313,
            korean: '호텔에서 체크인해요.',
            english: 'I check in at the hotel.',
            filipino: 'Nag-check in ako sa hotel.',
            explanation: '호텔 체크인 상황을 표현합니다.',
            explanationEn: 'Expressing hotel check-in.',
            explanationFil: 'Pagpapahayag ng hotel check-in.'
          },
          {
            id: 314,
            korean: '관광지를 둘러봐요.',
            english: 'I visit tourist attractions.',
            filipino: 'Bumibisita ako sa mga tourist attractions.',
            explanation: '관광지 방문 상황을 표현합니다.',
            explanationEn: 'Expressing visiting tourist attractions.',
            explanationFil: 'Pagpapahayag ng pagbisita sa tourist attractions.'
          },
          {
            id: 315,
            korean: '현지 음식을 맛봐요.',
            english: 'I try local food.',
            filipino: 'Natikman ko ang local food.',
            explanation: '현지 음식 맛보기 상황을 표현합니다.',
            explanationEn: 'Expressing trying local food.',
            explanationFil: 'Pagpapahayag ng pagtikim ng local food.'
          },
          {
            id: 316,
            korean: '기념품을 사요.',
            english: 'I buy souvenirs.',
            filipino: 'Bumibili ako ng souvenirs.',
            explanation: '기념품 구매 상황을 표현합니다.',
            explanationEn: 'Expressing buying souvenirs.',
            explanationFil: 'Pagpapahayag ng pagbili ng souvenirs.'
          },
          {
            id: 317,
            korean: '여행 가이드를 고용해요.',
            english: 'I hire a travel guide.',
            filipino: 'Kumuha ako ng travel guide.',
            explanation: '여행 가이드 고용 상황을 표현합니다.',
            explanationEn: 'Expressing hiring a travel guide.',
            explanationFil: 'Pagpapahayag ng pagkuha ng travel guide.'
          },
          {
            id: 318,
            korean: '여행 보험에 가입했어요.',
            english: 'I got travel insurance.',
            filipino: 'Kumuha ako ng travel insurance.',
            explanation: '여행 보험 가입 상황을 표현합니다.',
            explanationEn: 'Expressing getting travel insurance.',
            explanationFil: 'Pagpapahayag ng pagkuha ng travel insurance.'
          },
          {
            id: 319,
            korean: '여행 일정을 변경해요.',
            english: 'I change the travel schedule.',
            filipino: 'Binabago ko ang travel schedule.',
            explanation: '여행 일정 변경 상황을 표현합니다.',
            explanationEn: 'Expressing changing travel schedule.',
            explanationFil: 'Pagpapahayag ng pagbabago ng travel schedule.'
          },
          {
            id: 320,
            korean: '여행 경비를 계산해요.',
            english: 'I calculate travel expenses.',
            filipino: 'Kinakalkula ko ang travel expenses.',
            explanation: '여행 경비 계산 상황을 표현합니다.',
            explanationEn: 'Expressing calculating travel expenses.',
            explanationFil: 'Pagpapahayag ng pagkalkula ng travel expenses.'
          }
        ]
      }
    ]
  }
}

export default dialogueData