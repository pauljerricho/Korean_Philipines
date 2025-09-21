const topikData = {
  level1: {
    title: "TOPIK I (Level 1-2)",
    description: "한국어능력시험 초급 레벨 문제",
    totalQuestions: 70,
    timeLimit: 100, // minutes
    sections: [
      {
        id: "vocabulary",
        title: "어휘 및 문법 (Vocabulary & Grammar)",
        questions: 30,
        timeLimit: 40,
        problems: [
          {
            id: 1,
            question: "다음 중 빈칸에 들어갈 알맞은 단어를 고르세요.",
            text: "저는 매일 아침에 _____ 을/를 마십니다.",
            options: ["물", "밥", "사과", "책"],
            correct: 0,
            explanation: "매일 아침에 마시는 것은 '물'이 가장 적절합니다.",
            explanationEn: "The most appropriate thing to drink every morning is 'water' (물).",
            explanationFil: "Ang pinaka-angkop na inumin tuwing umaga ay 'tubig' (물)."
          },
          {
            id: 2,
            question: "다음 중 반대말을 고르세요.",
            text: "크다",
            options: ["작다", "많다", "좋다", "나쁘다"],
            correct: 0,
            explanation: "'크다'의 반대말은 '작다'입니다.",
            explanationEn: "The opposite of '크다' (big) is '작다' (small).",
            explanationFil: "Ang kabaligtaran ng '크다' (malaki) ay '작다' (maliit)."
          },
          {
            id: 3,
            question: "다음 중 빈칸에 들어갈 알맞은 조사를 고르세요.",
            text: "친구 _____ 집에 갔습니다.",
            options: ["이", "가", "을", "의"],
            correct: 3,
            explanation: "소유를 나타내는 조사 '의'가 적절합니다.",
            explanationEn: "The possessive particle '의' (of) is appropriate here.",
            explanationFil: "Ang possessive particle na '의' (ng) ay angkop dito."
          },
          {
            id: 4,
            question: "다음 중 시간을 나타내는 단어를 고르세요.",
            text: "오늘은 _____ 입니다.",
            options: ["월요일", "학교", "친구", "집"],
            correct: 0,
            explanation: "'월요일'은 요일을 나타내는 시간 단어입니다.",
            explanationEn: "'월요일' (Monday) is a time-related word that indicates the day of the week.",
            explanationFil: "Ang '월요일' (Lunes) ay salitang nauugnay sa oras na nagpapahiwatig ng araw ng linggo."
          },
          {
            id: 5,
            question: "다음 중 빈칸에 들어갈 알맞은 단어를 고르세요.",
            text: "저는 한국어를 _____ 공부합니다.",
            options: ["열심히", "천천히", "조용히", "크게"],
            correct: 0,
            explanation: "공부하는 방식으로 '열심히'가 가장 적절합니다.",
            explanationEn: "'열심히' (hard/diligently) is the most appropriate way to describe studying.",
            explanationFil: "Ang '열심히' (masipag) ay pinaka-angkop na paraan para ilarawan ang pag-aaral."
          },
          {
            id: 6,
            question: "다음 중 색깔을 나타내는 단어를 고르세요.",
            text: "하늘은 _____ 입니다.",
            options: ["파란색", "학교", "친구", "집"],
            correct: 0,
            explanation: "'파란색'은 색깔을 나타내는 단어입니다.",
            explanationEn: "'파란색' (blue) is a word that represents color.",
            explanationFil: "Ang '파란색' (asul) ay salitang kumakatawan sa kulay."
          },
          {
            id: 7,
            question: "다음 중 숫자를 고르세요.",
            text: "일, 이, _____, 사",
            options: ["삼", "학교", "친구", "집"],
            correct: 0,
            explanation: "숫자 순서에서 3은 '삼'입니다.",
            explanationEn: "In the number sequence, 3 is '삼'.",
            explanationFil: "Sa pagkakasunod-sunod ng numero, ang 3 ay '삼'."
          },
          {
            id: 8,
            question: "다음 중 가족을 나타내는 단어를 고르세요.",
            text: "저의 _____ 은/는 의사입니다.",
            options: ["아버지", "학교", "친구", "집"],
            correct: 0,
            explanation: "'아버지'는 가족을 나타내는 단어입니다.",
            explanationEn: "'아버지' (father) is a word that represents family.",
            explanationFil: "Ang '아버지' (ama) ay salitang kumakatawan sa pamilya."
          },
          {
            id: 9,
            question: "다음 중 음식을 나타내는 단어를 고르세요.",
            text: "저는 _____ 을/를 좋아합니다.",
            options: ["김치", "학교", "친구", "집"],
            correct: 0,
            explanation: "'김치'는 음식을 나타내는 단어입니다.",
            explanationEn: "'김치' (kimchi) is a word that represents food.",
            explanationFil: "Ang '김치' (kimchi) ay salitang kumakatawan sa pagkain."
          },
          {
            id: 10,
            question: "다음 중 동물을 나타내는 단어를 고르세요.",
            text: "_____ 은/는 귀여워요.",
            options: ["강아지", "학교", "친구", "집"],
            correct: 0,
            explanation: "'강아지'는 동물을 나타내는 단어입니다.",
            explanationEn: "'강아지' (puppy) is a word that represents an animal.",
            explanationFil: "Ang '강아지' (tutang aso) ay salitang kumakatawan sa hayop."
          }
        ]
      },
      {
        id: "reading",
        title: "읽기 (Reading)",
        questions: 30,
        timeLimit: 50,
        problems: [
          {
            id: 11,
            question: "다음 글을 읽고 물음에 답하세요.",
            text: "안녕하세요. 저는 김민수입니다. 저는 한국 사람입니다. 저는 학생입니다.",
            questionText: "김민수 씨는 무엇을 합니까?",
            options: ["의사", "학생", "선생님", "회사원"],
            correct: 1,
            explanation: "글에서 '저는 학생입니다'라고 했습니다.",
            explanationEn: "The text states '저는 학생입니다' (I am a student).",
            explanationFil: "Sinasabi sa teksto na '저는 학생입니다' (Ako ay isang estudyante)."
          },
          {
            id: 12,
            question: "다음 글을 읽고 물음에 답하세요.",
            text: "저는 매일 아침 7시에 일어납니다. 그리고 아침을 먹습니다. 학교에 8시에 갑니다.",
            questionText: "이 사람은 몇 시에 학교에 갑니까?",
            options: ["7시", "8시", "9시", "10시"],
            correct: 1,
            explanation: "글에서 '학교에 8시에 갑니다'라고 했습니다.",
            explanationEn: "The text states '학교에 8시에 갑니다' (I go to school at 8 o'clock).",
            explanationFil: "Sinasabi sa teksto na '학교에 8시에 갑니다' (Pumupunta ako sa paaralan ng 8:00)."
          },
          {
            id: 13,
            question: "다음 글을 읽고 물음에 답하세요.",
            text: "저는 주말에 공원에 갑니다. 공원에서 운동을 합니다. 친구와 같이 자전거를 탑니다.",
            questionText: "이 사람은 주말에 무엇을 합니까?",
            options: ["공부합니다", "운동합니다", "영화 봅니다", "책 읽습니다"],
            correct: 1,
            explanation: "글에서 '공원에서 운동을 합니다'라고 했습니다.",
            explanationEn: "The text states '공원에서 운동을 합니다' (I exercise at the park).",
            explanationFil: "Sinasabi sa teksto na '공원에서 운동을 합니다' (Nag-eehersisyo ako sa park)."
          },
          {
            id: 14,
            question: "다음 글을 읽고 물음에 답하세요.",
            text: "저는 어제 백화점에서 옷을 샀습니다. 예쁜 옷이 많았습니다. 가격도 비싸지 않았습니다.",
            questionText: "이 사람은 무엇을 샀습니까?",
            options: ["신발", "가방", "옷", "모자"],
            correct: 2,
            explanation: "글에서 '백화점에서 옷을 샀습니다'라고 했습니다.",
            explanationEn: "The text states '백화점에서 옷을 샀습니다' (I bought clothes at the department store).",
            explanationFil: "Sinasabi sa teksto na '백화점에서 옷을 샀습니다' (Bumili ako ng damit sa department store)."
          },
          {
            id: 15,
            question: "다음 글을 읽고 물음에 답하세요.",
            text: "저는 한국 음식을 좋아합니다. 특히 김치찌개를 좋아합니다. 맵지만 맛있습니다.",
            questionText: "이 사람이 가장 좋아하는 한국 음식은 무엇입니까?",
            options: ["불고기", "비빔밥", "김치찌개", "삼겹살"],
            correct: 2,
            explanation: "글에서 '특히 김치찌개를 좋아합니다'라고 했습니다.",
            explanationEn: "The text states '특히 김치찌개를 좋아합니다' (I especially like kimchi stew).",
            explanationFil: "Sinasabi sa teksto na '특히 김치찌개를 좋아합니다' (Lalo na ang gusto ko ang kimchi stew)."
          }
        ]
      },
      {
        id: "listening",
        title: "듣기 (Listening)",
        questions: 10,
        timeLimit: 10,
        problems: [
          {
            id: 16,
            question: "다음을 듣고 물음에 답하세요.",
            audioText: "안녕하세요. 저는 학생입니다.",
            questionText: "이 사람은 누구입니까?",
            options: ["선생님", "학생", "의사", "경찰"],
            correct: 1,
            explanation: "음성에서 '저는 학생입니다'라고 말했습니다.",
            explanationEn: "The audio states '저는 학생입니다' (I am a student).",
            explanationFil: "Sinasabi sa audio na '저는 학생입니다' (Ako ay isang estudyante)."
          },
          {
            id: 17,
            question: "다음을 듣고 물음에 답하세요.",
            audioText: "저는 한국어를 공부합니다.",
            questionText: "이 사람은 무엇을 공부합니까?",
            options: ["영어", "일본어", "중국어", "한국어"],
            correct: 3,
            explanation: "음성에서 '저는 한국어를 공부합니다'라고 말했습니다.",
            explanationEn: "The audio states '저는 한국어를 공부합니다' (I study Korean).",
            explanationFil: "Sinasabi sa audio na '저는 한국어를 공부합니다' (Nag-aaral ako ng Korean)."
          },
          {
            id: 18,
            question: "다음을 듣고 물음에 답하세요.",
            audioText: "저는 아침에 빵을 먹습니다.",
            questionText: "이 사람은 아침에 무엇을 먹습니까?",
            options: ["밥", "빵", "과일", "우유"],
            correct: 1,
            explanation: "음성에서 '저는 아침에 빵을 먹습니다'라고 말했습니다.",
            explanationEn: "The audio states '저는 아침에 빵을 먹습니다' (I eat bread in the morning).",
            explanationFil: "Sinasabi sa audio na '저는 아침에 빵을 먹습니다' (Kumakain ako ng tinapay sa umaga)."
          },
          {
            id: 19,
            question: "다음을 듣고 물음에 답하세요.",
            audioText: "저는 커피를 마십니다.",
            questionText: "이 사람은 무엇을 마십니까?",
            options: ["물", "주스", "커피", "차"],
            correct: 2,
            explanation: "음성에서 '저는 커피를 마십니다'라고 말했습니다.",
            explanationEn: "The audio states '저는 커피를 마십니다' (I drink coffee).",
            explanationFil: "Sinasabi sa audio na '저는 커피를 마십니다' (Umiinom ako ng kape)."
          },
          {
            id: 20,
            question: "다음을 듣고 물음에 답하세요.",
            audioText: "저는 영화를 봅니다.",
            questionText: "이 사람은 무엇을 봅니까?",
            options: ["책", "영화", "텔레비전", "신문"],
            correct: 1,
            explanation: "음성에서 '저는 영화를 봅니다'라고 말했습니다.",
            explanationEn: "The audio states '저는 영화를 봅니다' (I watch movies).",
            explanationFil: "Sinasabi sa audio na '저는 영화를 봅니다' (Nanonood ako ng pelikula)."
          }
        ]
      }
    ]
  }
}

export default topikData