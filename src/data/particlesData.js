// 한국어 조사 데이터 - HowToStudyKorean Lesson 12 참고 + 추가 조사들
const particlesData = [
  // 기본 격조사들
  {
    korean: "이/가",
    romanization: "i/ga",
    english: "subject particle",
    filipino: "paksa (subject)",
    explanation: "주어를 나타내는 조사",
    examples: [
      {
        korean: "학생이 공부해요",
        romanization: "hak-saeng-i gong-bu-hae-yo",
        english: "The student studies",
        filipino: "Ang estudyante ay nag-aaral"
      },
      {
        korean: "친구가 왔어요",
        romanization: "chin-gu-ga wa-sseo-yo",
        english: "My friend came",
        filipino: "Dumating ang kaibigan ko"
      }
    ],
    usage: "자음으로 끝나는 명사에는 '이', 모음으로 끝나는 명사에는 '가'를 붙입니다."
  },
  {
    korean: "을/를",
    romanization: "eul/reul",
    english: "object particle",
    filipino: "layon (object)",
    explanation: "목적어를 나타내는 조사",
    examples: [
      {
        korean: "책을 읽어요",
        romanization: "chaek-eul il-geo-yo",
        english: "I read a book",
        filipino: "Bumabasa ako ng libro"
      },
      {
        korean: "음식을 먹어요",
        romanization: "eum-sik-eul meo-geo-yo",
        english: "I eat food",
        filipino: "Kumakain ako ng pagkain"
      }
    ],
    usage: "자음으로 끝나는 명사에는 '을', 모음으로 끝나는 명사에는 '를'을 붙입니다."
  },
  {
    korean: "의",
    romanization: "ui",
    english: "possessive particle",
    filipino: "ari-arian (possession)",
    explanation: "소유나 속성을 나타내는 조사",
    examples: [
      {
        korean: "철수의 책",
        romanization: "cheol-su-ui chaek",
        english: "Chul-su's book",
        filipino: "Libro ni Chul-su"
      },
      {
        korean: "우리 집",
        romanization: "u-ri jip",
        english: "our house",
        filipino: "aming bahay"
      }
    ],
    usage: "명사 뒤에 붙여서 소유나 속성을 나타냅니다."
  },
  {
    korean: "에",
    romanization: "e",
    english: "location/time particle",
    filipino: "lugar/oras (location/time)",
    explanation: "장소나 시간을 나타내는 조사",
    examples: [
      {
        korean: "학교에 가요",
        romanization: "hak-gyo-e ga-yo",
        english: "I go to school",
        filipino: "Pupunta ako sa paaralan"
      },
      {
        korean: "3시에 만나요",
        romanization: "se-si-e man-na-yo",
        english: "Let's meet at 3 o'clock",
        filipino: "Magkita tayo sa 3:00"
      }
    ],
    usage: "장소나 시간 뒤에 붙여서 목적지나 시점을 나타냅니다."
  },
  {
    korean: "와/과",
    romanization: "wa/gwa",
    english: "and (with nouns)",
    filipino: "at (kasama ang mga pangngalan)",
    explanation: "명사와 명사를 연결하는 조사",
    examples: [
      {
        korean: "사과와 배",
        romanization: "sa-gwa-wa bae",
        english: "apple and pear",
        filipino: "mansanas at peras"
      },
      {
        korean: "친구와 놀아요",
        romanization: "chin-gu-wa no-ra-yo",
        english: "I play with my friend",
        filipino: "Naglalaro ako kasama ang kaibigan ko"
      }
    ],
    usage: "자음으로 끝나는 명사에는 '과', 모음으로 끝나는 명사에는 '와'를 붙입니다."
  },
  {
    korean: "들",
    romanization: "deul",
    english: "plural marker",
    filipino: "pangmaramihan",
    explanation: "복수를 나타내는 조사",
    examples: [
      {
        korean: "학생들",
        romanization: "hak-saeng-deul",
        english: "students",
        filipino: "mga estudyante"
      },
      {
        korean: "친구들",
        romanization: "chin-gu-deul",
        english: "friends",
        filipino: "mga kaibigan"
      }
    ],
    usage: "명사 뒤에 붙여서 복수를 나타냅니다. 사람이나 동물에 주로 사용됩니다."
  },
  {
    korean: "만",
    romanization: "man",
    english: "only",
    filipino: "lamang",
    explanation: "오직, 단지를 나타내는 조사",
    examples: [
      {
        korean: "물만 마셔요",
        romanization: "mul-man ma-syeo-yo",
        english: "I only drink water",
        filipino: "tubig lang ang iniinom ko"
      },
      {
        korean: "한 명만 있어요",
        romanization: "han myeong-man i-sseo-yo",
        english: "There is only one person",
        filipino: "isa lang ang nandito"
      }
    ],
    usage: "명사 뒤에 붙여서 '오직', '단지'의 의미를 나타냅니다."
  },
  {
    korean: "에서",
    romanization: "e-seo",
    english: "from (place)",
    filipino: "mula sa (lugar)",
    explanation: "출발점을 나타내는 조사",
    examples: [
      {
        korean: "학교에서 왔어요",
        romanization: "hak-gyo-e-seo wa-sseo-yo",
        english: "I came from school",
        filipino: "galing ako sa paaralan"
      },
      {
        korean: "집에서 공부해요",
        romanization: "jib-e-seo gong-bu-hae-yo",
        english: "I study at home",
        filipino: "nag-aaral ako sa bahay"
      }
    ],
    usage: "장소 뒤에 붙여서 그 장소에서의 행동이나 출발점을 나타냅니다."
  },
  {
    korean: "부터",
    romanization: "bu-teo",
    english: "from (time/place)",
    filipino: "mula sa (oras/lugar)",
    explanation: "시작점을 나타내는 조사",
    examples: [
      {
        korean: "아침부터 밤까지",
        romanization: "a-chim-bu-teo bam-kka-ji",
        english: "from morning to night",
        filipino: "mula umaga hanggang gabi"
      },
      {
        korean: "내일부터 시작해요",
        romanization: "nae-il-bu-teo si-jak-hae-yo",
        english: "I will start from tomorrow",
        filipino: "mula bukas magsisimula ako"
      }
    ],
    usage: "시간이나 장소 뒤에 붙여서 시작점을 나타냅니다."
  },
  {
    korean: "까지",
    romanization: "kka-ji",
    english: "until, to",
    filipino: "hanggang",
    explanation: "끝점을 나타내는 조사",
    examples: [
      {
        korean: "서울까지 가요",
        romanization: "seo-ul-kka-ji ga-yo",
        english: "I go to Seoul",
        filipino: "pupunta ako hanggang Seoul"
      },
      {
        korean: "10시까지 기다려요",
        romanization: "yeol-si-kka-ji gi-da-ryeo-yo",
        english: "I will wait until 10 o'clock",
        filipino: "maghihintay ako hanggang 10:00"
      }
    ],
    usage: "시간이나 장소 뒤에 붙여서 끝점을 나타냅니다."
  },
  {
    korean: "(으)로",
    romanization: "(eu)ro",
    english: "by, with, to (direction)",
    filipino: "sa pamamagitan ng, patungo sa",
    explanation: "방향, 도구, 방법을 나타내는 조사",
    examples: [
      {
        korean: "버스로 가요",
        romanization: "beo-seu-ro ga-yo",
        english: "I go by bus",
        filipino: "sumasakay ako ng bus"
      },
      {
        korean: "펜으로 써요",
        romanization: "pen-eu-ro sseo-yo",
        english: "I write with a pen",
        filipino: "sumusulat ako gamit ang ballpen"
      },
      {
        korean: "집으로 가요",
        romanization: "jib-eu-ro ga-yo",
        english: "I go home",
        filipino: "umuwi ako"
      }
    ],
    usage: "모음으로 끝나는 단어에는 '로', 자음으로 끝나는 단어에는 '으로'를 붙입니다."
  },
  {
    korean: "한테",
    romanization: "han-te",
    english: "to (person)",
    filipino: "sa (tao)",
    explanation: "사람에게 주는 조사",
    examples: [
      {
        korean: "친구한테 말했어요",
        romanization: "chin-gu-han-te ma-rae-sseo-yo",
        english: "I told my friend",
        filipino: "sinabi ko sa kaibigan ko"
      },
      {
        korean: "선생님한테 물어봤어요",
        romanization: "seon-saeng-nim-han-te mu-reo-bwa-sseo-yo",
        english: "I asked the teacher",
        filipino: "nagtanong ako sa guro"
      }
    ],
    usage: "사람에게 무언가를 주거나 말할 때 사용합니다."
  },
  {
    korean: "에게",
    romanization: "e-ge",
    english: "to (person/animal)",
    filipino: "sa (tao/hayop)",
    explanation: "사람이나 동물에게 주는 조사",
    examples: [
      {
        korean: "아이에게 책을 주었어요",
        romanization: "a-i-e-ge chaek-eul ju-eo-sseo-yo",
        english: "I gave a book to the child",
        filipino: "binigay ko ang libro sa bata"
      }
    ],
    usage: "사람이나 동물에게 무언가를 줄 때 사용합니다."
  },
  
  // 보조사들
  {
    korean: "은/는",
    romanization: "eun/neun",
    english: "topic particle",
    filipino: "paksa (topic)",
    explanation: "주제나 대조를 나타내는 조사",
    examples: [
      {
        korean: "나는 학생이에요",
        romanization: "na-neun hak-saeng-i-e-yo",
        english: "I am a student",
        filipino: "Ako ay isang estudyante"
      },
      {
        korean: "책은 읽었어요",
        romanization: "chaek-eun il-geo-sseo-yo",
        english: "I read the book (but not others)",
        filipino: "Nabasa ko ang libro (pero hindi ang iba)"
      }
    ],
    usage: "자음으로 끝나는 명사에는 '은', 모음으로 끝나는 명사에는 '는'을 붙입니다."
  },
  {
    korean: "도",
    romanization: "do",
    english: "also, even",
    filipino: "din, kahit",
    explanation: "또한, 심지어의 의미를 나타내는 조사",
    examples: [
      {
        korean: "나도 가요",
        romanization: "na-do ga-yo",
        english: "I also go",
        filipino: "Pupunta din ako"
      },
      {
        korean: "물도 마셔요",
        romanization: "mul-do ma-syeo-yo",
        english: "I also drink water",
        filipino: "Umiinom din ako ng tubig"
      }
    ],
    usage: "명사 뒤에 붙여서 '또한', '심지어'의 의미를 나타냅니다."
  },
  {
    korean: "조차",
    romanization: "jo-cha",
    english: "even",
    filipino: "kahit",
    explanation: "심지어의 의미를 강조하는 조사",
    examples: [
      {
        korean: "친구조차 모르겠어요",
        romanization: "chin-gu-jo-cha mo-reu-ge-sseo-yo",
        english: "Even my friend doesn't know",
        filipino: "Kahit ang kaibigan ko ay hindi alam"
      },
      {
        korean: "물조차 없어요",
        romanization: "mul-jo-cha eop-seo-yo",
        english: "There's not even water",
        filipino: "Wala kahit tubig"
      }
    ],
    usage: "명사 뒤에 붙여서 '심지어'의 의미를 강조합니다."
  },
  {
    korean: "마저",
    romanization: "ma-jeo",
    english: "even, including",
    filipino: "kahit, kasama na",
    explanation: "심지어, 포함해서의 의미를 나타내는 조사",
    examples: [
      {
        korean: "마지막 사람마저 갔어요",
        romanization: "ma-ji-mak sa-ram-ma-jeo ga-sseo-yo",
        english: "Even the last person left",
        filipino: "Umalis kahit ang huling tao"
      }
    ],
    usage: "명사 뒤에 붙여서 '심지어', '포함해서'의 의미를 나타냅니다."
  },
  {
    korean: "밖에",
    romanization: "bak-e",
    english: "only, nothing but",
    filipino: "lamang, walang iba",
    explanation: "오직, ~외에는 아무것도의 의미를 나타내는 조사",
    examples: [
      {
        korean: "물밖에 안 마셔요",
        romanization: "mul-bak-e an ma-syeo-yo",
        english: "I only drink water",
        filipino: "Tubig lang ang iniinom ko"
      },
      {
        korean: "친구밖에 없어요",
        romanization: "chin-gu-bak-e eop-seo-yo",
        english: "I only have friends",
        filipino: "Mga kaibigan lang ang meron ako"
      }
    ],
    usage: "명사 뒤에 붙여서 '오직', '~외에는 아무것도'의 의미를 나타냅니다."
  },
  
  // 접속조사들
  {
    korean: "하고",
    romanization: "ha-go",
    english: "and (informal)",
    filipino: "at (di-pormal)",
    explanation: "명사와 명사를 연결하는 비격식 조사",
    examples: [
      {
        korean: "사과하고 배",
        romanization: "sa-gwa-ha-go bae",
        english: "apple and pear",
        filipino: "mansanas at peras"
      },
      {
        korean: "친구하고 놀아요",
        romanization: "chin-gu-ha-go no-ra-yo",
        english: "I play with my friend",
        filipino: "Naglalaro ako kasama ang kaibigan ko"
      }
    ],
    usage: "명사 뒤에 붙여서 '그리고'의 의미를 나타냅니다. 비격식 표현입니다."
  },
  {
    korean: "이랑/랑",
    romanization: "i-rang/rang",
    english: "and (very informal)",
    filipino: "at (napaka-di-pormal)",
    explanation: "명사와 명사를 연결하는 매우 비격식 조사",
    examples: [
      {
        korean: "사과랑 배",
        romanization: "sa-gwa-rang bae",
        english: "apple and pear",
        filipino: "mansanas at peras"
      },
      {
        korean: "친구랑 놀아요",
        romanization: "chin-gu-rang no-ra-yo",
        english: "I play with my friend",
        filipino: "Naglalaro ako kasama ang kaibigan ko"
      }
    ],
    usage: "자음으로 끝나는 명사에는 '이랑', 모음으로 끝나는 명사에는 '랑'을 붙입니다. 매우 비격식 표현입니다."
  },
  {
    korean: "며",
    romanization: "myeo",
    english: "and (formal)",
    filipino: "at (pormal)",
    explanation: "명사와 명사를 연결하는 격식 조사",
    examples: [
      {
        korean: "사과며 배",
        romanization: "sa-gwa-myeo bae",
        english: "apple and pear",
        filipino: "mansanas at peras"
      }
    ],
    usage: "명사 뒤에 붙여서 '그리고'의 의미를 나타냅니다. 격식 표현입니다."
  },
  
  // 추가 부사격조사들
  {
    korean: "에게서",
    romanization: "e-ge-seo",
    english: "from (person)",
    filipino: "mula sa (tao)",
    explanation: "사람으로부터의 출발점을 나타내는 조사",
    examples: [
      {
        korean: "친구에게서 들었어요",
        romanization: "chin-gu-e-ge-seo deu-reo-sseo-yo",
        english: "I heard it from my friend",
        filipino: "Narinig ko ito sa kaibigan ko"
      }
    ],
    usage: "사람 뒤에 붙여서 그 사람으로부터의 출발점을 나타냅니다."
  },
  {
    korean: "한테서",
    romanization: "han-te-seo",
    english: "from (person, informal)",
    filipino: "mula sa (tao, di-pormal)",
    explanation: "사람으로부터의 출발점을 나타내는 비격식 조사",
    examples: [
      {
        korean: "친구한테서 들었어요",
        romanization: "chin-gu-han-te-seo deu-reo-sseo-yo",
        english: "I heard it from my friend",
        filipino: "Narinig ko ito sa kaibigan ko"
      }
    ],
    usage: "사람 뒤에 붙여서 그 사람으로부터의 출발점을 나타냅니다. 비격식 표현입니다."
  },
  {
    korean: "처럼",
    romanization: "cheo-reom",
    english: "like, as",
    filipino: "tulad ng, parang",
    explanation: "비유나 비교를 나타내는 조사",
    examples: [
      {
        korean: "꽃처럼 예뻐요",
        romanization: "kkot-cheo-reom ye-ppeo-yo",
        english: "She's pretty like a flower",
        filipino: "Maganda siya tulad ng bulaklak"
      },
      {
        korean: "아버지처럼 강해요",
        romanization: "a-beo-ji-cheo-reom gang-hae-yo",
        english: "He's strong like his father",
        filipino: "Malakas siya tulad ng kanyang ama"
      }
    ],
    usage: "명사 뒤에 붙여서 '~처럼', '~같이'의 의미를 나타냅니다."
  },
  {
    korean: "같이",
    romanization: "ga-chi",
    english: "like, together",
    filipino: "tulad ng, kasama",
    explanation: "비유나 함께의 의미를 나타내는 조사",
    examples: [
      {
        korean: "친구같이 지내요",
        romanization: "chin-gu-ga-chi ji-nae-yo",
        english: "We live together like friends",
        filipino: "Nakatira kami kasama tulad ng mga kaibigan"
      },
      {
        korean: "가족같이 따뜻해요",
        romanization: "ga-jok-ga-chi tta-tteu-tae-yo",
        english: "It's warm like family",
        filipino: "Mainit tulad ng pamilya"
      }
    ],
    usage: "명사 뒤에 붙여서 '~같이', '~처럼'의 의미를 나타냅니다."
  }
]

export default particlesData
