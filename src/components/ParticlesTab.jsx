import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Volume2, BookOpen, Lightbulb, ArrowRight } from 'lucide-react'

const ParticlesTab = ({ particlesData }) => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [currentParticleIndex, setCurrentParticleIndex] = useState(0)
  const [showExamples, setShowExamples] = useState(false)

  const currentParticles = selectedCategory ? particlesData[selectedCategory].particles : []
  const currentParticle = currentParticles[currentParticleIndex]

  const playAudio = (text, lang = 'ko-KR') => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = lang
      utterance.rate = 0.7
      speechSynthesis.speak(utterance)
    }
  }

  const nextParticle = () => {
    if (currentParticles.length === 0) return
    setCurrentParticleIndex((prev) => (prev + 1) % currentParticles.length)
    setShowExamples(false)
  }

  const prevParticle = () => {
    if (currentParticles.length === 0) return
    setCurrentParticleIndex((prev) => (prev - 1 + currentParticles.length) % currentParticles.length)
    setShowExamples(false)
  }

  const getCategoryIcon = (category) => {
    const icons = {
      basic: '🔤',
      location: '📍',
      direction: '🧭',
      advanced: '⭐'
    }
    return icons[category] || '📚'
  }

  const getCategoryColor = (category) => {
    const colors = {
      basic: 'from-blue-500 to-blue-600',
      location: 'from-green-500 to-green-600',
      direction: 'from-purple-500 to-purple-600',
      advanced: 'from-orange-500 to-orange-600'
    }
    return colors[category] || 'from-gray-500 to-gray-600'
  }

  return (
    <div className="space-y-8">
      {/* Category Selection */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">조사 카테고리 선택</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(particlesData).map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category)
                setCurrentParticleIndex(0)
                setShowExamples(false)
              }}
              className={`p-6 rounded-xl font-semibold transition-all duration-300 text-left ${getCategoryColor(category)} text-white shadow-lg hover:shadow-xl transform hover:scale-105`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-3xl">{getCategoryIcon(category)}</span>
                <div>
                  <h3 className="text-xl font-bold">{particlesData[category].title}</h3>
                  <p className="text-sm opacity-90">{particlesData[category].description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Particle Card */}
      {selectedCategory && currentParticle && (
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
          <div className="space-y-6">
            {/* Particle Header */}
            <div className="text-center space-y-4">
              <div className="text-6xl md:text-7xl font-bold text-gray-800">
                {currentParticle.korean}
              </div>
              
              <div className="text-2xl text-gray-600 italic">
                {currentParticle.romanization}
              </div>

              <div className="flex justify-center space-x-4">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-3 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🇺🇸</span>
                    <span className="font-semibold text-blue-700">English:</span>
                    <span className="text-lg text-blue-800">{currentParticle.english}</span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-red-50 to-red-100 px-6 py-3 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🇵🇭</span>
                    <span className="font-semibold text-red-700">Filipino:</span>
                    <span className="text-lg text-red-800">{currentParticle.filipino}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Explanation */}
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-xl">
              <div className="flex items-center space-x-2 mb-3">
                <Lightbulb className="text-yellow-600" size={24} />
                <h3 className="text-xl font-bold text-yellow-800">설명 (Explanation)</h3>
              </div>
              <p className="text-lg text-yellow-700">{currentParticle.explanation}</p>
            </div>

            {/* Usage */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl">
              <div className="flex items-center space-x-2 mb-3">
                <BookOpen className="text-green-600" size={24} />
                <h3 className="text-xl font-bold text-green-800">사용법 (Usage)</h3>
              </div>
              <p className="text-lg text-green-700">{currentParticle.usage}</p>
            </div>

            {/* Examples Toggle */}
            <div className="text-center">
              <button
                onClick={() => setShowExamples(!showExamples)}
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:from-purple-600 hover:to-purple-700 hover:shadow-lg hover:-translate-y-1 flex items-center space-x-2 mx-auto"
              >
                <span>예문 보기/숨기기</span>
                <ArrowRight className={`transform transition-transform duration-300 ${showExamples ? 'rotate-90' : ''}`} size={20} />
              </button>
            </div>

            {/* Examples */}
            {showExamples && currentParticle.examples && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">예문 (Examples)</h3>
                {currentParticle.examples.map((example, index) => (
                  <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl">
                    <div className="space-y-4">
                      {/* Korean Example */}
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-800 mb-2">
                          {example.korean}
                        </div>
                        <div className="text-lg text-gray-600 italic">
                          {example.romanization}
                        </div>
                      </div>

                      {/* Translations */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-xl">🇺🇸</span>
                            <span className="font-semibold text-blue-700">English:</span>
                          </div>
                          <div className="text-blue-800">{example.english}</div>
                        </div>
                        
                        <div className="bg-red-50 p-4 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-xl">🇵🇭</span>
                            <span className="font-semibold text-red-700">Filipino:</span>
                          </div>
                          <div className="text-red-800">{example.filipino}</div>
                        </div>
                      </div>

                      {/* Audio Button */}
                      <div className="text-center">
                        <button
                          onClick={() => playAudio(example.korean, 'ko-KR')}
                          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg hover:-translate-y-1 flex items-center space-x-2 mx-auto"
                        >
                          <Volume2 size={20} />
                          <span>발음 듣기</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
              <button
                onClick={prevParticle}
                disabled={currentParticles.length === 0}
                className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:from-gray-200 hover:to-gray-300 hover:shadow-md flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
                <span>이전</span>
              </button>
              
              <div className="text-gray-600 font-semibold text-lg">
                {currentParticleIndex + 1} / {currentParticles.length}
              </div>
              
              <button
                onClick={nextParticle}
                disabled={currentParticles.length === 0}
                className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:from-gray-200 hover:to-gray-300 hover:shadow-md flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>다음</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* No Category Selected */}
      {!selectedCategory && (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">🔤</div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">조사 카테고리를 선택하세요</h3>
          <p className="text-gray-500">위에서 조사 카테고리를 선택하여 학습을 시작하세요!</p>
        </div>
      )}
    </div>
  )
}

export default ParticlesTab
