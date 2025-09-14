/**
 * Korean Language Learning App for Philippines
 * Simplified version - Vocabulary and Grammar only
 */

// ===== GLOBAL VARIABLES =====
const APP_CONFIG = {
    VERSION: '1.0.0',
    DEFAULT_TAB: 'vocabulary',
    DEFAULT_CATEGORY: 'greetings',
    QUIZ_TOTAL_QUESTIONS: 10,
    STORAGE_KEY: 'koreanAppProgress'
};

// App state
let currentTab = APP_CONFIG.DEFAULT_TAB;
let currentCategory = APP_CONFIG.DEFAULT_CATEGORY;
let quizScore = 0;
let totalQuestions = APP_CONFIG.QUIZ_TOTAL_QUESTIONS;
let currentQuestionIndex = 0;

// User progress data
let userProgress = JSON.parse(localStorage.getItem(APP_CONFIG.STORAGE_KEY)) || {
    vocabularyLearned: [],
    grammarLearned: [],
    quizScores: [],
    totalStudyTime: 0,
    achievements: [],
    lastStudyDate: null
};

// Vocabulary data storage
let vocabularyData = {};
let categories = [];
let allWords = [];
let currentWordIndex = 0;

// ===== API FUNCTIONS =====
// Load categories from API
async function loadCategories() {
    try {
        const response = await fetch('/api/categories');
        if (!response.ok) throw new Error('Failed to load categories');
        categories = await response.json();
        return categories;
    } catch (error) {
        console.error('Error loading categories:', error);
        return [];
    }
}

// Load words by category from API
async function loadWords(categoryName) {
    try {
        const response = await fetch(`/api/words/${categoryName}`);
        if (!response.ok) throw new Error(`Failed to load words for ${categoryName}`);
        const words = await response.json();
        return words;
    } catch (error) {
        console.error(`Error loading words for ${categoryName}:`, error);
        return [];
    }
}

// Load all words from API
async function loadAllWords() {
    try {
        const response = await fetch('/api/words');
        if (!response.ok) throw new Error('Failed to load all words');
        allWords = await response.json();
        return allWords;
        } catch (error) {
        console.error('Error loading all words:', error);
        return [];
    }
}

