import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react'

const GrammarTab = ({ grammarData }) => {
  const [selectedLevel, setSelectedLevel] = useState('beginner')
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)

  const levels = [
    { id: 'beginner', label: 'Beginner', color: 'from-green-500 to-green-600' },
    { id: 'intermediate', label: 'Intermediate', color: 'from-yellow-500 to-yellow-600' },
    { id: 'advanced', label: 'Advanced', color: 'from-red-500 to-red-600' }
  ]

  const currentData = grammarData[selectedLevel]
  const currentLesson = currentData?.lessons?.[currentLessonIndex]

  const nextLesson = () => {
    if (currentData?.lessons) {
      setCurrentLessonIndex((prev) => (prev + 1) % currentData.lessons.length)
    }
  }

  const prevLesson = () => {
    if (currentData?.lessons) {
      setCurrentLessonIndex((prev) => (prev - 1 + currentData.lessons.length) % currentData.lessons.length)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      {/* Level Selection */}
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">Select Grammar Level</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => {
                setSelectedLevel(level.id)
                setCurrentLessonIndex(0)
              }}
              className={`px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl font-semibold text-white transition-all duration-300 text-sm sm:text-base ${
                selectedLevel === level.id
                  ? `bg-gradient-to-r ${level.color} shadow-lg transform scale-105`
                  : `bg-gradient-to-r ${level.color} opacity-70 hover:opacity-100`
              }`}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grammar Content */}
      {currentData && currentLesson && (
        <div className="space-y-4 sm:space-y-6">
          {/* Navigation Header */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <button
                onClick={prevLesson}
                className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-3 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 hover:from-gray-200 hover:to-gray-300 hover:shadow-md flex items-center space-x-1 sm:space-x-2"
              >
                <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm">Previous</span>
              </button>
              
              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">Grammar Learning</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {currentLessonIndex + 1} / {currentData.lessons.length}
                </p>
              </div>
              
              <button
                onClick={nextLesson}
                className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-3 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 hover:from-gray-200 hover:to-gray-300 hover:shadow-md flex items-center space-x-1 sm:space-x-2"
              >
                <span className="text-xs sm:text-sm">Next</span>
                <ChevronRight size={16} className="sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Lesson Content */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
            <div className="flex items-center space-x-2 mb-4 sm:mb-6">
              <BookOpen className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
              <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">Grammar Explanation</h4>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <h5 className="text-xl sm:text-2xl font-bold text-blue-700">
                {currentLesson.title}
              </h5>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                {currentLesson.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* No Data */}
      {!currentData && (
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-12 text-center">
          <div className="text-4xl sm:text-6xl mb-4">📖</div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-700 mb-2">Loading Grammar Data...</h3>
          <p className="text-sm sm:text-base text-gray-500">Please wait a moment!</p>
        </div>
      )}
    </div>
  )
}

export default GrammarTab