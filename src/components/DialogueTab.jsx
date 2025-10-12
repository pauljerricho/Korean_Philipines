import React, { useState } from 'react'
import { MessageCircle, Volume2, ChevronRight, ChevronLeft } from 'lucide-react'

const DialogueTab = ({ dialogueData }) => {
  const [activeDifficulty, setActiveDifficulty] = useState('beginner')
  const [activeCategory, setActiveCategory] = useState('greetings')
  const [currentDialogue, setCurrentDialogue] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const playAudio = (text) => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        speechSynthesis.cancel()
        setIsPlaying(false)
        return
      }

      // 더 자연스러운 한국어 음성을 위한 설정
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'ko-KR'
      utterance.rate = 0.7
      utterance.pitch = 1.1
      utterance.volume = 0.9
      
      // 한국어 음성 엔진 선택 (가능한 경우)
      const voices = speechSynthesis.getVoices()
      const koreanVoice = voices.find(voice => 
        voice.lang.startsWith('ko') && 
        (voice.name.includes('Korean') || voice.name.includes('한국어'))
      )
      
      if (koreanVoice) {
        utterance.voice = koreanVoice
      }
      
      utterance.onstart = () => setIsPlaying(true)
      utterance.onend = () => setIsPlaying(false)
      utterance.onerror = () => setIsPlaying(false)
      
      speechSynthesis.speak(utterance)
    }
  }

  // Google Translate TTS API 사용 (더 자연스러운 음성)
  const playAudioWithGoogleTTS = (text) => {
    if (isPlaying) {
      setIsPlaying(false)
      return
    }

    setIsPlaying(true)
    
    const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ko&client=tw-ob&q=${encodeURIComponent(text)}`
    
    const audio = new Audio(audioUrl)
    audio.onloadstart = () => setIsPlaying(true)
    audio.onended = () => setIsPlaying(false)
    audio.onerror = () => {
      setIsPlaying(false)
      playAudio(text)
    }
    
    audio.play().catch(() => {
      setIsPlaying(false)
      playAudio(text)
    })
  }

  const currentData = dialogueData[activeDifficulty]
  const currentCategoryData = currentData.categories.find(cat => cat.id === activeCategory)
  const currentDialogueData = currentCategoryData?.dialogues[currentDialogue]

  const nextDialogue = () => {
    if (currentDialogue < currentCategoryData.dialogues.length - 1) {
      setCurrentDialogue(currentDialogue + 1)
      setShowExplanation(false)
    }
  }

  const prevDialogue = () => {
    if (currentDialogue > 0) {
      setCurrentDialogue(currentDialogue - 1)
      setShowExplanation(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">일상 한국어 대화 (Daily Korean Dialogue)</h2>
        <p className="text-lg text-gray-600 mb-6">실생활에서 자주 사용하는 한국어 문장들을 배워보세요!</p>
      </div>

      {/* Difficulty Selection */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">📚 Difficulty Level</h3>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => {
              setActiveDifficulty('beginner')
              setActiveCategory('greetings')
              setCurrentDialogue(0)
              setShowExplanation(false)
            }}
            className={`px-6 py-3 rounded-xl font-semibold transition-colors duration-300 ${
              activeDifficulty === 'beginner'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            🌱 Beginner (초급)
          </button>
          <button
            onClick={() => {
              setActiveDifficulty('intermediate')
              setActiveCategory('business')
              setCurrentDialogue(0)
              setShowExplanation(false)
            }}
            className={`px-6 py-3 rounded-xl font-semibold transition-colors duration-300 ${
              activeDifficulty === 'intermediate'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            🎯 Intermediate (중급)
          </button>
        </div>
      </div>

      {/* Category Selection */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">📚 Category Selection</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentData.categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id)
                setCurrentDialogue(0)
                setShowExplanation(false)
              }}
              className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                activeCategory === category.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              }`}
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <div className="font-semibold text-gray-800">{category.title}</div>
              <div className="text-sm text-gray-600">{category.dialogues.length} sentences</div>
            </button>
          ))}
        </div>
      </div>

      {/* Current Category Info */}
      {currentCategoryData && (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl shadow-lg p-6 text-center">
          <h3 className="text-2xl font-bold mb-2">{currentCategoryData.title}</h3>
          <p className="text-lg opacity-90">{currentCategoryData.dialogues.length} sentences</p>
          <div className="mt-4 text-sm opacity-80">
            {currentDialogue + 1} / {currentCategoryData.dialogues.length} sentences
          </div>
        </div>
      )}

      {/* Dialogue Card */}
      {currentDialogueData && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-blue-600 mb-4">
              {currentDialogueData.korean}
            </div>
            <div className="flex space-x-3 justify-center mb-4">
              <button
                onClick={() => playAudioWithGoogleTTS(currentDialogueData.korean)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300 flex items-center space-x-2"
              >
                <Volume2 size={20} />
                <span>{isPlaying ? 'Stop' : 'Natural Voice'}</span>
              </button>
              <button
                onClick={() => playAudio(currentDialogueData.korean)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300 flex items-center space-x-2"
              >
                <Volume2 size={20} />
                <span>{isPlaying ? 'Stop' : 'Basic Voice'}</span>
              </button>
            </div>
          </div>

          {/* Translations */}
          <div className="space-y-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-lg font-semibold text-gray-800">🇺🇸 English:</span>
                <button
                  onClick={() => playAudioWithGoogleTTS(currentDialogueData.english)}
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
                >
                  <Volume2 size={16} />
                </button>
              </div>
              <div className="text-lg text-gray-700">{currentDialogueData.english}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-lg font-semibold text-gray-800">🇵🇭 Filipino:</span>
                <button
                  onClick={() => playAudioWithGoogleTTS(currentDialogueData.filipino)}
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
                >
                  <Volume2 size={16} />
                </button>
              </div>
              <div className="text-lg text-gray-700">{currentDialogueData.filipino}</div>
            </div>
          </div>

          {/* Explanation Toggle */}
          <div className="text-center mb-4">
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-300"
            >
              {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
            </button>
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="space-y-3">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">💡 설명 (Explanation)</h4>
              <div className="p-4 bg-blue-50 rounded-lg text-gray-700">
                <span className="font-semibold text-blue-800">🇰🇷 한국어:</span><br/>
                {currentDialogueData.explanation}
              </div>
              {currentDialogueData.explanationEn && (
                <div className="p-4 bg-green-50 rounded-lg text-gray-700">
                  <span className="font-semibold text-green-800">🇺🇸 English:</span><br/>
                  {currentDialogueData.explanationEn}
                </div>
              )}
              {currentDialogueData.explanationFil && (
                <div className="p-4 bg-yellow-50 rounded-lg text-gray-700">
                  <span className="font-semibold text-yellow-800">🇵🇭 Filipino:</span><br/>
                  {currentDialogueData.explanationFil}
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevDialogue}
              disabled={currentDialogue === 0}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors duration-300"
            >
              <ChevronLeft size={20} />
              <span>Previous</span>
            </button>
            
            <div className="flex space-x-2">
              {currentCategoryData.dialogues.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentDialogue(index)
                    setShowExplanation(false)
                  }}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === currentDialogue ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextDialogue}
              disabled={currentDialogue === currentCategoryData.dialogues.length - 1}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors duration-300"
            >
              <span>Next</span>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* All Dialogues List */}
      {currentCategoryData && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            📋 All Sentences List
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentCategoryData.dialogues.map((dialogue, index) => (
              <button
                key={dialogue.id}
                onClick={() => {
                  setCurrentDialogue(index)
                  setShowExplanation(false)
                }}
                className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                  index === currentDialogue
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }`}
              >
                <div className="text-lg font-bold text-blue-600 mb-1">
                  {dialogue.korean}
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  {dialogue.english}
                </div>
                <div className="text-sm text-gray-500">
                  {dialogue.filipino}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default DialogueTab