// Search words from API
async function searchWords(query) {
    try {
        const response = await fetch(`/api/search/${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error('Failed to search words');
        const results = await response.json();
        return results;
    } catch (error) {
        console.error('Error searching words:', error);
        return [];
    }
}

// ===== VOCABULARY FUNCTIONS =====
// Load vocabulary data from API
async function loadVocabularyData() {
    try {
        const loadedCategories = await loadCategories();
        for (const category of loadedCategories) {
            const words = await loadWords(category.name);
            vocabularyData[category.name] = words;
        }
        console.log('Vocabulary data loaded successfully');
    } catch (error) {
        console.error('Error loading vocabulary data:', error);
    }
}

// Display vocabulary words
function displayVocabularyWords(category) {
    const content = document.getElementById('vocabulary-content');
    if (!content) return;

    const words = vocabularyData[category] || [];
    currentWordIndex = 0;
    
    content.innerHTML = `
        <div class="vocabulary-header">
            <h3>${category.charAt(0).toUpperCase() + category.slice(1)} Vocabulary</h3>
            <div class="vocabulary-stats">
                <span id="word-counter">1 / ${words.length}</span>
            </div>
        </div>
        <div class="vocabulary-card-container">
            <div class="vocabulary-card" id="current-word-card" onclick="nextWord()">
                <div class="korean-word" id="korean-word">${words[0]?.korean || 'Loading...'}</div>
                <div class="romanization" id="romanization">${words[0]?.romanization || ''}</div>
                <div class="translations">
                    <div class="filipino" id="filipino">${words[0]?.filipino || ''}</div>
                    <div class="english" id="english">${words[0]?.english || ''}</div>
                </div>
                <div class="word-actions">
                    <button class="play-btn korean-audio" data-action="play-korean" data-word="${words[0]?.korean || ''}">
                        <i class="fas fa-volume-up"></i>
                        <span>한국어</span>
                    </button>
                    <button class="play-btn filipino-audio" data-action="play-filipino" data-word="${words[0]?.filipino || ''}">
                        <i class="fas fa-volume-up"></i>
                        <span>Filipino</span>
                    </button>
                    <button class="learn-btn" data-action="learn" data-word-id="${words[0]?.id || 0}">
                        <i class="fas fa-check"></i>
                    </button>
                </div>
                <div class="next-hint">Click anywhere to see next word</div>
            </div>
            </div>
        `;
}

// Play pronunciation
function playPronunciation(word, lang = 'ko-KR') {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = lang;
        utterance.rate = 0.8;
        
        // 언어별 음성 설정
        if (lang === 'ko-KR') {
            utterance.pitch = 1.0;
            utterance.volume = 0.9;
        } else if (lang === 'fil-PH') {
            utterance.pitch = 1.1;
            utterance.volume = 0.9;
        }
        
        speechSynthesis.speak(utterance);
    }
}

// Toggle word learned status
function toggleWordLearned(wordId) {
    const index = userProgress.vocabularyLearned.indexOf(wordId);
    if (index > -1) {
        userProgress.vocabularyLearned.splice(index, 1);
    } else {
        userProgress.vocabularyLearned.push(wordId);
    }
    saveProgress();
    updateVocabularyDisplay();
}

// Next word function
function nextWord() {
    const words = vocabularyData[currentCategory] || [];
    if (words.length === 0) return;
    
    currentWordIndex = (currentWordIndex + 1) % words.length;
    const word = words[currentWordIndex];
    
    // Update word counter
    const counter = document.getElementById('word-counter');
    if (counter) {
        counter.textContent = `${currentWordIndex + 1} / ${words.length}`;
    }
    
    // Update word content
    const koreanWord = document.getElementById('korean-word');
    const romanization = document.getElementById('romanization');
    const filipino = document.getElementById('filipino');
    const english = document.getElementById('english');
    const playBtn = document.querySelector('.play-btn');
    const learnBtn = document.querySelector('.learn-btn');
    
    if (koreanWord) koreanWord.textContent = word.korean;
    if (romanization) romanization.textContent = word.romanization;
    if (filipino) filipino.textContent = word.filipino;
    if (english) english.textContent = word.english;
    
    // Update button onclick events
    const koreanBtn = document.querySelector('.korean-audio');
    const filipinoBtn = document.querySelector('.filipino-audio');
    
    if (koreanBtn) {
        koreanBtn.setAttribute('data-word', word.korean);
    }
    if (filipinoBtn) {
        filipinoBtn.setAttribute('data-word', word.filipino);
    }
    if (learnBtn) {
        learnBtn.setAttribute('data-word-id', word.id);
    }
    
    // Update learned status
    updateCurrentWordStatus();
}

// Update current word status
function updateCurrentWordStatus() {
    const words = vocabularyData[currentCategory] || [];
    if (words.length === 0) return;
    
    const word = words[currentWordIndex];
    const isLearned = userProgress.vocabularyLearned.includes(word.id);
    const learnBtn = document.querySelector('.learn-btn');
    const card = document.getElementById('current-word-card');
    
    if (isLearned) {
        if (card) card.classList.add('learned');
        if (learnBtn) learnBtn.innerHTML = '<i class="fas fa-check-circle"></i>';
        } else {
        if (card) card.classList.remove('learned');
        if (learnBtn) learnBtn.innerHTML = '<i class="fas fa-check"></i>';
    }
}

// Update vocabulary display
function updateVocabularyDisplay() {
    updateCurrentWordStatus();
}

// ===== GRAMMAR FUNCTIONS =====
// Grammar data from SQLite
let grammarData = {
    levels: [
        {
            id: 'beginner',
            name: 'Beginner (기초)',
            description: 'Basic Korean grammar fundamentals',
            color: '#3498db',
            lessons: []
        },
        {
            id: 'intermediate',
            name: 'Intermediate (중급)',
            description: 'More complex grammar patterns',
            color: '#f39c12',
            lessons: []
        },
        {
            id: 'advanced',
            name: 'Advanced (고급)',
            description: 'Complex grammar and expressions',
            color: '#e74c3c',
            lessons: []
        }
    ]
};

let currentGrammarLevel = 'beginner';
let currentLessonIndex = 0;
let currentLessonData = null;
let practiceQuestions = [];
let quizQuestions = [];

// Load grammar lessons from API
async function loadGrammarLessons(level) {
    try {
        const response = await fetch(`/api/grammar/lessons?level=${level}`);
        if (!response.ok) throw new Error('Failed to load grammar lessons');
        const lessons = await response.json();
        return lessons;
    } catch (error) {
        console.error('Error loading grammar lessons:', error);
        return [];
    }
}

// Load specific lesson data from API
async function loadLessonData(lessonId) {
    try {
        const response = await fetch(`/api/grammar/lesson/${lessonId}`);
        if (!response.ok) throw new Error('Failed to load lesson data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading lesson data:', error);
        return null;
    }
}

// Load practice questions from API
async function loadPracticeQuestions(level) {
    try {
        const response = await fetch(`/api/grammar/practice?level=${level}`);
        if (!response.ok) throw new Error('Failed to load practice questions');
        const questions = await response.json();
        return questions;
    } catch (error) {
        console.error('Error loading practice questions:', error);
        return [];
    }
}

// Load quiz questions from API
async function loadQuizQuestions(level) {
    try {
        const response = await fetch(`/api/grammar/quiz?level=${level}`);
        if (!response.ok) throw new Error('Failed to load quiz questions');
        const questions = await response.json();
        return questions;
    } catch (error) {
        console.error('Error loading quiz questions:', error);
        return [];
    }
}

// Display grammar content
async function displayGrammarContent(mode) {
    console.log('displayGrammarContent called with mode:', mode);
    const content = document.getElementById('grammar-content');
    if (!content) {
        console.error('grammar-content element not found');
        return;
    }
    
    console.log('Loading grammar data for level:', currentGrammarLevel);
    // Load all grammar data
    const lessons = await loadGrammarLessons(currentGrammarLevel);
    const practiceQuestions = await loadPracticeQuestions(currentGrammarLevel);
    const quizQuestions = await loadQuizQuestions(currentGrammarLevel);
    
    console.log('Loaded data:', { lessons: lessons.length, practice: practiceQuestions.length, quiz: quizQuestions.length });
    
    // Load current lesson data
    let currentLessonData = null;
    if (lessons.length > 0) {
        currentLessonData = await loadLessonData(lessons[currentLessonIndex].id);
    }

    content.innerHTML = `
        <div class="grammar-container">
            <!-- Level Selection -->
            <div class="grammar-levels">
                <h3>Grammar Levels</h3>
                <div class="level-tabs">
                    ${grammarData.levels.map(level => `
                        <button class="level-tab ${level.id === currentGrammarLevel ? 'active' : ''}" 
                                onclick="switchGrammarLevel('${level.id}')"
                                style="border-color: ${level.color}">
                            <div class="level-name">${level.name}</div>
                            <div class="level-description">${level.description}</div>
                        </button>
                    `).join('')}
                </div>
            </div>

            <!-- Lessons Section -->
            <div class="grammar-section">
                <h3>📚 Lessons (레슨)</h3>
                ${lessons.length > 0 ? `
                    <div class="lesson-content">
                        <div class="lesson-header">
                            <h4>${lessons[currentLessonIndex].title}</h4>
                            <div class="lesson-navigation">
                                <button class="nav-btn" onclick="previousLesson()" ${currentLessonIndex === 0 ? 'disabled' : ''}>
                                    <i class="fas fa-chevron-left"></i> Previous
                                </button>
                                <span class="lesson-counter">${currentLessonIndex + 1} / ${lessons.length}</span>
                                <button class="nav-btn" onclick="nextLesson()" ${currentLessonIndex === lessons.length - 1 ? 'disabled' : ''}>
                                    Next <i class="fas fa-chevron-right"></i>
                                </button>
                            </div>
                        </div>
                        
                        <div class="lesson-body">
                            ${currentLessonData ? renderLessonContentFromDB(currentLessonData) : 'Loading...'}
                        </div>
                    </div>
                ` : '<div class="error">No lessons available for this level.</div>'}
            </div>

            <!-- Practice Section -->
            <div class="grammar-section">
                <h3>✏️ Practice (연습)</h3>
                ${practiceQuestions.length > 0 ? `
                    <div class="practice-exercises">
                        ${practiceQuestions.map((question, index) => `
                            <div class="exercise-card">
                                <h4>${question.question_type.charAt(0).toUpperCase() + question.question_type.slice(1).replace('_', ' ')}</h4>
                                <div class="exercise-question">
                                    <p>${question.question}</p>
                                </div>
                                <div class="exercise-options">
                                    ${JSON.parse(question.options).map(option => `
                                        <button class="option-btn" data-action="practice-answer" data-option="${option}" data-correct="${question.correct_answer}" data-index="${index}">${option}</button>
                                    `).join('')}
                                </div>
                                <div class="exercise-feedback" id="exercise-feedback-${index}" style="display: none;"></div>
                            </div>
                        `).join('')}
                    </div>
                ` : '<div class="error">No practice questions available for this level.</div>'}
            </div>

            <!-- Quiz Section -->
            <div class="grammar-section">
                <h3>🧠 Quiz (퀴즈)</h3>
                ${quizQuestions.length > 0 ? `
                    <div class="quiz-container">
                        <div class="quiz-info">
                            <p>Test your knowledge with ${quizQuestions.length} questions!</p>
                            <button class="btn btn-primary" onclick="startQuiz()">Start Quiz</button>
                        </div>
                        <div id="quiz-content" style="display: none;"></div>
                    </div>
                ` : '<div class="error">No quiz questions available for this level.</div>'}
            </div>
        </div>
    `;

    // Store data globally for navigation
    window.currentGrammarLessons = lessons;
    window.currentPracticeQuestions = practiceQuestions;
    window.currentQuizQuestions = quizQuestions;
    window.currentLessonData = currentLessonData;
    
    // Make functions globally available
    window.switchGrammarLevel = switchGrammarLevel;
    window.previousLesson = previousLesson;
    window.nextLesson = nextLesson;
    window.startQuiz = startQuiz;
    window.checkPracticeAnswer = checkPracticeAnswer;
}

// Display grammar lessons
async function displayGrammarLessons() {
    const content = document.getElementById('grammar-content');
    const currentLevel = grammarData.levels.find(level => level.id === currentGrammarLevel);
    
    // Load lessons for current level
    const lessons = await loadGrammarLessons(currentGrammarLevel);
    currentLevel.lessons = lessons;
    
    if (lessons.length === 0) {
        content.innerHTML = '<div class="error">No lessons available for this level.</div>';
        return;
    }
    
    // Load current lesson data
    currentLessonData = await loadLessonData(lessons[currentLessonIndex].id);
    
    content.innerHTML = `
        <div class="grammar-lessons">
            <div class="grammar-levels">
                <h3>Grammar Levels</h3>
                <div class="level-tabs">
                    ${grammarData.levels.map(level => `
                        <button class="level-tab ${level.id === currentGrammarLevel ? 'active' : ''}" 
                                onclick="switchGrammarLevel('${level.id}')"
                                style="border-color: ${level.color}">
                            <div class="level-name">${level.name}</div>
                            <div class="level-description">${level.description}</div>
                        </button>
                    `).join('')}
                </div>
            </div>
            
            <div class="lesson-content">
                <div class="lesson-header">
                    <h4>${lessons[currentLessonIndex].title}</h4>
                    <div class="lesson-navigation">
                        <button class="nav-btn" onclick="previousLesson()" ${currentLessonIndex === 0 ? 'disabled' : ''}>
                            <i class="fas fa-chevron-left"></i> Previous
                        </button>
                        <span class="lesson-counter">${currentLessonIndex + 1} / ${lessons.length}</span>
                        <button class="nav-btn" onclick="nextLesson()" ${currentLessonIndex === lessons.length - 1 ? 'disabled' : ''}>
                            Next <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
                
                <div class="lesson-body">
                    ${currentLessonData ? renderLessonContentFromDB(currentLessonData) : 'Loading...'}
                </div>
            </div>
        </div>
    `;
}

// Render lesson content from database
function renderLessonContentFromDB(data) {
    const { lesson, examples, rules, particles, conjugations } = data;
    
    let html = `
        <div class="lesson-explanation">
            <p>${lesson.explanation}</p>
        </div>
    `;
    
    // Examples
    if (examples && examples.length > 0) {
        html += `
            <div class="lesson-examples">
                <h5>Examples (예시)</h5>
                ${examples.map(example => `
                    <div class="example-card">
                        <div class="example-korean">${example.korean}</div>
                        <div class="example-breakdown">${example.breakdown || ''}</div>
                        <div class="example-translation">${example.translation}</div>
                        <div class="example-filipino">${example.filipino}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    // Rules
    if (rules && rules.length > 0) {
        html += `
            <div class="lesson-rules">
                <h5>Rules (규칙)</h5>
                <ul>
                    ${rules.map(rule => `<li>${rule.rule_text}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    // Particles
    if (particles && particles.length > 0) {
        html += `
            <div class="lesson-particles">
                <h5>Particles (조사)</h5>
                ${particles.map(particle => `
                    <div class="particle-card">
                        <div class="particle-header">
                            <span class="particle">${particle.particle}</span>
                            <span class="particle-name">${particle.name}</span>
                        </div>
                        <div class="particle-usage">${particle.usage}</div>
                        <div class="particle-rule">${particle.rule_text}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    // Conjugations
    if (conjugations && conjugations.length > 0) {
        html += `
            <div class="lesson-conjugations">
                <h5>Conjugations (활용)</h5>
                <div class="conjugation-table">
                    ${conjugations.map(conj => `
                        <div class="conjugation-row">
                            <div class="tense">${conj.tense}</div>
                            <div class="forms">
                                <span class="informal">${conj.informal}</span>
                                <span class="formal">${conj.formal}</span>
                            </div>
                            <div class="example">${conj.example_verb}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    return html;
}

// Render lesson content (legacy function for compatibility)
function renderLessonContent(lesson) {
    const content = lesson.content;
    
    let html = `
        <div class="lesson-explanation">
            <p>${content.explanation}</p>
                </div>
            `;
    
    // Examples
    if (content.examples) {
        html += `
            <div class="lesson-examples">
                <h5>Examples (예시)</h5>
                ${content.examples.map(example => `
                    <div class="example-card">
                        <div class="example-korean">${example.korean}</div>
                        <div class="example-breakdown">${example.breakdown}</div>
                        <div class="example-translation">${example.translation}</div>
                        <div class="example-filipino">${example.filipino}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    // Rules
    if (content.rules) {
        html += `
            <div class="lesson-rules">
                <h5>Rules (규칙)</h5>
                <ul>
                    ${content.rules.map(rule => `<li>${rule}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    // Particles
    if (content.particles) {
        html += `
            <div class="lesson-particles">
                <h5>Particles (조사)</h5>
                ${content.particles.map(particle => `
                    <div class="particle-card">
                        <div class="particle-header">
                            <span class="particle">${particle.particle}</span>
                            <span class="particle-name">${particle.name}</span>
            </div>
                        <div class="particle-usage">${particle.usage}</div>
                        <div class="particle-examples">
                            ${particle.examples.map(example => `<div class="example">${example}</div>`).join('')}
                    </div>
                        <div class="particle-rule">${particle.rule}</div>
                    </div>
                `).join('')}
                </div>
        `;
    }
    
    // Conjugations
    if (content.conjugations) {
        html += `
            <div class="lesson-conjugations">
                <h5>Conjugations (활용)</h5>
                <div class="conjugation-table">
                    ${content.conjugations.map(conj => `
                        <div class="conjugation-row">
                            <div class="tense">${conj.tense}</div>
                            <div class="forms">
                                <span class="informal">${conj.informal}</span>
                                <span class="formal">${conj.formal}</span>
                    </div>
                            <div class="example">${conj.example}</div>
                    </div>
                    `).join('')}
            </div>
        </div>
    `;
    }
    
    return html;
}

// Switch grammar level
function switchGrammarLevel(levelId) {
    console.log('switchGrammarLevel called with:', levelId);
    currentGrammarLevel = levelId;
    currentLessonIndex = 0;
    displayGrammarContent();
}

// Previous lesson
async function previousLesson() {
    if (currentLessonIndex > 0) {
        currentLessonIndex--;
        await displayGrammarContent();
    }
}

// Next lesson
async function nextLesson() {
    if (window.currentGrammarLessons && currentLessonIndex < window.currentGrammarLessons.length - 1) {
        currentLessonIndex++;
        await displayGrammarContent();
    }
}

// Start quiz
async function startQuiz() {
    const quizContent = document.getElementById('quiz-content');
    const quizInfo = document.querySelector('.quiz-info');
    
    if (!window.currentQuizQuestions || window.currentQuizQuestions.length === 0) {
        return;
    }
    
    let currentQuizIndex = 0;
    let correctAnswers = 0;
    
    function renderQuiz() {
        const question = window.currentQuizQuestions[currentQuizIndex];
        const progress = ((currentQuizIndex + 1) / window.currentQuizQuestions.length) * 100;
        
        quizContent.innerHTML = `
            <div class="quiz-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress}%"></div>
                </div>
                <span class="progress-text">Question ${currentQuizIndex + 1} of ${window.currentQuizQuestions.length}</span>
            </div>
            
            <div class="quiz-question">
                <h4>${question.question}</h4>
            </div>
            
            <div class="quiz-options">
                ${JSON.parse(question.options).map(option => `
                    <button class="option-btn" onclick="checkQuizAnswer('${option}', '${question.correct_answer}', this, ${currentQuizIndex})">${option}</button>
                `).join('')}
            </div>
            
            <div class="quiz-feedback" id="quiz-feedback-${currentQuizIndex}" style="display: none;"></div>
            
            <div class="quiz-controls">
                <button class="btn btn-primary" onclick="nextQuizQuestion()" id="next-btn" style="display: none;">Next Question</button>
                <button class="btn btn-secondary" onclick="resetQuiz()">Reset Quiz</button>
            </div>
        `;
        
        quizContent.style.display = 'block';
        quizInfo.style.display = 'none';
    }
    
    // Make functions available globally
    window.nextQuizQuestion = function() {
        if (currentQuizIndex < window.currentQuizQuestions.length - 1) {
            currentQuizIndex++;
            renderQuiz();
        } else {
            // Quiz completed
            const score = (correctAnswers / window.currentQuizQuestions.length) * 100;
            quizContent.innerHTML = `
                <div class="quiz-results">
                    <h3>Quiz Completed!</h3>
                    <div class="score-display">
                        <h2>Your Score: ${score.toFixed(1)}%</h2>
                        <p>Correct Answers: ${correctAnswers} / ${window.currentQuizQuestions.length}</p>
                    </div>
                    <div class="quiz-controls">
                        <button class="btn btn-primary" onclick="startQuiz()">Try Again</button>
                        <button class="btn btn-secondary" onclick="resetQuiz()">Back to Quiz</button>
                    </div>
                </div>
            `;
        }
    };
    
    window.resetQuiz = function() {
        currentQuizIndex = 0;
        correctAnswers = 0;
        quizContent.style.display = 'none';
        quizInfo.style.display = 'block';
    };
    
    window.checkQuizAnswer = function(selectedAnswer, correctAnswer, button, questionIndex) {
        const isCorrect = selectedAnswer === correctAnswer;
        if (isCorrect) correctAnswers++;
        
        // Disable all buttons
        const allButtons = document.querySelectorAll('.quiz-options .option-btn');
        allButtons.forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === correctAnswer) {
                btn.classList.add('correct');
            } else if (btn.textContent === selectedAnswer && !isCorrect) {
                btn.classList.add('incorrect');
            }
        });
        
        // Show feedback
        const feedback = document.getElementById(`quiz-feedback-${questionIndex}`);
        feedback.style.display = 'block';
        feedback.className = `quiz-feedback ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`;
        feedback.innerHTML = `
            <strong>${isCorrect ? 'Correct!' : 'Incorrect!'}</strong><br>
            ${isCorrect ? 'Well done!' : `The correct answer is: ${correctAnswer}`}
        `;
        
        // Show next button
        document.getElementById('next-btn').style.display = 'inline-block';
    };
    
    renderQuiz();
}

// Display grammar practice
async function displayGrammarPractice() {
    const content = document.getElementById('grammar-content');
    
    // Load practice questions
    practiceQuestions = await loadPracticeQuestions(currentGrammarLevel);
    
    if (practiceQuestions.length === 0) {
        content.innerHTML = '<div class="error">No practice questions available for this level.</div>';
        return;
    }
    
    content.innerHTML = `
        <div class="grammar-practice">
            <h3>Grammar Practice - ${currentGrammarLevel.charAt(0).toUpperCase() + currentGrammarLevel.slice(1)} Level</h3>
            <div class="practice-exercises">
                ${practiceQuestions.map((question, index) => `
                    <div class="exercise-card">
                        <h4>${question.question_type.charAt(0).toUpperCase() + question.question_type.slice(1).replace('_', ' ')}</h4>
                        <div class="exercise-question">
                            <p>${question.question}</p>
                        </div>
                        <div class="exercise-options">
                            ${JSON.parse(question.options).map(option => `
                                <button class="option-btn" onclick="checkPracticeAnswer('${option}', '${question.correct_answer}', this, ${index})">${option}</button>
                            `).join('')}
                        </div>
                        <div class="exercise-feedback" id="exercise-feedback-${index}" style="display: none;"></div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Display grammar quiz
async function displayGrammarQuiz() {
    const content = document.getElementById('grammar-content');
    
    // Load quiz questions
    quizQuestions = await loadQuizQuestions(currentGrammarLevel);
    
    if (quizQuestions.length === 0) {
        content.innerHTML = '<div class="error">No quiz questions available for this level.</div>';
        return;
    }
    
    let currentQuizIndex = 0;
    let correctAnswers = 0;
    
    function renderQuiz() {
        const question = quizQuestions[currentQuizIndex];
        const progress = ((currentQuizIndex + 1) / quizQuestions.length) * 100;
        
        content.innerHTML = `
            <div class="grammar-quiz">
                <h3>Grammar Quiz - ${currentGrammarLevel.charAt(0).toUpperCase() + currentGrammarLevel.slice(1)} Level</h3>
                <div class="quiz-container">
                    <div class="quiz-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progress}%"></div>
                        </div>
                        <span class="progress-text">Question ${currentQuizIndex + 1} of ${quizQuestions.length}</span>
                    </div>
                    
                    <div class="quiz-question">
                        <h4>${question.question}</h4>
                    </div>
                    
                    <div class="quiz-options">
                        ${JSON.parse(question.options).map(option => `
                            <button class="option-btn" onclick="checkQuizAnswer('${option}', '${question.correct_answer}', this, ${currentQuizIndex})">${option}</button>
                        `).join('')}
                    </div>
                    
                    <div class="quiz-feedback" id="quiz-feedback-${currentQuizIndex}" style="display: none;"></div>
                    
                    <div class="quiz-controls">
                        <button class="btn btn-primary" onclick="nextQuizQuestion()" id="next-btn" style="display: none;">Next Question</button>
                        <button class="btn btn-secondary" onclick="resetQuiz()">Reset Quiz</button>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Make functions available globally
    window.nextQuizQuestion = function() {
        if (currentQuizIndex < quizQuestions.length - 1) {
            currentQuizIndex++;
            renderQuiz();
    } else {
            // Quiz completed
            const score = (correctAnswers / quizQuestions.length) * 100;
            content.innerHTML = `
                <div class="quiz-results">
                    <h3>Quiz Completed!</h3>
                    <div class="score-display">
                        <h2>Your Score: ${score.toFixed(1)}%</h2>
                        <p>Correct Answers: ${correctAnswers} / ${quizQuestions.length}</p>
                    </div>
                    <div class="quiz-controls">
                        <button class="btn btn-primary" onclick="displayGrammarQuiz()">Try Again</button>
                        <button class="btn btn-secondary" onclick="displayGrammarContent('lessons')">Back to Lessons</button>
                    </div>
                </div>
            `;
        }
    };
    
    window.resetQuiz = function() {
        currentQuizIndex = 0;
        correctAnswers = 0;
        renderQuiz();
    };
    
    window.checkQuizAnswer = function(selectedAnswer, correctAnswer, button, questionIndex) {
        const isCorrect = selectedAnswer === correctAnswer;
        if (isCorrect) correctAnswers++;
        
        // Disable all buttons
        const allButtons = document.querySelectorAll('.quiz-options .option-btn');
        allButtons.forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === correctAnswer) {
                btn.classList.add('correct');
            } else if (btn.textContent === selectedAnswer && !isCorrect) {
                btn.classList.add('incorrect');
            }
        });
        
        // Show feedback
        const feedback = document.getElementById(`quiz-feedback-${questionIndex}`);
        feedback.style.display = 'block';
        feedback.className = `quiz-feedback ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`;
        feedback.innerHTML = `
            <strong>${isCorrect ? 'Correct!' : 'Incorrect!'}</strong><br>
            ${isCorrect ? 'Well done!' : `The correct answer is: ${correctAnswer}`}
        `;
        
        // Show next button
        document.getElementById('next-btn').style.display = 'inline-block';
    };
    
    renderQuiz();
}

// Check grammar practice answer
function checkPracticeAnswer(selectedAnswer, correctAnswer, button, questionIndex) {
    const isCorrect = selectedAnswer === correctAnswer;
    
    // Disable all buttons for this question
    const questionCard = button.closest('.exercise-card');
    const allButtons = questionCard.querySelectorAll('.option-btn');
    allButtons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === correctAnswer) {
            btn.classList.add('correct');
        } else if (btn.textContent === selectedAnswer && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });
    
    // Show feedback
    const feedback = document.getElementById(`exercise-feedback-${questionIndex}`);
    feedback.style.display = 'block';
    feedback.className = `exercise-feedback ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`;
    feedback.innerHTML = `
        <strong>${isCorrect ? 'Correct!' : 'Incorrect!'}</strong><br>
        ${isCorrect ? 'Well done!' : `The correct answer is: ${correctAnswer}`}
    `;
}

// Legacy function for compatibility
function checkAnswer(answer, button) {
    const feedback = document.getElementById('exercise-feedback');
    const correctAnswer = '집에서';
    
    if (answer === correctAnswer) {
        button.classList.add('correct');
        feedback.innerHTML = '<div class="feedback-correct">Correct! 집에서 means "at home"</div>';
    } else {
        button.classList.add('incorrect');
        feedback.innerHTML = '<div class="feedback-incorrect">Incorrect. The correct answer is "집에서"</div>';
    }
}

// Check quiz answer
function checkQuizAnswer(answer, button) {
    const feedback = document.getElementById('quiz-feedback');
    const correctAnswer = '이/가';
    
    if (answer === correctAnswer) {
        button.classList.add('correct');
        feedback.innerHTML = '<div class="feedback-correct">Correct! 이/가 is used for the subject</div>';
    } else {
        button.classList.add('incorrect');
        feedback.innerHTML = '<div class="feedback-incorrect">Incorrect. The correct answer is "이/가"</div>';
    }
}

// ===== UTILITY FUNCTIONS =====
// Save progress to localStorage
function saveProgress() {
    userProgress.lastStudyDate = new Date().toISOString();
    localStorage.setItem(APP_CONFIG.STORAGE_KEY, JSON.stringify(userProgress));
}

// Initialize app
async function initializeApp() {
    console.log('Initializing Korean Learning App...');
    
    // Load vocabulary data
    await loadVocabularyData();
    
    // Set up event listeners
    setupEventListeners();
    
    // Display initial content
    displayVocabularyWords(currentCategory);
    displayGrammarContent('lessons');
    
    console.log('App initialized successfully');
}

// Set up event listeners
function setupEventListeners() {
    // Tab navigation
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            const tabName = e.currentTarget.dataset.tab;
            switchTab(tabName);
        });
    });

    // Vocabulary category selection
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const category = e.currentTarget.dataset.category;
            selectVocabularyCategory(category);
        });
    });

    // Grammar mode selection
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const mode = e.currentTarget.dataset.mode;
            selectGrammarMode(mode);
        });
    });

    // Vocabulary word actions
    document.addEventListener('click', (e) => {
        if (e.target.closest('.play-btn.korean-audio')) {
            e.stopPropagation();
            const word = e.target.closest('.play-btn.korean-audio').dataset.word;
            playPronunciation(word, 'ko-KR');
        } else if (e.target.closest('.play-btn.filipino-audio')) {
            e.stopPropagation();
            const word = e.target.closest('.play-btn.filipino-audio').dataset.word;
            playPronunciation(word, 'fil-PH');
        } else if (e.target.closest('.learn-btn')) {
            e.stopPropagation();
            const wordId = e.target.closest('.learn-btn').dataset.wordId;
            toggleWordLearned(parseInt(wordId));
        } else if (e.target.closest('.option-btn[data-action="practice-answer"]')) {
            e.stopPropagation();
            const btn = e.target.closest('.option-btn[data-action="practice-answer"]');
            const option = btn.dataset.option;
            const correct = btn.dataset.correct;
            const index = parseInt(btn.dataset.index);
            checkPracticeAnswer(option, correct, btn, index);
        }
    });
}

// Switch tab
function switchTab(tabName) {
    // Update active tab
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    // Update active content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');

    currentTab = tabName;

    // Load grammar content when grammar tab is selected
    if (tabName === 'grammar') {
        console.log('Grammar tab selected, loading content...');
        setTimeout(() => {
            displayGrammarContent();
        }, 100);
    }
}

// Select vocabulary category
function selectVocabularyCategory(category) {
    // Update active category button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');

    currentCategory = category;
    displayVocabularyWords(category);
}

// Select grammar mode
function selectGrammarMode(mode) {
    // Update active mode button
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-mode="${mode}"]`).classList.add('active');

    displayGrammarContent(mode);
}

// Test function for grammar
function testGrammar() {
    console.log('Test Grammar function called!');
    displayGrammarContent();
}

// ===== INITIALIZATION =====
// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);
