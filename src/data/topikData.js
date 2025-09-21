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
            explanation: "매일 아침에 마시는 것은 '물'이 가장 적절합니다."
          },
          {
            id: 2,
            question: "다음 중 반대말을 고르세요.",
            text: "크다",
            options: ["작다", "많다", "좋다", "나쁘다"],
            correct: 0,
            explanation: "'크다'의 반대말은 '작다'입니다."
          },
          {
            id: 3,
            question: "다음 중 빈칸에 들어갈 알맞은 조사를 고르세요.",
            text: "친구 _____ 집에 갔습니다.",
            options: ["이", "가", "을", "의"],
            correct: 3,
            explanation: "소유를 나타내는 조사 '의'가 적절합니다."
          },
          {
            id: 4,
            question: "다음 중 시간을 나타내는 단어를 고르세요.",
            text: "오늘은 _____ 입니다.",
            options: ["월요일", "학교", "친구", "집"],
            correct: 0,
            explanation: "'월요일'은 요일을 나타내는 시간 단어입니다."
          },
          {
            id: 5,
            question: "다음 중 빈칸에 들어갈 알맞은 단어를 고르세요.",
            text: "저는 한국어를 _____ 공부합니다.",
            options: ["열심히", "천천히", "조용히", "크게"],
            correct: 0,
            explanation: "공부하는 방식으로 '열심히'가 가장 적절합니다."
          }
        ]
      },
      {
        id: "reading",
        title: "읽기 (Reading Comprehension)",
        questions: 30,
        timeLimit: 50,
        problems: [
          {
            id: 1,
            question: "다음 글을 읽고 질문에 답하세요.",
            text: "안녕하세요. 저는 김민수입니다. 저는 대학생입니다. 매일 학교에 갑니다. 한국어를 공부합니다.",
            questionText: "김민수는 무엇을 공부합니까?",
            options: ["영어", "수학", "한국어", "과학"],
            correct: 2,
            explanation: "글에서 '한국어를 공부합니다'라고 명시되어 있습니다."
          },
          {
            id: 2,
            question: "다음 글을 읽고 질문에 답하세요.",
            text: "오늘은 일요일입니다. 가족과 함께 공원에 갔습니다. 날씨가 좋았습니다. 아이들이 놀고 있었습니다.",
            questionText: "오늘 날씨는 어땠습니까?",
            options: ["나쁘다", "좋다", "춥다", "덥다"],
            correct: 1,
            explanation: "글에서 '날씨가 좋았습니다'라고 명시되어 있습니다."
          },
          {
            id: 3,
            question: "다음 글을 읽고 질문에 답하세요.",
            text: "저는 매일 아침 7시에 일어납니다. 세수를 하고 아침을 먹습니다. 8시에 집을 나갑니다.",
            questionText: "언제 집을 나갑니까?",
            options: ["7시", "8시", "9시", "10시"],
            correct: 1,
            explanation: "글에서 '8시에 집을 나갑니다'라고 명시되어 있습니다."
          },
          {
            id: 4,
            question: "다음 글을 읽고 질문에 답하세요.",
            text: "이것은 제 친구의 사진입니다. 친구는 키가 크고 머리가 깁니다. 친구는 선생님입니다.",
            questionText: "친구의 직업은 무엇입니까?",
            options: ["학생", "선생님", "의사", "요리사"],
            correct: 1,
            explanation: "글에서 '친구는 선생님입니다'라고 명시되어 있습니다."
          },
          {
            id: 5,
            question: "다음 글을 읽고 질문에 답하세요.",
            text: "저는 한국 음식을 좋아합니다. 비빔밥과 김치를 자주 먹습니다. 한국 음식은 맛있습니다.",
            questionText: "이 사람이 자주 먹는 한국 음식은 무엇입니까?",
            options: ["라면", "비빔밥과 김치", "불고기", "된장찌개"],
            correct: 1,
            explanation: "글에서 '비빔밥과 김치를 자주 먹습니다'라고 명시되어 있습니다."
          }
        ]
      },
      {
        id: "listening",
        title: "듣기 (Listening Comprehension)",
        questions: 10,
        timeLimit: 10,
        problems: [
          {
            id: 1,
            question: "다음 대화를 듣고 질문에 답하세요.",
            audioText: "남자: 안녕하세요. 몇 시에 일어나세요? 여자: 저는 6시에 일어나요.",
            questionText: "여자는 몇 시에 일어납니까?",
            options: ["5시", "6시", "7시", "8시"],
            correct: 1,
            explanation: "여자가 '저는 6시에 일어나요'라고 답했습니다."
          },
          {
            id: 2,
            question: "다음 대화를 듣고 질문에 답하세요.",
            audioText: "남자: 오늘 날씨가 어때요? 여자: 비가 와요. 우산을 가져가세요.",
            questionText: "오늘 날씨는 어때요?",
            options: ["맑다", "흐리다", "비가 온다", "눈이 온다"],
            correct: 2,
            explanation: "여자가 '비가 와요'라고 답했습니다."
          },
          {
            id: 3,
            question: "다음 대화를 듣고 질문에 답하세요.",
            audioText: "남자: 어디에 가세요? 여자: 학교에 가요. 한국어 수업이 있어요.",
            questionText: "여자는 어디에 갑니까?",
            options: ["집", "학교", "병원", "은행"],
            correct: 1,
            explanation: "여자가 '학교에 가요'라고 답했습니다."
          },
          {
            id: 4,
            question: "다음 대화를 듣고 질문에 답하세요.",
            audioText: "남자: 뭐 드시겠어요? 여자: 커피 주세요. 설탕은 조금만 넣어 주세요.",
            questionText: "여자는 무엇을 주문했습니까?",
            options: ["차", "커피", "물", "주스"],
            correct: 1,
            explanation: "여자가 '커피 주세요'라고 주문했습니다."
          },
          {
            id: 5,
            question: "다음 대화를 듣고 질문에 답하세요.",
            audioText: "남자: 내일 뭐 할 거예요? 여자: 친구를 만날 거예요. 영화를 볼 거예요.",
            questionText: "여자는 내일 무엇을 할 거예요?",
            options: ["공부", "친구를 만나고 영화를 보다", "쇼핑", "운동"],
            correct: 1,
            explanation: "여자가 '친구를 만날 거예요. 영화를 볼 거예요'라고 답했습니다."
          }
        ]
      }
    ]
  }
}

export default topikData
