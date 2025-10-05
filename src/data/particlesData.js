// 한국어 조사 데이터 - HowToStudyKorean Lesson 12 참고
const particlesData = [
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
  }
]

export default particlesData
