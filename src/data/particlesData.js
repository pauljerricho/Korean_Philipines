const particlesData = {
  basic: {
    title: "기본 조사 (Basic Particles)",
    description: "한국어의 기본적인 조사들을 배워보세요",
    particles: [
      {
        id: 1,
        particle: "은/는",
        usage: "주제를 나타냄",
        examples: [
          {
            korean: "저는 학생입니다.",
            english: "I am a student.",
            filipino: "Ako ay isang estudyante."
          },
          {
            korean: "한국어는 어렵습니다.",
            english: "Korean is difficult.",
            filipino: "Ang Korean ay mahirap."
          }
        ],
        explanation: "주제나 대조를 나타내는 조사입니다.",
        explanationEn: "A particle that indicates the topic or contrast. 은 is used after consonants, 는 after vowels. It's used to introduce or emphasize the main subject of the sentence.",
        explanationFil: "Isang particle na nagpapahiwatig ng paksa o paghahambing."
      },
      {
        id: 2,
        particle: "이/가",
        usage: "주어를 나타냄",
        examples: [
          {
            korean: "친구가 왔습니다.",
            english: "A friend came.",
            filipino: "May dumating na kaibigan."
          },
          {
            korean: "비가 옵니다.",
            english: "It's raining.",
            filipino: "Umuulan."
          }
        ],
        explanation: "주어를 나타내는 조사입니다.",
        explanationEn: "A particle that indicates the grammatical subject. 이 is used after consonants, 가 after vowels. Used when the subject is new information or when emphasizing the subject.",
        explanationFil: "Isang particle na nagpapahiwatig ng paksa."
      },
      {
        id: 3,
        particle: "을/를",
        usage: "목적어를 나타냄",
        examples: [
          {
            korean: "책을 읽습니다.",
            english: "I read a book.",
            filipino: "Nagbabasa ako ng libro."
          },
          {
            korean: "음악을 듣습니다.",
            english: "I listen to music.",
            filipino: "Nakikinig ako ng musika."
          }
        ],
        explanation: "목적어를 나타내는 조사입니다.",
        explanationEn: "A particle that indicates the direct object. 을 is used after consonants, 를 after vowels. Used when the verb requires a direct object.",
        explanationFil: "Isang particle na nagpapahiwatig ng layunin."
      },
      {
        id: 4,
        particle: "에",
        usage: "장소, 시간을 나타냄",
        examples: [
          {
            korean: "학교에 갑니다.",
            english: "I go to school.",
            filipino: "Pumupunta ako sa paaralan."
          },
          {
            korean: "아침에 일어납니다.",
            english: "I wake up in the morning.",
            filipino: "Gumigising ako sa umaga."
          }
        ],
        explanation: "장소나 시간을 나타내는 조사입니다.",
        explanationEn: "A particle that indicates location or time. Used for static locations and specific times. Shows where something is or when something happens.",
        explanationFil: "Isang particle na nagpapahiwatig ng lugar o oras."
      },
      {
        id: 5,
        particle: "에서",
        usage: "장소에서 행동을 나타냄",
        examples: [
          {
            korean: "도서관에서 공부합니다.",
            english: "I study at the library.",
            filipino: "Nag-aaral ako sa library."
          },
          {
            korean: "집에서 쉽니다.",
            english: "I rest at home.",
            filipino: "Nagpapahinga ako sa bahay."
          }
        ],
        explanation: "어떤 장소에서 행동이 일어나는지를 나타내는 조사입니다.",
        explanationEn: "A particle that indicates where an action takes place. Used for dynamic actions, not static locations. Shows the location where an action is performed.",
        explanationFil: "Isang particle na nagpapahiwatig kung saan nangyayari ang isang aksyon."
      },
      {
        id: 6,
        particle: "의",
        usage: "소유를 나타냄",
        examples: [
          {
            korean: "친구의 책입니다.",
            english: "It's my friend's book.",
            filipino: "Libro ito ng aking kaibigan."
          },
          {
            korean: "우리의 학교입니다.",
            english: "It's our school.",
            filipino: "Paaralan namin ito."
          }
        ],
        explanation: "소유나 관계를 나타내는 조사입니다.",
        explanationEn: "A particle that indicates possession or relationship. Similar to 'of' or ''s' in English. Shows ownership or connection between nouns.",
        explanationFil: "Isang particle na nagpapahiwatig ng pagmamay-ari o relasyon."
      },
      {
        id: 7,
        particle: "와/과",
        usage: "함께, 그리고를 나타냄",
        examples: [
          {
            korean: "친구와 영화를 봅니다.",
            english: "I watch a movie with my friend.",
            filipino: "Nanonood ako ng pelikula kasama ang kaibigan."
          },
          {
            korean: "사과와 바나나를 샀습니다.",
            english: "I bought apples and bananas.",
            filipino: "Bumili ako ng mansanas at saging."
          }
        ],
        explanation: "함께하거나 나열할 때 사용하는 조사입니다.",
        explanationEn: "A particle used when doing something together or listing items. 와 is used after vowels, 과 after consonants. Means 'and' or 'with'.",
        explanationFil: "Isang particle na ginagamit kapag gumagawa ng isang bagay kasama o naglilista ng mga bagay."
      },
      {
        id: 8,
        particle: "도",
        usage: "또한, 도를 나타냄",
        examples: [
          {
            korean: "저도 한국어를 공부합니다.",
            english: "I also study Korean.",
            filipino: "Nag-aaral din ako ng Korean."
          },
          {
            korean: "이것도 좋습니다.",
            english: "This is also good.",
            filipino: "Maganda din ito."
          }
        ],
        explanation: "또한, 도라는 의미를 나타내는 조사입니다.",
        explanationEn: "A particle that means 'also' or 'too'. Can replace other particles to add emphasis. Used to show inclusion or add emphasis.",
        explanationFil: "Isang particle na nangangahulugang 'din' o 'rin'."
      }
    ]
  },
  advanced: {
    title: "고급 조사 (Advanced Particles)",
    description: "더 복잡한 조사들을 배워보세요",
    particles: [
      {
        id: 9,
        particle: "부터",
        usage: "시작점을 나타냄",
        examples: [
          {
            korean: "아침부터 저녁까지 일합니다.",
            english: "I work from morning to evening.",
            filipino: "Nagtatrabaho ako mula umaga hanggang gabi."
          },
          {
            korean: "1번부터 시작하세요.",
            english: "Start from number 1.",
            filipino: "Simulan mula sa numero 1."
          }
        ],
        explanation: "시작점이나 출발점을 나타내는 조사입니다.",
        explanationEn: "A particle that indicates the starting point of time or space. Often paired with 까지. Shows when or where something begins.",
        explanationFil: "Isang particle na nagpapahiwatig ng panimulang punto."
      },
      {
        id: 10,
        particle: "까지",
        usage: "끝점을 나타냄",
        examples: [
          {
            korean: "학교까지 걸어갑니다.",
            english: "I walk to school.",
            filipino: "Lakad papunta sa paaralan."
          },
          {
            korean: "10시까지 기다립니다.",
            english: "I'll wait until 10 o'clock.",
            filipino: "Maghihintay ako hanggang 10:00."
          }
        ],
        explanation: "끝점이나 한계를 나타내는 조사입니다.",
        explanationEn: "A particle that indicates the end point of time or space. Often paired with 부터. Shows when or where something ends.",
        explanationFil: "Isang particle na nagpapahiwatig ng dulong punto o limitasyon."
      },
      {
        id: 11,
        particle: "만",
        usage: "오직, 만을 나타냄",
        examples: [
          {
            korean: "물만 마십니다.",
            english: "I only drink water.",
            filipino: "Tubig lang ang iniinom ko."
          },
          {
            korean: "친구만 만납니다.",
            english: "I only meet friends.",
            filipino: "Mga kaibigan lang ang nakikita ko."
          }
        ],
        explanation: "오직, 만이라는 의미를 나타내는 조사입니다.",
        explanationEn: "A particle that means 'only' or 'just'. Can replace other particles to add restriction. Limits or restricts the scope.",
        explanationFil: "Isang particle na nangangahulugang 'lang' o 'lamang'."
      },
      {
        id: 12,
        particle: "부터...까지",
        usage: "시작부터 끝까지",
        examples: [
          {
            korean: "월요일부터 금요일까지 일합니다.",
            english: "I work from Monday to Friday.",
            filipino: "Nagtatrabaho ako mula Lunes hanggang Biyernes."
          },
          {
            korean: "아침부터 저녁까지 공부합니다.",
            english: "I study from morning to evening.",
            filipino: "Nag-aaral ako mula umaga hanggang gabi."
          }
        ],
        explanation: "시작점부터 끝점까지의 범위를 나타내는 조사입니다.",
        explanationEn: "A combination of two particles that indicates a complete range from start to end. 부터 shows the starting point, 까지 shows the end point. Used for time or space ranges.",
        explanationFil: "Mga particle na nagpapahiwatig ng saklaw mula simula hanggang katapusan."
      }
    ]
  }
}

export default particlesData