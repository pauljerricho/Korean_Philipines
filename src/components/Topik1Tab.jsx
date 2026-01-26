import React, { useState } from 'react'
import { BookOpen, CheckCircle, XCircle, ChevronLeft, ChevronRight, Volume2, Lightbulb, Info } from 'lucide-react'

const Topik1Tab = ({ topik1Data }) => {
  const [activeCategory, setActiveCategory] = useState(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [userAnswers, setUserAnswers] = useState({})

  const categories = [
    {
      id: 'vocabulary',
      label: '어휘 (Vocabulary)',
      labelEn: 'Vocabulary',
      labelFil: 'Bokabularyo',
      icon: '📚',
      description: '단어의 의미와 사용법'
    },
    {
      id: 'grammar',
      label: '문법 (Grammar)',
      labelEn: 'Grammar',
      labelFil: 'Balarila',
      icon: '📖',
      description: '문법 규칙과 조사'
    },
    {
      id: 'reading',
      label: '읽기 (Reading)',
      labelEn: 'Reading',
      labelFil: 'Pagbasa',
      icon: '📄',
      description: '지문 읽기와 이해'
    },
    {
      id: 'listening',
      label: '듣기 (Listening)',
      labelEn: 'Listening',
      labelFil: 'Pakikinig',
      icon: '🎧',
      description: '듣기 이해 문제'
    },
    {
      id: 'actualExam37',
      label: '제37회 기출문제',
      labelEn: 'Actual Exam #37',
      labelFil: 'Aktwal na Pagsusulit #37',
      icon: '🏆',
      description: '실제 TOPIK I 기출문제'
    }
  ]

  const getCurrentQuestions = () => {
    if (!activeCategory) return []
    if (activeCategory === 'actualExam37') {
      // 실제 기출문제는 listening과 reading을 합쳐서 표시
      const listening = topik1Data.actualExam37?.listening || []
      const reading = topik1Data.actualExam37?.reading || []
      return [...listening, ...reading]
    }
    return topik1Data[activeCategory] || []
  }

  const currentQuestions = getCurrentQuestions()
  const currentQuestion = currentQuestions[currentQuestionIndex]

  const playAudio = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'ko-KR'
      utterance.rate = 0.7
      utterance.pitch = 1.1
      speechSynthesis.speak(utterance)
    }
  }

  const handleAnswerSelect = (index) => {
    if (showExplanation) return
    setSelectedAnswer(index)
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: index
    }))
  }

  const checkAnswer = () => {
    if (selectedAnswer === null) return
    setShowExplanation(true)
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedAnswer(userAnswers[currentQuestionIndex + 1] || null)
      setShowExplanation(false)
    }
  }

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
      setSelectedAnswer(userAnswers[currentQuestionIndex - 1] || null)
      setShowExplanation(false)
    }
  }

  const resetCategory = () => {
    setActiveCategory(null)
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setUserAnswers({})
  }

  const isCorrect = selectedAnswer === currentQuestion?.correct

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          TOPIK 1급 문제 (TOPIK Level 1 Questions)
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          상세한 영어와 필리핀어 해설이 포함된 TOPIK 1급 문제를 풀어보세요!
        </p>
      </div>

      {!activeCategory && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
            📚 문제 유형 선택 (Select Question Type)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id)
                  setCurrentQuestionIndex(0)
                  setSelectedAnswer(userAnswers[0] || null)
                }}
                className="p-6 rounded-xl border-2 border-blue-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 text-left"
              >
                <div className="text-4xl mb-3 text-center">{category.icon}</div>
                <div className="font-bold text-lg text-gray-800 mb-2 text-center">
                  {category.label}
                </div>
                <div className="text-sm text-gray-600 mb-1 text-center">
                  {category.labelEn}
                </div>
                <div className="text-sm text-gray-500 mb-2 text-center">
                  {category.labelFil}
                </div>
                <div className="text-xs text-gray-400 text-center">
                  {category.description}
                </div>
                <div className="text-xs text-blue-600 mt-2 text-center">
                  {category.id === 'actualExam37' 
                    ? `${(topik1Data.actualExam37?.listening?.length || 0) + (topik1Data.actualExam37?.reading?.length || 0)} 문제`
                    : `${topik1Data[category.id]?.length || 0} 문제`}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {activeCategory && currentQuestion && (
        <>
          {/* Category Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl shadow-lg p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-2xl">{categories.find(c => c.id === activeCategory)?.icon}</span>
              <h3 className="text-xl font-bold">
                {categories.find(c => c.id === activeCategory)?.label}
              </h3>
            </div>
            <div className="text-sm opacity-90">
              문제 {currentQuestionIndex + 1} / {currentQuestions.length}
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            {/* Reading Passage (for reading type) */}
            {currentQuestion.type === 'reading' && currentQuestion.passage && (
              <div className="bg-blue-50 rounded-xl p-6 mb-6 border-2 border-blue-200">
                <div className="flex items-center space-x-2 mb-4">
                  <BookOpen size={20} className="text-blue-600" />
                  <h4 className="font-bold text-blue-800">지문 (Passage)</h4>
                </div>
                <div className="text-2xl font-semibold text-gray-800 mb-4 leading-relaxed">
                  {currentQuestion.passage}
                </div>
                <div className="border-t border-blue-200 pt-4 space-y-2 text-sm">
                  <div className="text-gray-600">
                    <span className="font-semibold">🇺🇸 English:</span> {currentQuestion.passageEn}
                  </div>
                  <div className="text-gray-600">
                    <span className="font-semibold">🇵🇭 Filipino:</span> {currentQuestion.passageFil}
                  </div>
                </div>
              </div>
            )}

            {/* Listening Text (for listening type) */}
            {currentQuestion.type === 'listening' && currentQuestion.audioText && (
              <div className="bg-green-50 rounded-xl p-6 mb-6 border-2 border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Volume2 size={20} className="text-green-600" />
                    <h4 className="font-bold text-green-800">듣기 내용 (Listening Text)</h4>
                  </div>
                  <button
                    onClick={() => playAudio(currentQuestion.audioText)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                  >
                    🔊 재생
                  </button>
                </div>
                <div className="text-2xl font-semibold text-gray-800 mb-4">
                  {currentQuestion.audioText}
                </div>
                <div className="border-t border-green-200 pt-4 space-y-2 text-sm">
                  <div className="text-gray-600">
                    <span className="font-semibold">🇺🇸 English:</span> {currentQuestion.audioTextEn}
                  </div>
                  <div className="text-gray-600">
                    <span className="font-semibold">🇵🇭 Filipino:</span> {currentQuestion.audioTextFil}
                  </div>
                </div>
              </div>
            )}

            {/* Question */}
            <div className="mb-6">
              <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                {currentQuestion.question}
              </div>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div>
                  <span className="font-semibold">🇺🇸 English:</span> {currentQuestion.questionEn}
                </div>
                <div>
                  <span className="font-semibold">🇵🇭 Filipino:</span> {currentQuestion.questionFil}
                </div>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index
                const isCorrectAnswer = index === currentQuestion.correct
                const showResult = showExplanation

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showExplanation}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                      showResult && isCorrectAnswer
                        ? 'border-green-500 bg-green-50'
                        : showResult && isSelected && !isCorrectAnswer
                        ? 'border-red-500 bg-red-50'
                        : isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    } ${showExplanation ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-semibold text-lg text-gray-800 mb-1">
                          {String.fromCharCode(65 + index)}. {option.text}
                        </div>
                        <div className="text-sm text-gray-600">
                          {option.korean}
                        </div>
                      </div>
                      {showResult && isCorrectAnswer && (
                        <CheckCircle size={24} className="text-green-500 flex-shrink-0 ml-4" />
                      )}
                      {showResult && isSelected && !isCorrectAnswer && (
                        <XCircle size={24} className="text-red-500 flex-shrink-0 ml-4" />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Check Answer Button */}
            {!showExplanation && selectedAnswer !== null && (
              <div className="text-center mb-6">
                <button
                  onClick={checkAnswer}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  답 확인하기
                </button>
              </div>
            )}

            {/* Explanation */}
            {showExplanation && (
              <div className="space-y-4">
                <div className={`p-6 rounded-xl border-2 ${
                  isCorrect
                    ? 'bg-green-50 border-green-500'
                    : 'bg-red-50 border-red-500'
                }`}>
                  <div className="flex items-center space-x-2 mb-4">
                    {isCorrect ? (
                      <>
                        <CheckCircle size={24} className="text-green-600" />
                        <span className="text-xl font-bold text-green-700">정답입니다! 🎉</span>
                      </>
                    ) : (
                      <>
                        <XCircle size={24} className="text-red-600" />
                        <span className="text-xl font-bold text-red-700">틀렸습니다</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                  <div className="flex items-center space-x-2 mb-4">
                    <Lightbulb size={20} className="text-blue-600" />
                    <h4 className="font-bold text-blue-800 text-lg">상세 해설 (Detailed Explanation)</h4>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="font-semibold text-gray-800 mb-2">🇰🇷 한국어:</div>
                      <div className="text-gray-700 leading-relaxed">{currentQuestion.explanation}</div>
                    </div>
                    
                    <div className="border-t border-blue-200 pt-4">
                      <div className="font-semibold text-gray-800 mb-2">🇺🇸 English:</div>
                      <div className="text-gray-700 leading-relaxed">{currentQuestion.explanationEn}</div>
                    </div>
                    
                    <div className="border-t border-blue-200 pt-4">
                      <div className="font-semibold text-gray-800 mb-2">🇵🇭 Filipino:</div>
                      <div className="text-gray-700 leading-relaxed">{currentQuestion.explanationFil}</div>
                    </div>
                  </div>
                </div>

                {currentQuestion.relatedGrammar && (
                  <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
                    <div className="flex items-center space-x-2 mb-4">
                      <Info size={20} className="text-yellow-600" />
                      <h4 className="font-bold text-yellow-800">관련 문법 (Related Grammar)</h4>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="font-semibold text-gray-800 mb-1">🇰🇷 한국어:</div>
                        <div className="text-gray-700">{currentQuestion.relatedGrammar}</div>
                      </div>
                      
                      <div className="border-t border-yellow-200 pt-3">
                        <div className="font-semibold text-gray-800 mb-1">🇺🇸 English:</div>
                        <div className="text-gray-700">{currentQuestion.relatedGrammarEn}</div>
                      </div>
                      
                      <div className="border-t border-yellow-200 pt-3">
                        <div className="font-semibold text-gray-800 mb-1">🇵🇭 Filipino:</div>
                        <div className="text-gray-700">{currentQuestion.relatedGrammarFil}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={prevQuestion}
                disabled={currentQuestionIndex === 0}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
              >
                <ChevronLeft size={20} />
                <span>이전</span>
              </button>

              <button
                onClick={resetCategory}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500 transition-colors"
              >
                카테고리 선택
              </button>

              <button
                onClick={nextQuestion}
                disabled={currentQuestionIndex === currentQuestions.length - 1}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
              >
                <span>다음</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Topik1Tab

