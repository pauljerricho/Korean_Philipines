import React, { useState } from 'react'
import { BookOpen, Volume2, ChevronRight, ChevronLeft } from 'lucide-react'

const ParticlesTab = ({ particlesData }) => {
  const [activeCategory, setActiveCategory] = useState('basic')
  const [currentParticle, setCurrentParticle] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const playAudio = (text) => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        speechSynthesis.cancel()
        setIsPlaying(false)
        return
      }

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'ko-KR'
      utterance.rate = 0.8
      utterance.pitch = 1
      
      utterance.onstart = () => setIsPlaying(true)
      utterance.onend = () => setIsPlaying(false)
      utterance.onerror = () => setIsPlaying(false)
      
      speechSynthesis.speak(utterance)
    }
  }

  const currentData = particlesData[activeCategory]
  const currentParticleData = currentData.particles[currentParticle]

  const nextParticle = () => {
    if (currentParticle < currentData.particles.length - 1) {
      setCurrentParticle(currentParticle + 1)
    }
  }

  const prevParticle = () => {
    if (currentParticle > 0) {
      setCurrentParticle(currentParticle - 1)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">한국어 조사 (Korean Particles)</h2>
        <p className="text-lg text-gray-600 mb-6">한국어의 중요한 조사들을 배워보세요!</p>
      </div>

      {/* Category Selection */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => {
            setActiveCategory('basic')
            setCurrentParticle(0)
          }}
          className={`px-6 py-3 rounded-xl font-semibold transition-colors duration-300 ${
            activeCategory === 'basic'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          📚 기본 조사
        </button>
        <button
          onClick={() => {
            setActiveCategory('advanced')
            setCurrentParticle(0)
          }}
          className={`px-6 py-3 rounded-xl font-semibold transition-colors duration-300 ${
            activeCategory === 'advanced'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          🎯 고급 조사
        </button>
      </div>

      {/* Current Category Info */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl shadow-lg p-6 text-center">
        <h3 className="text-2xl font-bold mb-2">{currentData.title}</h3>
        <p className="text-lg opacity-90">{currentData.description}</p>
        <div className="mt-4 text-sm opacity-80">
          {currentParticle + 1} / {currentData.particles.length} 조사
        </div>
      </div>

      {/* Particle Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {currentParticleData.particle}
          </div>
          <div className="text-xl text-gray-700 mb-4">
            {currentParticleData.usage}
          </div>
          <button
            onClick={() => playAudio(currentParticleData.particle)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300 flex items-center space-x-2 mx-auto"
          >
            <Volume2 size={20} />
            <span>{isPlaying ? '정지' : '발음 듣기'}</span>
          </button>
        </div>

        {/* Examples */}
        <div className="space-y-4">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">📝 예문 (Examples)</h4>
          {currentParticleData.examples.map((example, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => playAudio(example.korean)}
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
                >
                  <Volume2 size={16} />
                </button>
                <span className="text-lg font-semibold text-gray-800">{example.korean}</span>
              </div>
              <div className="text-gray-600">
                <span className="font-medium">🇺🇸 English:</span> {example.english}
              </div>
              <div className="text-gray-600">
                <span className="font-medium">🇵🇭 Filipino:</span> {example.filipino}
              </div>
            </div>
          ))}
        </div>

        {/* Explanation */}
        <div className="mt-6 space-y-3">
          <h4 className="text-xl font-semibold text-gray-800 mb-3">💡 설명 (Explanation)</h4>
          <div className="p-4 bg-blue-50 rounded-lg text-gray-700">
            <span className="font-semibold text-blue-800">🇰🇷 한국어:</span><br/>
            {currentParticleData.explanation}
          </div>
          {currentParticleData.explanationEn && (
            <div className="p-4 bg-green-50 rounded-lg text-gray-700">
              <span className="font-semibold text-green-800">🇺🇸 English:</span><br/>
              {currentParticleData.explanationEn}
            </div>
          )}
          {currentParticleData.explanationFil && (
            <div className="p-4 bg-yellow-50 rounded-lg text-gray-700">
              <span className="font-semibold text-yellow-800">🇵🇭 Filipino:</span><br/>
              {currentParticleData.explanationFil}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={prevParticle}
            disabled={currentParticle === 0}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors duration-300"
          >
            <ChevronLeft size={20} />
            <span>이전</span>
          </button>
          
          <div className="flex space-x-2">
            {currentData.particles.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentParticle(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentParticle ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextParticle}
            disabled={currentParticle === currentData.particles.length - 1}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors duration-300"
          >
            <span>다음</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* All Particles List */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          📋 전체 조사 목록
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentData.particles.map((particle, index) => (
            <button
              key={particle.id}
              onClick={() => setCurrentParticle(index)}
              className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                index === currentParticle
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              }`}
            >
              <div className="text-xl font-bold text-blue-600 mb-1">
                {particle.particle}
              </div>
              <div className="text-sm text-gray-600">
                {particle.usage}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Grammar Rules */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          📚 문법 규칙 (Grammar Rules)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-600">🔤 Vowel/Consonant Rules</h4>
            <div className="space-y-2 text-sm text-gray-700">
              <p>• <strong>은/는:</strong> 은 (after consonants), 는 (after vowels)</p>
              <p>• <strong>이/가:</strong> 이 (after consonants), 가 (after vowels)</p>
              <p>• <strong>을/를:</strong> 을 (after consonants), 를 (after vowels)</p>
              <p>• <strong>와/과:</strong> 와 (after vowels), 과 (after consonants)</p>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-green-600">📍 Usage Tips</h4>
            <div className="space-y-2 text-sm text-gray-700">
              <p>• <strong>은/는 vs 이/가:</strong> 은/는 for topics, 이/가 for subjects</p>
              <p>• <strong>에 vs 에서:</strong> 에 for static locations, 에서 for actions</p>
              <p>• <strong>도:</strong> Can replace other particles to add emphasis</p>
              <p>• <strong>만:</strong> Can replace other particles to add restriction</p>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Tips */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-2xl shadow-lg p-6">
        <h3 className="text-2xl font-bold mb-6 text-center">
          💡 학습 팁 (Learning Tips)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-lg font-semibold">🎯 Practice Tips</h4>
            <ul className="space-y-2 text-sm">
              <li>• Start with basic particles (은/는, 이/가, 을/를)</li>
              <li>• Use real sentences to understand usage</li>
              <li>• Pay attention to context</li>
              <li>• Practice regularly with examples</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-lg font-semibold">⚠️ Common Mistakes</h4>
            <ul className="space-y-2 text-sm">
              <li>• Don't confuse 은/는 vs 이/가</li>
              <li>• Don't mix 에 vs 에서</li>
              <li>• Check vowel/consonant rules</li>
              <li>• Don't overuse particles</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ParticlesTab