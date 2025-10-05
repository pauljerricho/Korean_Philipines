import React, { useState } from 'react'
import { BookOpen, Globe, GraduationCap, Play, Award, Hash } from 'lucide-react'
import VocabularyTab from './components/VocabularyTab'
import GrammarTab from './components/GrammarTab'
import HangulTab from './components/HangulTab'
import YoutuberTab from './components/YoutuberTab'
import TopikTab from './components/TopikTab'
import ParticlesTab from './components/ParticlesTab'

// 데이터 import
import vocabularyData from './data/vocabularyData'
import grammarData from './data/grammarData'
import youtuberData from './data/youtuberData'
import topikData from './data/topikData'
import particlesData from './data/particlesData'

const App = () => {
  const [activeTab, setActiveTab] = useState('hangul')

  const tabs = [
    { id: 'hangul', label: 'Hangul', icon: Globe },
    { id: 'vocabulary', label: 'Vocabulary', icon: BookOpen },
    { id: 'grammar', label: 'Grammar', icon: GraduationCap },
    { id: 'particles', label: 'Particles', icon: Hash },
    { id: 'topik', label: 'TOPIK', icon: Award },
    { id: 'youtubers', label: 'YouTubers', icon: Play }
  ]

  const getCategoryIcon = (category) => {
    const icons = {
      colors: '🎨',
      emotions: '😊',
      family: '👨‍👩‍👧‍👦',
      food: '🍽️',
      greetings: '👋',
      numbers: '🔢',
      places: '🏢',
      shopping: '🛒',
      time: '⏰',
      weather: '🌤️'
    }
    return icons[category] || '📚'
  }

  const getCategoryName = (category) => {
    const names = {
      colors: 'Colors',
      emotions: 'Emotions',
      family: 'Family',
      food: 'Food',
      greetings: 'Greetings',
      numbers: 'Numbers',
      places: 'Places',
      shopping: 'Shopping',
      time: 'Time',
      weather: 'Weather'
    }
    return names[category] || category.charAt(0).toUpperCase() + category.slice(1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-xl">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              한국어 Korean Learning App 한국어
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Learn Korean with Filipino translations
            </p>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-4 border-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={20} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'hangul' && (
          <HangulTab />
        )}
        {activeTab === 'vocabulary' && (
          <VocabularyTab 
            vocabularyData={vocabularyData} 
            getCategoryIcon={getCategoryIcon}
            getCategoryName={getCategoryName}
          />
        )}
        {activeTab === 'grammar' && (
          <GrammarTab grammarData={grammarData} />
        )}
        {activeTab === 'particles' && (
          <ParticlesTab particlesData={particlesData} />
        )}
        {activeTab === 'topik' && (
          <TopikTab topikData={topikData} />
        )}
        {activeTab === 'youtubers' && (
          <YoutuberTab youtuberData={youtuberData} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold mb-2">한국어 Korean Learning App</p>
          <p className="text-gray-300">Made with ❤️ for Korean language learners</p>
        </div>
      </footer>
    </div>
  )
}

export default App