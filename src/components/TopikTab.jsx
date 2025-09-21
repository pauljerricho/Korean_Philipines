import React, { useState } from 'react'
import { Clock, BookOpen, Headphones, CheckCircle, XCircle, RotateCcw, Play, Pause, Volume2 } from 'lucide-react'

const TopikTab = ({ topikData }) => {
  const [currentSection, setCurrentSection] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [isFullTest, setIsFullTest] = useState(false)
  const [allQuestions, setAllQuestions] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentAudio, setCurrentAudio] = useState(null)

  const startTest = (section) => {
    setCurrentSection(section)
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setTimeLeft(section.timeLimit * 60) // Convert minutes to seconds
    setIsTimerActive(true)
    setIsFullTest(false)
    setAllQuestions([])
  }

  const startFullTest = () => {
    // 모든 섹션의 문제를 하나의 배열로 합치기
    const allProblems = []
    topikData.level1.sections.forEach(section => {
      section.problems.forEach(problem => {
        allProblems.push({
          ...problem,
          sectionId: section.id,
          sectionTitle: section.title
        })
      })
    })
    
    setAllQuestions(allProblems)
    setCurrentSection({ 
      id: 'full', 
      title: 'TOPIK I 전체 시험', 
      problems: allProblems,
      timeLimit: topikData.level1.timeLimit
    })
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setTimeLeft(topikData.level1.timeLimit * 60)
    setIsTimerActive(true)
    setIsFullTest(true)
  }

  const playAudio = (audioText) => {
    if (isPlaying && currentAudio) {
      currentAudio.pause()
      setIsPlaying(false)
      setCurrentAudio(null)
      return
    }

    // Web Speech API를 사용한 음성 합성
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(audioText)
      utterance.lang = 'ko-KR'
      utterance.rate = 0.8
      utterance.pitch = 1
      
      utterance.onstart = () => {
        setIsPlaying(true)
        setCurrentAudio(utterance)
      }
      
      utterance.onend = () => {
        setIsPlaying(false)
        setCurrentAudio(null)
      }
      
      utterance.onerror = () => {
        setIsPlaying(false)
        setCurrentAudio(null)
      }
      
      speechSynthesis.speak(utterance)
    } else {
      alert('이 브라우저는 음성 합성을 지원하지 않습니다.')
    }
  }

  const selectAnswer = (questionId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const nextQuestion = () => {
    if (currentSection && currentQuestion < currentSection.problems.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const finishTest = () => {
    setIsTimerActive(false)
    setShowResults(true)
  }

  const resetTest = () => {
    setCurrentSection(null)
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setTimeLeft(0)
    setIsTimerActive(false)
    setIsFullTest(false)
    setAllQuestions([])
    setIsPlaying(false)
    if (currentAudio) {
      speechSynthesis.cancel()
      setCurrentAudio(null)
    }
  }

  // Timer effect
  React.useEffect(() => {
    let interval = null
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsTimerActive(false)
      finishTest()
    }
    return () => clearInterval(interval)
  }, [isTimerActive, timeLeft])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const calculateScore = () => {
    if (!currentSection || !currentSection.problems) return { correct: 0, total: 0, percentage: 0 }
    
    let correct = 0
    currentSection.problems.forEach(problem => {
      if (answers[problem.id] === problem.correct) {
        correct++
      }
    })
    
    const total = currentSection.problems.length
    const percentage = Math.round((correct / total) * 100)
    
    return { correct, total, percentage }
  }

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600'
    if (percentage >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreMessage = (percentage) => {
    if (percentage >= 80) return '훌륭합니다! TOPIK 1급 합격 가능성이 높습니다! 🎉'
    if (percentage >= 60) return '좋습니다! 조금 더 공부하면 합격할 수 있습니다! 💪'
    return '더 열심히 공부해보세요! 화이팅! 🔥'
  }

  if (showResults) {
    const score = calculateScore()
    return (
      <div className="space-y-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">TOPIK I 시험 결과</h2>
          
          <div className="mb-8">
            <div className={`text-6xl font-bold mb-4 ${getScoreColor(score.percentage)}`}>
              {score.percentage}%
            </div>
            <div className="text-2xl text-gray-700 mb-2">
              {score.correct} / {score.total} 문제 정답
            </div>
            <div className="text-lg text-gray-600">
              {getScoreMessage(score.percentage)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {currentSection?.problems?.map((problem, index) => {
              const userAnswer = answers[problem.id]
              const isCorrect = userAnswer === problem.correct
              
              return (
                <div key={problem.id} className={`p-4 rounded-lg border-2 ${
                  isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">문제 {index + 1}</span>
                    {isCorrect ? (
                      <CheckCircle className="text-green-600" size={20} />
                    ) : (
                      <XCircle className="text-red-600" size={20} />
                    )}
                  </div>
                  <div className="text-sm text-gray-700 mb-2">
                    {problem.question}
                  </div>
                  <div className="text-sm">
                    <div className="mb-1">
                      <span className="font-medium">정답: </span>
                      <span className="text-green-600">{problem.options[problem.correct]}</span>
                    </div>
                    {!isCorrect && userAnswer !== undefined && (
                      <div className="mb-1">
                        <span className="font-medium">내 답: </span>
                        <span className="text-red-600">{problem.options[userAnswer]}</span>
                      </div>
                    )}
                    <div className="space-y-3">
                      {problem.explanation && (
                        <div className="p-3 bg-blue-50 rounded-lg text-sm text-gray-700">
                          <span className="font-semibold text-blue-800">🇰🇷 한국어 설명:</span><br/>
                          {problem.explanation}
                        </div>
                      )}
                      {problem.explanationEn && (
                        <div className="p-3 bg-green-50 rounded-lg text-sm text-gray-700">
                          <span className="font-semibold text-green-800">🇺🇸 English Explanation:</span><br/>
                          {problem.explanationEn}
                        </div>
                      )}
                      {problem.explanationFil && (
                        <div className="p-3 bg-yellow-50 rounded-lg text-sm text-gray-700">
                          <span className="font-semibold text-yellow-800">🇵🇭 Filipino Explanation:</span><br/>
                          {problem.explanationFil}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <button
            onClick={resetTest}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center mx-auto"
          >
            <RotateCcw className="mr-2" size={20} />
            다시 시험보기
          </button>
        </div>
      </div>
    )
  }

  if (currentSection && currentSection.problems) {
    const problem = currentSection.problems[currentQuestion]
    const progress = ((currentQuestion + 1) / currentSection.problems.length) * 100

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">{currentSection.title}</h2>
            <div className="flex items-center text-red-600 font-bold text-lg">
              <Clock className="mr-2" size={20} />
              {formatTime(timeLeft)}
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="text-center text-gray-600">
            문제 {currentQuestion + 1} / {currentSection.problems.length}
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-6">
            {/* Section Info for Full Test */}
            {isFullTest && problem.sectionTitle && (
              <div className="mb-4 p-3 bg-blue-100 rounded-lg">
                <span className="text-sm font-medium text-blue-800">
                  {problem.sectionTitle}
                </span>
              </div>
            )}
            
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{problem.question}</h3>
            
            {/* Audio Button for Listening Section */}
            {problem.audioText && (
              <div className="mb-4 flex items-center space-x-4">
                <button
                  onClick={() => playAudio(problem.audioText)}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  <Volume2 size={20} />
                  <span>{isPlaying ? '듣기 중지' : '듣기'}</span>
                </button>
                <span className="text-sm text-gray-600">음성을 듣고 답하세요</span>
              </div>
            )}
            
            <div className="text-lg text-gray-700 mb-6 p-4 bg-gray-50 rounded-lg">
              {problem.text}
            </div>
            {problem.questionText && (
              <div className="text-lg font-medium text-blue-800 mb-4 p-3 bg-blue-50 rounded-lg">
                {problem.questionText}
              </div>
            )}
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {problem.options.map((option, index) => (
              <button
                key={index}
                onClick={() => selectAnswer(problem.id, index)}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                  answers[problem.id] === index
                    ? 'border-blue-500 bg-blue-50 text-blue-800'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                {option}
              </button>
            ))}
          </div>

          {/* Navigation */}
          {/* Explanation Section */}
          {problem.explanation && (
            <div className="mt-6 space-y-3">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">📚 해설 (Explanation)</h4>
              {problem.explanation && (
                <div className="p-3 bg-blue-50 rounded-lg text-sm text-gray-700">
                  <span className="font-semibold text-blue-800">🇰🇷 한국어:</span><br/>
                  {problem.explanation}
                </div>
              )}
              {problem.explanationEn && (
                <div className="p-3 bg-green-50 rounded-lg text-sm text-gray-700">
                  <span className="font-semibold text-green-800">🇺🇸 English:</span><br/>
                  {problem.explanationEn}
                </div>
              )}
              {problem.explanationFil && (
                <div className="p-3 bg-yellow-50 rounded-lg text-sm text-gray-700">
                  <span className="font-semibold text-yellow-800">🇵🇭 Filipino:</span><br/>
                  {problem.explanationFil}
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between">
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className="px-6 py-3 bg-gray-500 text-white rounded-xl font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors duration-300"
            >
              이전 문제
            </button>
            
            <div className="flex space-x-4">
              {currentQuestion === (currentSection?.problems?.length || 0) - 1 ? (
                <button
                  onClick={finishTest}
                  className="px-8 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors duration-300"
                >
                  시험 완료
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300"
                >
                  다음 문제
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">TOPIK I 시험</h2>
        <p className="text-xl text-gray-600 mb-8">한국어능력시험 초급 레벨 문제를 풀어보세요!</p>
      </div>

      {/* Test Info */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl shadow-lg p-8">
        <h3 className="text-2xl font-bold mb-4">시험 정보</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">{topikData.level1.totalQuestions}</div>
            <div className="text-lg">총 문제 수</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">{topikData.level1.timeLimit}분</div>
            <div className="text-lg">시험 시간</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">1-2급</div>
            <div className="text-lg">난이도</div>
          </div>
        </div>
        
        {/* Full Test Button */}
        <div className="text-center">
          <button
            onClick={startFullTest}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors duration-300 shadow-lg"
          >
            🎯 전체 시험 보기 (70문제, 100분)
          </button>
          <p className="text-sm mt-2 opacity-90">모든 섹션을 한번에 풀어보세요!</p>
        </div>
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topikData.level1.sections.map((section) => (
          <div key={section.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {section.id === 'vocabulary' && <BookOpen className="text-blue-600" size={32} />}
                {section.id === 'reading' && <BookOpen className="text-green-600" size={32} />}
                {section.id === 'listening' && <Headphones className="text-purple-600" size={32} />}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{section.title}</h3>
              <p className="text-gray-600 mb-2">{section.questions}문제 • {section.timeLimit}분</p>
              {section.id === 'listening' && (
                <p className="text-sm text-purple-600 font-medium">🎧 듣기 기능 포함</p>
              )}
            </div>
            
            <button
              onClick={() => startTest(section)}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300"
            >
              시험 시작
            </button>
          </div>
        ))}
      </div>

      {/* Study Tips */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-yellow-800 mb-4">📚 TOPIK I 공부 팁</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-yellow-700">
          <div>
            <h4 className="font-semibold mb-2">어휘 및 문법:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>기본 조사 (이/가, 을/를, 에/에서) 익히기</li>
              <li>일상 단어 1000개 암기</li>
              <li>기본 문형 패턴 연습</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">읽기 & 듣기:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>짧은 문장부터 읽기 연습</li>
              <li>한국 드라마나 노래로 듣기 연습</li>
              <li>실제 시험 문제 많이 풀기</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopikTab
