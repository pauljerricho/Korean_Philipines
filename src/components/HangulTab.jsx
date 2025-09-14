import React, { useState } from 'react'
import { Volume2, BookOpen } from 'lucide-react'

const HangulTab = () => {
  const [activeSection, setActiveSection] = useState('consonants')

  const playAudio = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'ko-KR'
      utterance.rate = 0.7
      speechSynthesis.speak(utterance)
    }
  }

  const consonants = [
    { char: 'ㄱ', name: '기역', sound: '[g/k]', example: '가족' },
    { char: 'ㄴ', name: '니은', sound: '[n]', example: '나무' },
    { char: 'ㄷ', name: '디귿', sound: '[d/t]', example: '다리' },
    { char: 'ㄹ', name: '리을', sound: '[r/l]', example: '라디오' },
    { char: 'ㅁ', name: '미음', sound: '[m]', example: '마음' },
    { char: 'ㅂ', name: '비읍', sound: '[b/p]', example: '바다' },
    { char: 'ㅅ', name: '시옷', sound: '[s]', example: '사과' },
    { char: 'ㅇ', name: '이응', sound: '[ng/ㅇ]', example: '아이' },
    { char: 'ㅈ', name: '지읒', sound: '[j/ch]', example: '자동차' },
    { char: 'ㅊ', name: '치읓', sound: '[ch]', example: '차' },
    { char: 'ㅋ', name: '키읔', sound: '[k]', example: '코' },
    { char: 'ㅌ', name: '티읕', sound: '[t]', example: '토끼' },
    { char: 'ㅍ', name: '피읖', sound: '[p]', example: '파란색' },
    { char: 'ㅎ', name: '히읗', sound: '[h]', example: '하늘' }
  ]

  const vowels = [
    { char: 'ㅏ', name: '아', sound: '[a]', example: '아버지' },
    { char: 'ㅓ', name: '어', sound: '[eo]', example: '어머니' },
    { char: 'ㅗ', name: '오', sound: '[o]', example: '오빠' },
    { char: 'ㅜ', name: '우', sound: '[u]', example: '우유' },
    { char: 'ㅡ', name: '으', sound: '[eu]', example: '음식' },
    { char: 'ㅣ', name: '이', sound: '[i]', example: '이름' },
    { char: 'ㅑ', name: '야', sound: '[ya]', example: '야구' },
    { char: 'ㅕ', name: '여', sound: '[yeo]', example: '여자' },
    { char: 'ㅛ', name: '요', sound: '[yo]', example: '요리' },
    { char: 'ㅠ', name: '유', sound: '[yu]', example: '유리' },
    { char: 'ㅐ', name: '애', sound: '[ae]', example: '개' },
    { char: 'ㅔ', name: '에', sound: '[e]', example: '게' }
  ]

  const combinations = [
    { char: '가', components: 'ㄱ + ㅏ = 가' },
    { char: '나', components: 'ㄴ + ㅏ = 나' },
    { char: '다', components: 'ㄷ + ㅏ = 다' },
    { char: '라', components: 'ㄹ + ㅏ = 라' },
    { char: '마', components: 'ㅁ + ㅏ = 마' },
    { char: '바', components: 'ㅂ + ㅏ = 바' },
    { char: '사', components: 'ㅅ + ㅏ = 사' },
    { char: '아', components: 'ㅇ + ㅏ = 아' }
  ]

  const sections = [
    { id: 'consonants', label: 'Consonants', icon: '🔤' },
    { id: 'vowels', label: 'Vowels', icon: '🔡' },
    { id: 'combinations', label: 'Combinations', icon: '🔗' },
    { id: 'batchim', label: 'Batchim (받침)', icon: '📝' }
  ]

  const renderCharacterGrid = (characters) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {characters.map((char, index) => (
        <div
          key={index}
          onClick={() => playAudio(char.char)}
          className="bg-white rounded-2xl shadow-lg p-6 text-center cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <div className="text-6xl font-bold text-blue-600 mb-3">
            {char.char}
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-gray-700">{char.name}</div>
            <div className="text-sm text-gray-500 font-mono">{char.sound}</div>
            <div className="text-sm text-blue-600">{char.example}</div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              playAudio(char.char)
            }}
            className="mt-3 p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
          >
            <Volume2 size={16} />
          </button>
        </div>
      ))}
    </div>
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Hangul (한글) Learning</h2>
        <p className="text-gray-600">Learn Korean alphabet: consonants, vowels, combinations, and batchim</p>
      </div>

      {/* Section Navigation */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-center space-x-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                  : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-blue-100 hover:to-blue-200'
              }`}
            >
              <span className="text-xl">{section.icon}</span>
              <span>{section.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {activeSection === 'consonants' && (
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <BookOpen className="text-blue-600" size={24} />
              <h3 className="text-2xl font-bold text-gray-800">Basic Consonants (기본 자음)</h3>
            </div>
            {renderCharacterGrid(consonants)}
          </div>
        )}

        {activeSection === 'vowels' && (
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <BookOpen className="text-green-500" size={24} />
              <h3 className="text-2xl font-bold text-gray-800">Basic Vowels (기본 모음)</h3>
            </div>
            {renderCharacterGrid(vowels)}
          </div>
        )}

        {activeSection === 'combinations' && (
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <BookOpen className="text-purple-500" size={24} />
              <h3 className="text-2xl font-bold text-gray-800">Hangul Combinations (한글 조합)</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {combinations.map((combo, index) => (
                <div
                  key={index}
                  onClick={() => playAudio(combo.char)}
                  className="bg-white rounded-2xl shadow-lg p-6 text-center cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="text-4xl font-bold text-purple-600 mb-3">
                    {combo.char}
                  </div>
                  <div className="text-sm text-gray-600 font-mono">
                    {combo.components}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      playAudio(combo.char)
                    }}
                    className="mt-3 p-2 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
                  >
                    <Volume2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'batchim' && (
          <div className="space-y-8">
            {/* Batchim Introduction */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl shadow-lg p-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">What is Batchim (받침)?</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                    Batchim (받침) refers to the final consonant(s) in a Korean syllable. It's the consonant that comes after the vowel in a syllable block. This is one of the most important aspects of Korean pronunciation!
                  </p>
                  <div className="bg-white rounded-xl p-6 mb-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-orange-600 mb-3">한</div>
                      <div className="text-lg text-gray-600 mb-2">
                        <span className="text-blue-600 font-bold">ㅎ</span> + <span className="text-green-600 font-bold">ㅏ</span> + <span className="text-red-600 font-bold">ㄴ</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        <span className="text-blue-600">Initial</span> + <span className="text-green-600">Vowel</span> + <span className="text-red-600 font-bold">Batchim</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-bold text-gray-800 mb-2">Why is Batchim Important?</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Changes pronunciation significantly</li>
                      <li>• Affects meaning of words</li>
                      <li>• Essential for natural Korean speech</li>
                      <li>• Required for proper grammar</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-bold text-gray-800 mb-2">Fun Fact</h4>
                    <p className="text-sm text-gray-600">
                      Korean has 7 basic batchim sounds, but they can combine to create many more complex sounds!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 7 Basic Batchim Sounds - Enhanced */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">7 Basic Batchim Sounds (7종성법)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { 
                    char: 'ㄱ', 
                    name: '기역', 
                    sound: '[k]', 
                    examples: ['밖', '밥', '책', '먹다', '닦다'],
                    description: 'Like "k" in "book" but not released',
                    practice: 'Try saying "book" but stop before releasing the "k" sound'
                  },
                  { 
                    char: 'ㄴ', 
                    name: '니은', 
                    sound: '[n]', 
                    examples: ['산', '문', '친구', '신다', '안다'],
                    description: 'Like "n" in "sun"',
                    practice: 'Same as English "n" sound'
                  },
                  { 
                    char: 'ㄷ', 
                    name: '디귿', 
                    sound: '[t]', 
                    examples: ['받다', '있다', '좋다', '같다', '닫다'],
                    description: 'Like "t" in "cat" but not released',
                    practice: 'Try saying "cat" but stop before releasing the "t" sound'
                  },
                  { 
                    char: 'ㄹ', 
                    name: '리을', 
                    sound: '[l]', 
                    examples: ['물', '달', '길', '살다', '알다'],
                    description: 'Like "l" in "ball"',
                    practice: 'Same as English "l" sound'
                  },
                  { 
                    char: 'ㅁ', 
                    name: '미음', 
                    sound: '[m]', 
                    examples: ['감', '밤', '김치', '삼다', '안다'],
                    description: 'Like "m" in "ham"',
                    practice: 'Same as English "m" sound'
                  },
                  { 
                    char: 'ㅂ', 
                    name: '비읍', 
                    sound: '[p]', 
                    examples: ['밥', '집', '입', '잡다', '압다'],
                    description: 'Like "p" in "cup" but not released',
                    practice: 'Try saying "cup" but stop before releasing the "p" sound'
                  },
                  { 
                    char: 'ㅇ', 
                    name: '이응', 
                    sound: '[ng]', 
                    examples: ['강', '방', '생각', '있다', '좋다'],
                    description: 'Like "ng" in "sing"',
                    practice: 'Same as English "ng" sound'
                  }
                ].map((batchim, index) => (
                  <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                    <div className="text-center mb-6">
                      <div className="text-5xl font-bold text-gray-800 mb-3">{batchim.char}</div>
                      <div className="text-xl font-semibold text-gray-700 mb-2">{batchim.name}</div>
                      <div className="text-lg text-gray-500 font-mono bg-white rounded-lg py-2 px-4 inline-block">{batchim.sound}</div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm font-semibold text-gray-600 mb-2">Description:</div>
                        <p className="text-sm text-gray-700">{batchim.description}</p>
                      </div>
                      
                      <div>
                        <div className="text-sm font-semibold text-gray-600 mb-2">Practice Tip:</div>
                        <p className="text-sm text-gray-700 italic">{batchim.practice}</p>
                      </div>
                      
                      <div>
                        <div className="text-sm font-semibold text-gray-600 mb-3">Examples:</div>
                        <div className="grid grid-cols-2 gap-2">
                          {batchim.examples.map((example, idx) => (
                            <div key={idx} className="text-center bg-white rounded-lg py-2">
                              <div className="text-lg font-bold text-blue-600">{example}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Advanced Batchim Rules */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Advanced Batchim Pronunciation Rules</h3>
              <div className="space-y-8">
                <div className="bg-blue-50 rounded-xl p-8">
                  <h4 className="text-2xl font-bold text-blue-800 mb-4">1. Liaison (연음화) - Sound Movement</h4>
                  <p className="text-gray-700 mb-6 text-lg">When batchim is followed by a vowel, the batchim sound moves to the next syllable.</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg p-6">
                      <h5 className="font-bold text-gray-800 mb-3">Basic Examples:</h5>
                      <div className="space-y-3">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600 mb-1">먹어요</div>
                          <div className="text-sm text-gray-600">[머거요] (eat)</div>
                          <div className="text-xs text-gray-500">ㄱ + 어 = 거</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600 mb-1">좋아요</div>
                          <div className="text-sm text-gray-600">[조아요] (good)</div>
                          <div className="text-xs text-gray-500">ㅎ + 아 = 아</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-6">
                      <h5 className="font-bold text-gray-800 mb-3">Complex Examples:</h5>
                      <div className="space-y-3">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600 mb-1">읽어요</div>
                          <div className="text-sm text-gray-600">[일거요] (read)</div>
                          <div className="text-xs text-gray-500">ㄹㄱ + 어 = ㄹ거</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600 mb-1">없어요</div>
                          <div className="text-sm text-gray-600">[업서요] (not have)</div>
                          <div className="text-xs text-gray-500">ㅂㅅ + 어 = ㅂ서</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-8">
                  <h4 className="text-2xl font-bold text-green-800 mb-4">2. Tensification (경음화) - Sound Hardening</h4>
                  <p className="text-gray-700 mb-6 text-lg">When batchim is followed by a voiceless consonant, the consonant becomes tense (harder).</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg p-6">
                      <h5 className="font-bold text-gray-800 mb-3">Basic Examples:</h5>
                      <div className="space-y-3">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600 mb-1">학교</div>
                          <div className="text-sm text-gray-600">[학꾜] (school)</div>
                          <div className="text-xs text-gray-500">ㄱ + ㄱ = 꾜</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600 mb-1">밥상</div>
                          <div className="text-sm text-gray-600">[밥쌍] (dining table)</div>
                          <div className="text-xs text-gray-500">ㅂ + ㅅ = 쌍</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-6">
                      <h5 className="font-bold text-gray-800 mb-3">Advanced Examples:</h5>
                      <div className="space-y-3">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600 mb-1">국수</div>
                          <div className="text-sm text-gray-600">[국쑤] (noodles)</div>
                          <div className="text-xs text-gray-500">ㄱ + ㅅ = 쑤</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600 mb-1">밥솥</div>
                          <div className="text-sm text-gray-600">[밥쏟] (rice cooker)</div>
                          <div className="text-xs text-gray-500">ㅂ + ㅅ = 쏟</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-xl p-8">
                  <h4 className="text-2xl font-bold text-purple-800 mb-4">3. Aspiration (격음화) - Sound Changes</h4>
                  <p className="text-gray-700 mb-6 text-lg">Some batchim sounds change when followed by certain consonants, becoming aspirated.</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg p-6">
                      <h5 className="font-bold text-gray-800 mb-3">Basic Examples:</h5>
                      <div className="space-y-3">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600 mb-1">좋다</div>
                          <div className="text-sm text-gray-600">[조타] (good)</div>
                          <div className="text-xs text-gray-500">ㅎ + ㄷ = 타</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600 mb-1">많다</div>
                          <div className="text-sm text-gray-600">[만타] (many)</div>
                          <div className="text-xs text-gray-500">ㅎ + ㄷ = 타</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-6">
                      <h5 className="font-bold text-gray-800 mb-3">Complex Examples:</h5>
                      <div className="space-y-3">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600 mb-1">않다</div>
                          <div className="text-sm text-gray-600">[안타] (not)</div>
                          <div className="text-xs text-gray-500">ㅎ + ㄷ = 타</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600 mb-1">좋지</div>
                          <div className="text-sm text-gray-600">[조치] (good)</div>
                          <div className="text-xs text-gray-500">ㅎ + ㅈ = 치</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-xl p-8">
                  <h4 className="text-2xl font-bold text-yellow-800 mb-4">4. Special Batchim Combinations</h4>
                  <p className="text-gray-700 mb-6 text-lg">Some batchim combinations have special pronunciation rules.</p>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg p-6">
                      <h5 className="font-bold text-gray-800 mb-3">ㄹ + ㄱ = ㄹㄱ</h5>
                      <div className="space-y-2">
                        <div className="text-center">
                          <div className="text-xl font-bold text-yellow-600">읽다</div>
                          <div className="text-sm text-gray-600">[익따] (read)</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-yellow-600">닭</div>
                          <div className="text-sm text-gray-600">[닥] (chicken)</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-6">
                      <h5 className="font-bold text-gray-800 mb-3">ㄹ + ㅂ = ㄹㅂ</h5>
                      <div className="space-y-2">
                        <div className="text-center">
                          <div className="text-xl font-bold text-yellow-600">읊다</div>
                          <div className="text-sm text-gray-600">[읍따] (recite)</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-yellow-600">밟다</div>
                          <div className="text-sm text-gray-600">[밥따] (step on)</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-6">
                      <h5 className="font-bold text-gray-800 mb-3">ㄹ + ㅅ = ㄹㅅ</h5>
                      <div className="space-y-2">
                        <div className="text-center">
                          <div className="text-xl font-bold text-yellow-600">읏다</div>
                          <div className="text-sm text-gray-600">[읏따] (sigh)</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-yellow-600">없다</div>
                          <div className="text-sm text-gray-600">[업따] (not have)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comprehensive Practice Section */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl shadow-lg p-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Comprehensive Batchim Practice</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-4">Basic Words with Batchim</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { word: '밥', meaning: 'rice', batchim: 'ㅂ', pronunciation: '[밥]' },
                      { word: '물', meaning: 'water', batchim: 'ㄹ', pronunciation: '[물]' },
                      { word: '산', meaning: 'mountain', batchim: 'ㄴ', pronunciation: '[산]' },
                      { word: '책', meaning: 'book', batchim: 'ㄱ', pronunciation: '[책]' },
                      { word: '집', meaning: 'house', batchim: 'ㅂ', pronunciation: '[집]' },
                      { word: '길', meaning: 'road', batchim: 'ㄹ', pronunciation: '[길]' },
                      { word: '문', meaning: 'door', batchim: 'ㄴ', pronunciation: '[문]' },
                      { word: '강', meaning: 'river', batchim: 'ㅇ', pronunciation: '[강]' }
                    ].map((item, index) => (
                      <div key={index} className="bg-white rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <div className="text-2xl font-bold text-gray-800 mb-2">{item.word}</div>
                        <div className="text-sm text-gray-600 mb-1">{item.meaning}</div>
                        <div className="text-xs text-blue-600 font-semibold mb-1">Batchim: {item.batchim}</div>
                        <div className="text-xs text-gray-500 font-mono">{item.pronunciation}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-4">Advanced Words with Complex Batchim</h4>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { word: '읽다', meaning: 'read', batchim: 'ㄹㄱ', pronunciation: '[익따]', rule: 'Liaison' },
                      { word: '없다', meaning: 'not have', batchim: 'ㅂㅅ', pronunciation: '[업따]', rule: 'Tensification' },
                      { word: '좋다', meaning: 'good', batchim: 'ㅎ', pronunciation: '[조타]', rule: 'Aspiration' },
                      { word: '학교', meaning: 'school', batchim: 'ㄱ', pronunciation: '[학꾜]', rule: 'Tensification' },
                      { word: '밥상', meaning: 'table', batchim: 'ㅂ', pronunciation: '[밥쌍]', rule: 'Tensification' },
                      { word: '많다', meaning: 'many', batchim: 'ㅎㄴ', pronunciation: '[만타]', rule: 'Aspiration' }
                    ].map((item, index) => (
                      <div key={index} className="bg-white rounded-xl p-4 hover:shadow-lg transition-all duration-300">
                        <div className="flex justify-between items-center mb-2">
                          <div className="text-xl font-bold text-gray-800">{item.word}</div>
                          <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{item.rule}</div>
                        </div>
                        <div className="text-sm text-gray-600 mb-1">{item.meaning}</div>
                        <div className="text-xs text-blue-600 font-semibold mb-1">Batchim: {item.batchim}</div>
                        <div className="text-xs text-gray-500 font-mono">{item.pronunciation}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-white rounded-xl p-6">
                <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">Practice Tips</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-bold text-gray-700 mb-2">For Beginners:</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Start with single batchim sounds</li>
                      <li>• Practice with simple words first</li>
                      <li>• Listen to native speakers</li>
                      <li>• Record yourself and compare</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-700 mb-2">For Advanced Learners:</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Focus on complex batchim combinations</li>
                      <li>• Practice with full sentences</li>
                      <li>• Study pronunciation rules in context</li>
                      <li>• Practice with different speech speeds</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Learning Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">💡 Learning Tips</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <h4 className="font-semibold mb-2">Consonant Learning:</h4>
            <ul className="space-y-1 list-disc list-inside">
              <li>Remember the shape of each consonant</li>
              <li>Practice pronunciation by repeating</li>
              <li>Learn with example words</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Vowel Learning:</h4>
            <ul className="space-y-1 list-disc list-inside">
              <li>Start with basic vowels</li>
              <li>Compound vowels are combinations of basic vowels</li>
              <li>Practice with real words</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HangulTab
