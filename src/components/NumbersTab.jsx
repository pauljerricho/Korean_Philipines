import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Volume2, Info } from 'lucide-react'

const NumbersTab = ({ numbersData }) => {
  const [activeCategory, setActiveCategory] = useState('pureKorean')
  const [currentNumberIndex, setCurrentNumberIndex] = useState(0)
  const [showUsage, setShowUsage] = useState(false)

  const currentNumbers = numbersData[activeCategory] || []
  const currentNumber = currentNumbers[currentNumberIndex]

  const playAudio = (text, lang = 'ko-KR') => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = lang
      utterance.rate = 0.7
      utterance.pitch = 1.1
      speechSynthesis.speak(utterance)
    }
  }

  const playAudioWithGoogleTTS = (text) => {
    const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ko&client=tw-ob&q=${encodeURIComponent(text)}`
    const audio = new Audio(audioUrl)
    audio.play().catch(() => {
      playAudio(text)
    })
  }

  const nextNumber = () => {
    if (currentNumbers.length === 0) return
    setCurrentNumberIndex((prev) => (prev + 1) % currentNumbers.length)
    setShowUsage(false)
  }

  const prevNumber = () => {
    if (currentNumbers.length === 0) return
    setCurrentNumberIndex((prev) => (prev - 1 + currentNumbers.length) % currentNumbers.length)
    setShowUsage(false)
  }

  const categories = [
    { 
      id: 'pureKorean', 
      label: '순수 한국어 숫자', 
      labelEn: 'Pure Korean Numbers',
      labelFil: 'Mga Numero ng Purong Koreano',
      icon: '🔢',
      description: '개수를 셀 때 사용하는 숫자'
    },
    { 
      id: 'sinoKorean', 
      label: '한자어 숫자', 
      labelEn: 'Sino-Korean Numbers',
      labelFil: 'Mga Numero ng Sino-Koreano',
      icon: '📅',
      description: '날짜, 시간, 금액 등에 사용하는 숫자'
    },
    { 
      id: 'largeNumbers', 
      label: '큰 숫자', 
      labelEn: 'Large Numbers',
      labelFil: 'Malalaking Numero',
      icon: '💯',
      description: '십, 백, 천, 만 등 큰 단위'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          한국어 숫자 강의 (Korean Numbers Lesson)
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          필리핀 사람을 위한 한국어 숫자 학습
        </p>
      </div>

      {/* Category Selection */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
          📚 카테고리 선택 (Category Selection)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id)
                setCurrentNumberIndex(0)
                setShowUsage(false)
              }}
              className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                activeCategory === category.id
                  ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-105'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              }`}
            >
              <div className="text-4xl mb-3 text-center">{category.icon}</div>
              <div className="font-bold text-lg text-gray-800 mb-1 text-center">
                {category.label}
              </div>
              <div className="text-sm text-gray-600 mb-1 text-center">
                {category.labelEn}
              </div>
              <div className="text-sm text-gray-500 text-center">
                {category.labelFil}
              </div>
              <div className="text-xs text-gray-400 mt-2 text-center">
                {category.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Number Card */}
      {currentNumber && (
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-3xl mx-auto">
          <div className="text-center space-y-6">
            {/* Korean Number */}
            <div className="text-6xl md:text-7xl font-bold text-blue-600 mb-4">
              {currentNumber.number || currentNumber.korean}
            </div>
            
            {/* Romanization */}
            <div className="text-2xl text-gray-600 italic">
              {currentNumber.romanization}
            </div>

            {/* Translations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-2xl">🇺🇸</span>
                  <span className="font-semibold text-blue-700">English:</span>
                </div>
                <div className="text-xl text-blue-800 font-semibold">
                  {currentNumber.english}
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-xl">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-2xl">🇵🇭</span>
                  <span className="font-semibold text-red-700">Filipino:</span>
                </div>
                <div className="text-xl text-red-800 font-semibold">
                  {currentNumber.filipino}
                </div>
              </div>
            </div>

            {/* Usage Information */}
            {currentNumber.usage && (
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Info size={20} className="text-yellow-700" />
                  <span className="font-semibold text-yellow-800">사용법 (Usage)</span>
                </div>
                <div className="text-gray-700 mb-2">
                  <span className="font-semibold">🇰🇷 한국어:</span> {currentNumber.usage}
                </div>
                <div className="text-gray-700 mb-2">
                  <span className="font-semibold">🇺🇸 English:</span> {currentNumber.usageEn}
                </div>
                <div className="text-gray-700">
                  <span className="font-semibold">🇵🇭 Filipino:</span> {currentNumber.usageFil}
                </div>
              </div>
            )}

            {/* Examples */}
            {currentNumber.examples && currentNumber.examples.length > 0 && (
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="font-semibold text-gray-800 mb-3 text-lg">
                  💡 예시 (Examples)
                </div>
                <div className="space-y-2">
                  {currentNumber.examples.map((example, index) => (
                    <div key={index} className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="font-semibold text-blue-600 mb-1">
                        {example.korean}
                      </div>
                      <div className="text-sm text-gray-600">
                        🇺🇸 {example.english} | 🇵🇭 {example.filipino}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Value for large numbers */}
            {currentNumber.value && (
              <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
                <div className="font-semibold text-purple-800 mb-2">값 (Value)</div>
                <div className="text-3xl font-bold text-purple-600">
                  {currentNumber.value.toLocaleString()}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => playAudioWithGoogleTTS(currentNumber.number || currentNumber.korean)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg hover:-translate-y-1 flex items-center justify-center space-x-2"
              >
                <Volume2 size={20} />
                <span>한국어 발음 (Korean Pronunciation)</span>
              </button>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-4">
              <button
                onClick={prevNumber}
                disabled={currentNumbers.length === 0}
                className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:from-gray-200 hover:to-gray-300 hover:shadow-md flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
                <span>Previous</span>
              </button>
              
              <div className="text-gray-600 font-semibold text-lg">
                {currentNumberIndex + 1} / {currentNumbers.length}
              </div>
              
              <button
                onClick={nextNumber}
                disabled={currentNumbers.length === 0}
                className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:from-gray-200 hover:to-gray-300 hover:shadow-md flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* All Numbers List */}
      {currentNumbers.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            📋 모든 숫자 목록 (All Numbers List)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {currentNumbers.map((number, index) => (
              <button
                key={number.id || index}
                onClick={() => {
                  setCurrentNumberIndex(index)
                  setShowUsage(false)
                }}
                className={`p-4 rounded-lg border-2 transition-all duration-300 text-center ${
                  index === currentNumberIndex
                    ? 'border-blue-500 bg-blue-50 shadow-lg'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }`}
              >
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {number.number || number.korean}
                </div>
                <div className="text-sm text-gray-600">
                  {number.english}
                </div>
                <div className="text-xs text-gray-500">
                  {number.filipino}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default NumbersTab


