import React, { useState, useEffect } from 'react'
import { CheckCircle, XCircle, RotateCcw, Play, Trophy, BookOpen } from 'lucide-react'

const ReviewTestTab = ({ vocabularyData, getCategoryIcon, getCategoryName }) => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [testMode, setTestMode] = useState(null) // 'korean-to-english', 'korean-to-filipino', 'english-to-korean', 'filipino-to-korean'
  const [testStarted, setTestStarted] = useState(false)
  const [testWords, setTestWords] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(null)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [testFinished, setTestFinished] = useState(false)
  const [questionType, setQuestionType] = useState('multiple') // 'multiple' or 'typing'

  const testModes = [
    {
      id: 'korean-to-english',
      label: '한국어 → 영어',
      labelEn: 'Korean → English',
      labelFil: 'Koreano → Ingles',
      description: '한국어 단어를 보고 영어로 번역하기'
    },
    {
      id: 'korean-to-filipino',
      label: '한국어 → 필리핀어',
      labelEn: 'Korean → Filipino',
      labelFil: 'Koreano → Filipino',
      description: '한국어 단어를 보고 필리핀어로 번역하기'
    },
    {
      id: 'english-to-korean',
      label: '영어 → 한국어',
      labelEn: 'English → Korean',
      labelFil: 'Ingles → Koreano',
      description: '영어 단어를 보고 한국어로 번역하기'
    },
    {
      id: 'filipino-to-korean',
      label: '필리핀어 → 한국어',
      labelEn: 'Filipino → Korean',
      labelFil: 'Filipino → Koreano',
      description: '필리핀어 단어를 보고 한국어로 번역하기'
    }
  ]

  // 모든 단어를 하나의 배열로 합치기
  const getAllWords = () => {
    if (!selectedCategory) return []
    return vocabularyData[selectedCategory] || []
  }

  // 테스트 시작
  const startTest = (mode, type = 'multiple') => {
    const words = getAllWords()
    if (words.length === 0) return

    // 랜덤하게 10개 선택 (또는 전체 단어 수가 10개 미만이면 전체)
    const shuffled = [...words].sort(() => Math.random() - 0.5)
    const selectedWords = shuffled.slice(0, Math.min(10, words.length))

    setTestWords(selectedWords)
    setTestMode(mode)
    setQuestionType(type)
    setTestStarted(true)
    setCurrentQuestionIndex(0)
    setUserAnswer('')
    setSelectedOption(null)
    setShowResult(false)
    setIsCorrect(null)
    setScore({ correct: 0, total: 0 })
    setTestFinished(false)
  }

  // 현재 문제 가져오기
  const getCurrentQuestion = () => {
    if (!testStarted || testWords.length === 0) return null
    const word = testWords[currentQuestionIndex]
    
    if (testMode === 'korean-to-english') {
      return {
        question: word.korean,
        correctAnswer: word.english,
        options: generateOptions(word.english, 'english'),
        type: 'korean-to-english'
      }
    } else if (testMode === 'korean-to-filipino') {
      return {
        question: word.korean,
        correctAnswer: word.filipino,
        options: generateOptions(word.filipino, 'filipino'),
        type: 'korean-to-filipino'
      }
    } else if (testMode === 'english-to-korean') {
      return {
        question: word.english,
        correctAnswer: word.korean,
        options: generateOptions(word.korean, 'korean'),
        type: 'english-to-korean'
      }
    } else if (testMode === 'filipino-to-korean') {
      return {
        question: word.filipino,
        correctAnswer: word.korean,
        options: generateOptions(word.korean, 'korean'),
        type: 'filipino-to-korean'
      }
    }
    return null
  }

  // 객관식 옵션 생성
  const generateOptions = (correctAnswer, answerType) => {
    const allWords = getAllWords()
    const otherAnswers = allWords
      .filter(w => {
        if (answerType === 'english') return w.english !== correctAnswer
        if (answerType === 'filipino') return w.filipino !== correctAnswer
        if (answerType === 'korean') return w.korean !== correctAnswer
        return true
      })
      .map(w => {
        if (answerType === 'english') return w.english
        if (answerType === 'filipino') return w.filipino
        if (answerType === 'korean') return w.korean
        return ''
      })
      .filter((v, i, a) => a.indexOf(v) === i) // 중복 제거
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)

    const options = [correctAnswer, ...otherAnswers]
    return options.sort(() => Math.random() - 0.5)
  }

  // 답변 제출
  const submitAnswer = () => {
    const question = getCurrentQuestion()
    if (!question) return

    let correct = false
    if (questionType === 'multiple') {
      correct = selectedOption === question.correctAnswer
    } else {
      // 주관식: 대소문자 무시하고 공백 제거 후 비교
      const userAns = userAnswer.trim().toLowerCase()
      const correctAns = question.correctAnswer.trim().toLowerCase()
      correct = userAns === correctAns
    }

    setIsCorrect(correct)
    setShowResult(true)
    setScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1
    }))
  }

  // 다음 문제로
  const nextQuestion = () => {
    if (currentQuestionIndex < testWords.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setUserAnswer('')
      setSelectedOption(null)
      setShowResult(false)
      setIsCorrect(null)
    } else {
      // 테스트 완료
      setTestFinished(true)
    }
  }

  // 테스트 재시작
  const restartTest = () => {
    setTestStarted(false)
    setTestMode(null)
    setTestWords([])
    setCurrentQuestionIndex(0)
    setUserAnswer('')
    setSelectedOption(null)
    setShowResult(false)
    setIsCorrect(null)
    setScore({ correct: 0, total: 0 })
    setTestFinished(false)
  }

  const currentQuestion = getCurrentQuestion()
  const allWords = getAllWords()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          단어 복습 테스트 (Vocabulary Review Test)
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          배운 단어를 복습하고 실력을 확인해보세요!
        </p>
      </div>

      {!testStarted && !testFinished && (
        <>
          {/* Category Selection */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              📚 카테고리 선택 (Select Category)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {Object.keys(vocabularyData).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`p-4 rounded-xl font-semibold transition-all duration-300 flex flex-col items-center justify-center space-y-2 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105'
                      : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-blue-100 hover:to-blue-200 hover:text-blue-700'
                  }`}
                >
                  <span className="text-2xl">{getCategoryIcon(category)}</span>
                  <span className="text-sm text-center">{getCategoryName(category)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Test Mode Selection */}
          {selectedCategory && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                🎯 테스트 모드 선택 (Select Test Mode)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {testModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => startTest(mode.id, 'multiple')}
                    className="p-6 rounded-xl border-2 border-blue-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 text-left"
                  >
                    <div className="font-bold text-lg text-gray-800 mb-2">
                      {mode.label}
                    </div>
                    <div className="text-sm text-gray-600 mb-1">
                      {mode.labelEn}
                    </div>
                    <div className="text-sm text-gray-500 mb-2">
                      {mode.labelFil}
                    </div>
                    <div className="text-xs text-gray-400">
                      {mode.description}
                    </div>
                    <div className="mt-3 text-xs text-blue-600">
                      객관식 (Multiple Choice)
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Typing Test Option */}
              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                  ⌨️ 주관식 테스트 (Typing Test)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {testModes.map((mode) => (
                    <button
                      key={`${mode.id}-typing`}
                      onClick={() => startTest(mode.id, 'typing')}
                      className="p-4 rounded-xl border-2 border-green-200 hover:border-green-500 hover:bg-green-50 transition-all duration-300"
                    >
                      <div className="font-semibold text-gray-800">
                        {mode.label} (주관식)
                      </div>
                      <div className="text-xs text-green-600 mt-1">
                        직접 입력하기
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!selectedCategory && (
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">
                카테고리를 선택하세요
              </h3>
              <p className="text-gray-500">테스트할 단어 카테고리를 선택해주세요.</p>
            </div>
          )}
        </>
      )}

      {/* Test in Progress */}
      {testStarted && !testFinished && currentQuestion && (
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-3xl mx-auto">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-600">
                문제 {currentQuestionIndex + 1} / {testWords.length}
              </span>
              <span className="text-sm font-semibold text-blue-600">
                점수: {score.correct} / {score.total}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / testWords.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="text-center mb-8">
            <div className="text-5xl md:text-6xl font-bold text-blue-600 mb-4">
              {currentQuestion.question}
            </div>
            {testMode && (testMode.includes('korean-to-english') || testMode.includes('korean-to-filipino')) && (
              <div className="text-xl text-gray-500 italic">
                {testWords[currentQuestionIndex]?.romanization}
              </div>
            )}
          </div>

          {/* Answer Options */}
          {!showResult && (
            <div className="space-y-4">
              {questionType === 'multiple' ? (
                <div className="grid grid-cols-1 gap-3">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedOption(option)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                        selectedOption === option
                          ? 'border-blue-500 bg-blue-50 font-semibold'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && submitAnswer()}
                    placeholder="답을 입력하세요..."
                    className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                    autoFocus
                  />
                </div>
              )}

              <button
                onClick={submitAnswer}
                disabled={questionType === 'multiple' ? !selectedOption : !userAnswer.trim()}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                답변 제출
              </button>
            </div>
          )}

          {/* Result */}
          {showResult && (
            <div className="space-y-4">
              <div className={`p-6 rounded-xl text-center ${
                isCorrect ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'
              }`}>
                {isCorrect ? (
                  <div>
                    <CheckCircle size={48} className="mx-auto text-green-500 mb-2" />
                    <div className="text-2xl font-bold text-green-700 mb-2">정답입니다! 🎉</div>
                  </div>
                ) : (
                  <div>
                    <XCircle size={48} className="mx-auto text-red-500 mb-2" />
                    <div className="text-2xl font-bold text-red-700 mb-2">틀렸습니다</div>
                  </div>
                )}
                <div className="text-lg text-gray-700 mt-4">
                  <div className="font-semibold">정답: {currentQuestion.correctAnswer}</div>
                  {!isCorrect && questionType === 'typing' && (
                    <div className="text-sm text-gray-500 mt-2">
                      입력하신 답: {userAnswer}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={nextQuestion}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                {currentQuestionIndex < testWords.length - 1 ? '다음 문제' : '결과 보기'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Test Finished */}
      {testFinished && (
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto text-center">
          <Trophy size={64} className="mx-auto text-yellow-500 mb-4" />
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            테스트 완료! (Test Completed!)
          </h3>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {score.correct} / {score.total}
            </div>
            <div className="text-2xl font-semibold text-gray-700 mb-2">
              {Math.round((score.correct / score.total) * 100)}점
            </div>
            <div className="text-lg text-gray-600">
              {score.correct === score.total ? '완벽합니다! 🌟' :
               score.correct / score.total >= 0.8 ? '잘하셨습니다! 👍' :
               score.correct / score.total >= 0.6 ? '좋습니다! 더 연습해보세요. 💪' :
               '조금 더 공부가 필요합니다. 화이팅! 📚'}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={restartTest}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <RotateCcw size={20} />
              <span>다시 테스트하기</span>
            </button>
            <button
              onClick={() => {
                setSelectedCategory(null)
                restartTest()
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              다른 카테고리 선택
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReviewTestTab

