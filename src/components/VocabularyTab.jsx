import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Volume2 } from 'lucide-react'

const VocabularyTab = ({ vocabularyData, getCategoryIcon, getCategoryName }) => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  const currentWords = selectedCategory ? vocabularyData[selectedCategory] : []
  const currentWord = currentWords[currentWordIndex]

  const playAudio = (text, lang = 'ko-KR') => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = lang
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  const nextWord = () => {
    if (currentWords.length === 0) return
    setCurrentWordIndex((prev) => (prev + 1) % currentWords.length)
  }

  const prevWord = () => {
    if (currentWords.length === 0) return
    setCurrentWordIndex((prev) => (prev - 1 + currentWords.length) % currentWords.length)
  }

  return (
    <div className="space-y-8">
      {/* Category Selection */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Select Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.keys(vocabularyData).map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category)
                setCurrentWordIndex(0)
              }}
              className={`p-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-blue-100 hover:to-blue-200 hover:text-blue-700'
              }`}
            >
              <span className="text-2xl">{getCategoryIcon(category)}</span>
              <span>{getCategoryName(category)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Word Card */}
      {selectedCategory && currentWord && (
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
          <div className="text-center space-y-6">
            {/* Korean Word */}
            <div className="text-5xl md:text-6xl font-bold text-gray-800">
              {currentWord.korean}
            </div>
            
            {/* Romanization */}
            <div className="text-xl text-gray-600 italic">
              {currentWord.romanization}
            </div>

            {/* Translations */}
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-2xl">🇺🇸</span>
                  <span className="font-semibold text-blue-700">English:</span>
                </div>
                <div className="text-lg text-blue-800">{currentWord.english}</div>
              </div>
              
              <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-xl">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-2xl">🇵🇭</span>
                  <span className="font-semibold text-red-700">Filipino:</span>
                </div>
                <div className="text-lg text-red-800">{currentWord.filipino}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => playAudio(currentWord.korean, 'ko-KR')}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg hover:-translate-y-1 flex items-center space-x-2"
              >
                <Volume2 size={20} />
                <span>Korean</span>
              </button>
              
              <button
                onClick={() => playAudio(currentWord.filipino, 'fil-PH')}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:from-red-600 hover:to-red-700 hover:shadow-lg hover:-translate-y-1 flex items-center space-x-2"
              >
                <Volume2 size={20} />
                <span>Filipino</span>
              </button>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-4">
              <button
                onClick={prevWord}
                disabled={currentWords.length === 0}
                className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:from-gray-200 hover:to-gray-300 hover:shadow-md flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
                <span>Previous</span>
              </button>
              
              <div className="text-gray-600 font-semibold">
                {currentWordIndex + 1} / {currentWords.length}
              </div>
              
              <button
                onClick={nextWord}
                disabled={currentWords.length === 0}
                className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:from-gray-200 hover:to-gray-300 hover:shadow-md flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* No Category Selected */}
      {!selectedCategory && (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">Select a Category</h3>
          <p className="text-gray-500">Please select a category above to start learning!</p>
        </div>
      )}
    </div>
  )
}

export default VocabularyTab