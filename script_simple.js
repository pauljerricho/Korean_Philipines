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
    
    content.innerHTML = `
        <div class="vocabulary-header">
            <h3>${category.charAt(0).toUpperCase() + category.slice(1)} Vocabulary</h3>
            <div class="vocabulary-stats">
                <span>${words.length} words</span>
            </div>
        </div>
        <div class="vocabulary-grid">
            ${words.map(word => `
                <div class="vocabulary-card" data-word-id="${word.id}">
                    <div class="korean-word">${word.korean}</div>
                    <div class="romanization">${word.romanization}</div>
                    <div class="translations">
                        <div class="filipino">${word.filipino}</div>
                        <div class="english">${word.english}</div>
                    </div>
                    <div class="word-actions">
                        <button class="play-btn" onclick="playPronunciation('${word.korean}')">
                            <i class="fas fa-volume-up"></i>
                        </button>
                        <button class="learn-btn" onclick="toggleWordLearned(${word.id})">
                            <i class="fas fa-check"></i>
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Play pronunciation
function playPronunciation(koreanWord) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(koreanWord);
        utterance.lang = 'ko-KR';
        utterance.rate = 0.8;
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

// Update vocabulary display
function updateVocabularyDisplay() {
    const cards = document.querySelectorAll('.vocabulary-card');
    cards.forEach(card => {
        const wordId = parseInt(card.dataset.wordId);
        const isLearned = userProgress.vocabularyLearned.includes(wordId);
        const learnBtn = card.querySelector('.learn-btn');
        
        if (isLearned) {
            card.classList.add('learned');
            learnBtn.innerHTML = '<i class="fas fa-check-circle"></i>';
        } else {
            card.classList.remove('learned');
            learnBtn.innerHTML = '<i class="fas fa-check"></i>';
        }
    });
}

// ===== GRAMMAR FUNCTIONS =====
// Display grammar content
function displayGrammarContent(mode) {
    const content = document.getElementById('grammar-content');
    if (!content) return;

    switch (mode) {
        case 'lessons':
            content.innerHTML = `
                <div class="grammar-lessons">
                    <h3>Grammar Lessons</h3>
                    <div class="lesson-list">
                        <div class="lesson-item">
                            <h4>1. Basic Sentence Structure</h4>
                            <p>Learn the fundamental Korean sentence pattern: Subject + Object + Verb</p>
                            <div class="lesson-example">
                                <div class="example-korean">저는 한국어를 공부합니다.</div>
                                <div class="example-translation">I study Korean.</div>
                            </div>
                        </div>
                        <div class="lesson-item">
                            <h4>2. Particles (조사)</h4>
                            <p>Master essential particles like 이/가, 을/를, 에, 에서</p>
                            <div class="lesson-example">
                                <div class="example-korean">저는 학교에 갑니다.</div>
                                <div class="example-translation">I go to school.</div>
                            </div>
                        </div>
                        <div class="lesson-item">
                            <h4>3. Verb Conjugation</h4>
                            <p>Learn how to conjugate Korean verbs in different tenses</p>
                            <div class="lesson-example">
                                <div class="example-korean">가다 → 갑니다 (present), 갔습니다 (past)</div>
                                <div class="example-translation">go → go (present), went (past)</div>
                            </div>
                        </div>
                        <div class="lesson-item">
                            <h4>4. Honorifics (존댓말)</h4>
                            <p>Understand Korean honorific system and polite speech</p>
                            <div class="lesson-example">
                                <div class="example-korean">안녕하세요 (formal) vs 안녕 (informal)</div>
                                <div class="example-translation">Hello (formal) vs Hi (informal)</div>
                            </div>
                        </div>
                        <div class="lesson-item">
                            <h4>5. Question Formation</h5>
                            <p>Learn how to form questions in Korean</p>
                            <div class="lesson-example">
                                <div class="example-korean">어디에 가세요? (Where are you going?)</div>
                                <div class="example-translation">Where are you going?</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'practice':
            content.innerHTML = `
                <div class="grammar-practice">
                    <h3>Grammar Practice</h3>
                    <div class="practice-exercise">
                        <div class="exercise-question">
                            <h4>Complete the sentence:</h4>
                            <p>저는 _____ 한국어를 공부합니다.</p>
                        </div>
                        <div class="exercise-options">
                            <button class="option-btn" onclick="checkAnswer('학교에서', this)">학교에서</button>
                            <button class="option-btn" onclick="checkAnswer('집에서', this)">집에서</button>
                            <button class="option-btn" onclick="checkAnswer('도서관에서', this)">도서관에서</button>
                        </div>
                        <div class="exercise-feedback" id="exercise-feedback"></div>
                    </div>
                </div>
            `;
            break;
        case 'quiz':
            content.innerHTML = `
                <div class="grammar-quiz">
                    <h3>Grammar Quiz</h3>
                    <div class="quiz-question">
                        <h4>Question 1 of 5</h4>
                        <p>Which particle is used to indicate the subject of a sentence?</p>
                    </div>
                    <div class="quiz-options">
                        <button class="option-btn" onclick="checkQuizAnswer('이/가', this)">이/가</button>
                        <button class="option-btn" onclick="checkQuizAnswer('을/를', this)">을/를</button>
                        <button class="option-btn" onclick="checkQuizAnswer('에', this)">에</button>
                        <button class="option-btn" onclick="checkQuizAnswer('에서', this)">에서</button>
                    </div>
                    <div class="quiz-feedback" id="quiz-feedback"></div>
                </div>
            `;
            break;
    }
}

// Check grammar practice answer
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

// ===== INITIALIZATION =====
// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);
