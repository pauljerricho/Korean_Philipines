// 한국어 숫자 강의 데이터
const numbersData = {
  pureKorean: [
    {
      id: 1,
      number: '하나',
      romanization: 'hana',
      english: 'one',
      filipino: 'isa',
      usage: '개수를 셀 때 사용',
      usageEn: 'Used when counting objects',
      usageFil: 'Ginagamit kapag binibilang ang mga bagay',
      examples: [
        { korean: '사과 하나', english: 'one apple', filipino: 'isang mansanas' },
        { korean: '책 하나', english: 'one book', filipino: 'isang libro' }
      ]
    },
    {
      id: 2,
      number: '둘',
      romanization: 'dul',
      english: 'two',
      filipino: 'dalawa',
      usage: '개수를 셀 때 사용',
      usageEn: 'Used when counting objects',
      usageFil: 'Ginagamit kapag binibilang ang mga bagay',
      examples: [
        { korean: '사과 둘', english: 'two apples', filipino: 'dalawang mansanas' },
        { korean: '책 둘', english: 'two books', filipino: 'dalawang libro' }
      ]
    },
    {
      id: 3,
      number: '셋',
      romanization: 'set',
      english: 'three',
      filipino: 'tatlo',
      usage: '개수를 셀 때 사용',
      usageEn: 'Used when counting objects',
      usageFil: 'Ginagamit kapag binibilang ang mga bagay',
      examples: [
        { korean: '사과 셋', english: 'three apples', filipino: 'tatlong mansanas' },
        { korean: '책 셋', english: 'three books', filipino: 'tatlong libro' }
      ]
    },
    {
      id: 4,
      number: '넷',
      romanization: 'net',
      english: 'four',
      filipino: 'apat',
      usage: '개수를 셀 때 사용',
      usageEn: 'Used when counting objects',
      usageFil: 'Ginagamit kapag binibilang ang mga bagay',
      examples: [
        { korean: '사과 넷', english: 'four apples', filipino: 'apat na mansanas' },
        { korean: '책 넷', english: 'four books', filipino: 'apat na libro' }
      ]
    },
    {
      id: 5,
      number: '다섯',
      romanization: 'daseot',
      english: 'five',
      filipino: 'lima',
      usage: '개수를 셀 때 사용',
      usageEn: 'Used when counting objects',
      usageFil: 'Ginagamit kapag binibilang ang mga bagay',
      examples: [
        { korean: '사과 다섯', english: 'five apples', filipino: 'limang mansanas' },
        { korean: '책 다섯', english: 'five books', filipino: 'limang libro' }
      ]
    },
    {
      id: 6,
      number: '여섯',
      romanization: 'yeoseot',
      english: 'six',
      filipino: 'anim',
      usage: '개수를 셀 때 사용',
      usageEn: 'Used when counting objects',
      usageFil: 'Ginagamit kapag binibilang ang mga bagay',
      examples: [
        { korean: '사과 여섯', english: 'six apples', filipino: 'anim na mansanas' },
        { korean: '책 여섯', english: 'six books', filipino: 'anim na libro' }
      ]
    },
    {
      id: 7,
      number: '일곱',
      romanization: 'ilgop',
      english: 'seven',
      filipino: 'pito',
      usage: '개수를 셀 때 사용',
      usageEn: 'Used when counting objects',
      usageFil: 'Ginagamit kapag binibilang ang mga bagay',
      examples: [
        { korean: '사과 일곱', english: 'seven apples', filipino: 'pitong mansanas' },
        { korean: '책 일곱', english: 'seven books', filipino: 'pitong libro' }
      ]
    },
    {
      id: 8,
      number: '여덟',
      romanization: 'yeodeol',
      english: 'eight',
      filipino: 'walo',
      usage: '개수를 셀 때 사용',
      usageEn: 'Used when counting objects',
      usageFil: 'Ginagamit kapag binibilang ang mga bagay',
      examples: [
        { korean: '사과 여덟', english: 'eight apples', filipino: 'walong mansanas' },
        { korean: '책 여덟', english: 'eight books', filipino: 'walong libro' }
      ]
    },
    {
      id: 9,
      number: '아홉',
      romanization: 'ahop',
      english: 'nine',
      filipino: 'siyam',
      usage: '개수를 셀 때 사용',
      usageEn: 'Used when counting objects',
      usageFil: 'Ginagamit kapag binibilang ang mga bagay',
      examples: [
        { korean: '사과 아홉', english: 'nine apples', filipino: 'siyam na mansanas' },
        { korean: '책 아홉', english: 'nine books', filipino: 'siyam na libro' }
      ]
    },
    {
      id: 10,
      number: '열',
      romanization: 'yeol',
      english: 'ten',
      filipino: 'sampu',
      usage: '개수를 셀 때 사용',
      usageEn: 'Used when counting objects',
      usageFil: 'Ginagamit kapag binibilang ang mga bagay',
      examples: [
        { korean: '사과 열', english: 'ten apples', filipino: 'sampung mansanas' },
        { korean: '책 열', english: 'ten books', filipino: 'sampung libro' }
      ]
    }
  ],
  sinoKorean: [
    {
      id: 1,
      number: '일',
      romanization: 'il',
      english: 'one',
      filipino: 'isa',
      usage: '날짜, 시간, 금액, 번호 등에 사용',
      usageEn: 'Used for dates, time, money, phone numbers, etc.',
      usageFil: 'Ginagamit para sa petsa, oras, pera, numero ng telepono, atbp.',
      examples: [
        { korean: '일월 (1월)', english: 'January', filipino: 'Enero' },
        { korean: '일시', english: 'one o\'clock', filipino: 'alas-uno' },
        { korean: '일원', english: 'one won', filipino: 'isang won' }
      ]
    },
    {
      id: 2,
      number: '이',
      romanization: 'i',
      english: 'two',
      filipino: 'dalawa',
      usage: '날짜, 시간, 금액, 번호 등에 사용',
      usageEn: 'Used for dates, time, money, phone numbers, etc.',
      usageFil: 'Ginagamit para sa petsa, oras, pera, numero ng telepono, atbp.',
      examples: [
        { korean: '이월 (2월)', english: 'February', filipino: 'Pebrero' },
        { korean: '이시', english: 'two o\'clock', filipino: 'alas-dos' },
        { korean: '이원', english: 'two won', filipino: 'dalawang won' }
      ]
    },
    {
      id: 3,
      number: '삼',
      romanization: 'sam',
      english: 'three',
      filipino: 'tatlo',
      usage: '날짜, 시간, 금액, 번호 등에 사용',
      usageEn: 'Used for dates, time, money, phone numbers, etc.',
      usageFil: 'Ginagamit para sa petsa, oras, pera, numero ng telepono, atbp.',
      examples: [
        { korean: '삼월 (3월)', english: 'March', filipino: 'Marso' },
        { korean: '삼시', english: 'three o\'clock', filipino: 'alas-tres' },
        { korean: '삼원', english: 'three won', filipino: 'tatlong won' }
      ]
    },
    {
      id: 4,
      number: '사',
      romanization: 'sa',
      english: 'four',
      filipino: 'apat',
      usage: '날짜, 시간, 금액, 번호 등에 사용',
      usageEn: 'Used for dates, time, money, phone numbers, etc.',
      usageFil: 'Ginagamit para sa petsa, oras, pera, numero ng telepono, atbp.',
      examples: [
        { korean: '사월 (4월)', english: 'April', filipino: 'Abril' },
        { korean: '사시', english: 'four o\'clock', filipino: 'alas-kuwatro' },
        { korean: '사원', english: 'four won', filipino: 'apat na won' }
      ]
    },
    {
      id: 5,
      number: '오',
      romanization: 'o',
      english: 'five',
      filipino: 'lima',
      usage: '날짜, 시간, 금액, 번호 등에 사용',
      usageEn: 'Used for dates, time, money, phone numbers, etc.',
      usageFil: 'Ginagamit para sa petsa, oras, pera, numero ng telepono, atbp.',
      examples: [
        { korean: '오월 (5월)', english: 'May', filipino: 'Mayo' },
        { korean: '오시', english: 'five o\'clock', filipino: 'alas-singko' },
        { korean: '오원', english: 'five won', filipino: 'limang won' }
      ]
    },
    {
      id: 6,
      number: '육',
      romanization: 'yuk',
      english: 'six',
      filipino: 'anim',
      usage: '날짜, 시간, 금액, 번호 등에 사용',
      usageEn: 'Used for dates, time, money, phone numbers, etc.',
      usageFil: 'Ginagamit para sa petsa, oras, pera, numero ng telepono, atbp.',
      examples: [
        { korean: '유월 (6월)', english: 'June', filipino: 'Hunyo' },
        { korean: '육시', english: 'six o\'clock', filipino: 'alas-sais' },
        { korean: '육원', english: 'six won', filipino: 'anim na won' }
      ]
    },
    {
      id: 7,
      number: '칠',
      romanization: 'chil',
      english: 'seven',
      filipino: 'pito',
      usage: '날짜, 시간, 금액, 번호 등에 사용',
      usageEn: 'Used for dates, time, money, phone numbers, etc.',
      usageFil: 'Ginagamit para sa petsa, oras, pera, numero ng telepono, atbp.',
      examples: [
        { korean: '칠월 (7월)', english: 'July', filipino: 'Hulyo' },
        { korean: '칠시', english: 'seven o\'clock', filipino: 'alas-siyete' },
        { korean: '칠원', english: 'seven won', filipino: 'pitong won' }
      ]
    },
    {
      id: 8,
      number: '팔',
      romanization: 'pal',
      english: 'eight',
      filipino: 'walo',
      usage: '날짜, 시간, 금액, 번호 등에 사용',
      usageEn: 'Used for dates, time, money, phone numbers, etc.',
      usageFil: 'Ginagamit para sa petsa, oras, pera, numero ng telepono, atbp.',
      examples: [
        { korean: '팔월 (8월)', english: 'August', filipino: 'Agosto' },
        { korean: '팔시', english: 'eight o\'clock', filipino: 'alas-otso' },
        { korean: '팔원', english: 'eight won', filipino: 'walong won' }
      ]
    },
    {
      id: 9,
      number: '구',
      romanization: 'gu',
      english: 'nine',
      filipino: 'siyam',
      usage: '날짜, 시간, 금액, 번호 등에 사용',
      usageEn: 'Used for dates, time, money, phone numbers, etc.',
      usageFil: 'Ginagamit para sa petsa, oras, pera, numero ng telepono, atbp.',
      examples: [
        { korean: '구월 (9월)', english: 'September', filipino: 'Setyembre' },
        { korean: '구시', english: 'nine o\'clock', filipino: 'alas-nuwebe' },
        { korean: '구원', english: 'nine won', filipino: 'siyam na won' }
      ]
    },
    {
      id: 10,
      number: '십',
      romanization: 'sip',
      english: 'ten',
      filipino: 'sampu',
      usage: '날짜, 시간, 금액, 번호 등에 사용',
      usageEn: 'Used for dates, time, money, phone numbers, etc.',
      usageFil: 'Ginagamit para sa petsa, oras, pera, numero ng telepono, atbp.',
      examples: [
        { korean: '십월 (10월)', english: 'October', filipino: 'Oktubre' },
        { korean: '십시', english: 'ten o\'clock', filipino: 'alas-diyes' },
        { korean: '십원', english: 'ten won', filipino: 'sampung won' }
      ]
    }
  ],
  largeNumbers: [
    {
      id: 1,
      korean: '십',
      romanization: 'sip',
      english: 'ten',
      filipino: 'sampu',
      value: 10
    },
    {
      id: 2,
      korean: '백',
      romanization: 'baek',
      english: 'hundred',
      filipino: 'daan',
      value: 100
    },
    {
      id: 3,
      korean: '천',
      romanization: 'cheon',
      english: 'thousand',
      filipino: 'libo',
      value: 1000
    },
    {
      id: 4,
      korean: '만',
      romanization: 'man',
      english: 'ten thousand',
      filipino: 'sampung libo',
      value: 10000
    },
    {
      id: 5,
      korean: '십만',
      romanization: 'sipman',
      english: 'hundred thousand',
      filipino: 'daang libo',
      value: 100000
    },
    {
      id: 6,
      korean: '백만',
      romanization: 'baengman',
      english: 'million',
      filipino: 'milyon',
      value: 1000000
    }
  ]
}

export default numbersData

