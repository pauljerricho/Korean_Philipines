/**
 * Korean Language Learning App for Philippines
 * Main JavaScript file
 */

// ===== GLOBAL VARIABLES =====
const APP_CONFIG = {
    VERSION: '1.0.0',
    DEFAULT_TAB: 'home',
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
    hangulLearned: [],
    quizScores: [],
    writingPractice: [],
    totalStudyTime: 0,
    achievements: [],
    lastStudyDate: null
};

// Speech API
let speechSynthesis = window.speechSynthesis;
let speechRecognition = null;
let speechConfig = null;
let synthesizer = null;

// Vocabulary data storage
let vocabularyData = {};

// ===== SPEECH SERVICES =====
// Initialize Azure Speech Services
async function initializeAzureSpeech() {
    try {
        if (typeof sdk !== 'undefined' && CONFIG.AZURE_SPEECH_KEY && CONFIG.AZURE_SPEECH_REGION) {
            const speechConfig = sdk.SpeechConfig.fromSubscription(CONFIG.AZURE_SPEECH_KEY, CONFIG.AZURE_SPEECH_REGION);
            synthesizer = new sdk.SpeechSynthesizer(speechConfig);
            // Azure Speech Services initialized successfully
            return true;
        }
    } catch (error) {
        // Azure Speech Services not available, using fallback
    }
    return false;
}

// Initialize speech recognition
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    speechRecognition = new SpeechRecognition();
    speechRecognition.continuous = false;
    speechRecognition.interimResults = false;
    speechRecognition.lang = 'ko-KR';
}

// Quiz questions data
const quizQuestions = [
    {
        question: "What does '안녕하세요' mean?",
        options: ["Hello (formal)", "Thank you", "Goodbye", "Sorry"],
        correct: 0
    },
    {
        question: "What does '감사합니다' mean?",
        options: ["Hello", "Thank you", "Goodbye", "Please"],
        correct: 1
    },
    {
        question: "What does '사랑해요' mean?",
        options: ["I love you", "I hate you", "I like you", "I miss you"],
        correct: 0
    },
    {
        question: "What does '죄송합니다' mean?",
        options: ["Thank you", "Hello", "Sorry", "Goodbye"],
        correct: 2
    },
    {
        question: "What does '고맙습니다' mean?",
        options: ["Hello", "Thank you", "Sorry", "Please"],
        correct: 1
    },
    {
        question: "What does '안녕' mean?",
        options: ["Hello (informal)", "Thank you", "Goodbye (informal)", "Sorry"],
        correct: 0
    },
    {
        question: "What does '사과' mean?",
        options: ["Apple", "Banana", "Orange", "Grape"],
        correct: 0
    },
    {
        question: "What does '물' mean?",
        options: ["Food", "Water", "Milk", "Juice"],
        correct: 1
    },
    {
        question: "What does '집' mean?",
        options: ["School", "House", "Office", "Store"],
        correct: 1
    },
    {
        question: "What does '학교' mean?",
        options: ["House", "School", "Office", "Hospital"],
        correct: 1
    },
    {
        question: "What does '빨간색' mean?",
        options: ["Blue", "Red", "Green", "Yellow"],
        correct: 1
    },
    {
        question: "What does '가족' mean?",
        options: ["Friends", "Family", "Work", "School"],
        correct: 1
    },
    {
        question: "What does '오늘' mean?",
        options: ["Yesterday", "Today", "Tomorrow", "Week"],
        correct: 1
    },
    {
        question: "What does '음식' mean?",
        options: ["Drink", "Food", "Water", "Money"],
        correct: 1
    },
    {
        question: "What does '시간' mean?",
        options: ["Money", "Time", "Place", "Person"],
        correct: 1
    },
    {
        question: "What does '병원' mean?",
        options: ["School", "Hospital", "Bank", "Store"],
        correct: 1
    },
    {
        question: "What does '하나' mean?",
        options: ["Two", "One", "Three", "Four"],
        correct: 1
    },
    {
        question: "What does '아버지' mean?",
        options: ["Mother", "Father", "Brother", "Sister"],
        correct: 1
    },
    {
        question: "What does '어머니' mean?",
        options: ["Father", "Mother", "Brother", "Sister"],
        correct: 1
    },
    {
        question: "What does '내일' mean?",
        options: ["Yesterday", "Today", "Tomorrow", "Week"],
        correct: 2
    }
];

// Vocabulary data is already declared at the top

// ===== DATA MANAGEMENT =====
// Load vocabulary data from JSON files
async function loadVocabularyData() {
    const categories = ['greetings', 'family', 'food', 'numbers', 'colors', 'time', 'places', 'emotions', 'weather', 'shopping'];
    
    // Loading vocabulary data...
    
    for (const category of categories) {
        try {
            // Loading category data...
            const response = await fetch(`data/${category}.json`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            vocabularyData[category] = data.words || [];
            // Data loaded successfully
        } catch (error) {
            // Could not load category data, using empty array
            vocabularyData[category] = [];
        }
    }
    
    // Vocabulary data loading complete
}

// ===== APP INITIALIZATION =====
// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

async function initializeApp() {
    // Load vocabulary data first
    await loadVocabularyData();
    // Vocabulary data loaded successfully
    
    setupTabNavigation();
    setupVocabularyCategories();
    setupHangulCards();
    setupGrammarCards();
    setupWritingCards();
    setupQuiz();
    setupAudioButtons();
    setupWritingPractice();
    setupProgressDashboard();
    setupVoiceControls();
    setupDonationSystem();
    await initializeAzureSpeech();
    loadVocabulary(currentCategory);
}

// ===== NAVIGATION =====
// Tab navigation
function setupTabNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
}

function switchTab(tabId) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Add active class to selected tab and content
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    document.getElementById(tabId).classList.add('active');
    
    currentTab = tabId;
    
    // Load content based on tab
    if (tabId === 'quiz') {
        loadQuiz();
    }
}

// Vocabulary categories
function setupVocabularyCategories() {
    // Setting up vocabulary categories...
    
    // Use event delegation for all category buttons
    document.addEventListener('click', function(e) {
        // Check if the clicked element or its parent is a category button
        const categoryBtn = e.target.closest('.category-btn');
        if (categoryBtn) {
            e.preventDefault();
            e.stopPropagation();
            
            const category = categoryBtn.getAttribute('data-category');
            console.log('Category button clicked:', category);
            
            if (category) {
                switchVocabularyCategory(category);
            } else {
                console.error('No category found for button:', categoryBtn);
            }
        }
    });
    
    console.log('Vocabulary categories setup complete');
}

function switchVocabularyCategory(category) {
    console.log('Switching to category:', category);
    
    // Remove active class from all category buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to selected button
    const selectedBtn = document.querySelector(`[data-category="${category}"]`);
    if (selectedBtn) {
        selectedBtn.classList.add('active');
        console.log('Button activated for category:', category);
    } else {
        console.error('Button not found for category:', category);
    }
    
    currentCategory = category;
    loadVocabulary(category);
}

function loadVocabulary(category) {
    console.log('Loading vocabulary for category:', category);
    const vocabularyContent = document.getElementById('vocabulary-content');
    const words = vocabularyData[category];
    
    console.log('Words found:', words ? words.length : 0);
    
    if (!words || words.length === 0) {
        vocabularyContent.innerHTML = `<div class="vocabulary-category active" id="${category}">
            <p>Loading vocabulary for ${category}...</p>
        </div>`;
        return;
    }
    
    let html = `<div class="vocabulary-category active" id="${category}">`;
    
    words.forEach(word => {
        html += `
            <div class="vocab-item">
                <div class="korean-word">${word.korean}</div>
                <div class="romanization">${word.romanization}</div>
                <div class="filipino-translation">${word.filipino}</div>
                <div class="english-translation">${word.english}</div>
            </div>
        `;
    });
    
    html += '</div>';
    vocabularyContent.innerHTML = html;
    console.log('Vocabulary loaded successfully');
}

// Hangul cards interaction
function setupHangulCards() {
    // Setup mode switching
    setupHangulModes();
    
    // Setup category switching
    setupHangulCategories();
    
    // Setup learning functionality
    setupHangulLearning();
    
    // Setup practice mode
    setupHangulPractice();
    
    // Setup quiz mode
    setupHangulQuiz();
    
    // Setup writing mode
    setupHangulWriting();
    
    // Update progress
    updateHangulProgress();
}

// Hangul mode switching
function setupHangulModes() {
    const modeBtns = document.querySelectorAll('.mode-btn');
    
    modeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const mode = this.getAttribute('data-mode');
            switchHangulMode(mode);
        });
    });
}

function switchHangulMode(mode) {
    // Remove active class from all mode buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to selected mode button
    const selectedBtn = document.querySelector(`[data-mode="${mode}"]`);
    if (selectedBtn) {
        selectedBtn.classList.add('active');
    }
    
    // Hide all mode content
    document.querySelectorAll('.hangul-mode-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Show selected mode content
    const selectedContent = document.getElementById(`${mode}-mode`);
    if (selectedContent) {
        selectedContent.classList.add('active');
    }
    
    // Initialize mode-specific functionality
    if (mode === 'practice') {
        initializePracticeMode();
    } else if (mode === 'quiz') {
        initializeQuizMode();
    } else if (mode === 'writing') {
        initializeWritingMode();
    }
}

// Hangul category switching
function setupHangulCategories() {
    const categoryBtns = document.querySelectorAll('.hangul-category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            switchHangulCategory(category);
        });
    });
}

function switchHangulCategory(category) {
    // Remove active class from all category buttons
    document.querySelectorAll('.hangul-category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to selected category button
    const selectedBtn = document.querySelector(`[data-category="${category}"]`);
    if (selectedBtn) {
        selectedBtn.classList.add('active');
    }
    
    // Hide all sections
    document.querySelectorAll('.hangul-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const selectedSection = document.getElementById(category);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
}

// Hangul learning functionality
function setupHangulLearning() {
    const learnBtns = document.querySelectorAll('.learn-btn');
    
    learnBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.hangul-card');
            toggleHangulLearned(card);
        });
    });
    
    // Also allow clicking on the card itself
    const hangulCards = document.querySelectorAll('.hangul-card');
    hangulCards.forEach(card => {
        card.addEventListener('click', function() {
            const sound = this.getAttribute('data-sound');
            playHangulSound(sound);
        });
    });
}

function toggleHangulLearned(card) {
    const isLearned = card.getAttribute('data-learned') === 'true';
    
    if (isLearned) {
        card.setAttribute('data-learned', 'false');
        card.classList.remove('learned');
    } else {
        card.setAttribute('data-learned', 'true');
        card.classList.add('learned');
    }
    
    updateHangulProgress();
}

function updateHangulProgress() {
    const learnedCards = document.querySelectorAll('.hangul-card[data-learned="true"]');
    const totalCards = document.querySelectorAll('.hangul-card').length;
    const learnedCount = learnedCards.length;
    
    const progressFill = document.querySelector('.progress-fill');
    const learnedCountSpan = document.querySelector('.learned-count');
    
    if (progressFill) {
        const percentage = (learnedCount / totalCards) * 100;
        progressFill.style.width = `${percentage}%`;
    }
    
    if (learnedCountSpan) {
        learnedCountSpan.textContent = learnedCount;
    }
}

// Practice mode
function setupHangulPractice() {
    const nextBtn = document.getElementById('next-practice');
    const resetBtn = document.getElementById('reset-practice');
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextPracticeCharacter);
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', resetPractice);
    }
}

function initializePracticeMode() {
    const practiceOptions = document.querySelectorAll('.practice-option');
    
    practiceOptions.forEach(option => {
        option.addEventListener('click', function() {
            checkPracticeAnswer(this);
        });
    });
    
    nextPracticeCharacter();
}

function nextPracticeCharacter() {
    const characters = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
    const randomChar = characters[Math.floor(Math.random() * characters.length)];
    
    const practiceChar = document.getElementById('practice-char');
    if (practiceChar) {
        practiceChar.textContent = randomChar;
    }
    
    // Reset options
    const options = document.querySelectorAll('.practice-option');
    options.forEach(option => {
        option.classList.remove('correct', 'incorrect');
        option.disabled = false;
    });
    
    // Clear feedback
    const feedback = document.getElementById('practice-feedback');
    if (feedback) {
        feedback.textContent = '';
        feedback.className = 'practice-feedback';
    }
}

function checkPracticeAnswer(selectedOption) {
    const practiceChar = document.getElementById('practice-char');
    const char = practiceChar.textContent;
    
    // Define correct answers for each character
    const correctAnswers = {
        'ㄱ': 'g', 'ㄴ': 'n', 'ㄷ': 'd', 'ㄹ': 'r/l', 'ㅁ': 'm', 'ㅂ': 'b',
        'ㅅ': 's', 'ㅈ': 'j', 'ㅊ': 'ch', 'ㅋ': 'k', 'ㅌ': 't', 'ㅍ': 'p', 'ㅎ': 'h'
    };
    
    const correctAnswer = correctAnswers[char];
    const selectedAnswer = selectedOption.getAttribute('data-answer');
    
    const options = document.querySelectorAll('.practice-option');
    options.forEach(option => {
        option.disabled = true;
        if (option.getAttribute('data-answer') === correctAnswer) {
            option.classList.add('correct');
        } else if (option === selectedOption && selectedAnswer !== correctAnswer) {
            option.classList.add('incorrect');
        }
    });
    
    const feedback = document.getElementById('practice-feedback');
    if (feedback) {
        if (selectedAnswer === correctAnswer) {
            feedback.textContent = 'Correct! 🎉';
            feedback.classList.add('correct');
        } else {
            feedback.textContent = `Incorrect. The answer is "${correctAnswer}".`;
            feedback.classList.add('incorrect');
        }
    }
}

function resetPractice() {
    nextPracticeCharacter();
}

// Quiz mode
function setupHangulQuiz() {
    const startBtn = document.getElementById('start-quiz');
    const nextBtn = document.getElementById('next-question');
    
    if (startBtn) {
        startBtn.addEventListener('click', startQuiz);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextQuizQuestion);
    }
}

function initializeQuizMode() {
    // Quiz will be initialized when start button is clicked
}

// Variables are already declared at the top of the file
// quizScore, currentQuestionIndexIndex, totalQuestions

function startQuiz() {
    quizScore = 0;
    currentQuestionIndexIndex = 0;
    
    const startBtn = document.getElementById('start-quiz');
    const nextBtn = document.getElementById('next-question');
    
    if (startBtn) startBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'inline-block';
    
    nextQuizQuestion();
}

function nextQuizQuestion() {
    if (currentQuestionIndex >= totalQuestions) {
        endQuiz();
        return;
    }
    
    const characters = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
    const randomChar = characters[Math.floor(Math.random() * characters.length)];
    
    const quizChar = document.getElementById('quiz-char');
    if (quizChar) {
        quizChar.textContent = randomChar;
    }
    
    // Reset options
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.classList.remove('correct', 'incorrect');
        option.disabled = false;
        option.addEventListener('click', checkQuizAnswer);
    });
    
    // Clear feedback
    const feedback = document.getElementById('quiz-feedback');
    if (feedback) {
        feedback.textContent = '';
        feedback.className = 'quiz-feedback';
    }
    
    // Update question counter
    const currentQuestionIndexSpan = document.getElementById('current-question');
    if (currentQuestionIndexSpan) {
        currentQuestionIndexSpan.textContent = currentQuestionIndex + 1;
    }
}

function checkQuizAnswer(event) {
    const selectedOption = event.target;
    const quizChar = document.getElementById('quiz-char');
    const char = quizChar.textContent;
    
    // Define correct answers for each character
    const correctAnswers = {
        'ㄱ': 'g', 'ㄴ': 'n', 'ㄷ': 'd', 'ㄹ': 'r/l', 'ㅁ': 'm', 'ㅂ': 'b',
        'ㅅ': 's', 'ㅈ': 'j', 'ㅊ': 'ch', 'ㅋ': 'k', 'ㅌ': 't', 'ㅍ': 'p', 'ㅎ': 'h'
    };
    
    const correctAnswer = correctAnswers[char];
    const selectedAnswer = selectedOption.getAttribute('data-answer');
    
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.disabled = true;
        option.removeEventListener('click', checkQuizAnswer);
        
        if (option.getAttribute('data-answer') === correctAnswer) {
            option.classList.add('correct');
        } else if (option === selectedOption && selectedAnswer !== correctAnswer) {
            option.classList.add('incorrect');
        }
    });
    
    const feedback = document.getElementById('quiz-feedback');
    if (feedback) {
        if (selectedAnswer === correctAnswer) {
            feedback.textContent = 'Correct! 🎉';
            feedback.classList.add('correct');
            quizScore++;
        } else {
            feedback.textContent = `Incorrect. The answer is "${correctAnswer}".`;
            feedback.classList.add('incorrect');
        }
    }
    
    // Update score
    const scoreSpan = document.getElementById('quiz-score');
    if (scoreSpan) {
        scoreSpan.textContent = quizScore;
    }
    
    currentQuestionIndex++;
    
    // Show next button or end quiz
    const nextBtn = document.getElementById('next-question');
    if (nextBtn) {
        if (currentQuestionIndex >= totalQuestions) {
            nextBtn.textContent = 'Finish Quiz';
        } else {
            nextBtn.textContent = 'Next Question';
        }
    }
}

function endQuiz() {
    const feedback = document.getElementById('quiz-feedback');
    if (feedback) {
        const percentage = Math.round((quizScore / totalQuestions) * 100);
        feedback.textContent = `Quiz Complete! You scored ${quizScore}/${totalQuestions} (${percentage}%)`;
        feedback.className = 'quiz-feedback';
        
        if (percentage >= 80) {
            feedback.classList.add('correct');
        } else if (percentage >= 60) {
            feedback.style.color = '#ffc107';
        } else {
            feedback.classList.add('incorrect');
        }
    }
    
    const nextBtn = document.getElementById('next-question');
    if (nextBtn) {
        nextBtn.style.display = 'none';
    }
    
    const startBtn = document.getElementById('start-quiz');
    if (startBtn) {
        startBtn.style.display = 'inline-block';
        startBtn.textContent = 'Retake Quiz';
    }
}

// Writing mode
function setupHangulWriting() {
    const canvas = document.getElementById('writing-canvas');
    const clearBtn = document.getElementById('clear-canvas');
    const checkBtn = document.getElementById('check-writing');
    
    if (canvas) {
        initializeCanvas(canvas);
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', () => clearCanvas(canvas));
    }
    
    if (checkBtn) {
        checkBtn.addEventListener('click', checkWriting);
    }
}

function initializeWritingMode() {
    const characters = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
    const randomChar = characters[Math.floor(Math.random() * characters.length)];
    
    const promptChar = document.getElementById('writing-prompt-char');
    if (promptChar) {
        promptChar.textContent = randomChar;
    }
}

function initializeCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    function startDrawing(e) {
        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    }
    
    function draw(e) {
        if (!isDrawing) return;
        
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#333';
        
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    }
    
    function stopDrawing() {
        isDrawing = false;
    }
}

function clearCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function checkWriting() {
    // Simple writing check - in a real app, this would use more sophisticated recognition
    alert('Writing check completed! Keep practicing to improve your Hangul writing skills.');
}

function playHangulSound(sound) {
    // Visual feedback for sound
    const card = document.querySelector(`[data-sound="${sound}"]`);
    if (card) {
        card.style.transform = 'scale(1.05)';
        card.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
        
        setTimeout(() => {
            card.style.transform = 'scale(1)';
            card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        }, 200);
    }
    
    // Play sound using Web Speech API
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(sound);
        utterance.lang = 'ko-KR';
        utterance.rate = 0.8;
        utterance.pitch = 1;
        speechSynthesis.speak(utterance);
    }
}

// Audio buttons for pronunciation
function setupAudioButtons() {
    // Setup pronunciation modes
    setupPronunciationModes();
    
    // Setup pronunciation categories
    setupPronunciationCategories();
    
    // Setup sound cards
    setupSoundCards();
    
    // Setup voice practice
    setupVoicePractice();
    
    // Setup recognition
    setupPronunciationRecognition();
    
    // Setup comparison
    setupPronunciationComparison();
    
    // Update progress
    updatePronunciationProgress();
}

// Voice controls setup
function setupVoiceControls() {
    // Voice language selector
    const voiceLanguageSelect = document.getElementById('voice-language');
    if (voiceLanguageSelect) {
        voiceLanguageSelect.addEventListener('change', function() {
            CONFIG.APP_SETTINGS.CURRENT_VOICE_LANGUAGE = this.value;
        });
    }
    
    // Speech rate control
    const speechRateSlider = document.getElementById('speech-rate');
    const rateValue = document.getElementById('rate-value');
    if (speechRateSlider && rateValue) {
        speechRateSlider.addEventListener('input', function() {
            CONFIG.APP_SETTINGS.SPEECH_RATE = parseFloat(this.value);
            rateValue.textContent = this.value;
        });
    }
    
    // Speech pitch control
    const speechPitchSlider = document.getElementById('speech-pitch');
    const pitchValue = document.getElementById('pitch-value');
    if (speechPitchSlider && pitchValue) {
        speechPitchSlider.addEventListener('input', function() {
            CONFIG.APP_SETTINGS.SPEECH_PITCH = parseFloat(this.value);
            pitchValue.textContent = this.value;
        });
    }
}

function setupSpeechRecognition() {
    if (!speechRecognition) return;
    
    // Add microphone button to pronunciation practice
    const pronunciationSection = document.querySelector('.audio-practice');
    if (pronunciationSection) {
        const micButton = document.createElement('button');
        micButton.className = 'mic-btn';
        micButton.innerHTML = '<i class="fas fa-microphone"></i> Try Speaking';
        micButton.style.cssText = `
            background: #28a745;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 25px;
            cursor: pointer;
            margin: 1rem 0;
            font-weight: 500;
            transition: all 0.3s ease;
        `;
        
        micButton.addEventListener('click', function() {
            if (speechRecognition) {
                this.innerHTML = '<i class="fas fa-microphone-slash"></i> Listening...';
                this.style.background = '#dc3545';
                
                speechRecognition.onresult = function(event) {
                    const result = event.results[0][0].transcript;
                    console.log('You said:', result);
                    
                    // Show result to user
                    const resultDiv = document.createElement('div');
                    resultDiv.className = 'speech-result';
                    resultDiv.innerHTML = `
                        <strong>You said:</strong> ${result}
                        <br><small>Keep practicing to improve your pronunciation!</small>
                    `;
                    resultDiv.style.cssText = `
                        background: #d4edda;
                        color: #155724;
                        padding: 1rem;
                        border-radius: 8px;
                        margin: 1rem 0;
                        border-left: 4px solid #28a745;
                    `;
                    
                    pronunciationSection.appendChild(resultDiv);
                    
                    // Remove result after 5 seconds
                    setTimeout(() => {
                        if (resultDiv.parentNode) {
                            resultDiv.parentNode.removeChild(resultDiv);
                        }
                    }, 5000);
                };
                
                speechRecognition.onend = function() {
                    micButton.innerHTML = '<i class="fas fa-microphone"></i> Try Speaking';
                    micButton.style.background = '#28a745';
                };
                
                speechRecognition.onerror = function() {
                    micButton.innerHTML = '<i class="fas fa-microphone"></i> Try Speaking';
                    micButton.style.background = '#28a745';
                };
                
                speechRecognition.start();
            }
        });
        
        pronunciationSection.appendChild(micButton);
    }
}

// Enhanced pronunciation function with Azure Speech Services
async function playPronunciation(word, language = 'korean') {
    const btn = document.querySelector(`[data-word="${word}"]`);
    const icon = btn.querySelector('i');
    
    // Visual feedback
    btn.classList.add('loading');
    icon.className = 'fas fa-spinner fa-spin';
    
    try {
        // Try Azure Speech Services first
        if (synthesizer && CONFIG.FEATURES.TEXT_TO_SPEECH) {
            await playWithAzureSpeech(word, language, btn, icon);
        } else {
            // Fallback to Web Speech API
            await playWithWebSpeech(word, language, btn, icon);
        }
    } catch (error) {
        console.log('Speech synthesis error:', error);
        btn.classList.remove('loading');
        icon.className = 'fas fa-play';
    }
}

// Azure Speech Services implementation
async function playWithAzureSpeech(word, language, btn, icon) {
    const voiceMap = {
        'korean': CONFIG.APP_SETTINGS.KOREAN_VOICE,
        'filipino': CONFIG.APP_SETTINGS.FILIPINO_VOICE,
        'english': CONFIG.APP_SETTINGS.ENGLISH_VOICE
    };
    
    const voice = voiceMap[language] || CONFIG.APP_SETTINGS.KOREAN_VOICE;
    
    // Set voice and speech parameters
    speechConfig.speechSynthesisVoiceName = voice;
    speechConfig.speechSynthesisRate = CONFIG.APP_SETTINGS.SPEECH_RATE;
    speechConfig.speechSynthesisPitch = CONFIG.APP_SETTINGS.SPEECH_PITCH;
    
    const ssml = `
        <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${language === 'korean' ? 'ko-KR' : language === 'filipino' ? 'fil-PH' : 'en-US'}">
            <voice name="${voice}">
                <prosody rate="${CONFIG.APP_SETTINGS.SPEECH_RATE}" pitch="${CONFIG.APP_SETTINGS.SPEECH_PITCH}">
                    ${word}
                </prosody>
            </voice>
        </speak>
    `;
    
    synthesizer.speakSsmlAsync(
        ssml,
        (result) => {
            btn.classList.remove('loading');
            icon.className = 'fas fa-play';
            if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                console.log('Azure Speech synthesis completed');
            }
        },
        (error) => {
            btn.classList.remove('loading');
            icon.className = 'fas fa-play';
            console.log('Azure Speech synthesis error:', error);
        }
    );
}

// Web Speech API fallback
async function playWithWebSpeech(word, language, btn, icon) {
    if (!speechSynthesis) {
        throw new Error('Speech synthesis not supported');
    }
    
    const utterance = new SpeechSynthesisUtterance(word);
    
    // Set language and voice
    const langMap = {
        'korean': 'ko-KR',
        'filipino': 'fil-PH',
        'english': 'en-US'
    };
    
    utterance.lang = langMap[language] || 'ko-KR';
    utterance.rate = CONFIG.APP_SETTINGS.SPEECH_RATE;
    utterance.pitch = CONFIG.APP_SETTINGS.SPEECH_PITCH;
    utterance.volume = CONFIG.APP_SETTINGS.SPEECH_VOLUME;
    
    utterance.onstart = () => {
        btn.classList.remove('loading');
        icon.className = 'fas fa-volume-up';
    };
    
    utterance.onend = () => {
        icon.className = 'fas fa-play';
    };
    
    utterance.onerror = () => {
        btn.classList.remove('loading');
        icon.className = 'fas fa-play';
        console.log('Web Speech synthesis error');
    };
    
    speechSynthesis.speak(utterance);
}

// Quiz functionality
function setupQuiz() {
    const quizOptions = document.querySelectorAll('.quiz-option');
    
    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            if (this.classList.contains('correct') || this.classList.contains('wrong')) {
                return; // Already answered
            }
            
            checkAnswer(this);
        });
    });
}

function loadQuiz() {
    if (currentQuestionIndexIndex >= quizQuestions.length) {
        showQuizComplete();
        return;
    }
    
    const question = quizQuestions[currentQuestionIndexIndex];
    const quizQuestion = document.getElementById('quiz-question');
    const quizResult = document.getElementById('quiz-result');
    
    // Hide result, show question
    quizResult.style.display = 'none';
    quizQuestion.style.display = 'block';
    
    // Update question
    quizQuestion.querySelector('h3').textContent = question.question;
    
    // Update options
    const options = quizQuestion.querySelectorAll('.quiz-option');
    options.forEach((option, index) => {
        option.textContent = question.options[index];
        option.className = 'quiz-option';
        option.setAttribute('data-answer', index === question.correct ? 'correct' : 'wrong');
    });
    
    // Update score
    document.getElementById('score').textContent = quizScore;
    document.getElementById('total').textContent = totalQuestions;
}

function checkAnswer(selectedOption) {
    const isCorrect = selectedOption.getAttribute('data-answer') === 'correct';
    const allOptions = document.querySelectorAll('.quiz-option');
    
    // Show correct/incorrect answers
    allOptions.forEach(option => {
        const isOptionCorrect = option.getAttribute('data-answer') === 'correct';
        if (isOptionCorrect) {
            option.classList.add('correct');
        } else if (option === selectedOption && !isCorrect) {
            option.classList.add('wrong');
        }
    });
    
    // Update score
    if (isCorrect) {
        quizScore++;
    }
    totalQuestions++;
    
    // Show result
    setTimeout(() => {
        showQuizResult(isCorrect);
    }, 1000);
}

function showQuizResult(isCorrect) {
    const quizQuestion = document.getElementById('quiz-question');
    const quizResult = document.getElementById('quiz-result');
    const resultMessage = quizResult.querySelector('.result-message');
    
    // Hide question, show result
    quizQuestion.style.display = 'none';
    quizResult.style.display = 'block';
    
    // Update result message
    resultMessage.textContent = isCorrect ? 'Correct! Well done!' : 'Incorrect. Try again!';
    resultMessage.className = `result-message ${isCorrect ? 'correct' : 'wrong'}`;
    
    // Update score
    document.getElementById('score').textContent = quizScore;
    document.getElementById('total').textContent = totalQuestions;
}

function showQuizComplete() {
    const quizQuestion = document.getElementById('quiz-question');
    const quizResult = document.getElementById('quiz-result');
    const resultMessage = quizResult.querySelector('.result-message');
    const nextBtn = document.getElementById('next-question');
    
    // Hide question, show result
    quizQuestion.style.display = 'none';
    quizResult.style.display = 'block';
    
    // Show completion message
    const percentage = Math.round((quizScore / totalQuestions) * 100);
    resultMessage.textContent = `Quiz Complete! You scored ${quizScore}/${totalQuestions} (${percentage}%)`;
    resultMessage.className = 'result-message correct';
    
    // Track quiz completion
    trackQuizCompletion(quizScore, totalQuestions);
    
    // Change button text
    nextBtn.textContent = 'Restart Quiz';
    nextBtn.onclick = restartQuiz;
}

function restartQuiz() {
    quizScore = 0;
    totalQuestions = 0;
    currentQuestionIndexIndex = 0;
    loadQuiz();
}

// Next question button
document.addEventListener('click', function(e) {
    if (e.target.id === 'next-question' && e.target.textContent === 'Next Question') {
        currentQuestionIndexIndex++;
        loadQuiz();
    }
});

// Add some interactive features
function addInteractiveFeatures() {
    // Add hover effects to vocabulary items
    document.addEventListener('mouseover', function(e) {
        if (e.target.closest('.vocab-item')) {
            e.target.closest('.vocab-item').style.transform = 'translateX(5px)';
        }
    });
    
    document.addEventListener('mouseout', function(e) {
        if (e.target.closest('.vocab-item')) {
            e.target.closest('.vocab-item').style.transform = 'translateX(0)';
        }
    });
}

// Initialize interactive features
addInteractiveFeatures();

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        const activeElement = document.activeElement;
        if (activeElement.classList.contains('nav-tab')) {
            activeElement.click();
        } else if (activeElement.classList.contains('category-btn')) {
            activeElement.click();
        } else if (activeElement.classList.contains('quiz-option')) {
            activeElement.click();
        }
    }
});

// Add touch support for mobile
document.addEventListener('touchstart', function(e) {
    if (e.target.closest('.hangul-card')) {
        e.target.closest('.hangul-card').style.transform = 'scale(0.95)';
    }
});

document.addEventListener('touchend', function(e) {
    if (e.target.closest('.hangul-card')) {
        e.target.closest('.hangul-card').style.transform = 'scale(1)';
    }
});

// Writing practice functionality
function setupWritingPractice() {
    setupCharacterBuilder();
    setupMemoryExercise();
    setupTraceCharacters();
}

function setupCharacterBuilder() {
    const charOptions = document.querySelectorAll('.char-option');
    const syllableDisplay = document.getElementById('syllable-display');
    let selectedConsonant = '';
    let selectedVowel = '';
    
    charOptions.forEach(option => {
        option.addEventListener('click', function() {
            const char = this.getAttribute('data-char');
            const parent = this.closest('.consonant-selector, .vowel-selector');
            
            if (parent.classList.contains('consonant-selector')) {
                selectedConsonant = char;
                // Remove previous selection
                parent.querySelectorAll('.char-option').forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
            } else if (parent.classList.contains('vowel-selector')) {
                selectedVowel = char;
                // Remove previous selection
                parent.querySelectorAll('.char-option').forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
            }
            
            // Update syllable display
            if (selectedConsonant && selectedVowel) {
                syllableDisplay.textContent = selectedConsonant + selectedVowel;
                syllableDisplay.style.color = '#28a745';
            } else if (selectedConsonant) {
                syllableDisplay.textContent = selectedConsonant + ' + vowel';
                syllableDisplay.style.color = '#ffc107';
            } else if (selectedVowel) {
                syllableDisplay.textContent = 'consonant + ' + selectedVowel;
                syllableDisplay.style.color = '#ffc107';
            } else {
                syllableDisplay.textContent = 'Click characters to build';
                syllableDisplay.style.color = '#6c757d';
            }
        });
    });
}

function setupMemoryExercise() {
    const checkBtn = document.querySelector('.check-btn');
    const answerArea = document.querySelector('.answer-area');
    
    if (checkBtn && answerArea) {
        checkBtn.addEventListener('click', function() {
            const userAnswer = answerArea.textContent.trim();
            const correctAnswer = answerArea.getAttribute('data-answer');
            
            if (userAnswer === correctAnswer) {
                answerArea.style.borderColor = '#28a745';
                answerArea.style.backgroundColor = '#d4edda';
                this.textContent = 'Correct! ✓';
                this.style.backgroundColor = '#28a745';
            } else {
                answerArea.style.borderColor = '#dc3545';
                answerArea.style.backgroundColor = '#f8d7da';
                this.textContent = 'Try Again';
                this.style.backgroundColor = '#dc3545';
                
                // Show correct answer after 2 seconds
                setTimeout(() => {
                    answerArea.textContent = correctAnswer;
                    answerArea.style.borderColor = '#28a745';
                    answerArea.style.backgroundColor = '#d4edda';
                    this.textContent = 'Correct Answer Shown';
                    this.style.backgroundColor = '#28a745';
                }, 2000);
            }
        });
    }
}

function setupTraceCharacters() {
    const traceCharacters = document.querySelectorAll('.trace-character');
    
    traceCharacters.forEach(char => {
        char.addEventListener('click', function() {
            const koreanText = this.querySelector('.korean-text');
            
            // Visual feedback
            this.style.transform = 'scale(1.1)';
            this.style.backgroundColor = '#e3f2fd';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.style.backgroundColor = 'white';
            }, 300);
            
            // In a real app, you would show stroke order animation here
            console.log(`Tracing: ${koreanText.textContent}`);
        });
    });
}

// Add CSS for selected character options
const style = document.createElement('style');
style.textContent = `
    .char-option.selected {
        background: #007bff !important;
        color: white !important;
        border-color: #0056b3 !important;
    }
`;
document.head.appendChild(style);

// Translation API functions
async function translateText(text, targetLang = CONFIG.LANGUAGES.TARGET) {
    if (!CONFIG.FEATURES.REAL_TIME_TRANSLATION) {
        return getFallbackTranslation(text, targetLang);
    }
    
    try {
        // Using Google Translate API
        const response = await fetch(`${CONFIG.ENDPOINTS.GOOGLE_TRANSLATE}?key=${CONFIG.GOOGLE_TRANSLATE_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                q: text,
                target: targetLang,
                source: CONFIG.LANGUAGES.SOURCE
            })
        });
        
        if (!response.ok) {
            throw new Error('Translation API error');
        }
        
        const data = await response.json();
        return data.data.translations[0].translatedText;
    } catch (error) {
        console.log('Translation API not available, using fallback');
        return getFallbackTranslation(text, targetLang);
    }
}

function getFallbackTranslation(text, targetLang) {
    // Fallback translations for common words
    const translations = {
        '안녕하세요': 'Kumusta po',
        '감사합니다': 'Salamat po',
        '사랑해요': 'Mahal kita',
        '죄송합니다': 'Paumanhin po',
        '고맙습니다': 'Salamat',
        '안녕': 'Kumusta',
        '사과': 'Mansanas',
        '물': 'Tubig',
        '집': 'Bahay',
        '학교': 'Paaralan'
    };
    
    return translations[text] || 'Translation not available';
}

// Progress tracking functions
function saveProgress() {
    localStorage.setItem('koreanAppProgress', JSON.stringify(userProgress));
}

function updateProgress(type, item) {
    if (!userProgress[type].includes(item)) {
        userProgress[type].push(item);
        saveProgress();
    }
}

function getProgressStats() {
    return {
        vocabularyCount: userProgress.vocabularyLearned.length,
        hangulCount: userProgress.hangulLearned.length,
        quizCount: userProgress.quizScores.length,
        writingCount: userProgress.writingPractice.length,
        totalStudyTime: userProgress.totalStudyTime
    };
}

// Add progress tracking to vocabulary learning
function trackVocabularyLearning(word) {
    updateProgress('vocabularyLearned', word);
    showProgressNotification(`Learned: ${word}`);
}

function trackHangulLearning(character) {
    updateProgress('hangulLearned', character);
    showProgressNotification(`Learned character: ${character}`);
}

function trackQuizCompletion(score, total) {
    userProgress.quizScores.push({ score, total, date: new Date().toISOString() });
    saveProgress();
    showProgressNotification(`Quiz completed! Score: ${score}/${total}`);
}

function showProgressNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'progress-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS for progress notifications
const progressStyle = document.createElement('style');
progressStyle.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(progressStyle);

// Enhanced vocabulary loading with progress tracking
function loadVocabulary(category) {
    const vocabularyContent = document.getElementById('vocabulary-content');
    const words = vocabularyData[category];
    
    if (!words) return;
    
    let html = `<div class="vocabulary-category active" id="${category}">`;
    
    words.forEach(word => {
        const isLearned = userProgress.vocabularyLearned.includes(word.korean);
        html += `
            <div class="vocab-item ${isLearned ? 'learned' : ''}" data-word="${word.korean}">
                <div class="korean-word">${word.korean}</div>
                <div class="romanization">${word.romanization}</div>
                <div class="filipino-translation">${word.filipino}</div>
                <div class="english-translation">${word.english}</div>
                <div class="vocab-actions">
                    <button class="speak-btn" data-word="${word.korean}" data-lang="korean" title="Korean pronunciation">
                        <i class="fas fa-volume-up"></i> 한국어
                    </button>
                    <button class="speak-btn" data-word="${word.filipino}" data-lang="filipino" title="Filipino pronunciation">
                        <i class="fas fa-volume-up"></i> Filipino
                    </button>
                    <button class="translate-btn" data-word="${word.korean}">
                        <i class="fas fa-language"></i>
                    </button>
                    ${isLearned ? '<span class="learned-badge">✓ Learned</span>' : ''}
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    vocabularyContent.innerHTML = html;
    
    // Add event listeners for new buttons
    setupVocabularyActions();
}

function setupVocabularyActions() {
    // Speak buttons
    document.querySelectorAll('.speak-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const word = this.getAttribute('data-word');
            playPronunciation(word);
        });
    });
    
    // Translate buttons
    document.querySelectorAll('.translate-btn').forEach(btn => {
        btn.addEventListener('click', async function() {
            const word = this.getAttribute('data-word');
            const translation = await translateText(word, 'tl');
            
            // Show translation in a popup
            const popup = document.createElement('div');
            popup.className = 'translation-popup';
            popup.innerHTML = `
                <div class="popup-content">
                    <h4>${word}</h4>
                    <p><strong>Filipino:</strong> ${translation}</p>
                    <button class="close-popup">Close</button>
                </div>
            `;
            popup.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
            `;
            
            popup.querySelector('.popup-content').style.cssText = `
                background: white;
                padding: 2rem;
                border-radius: 10px;
                text-align: center;
                max-width: 400px;
            `;
            
            popup.querySelector('.close-popup').style.cssText = `
                background: #007bff;
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 5px;
                cursor: pointer;
                margin-top: 1rem;
            `;
            
            document.body.appendChild(popup);
            
            popup.querySelector('.close-popup').addEventListener('click', () => {
                document.body.removeChild(popup);
            });
        });
    });
    
    // Track learning when vocabulary items are clicked
    document.querySelectorAll('.vocab-item').forEach(item => {
        item.addEventListener('click', function() {
            const word = this.getAttribute('data-word');
            trackVocabularyLearning(word);
            this.classList.add('learned');
            
            // Add learned badge if not already present
            if (!this.querySelector('.learned-badge')) {
                const badge = document.createElement('span');
                badge.className = 'learned-badge';
                badge.textContent = '✓ Learned';
                this.querySelector('.vocab-actions').appendChild(badge);
            }
        });
    });
}

// Progress Dashboard functionality
function setupProgressDashboard() {
    updateProgressStats();
    updateAchievements();
    updateStudyStreak();
    generateStreakCalendar();
}

function updateProgressStats() {
    const stats = getProgressStats();
    
    document.getElementById('vocabulary-count').textContent = stats.vocabularyCount;
    document.getElementById('hangul-count').textContent = stats.hangulCount;
    document.getElementById('quiz-count').textContent = stats.quizCount;
    document.getElementById('writing-count').textContent = stats.writingCount;
}

function updateAchievements() {
    const stats = getProgressStats();
    const achievements = document.querySelectorAll('.achievement');
    
    achievements.forEach(achievement => {
        const title = achievement.querySelector('span').textContent;
        
        switch(title) {
            case 'First Word':
                if (stats.vocabularyCount >= 1) {
                    achievement.classList.remove('locked');
                    achievement.classList.add('unlocked');
                }
                break;
            case 'Hangul Master':
                if (stats.hangulCount >= 23) { // Total basic Hangul characters
                    achievement.classList.remove('locked');
                    achievement.classList.add('unlocked');
                }
                break;
            case 'Quiz Champion':
                if (stats.quizCount >= 10) {
                    achievement.classList.remove('locked');
                    achievement.classList.add('unlocked');
                }
                break;
        }
    });
}

function updateStudyStreak() {
    const today = new Date().toDateString();
    const lastStudyDate = localStorage.getItem('lastStudyDate');
    
    if (lastStudyDate === today) {
        // Already studied today
        const streak = parseInt(localStorage.getItem('studyStreak')) || 0;
        document.getElementById('streak-days').textContent = streak;
    } else {
        // Check if it's consecutive
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();
        
        if (lastStudyDate === yesterdayStr) {
            // Consecutive day
            const streak = (parseInt(localStorage.getItem('studyStreak')) || 0) + 1;
            localStorage.setItem('studyStreak', streak);
            localStorage.setItem('lastStudyDate', today);
            document.getElementById('streak-days').textContent = streak;
        } else {
            // Reset streak
            localStorage.setItem('studyStreak', '1');
            localStorage.setItem('lastStudyDate', today);
            document.getElementById('streak-days').textContent = '1';
        }
    }
}

function generateStreakCalendar() {
    const calendar = document.getElementById('streak-calendar');
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 6); // Show last 7 days
    
    calendar.innerHTML = '';
    
    for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        if (date.toDateString() === today.toDateString()) {
            dayElement.classList.add('today');
        } else {
            const studyDates = JSON.parse(localStorage.getItem('studyDates') || '[]');
            if (studyDates.includes(date.toDateString())) {
                dayElement.classList.add('studied');
            } else {
                dayElement.classList.add('empty');
            }
        }
        
        dayElement.textContent = date.getDate();
        calendar.appendChild(dayElement);
    }
}

function trackStudyActivity(activity) {
    const today = new Date().toDateString();
    const studyDates = JSON.parse(localStorage.getItem('studyDates') || '[]');
    
    if (!studyDates.includes(today)) {
        studyDates.push(today);
        localStorage.setItem('studyDates', JSON.stringify(studyDates));
    }
    
    // Add to activity list
    addActivityItem(activity);
    
    // Update streak
    updateStudyStreak();
    generateStreakCalendar();
}

function addActivityItem(activity) {
    const activityList = document.getElementById('activity-list');
    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item';
    
    const icon = getActivityIcon(activity);
    const time = new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    activityItem.innerHTML = `
        <i class="${icon}"></i>
        <span>${activity}</span>
        <small>${time}</small>
    `;
    
    activityList.insertBefore(activityItem, activityList.firstChild);
    
    // Keep only last 5 activities
    const activities = activityList.querySelectorAll('.activity-item');
    if (activities.length > 5) {
        activities[activities.length - 1].remove();
    }
}

function getActivityIcon(activity) {
    if (activity.includes('word') || activity.includes('vocabulary')) {
        return 'fas fa-book';
    } else if (activity.includes('character') || activity.includes('Hangul')) {
        return 'fas fa-font';
    } else if (activity.includes('quiz')) {
        return 'fas fa-question-circle';
    } else if (activity.includes('writing')) {
        return 'fas fa-pen';
    } else {
        return 'fas fa-star';
    }
}

// Enhanced tracking functions
function trackVocabularyLearning(word) {
    updateProgress('vocabularyLearned', word);
    showProgressNotification(`Learned: ${word}`);
    trackStudyActivity(`Learned vocabulary: ${word}`);
    updateProgressStats();
    updateAchievements();
}

function trackHangulLearning(character) {
    updateProgress('hangulLearned', character);
    showProgressNotification(`Learned character: ${character}`);
    trackStudyActivity(`Learned Hangul: ${character}`);
    updateProgressStats();
    updateAchievements();
}

function trackQuizCompletion(score, total) {
    userProgress.quizScores.push({ score, total, date: new Date().toISOString() });
    saveProgress();
    showProgressNotification(`Quiz completed! Score: ${score}/${total}`);
    trackStudyActivity(`Completed quiz: ${score}/${total}`);
    updateProgressStats();
    updateAchievements();
}


// Donation System Setup
function setupDonationSystem() {
    initializeDonationSystem();
    setupDonationInteractions();
}

function setupDonationInteractions() {
    document.querySelectorAll('.donate-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tierCard = this.closest('.tier-card');
            const tierId = tierCard.getAttribute('data-tier');
            showDonationModal(tierId);
        });
    });
}

function showDonationModal(tierId) {
    const tier = DONATION_SYSTEM.tiers.find(t => t.id === tierId);
    if (!tier) return;
    
    const modal = document.createElement('div');
    modal.className = 'donation-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Support ${tier.name}</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="tier-info">
                    <div class="tier-icon">
                        <i class="${tier.icon}"></i>
                    </div>
                    <div class="tier-details">
                        <h4>${tier.name}</h4>
                        <div class="tier-amount">$${tier.amount}</div>
                        <p>${tier.description}</p>
                    </div>
                </div>
                
                <form class="donation-form">
                    <div class="form-group">
                        <label>Your Name:</label>
                        <input type="text" id="donor-name" required>
                    </div>
                    <div class="form-group">
                        <label>Email:</label>
                        <input type="email" id="donor-email" required>
                    </div>
                    <div class="form-group">
                        <label>Amount:</label>
                        <input type="number" id="donation-amount" value="${tier.amount}" min="1" step="0.01">
                    </div>
                    <div class="form-group">
                        <label>Payment Method:</label>
                        <select id="payment-method">
                            <option value="paypal">PayPal</option>
                            <option value="stripe">Credit Card</option>
                            <option value="gcash">GCash (Philippines)</option>
                            <option value="paymaya">PayMaya (Philippines)</option>
                        </select>
                    </div>
                    <button type="submit" class="submit-donation">Donate Now</button>
                </form>
            </div>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    document.body.appendChild(modal);
    
    // Close modal
    modal.querySelector('.close-modal').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    // Handle form submission
    modal.querySelector('.donation-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const donorInfo = {
            name: document.getElementById('donor-name').value,
            email: document.getElementById('donor-email').value
        };
        
        const amount = parseFloat(document.getElementById('donation-amount').value);
        const paymentMethod = document.getElementById('payment-method').value;
        
        // Process donation
        const success = processDonation(tierId, paymentMethod, amount, donorInfo);
        
        if (success) {
            document.body.removeChild(modal);
        }
    });
}

// Console welcome message
console.log('🇰🇷 Korean Language App for Philippines 🇵🇭');
console.log('Welcome to your Korean learning journey!');
console.log('This app is designed specifically for Filipino learners.');
console.log('Features: Speech Recognition, Text-to-Speech, Progress Tracking, Real-time Translation');
console.log('New: Learning Levels, Donation System, Android App Ready!');

// Pronunciation mode switching
function setupPronunciationModes() {
    const modeBtns = document.querySelectorAll('.pronunciation-modes .mode-btn');
    
    modeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const mode = this.getAttribute('data-mode');
            switchPronunciationMode(mode);
        });
    });
}

function switchPronunciationMode(mode) {
    // Remove active class from all mode buttons
    document.querySelectorAll('.pronunciation-modes .mode-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to selected mode button
    const selectedBtn = document.querySelector(`.pronunciation-modes [data-mode="${mode}"]`);
    if (selectedBtn) {
        selectedBtn.classList.add('active');
    }
    
    // Hide all mode content
    document.querySelectorAll('.pronunciation-mode-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Show selected mode content
    const selectedContent = document.getElementById(`${mode}-mode`);
    if (selectedContent) {
        selectedContent.classList.add('active');
    }
    
    // Initialize mode-specific functionality
    if (mode === 'practice') {
        initializeVoicePractice();
    } else if (mode === 'recognition') {
        initializeRecognition();
    } else if (mode === 'comparison') {
        initializeComparison();
    }
}

// Pronunciation category switching
function setupPronunciationCategories() {
    const categoryBtns = document.querySelectorAll('.pronunciation-category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            switchPronunciationCategory(category);
        });
    });
}

function switchPronunciationCategory(category) {
    // Remove active class from all category buttons
    document.querySelectorAll('.pronunciation-category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to selected category button
    const selectedBtn = document.querySelector(`[data-category="${category}"]`);
    if (selectedBtn) {
        selectedBtn.classList.add('active');
    }
    
    // Hide all sections
    document.querySelectorAll('.pronunciation-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const selectedSection = document.getElementById(category);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
}

// Sound cards functionality
function setupSoundCards() {
    const playSoundBtns = document.querySelectorAll('.play-sound-btn');
    const practiceSoundBtns = document.querySelectorAll('.practice-sound-btn');
    
    playSoundBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const word = this.getAttribute('data-word');
            playKoreanSound(word);
        });
    });
    
    practiceSoundBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const word = this.getAttribute('data-word');
            startSoundPractice(word);
        });
    });
}

function playKoreanSound(word) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'ko-KR';
        utterance.rate = 0.8;
        utterance.pitch = 1;
        speechSynthesis.speak(utterance);
    }
}

function startSoundPractice(word) {
    // Simple practice - just play the sound and show feedback
    playKoreanSound(word);
    
    // Show practice feedback
    const feedback = document.createElement('div');
    feedback.className = 'practice-feedback good';
    feedback.textContent = 'Great! Keep practicing this sound.';
    feedback.style.position = 'fixed';
    feedback.style.top = '50%';
    feedback.style.left = '50%';
    feedback.style.transform = 'translate(-50%, -50%)';
    feedback.style.zIndex = '1000';
    feedback.style.padding = '1rem 2rem';
    feedback.style.borderRadius = '8px';
    feedback.style.background = '#28a745';
    feedback.style.color = 'white';
    feedback.style.fontWeight = '600';
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        document.body.removeChild(feedback);
    }, 2000);
}

// Voice practice functionality
function setupVoicePractice() {
    const playModelBtn = document.getElementById('play-model');
    const startRecordingBtn = document.getElementById('start-recording');
    const stopRecordingBtn = document.getElementById('stop-recording');
    const nextWordBtn = document.getElementById('next-practice-word');
    const repeatBtn = document.getElementById('repeat-practice');
    
    if (playModelBtn) {
        playModelBtn.addEventListener('click', playModelPronunciation);
    }
    
    if (startRecordingBtn) {
        startRecordingBtn.addEventListener('click', startRecording);
    }
    
    if (stopRecordingBtn) {
        stopRecordingBtn.addEventListener('click', stopRecording);
    }
    
    if (nextWordBtn) {
        nextWordBtn.addEventListener('click', nextPracticeWord);
    }
    
    if (repeatBtn) {
        repeatBtn.addEventListener('click', repeatPractice);
    }
}

function initializeVoicePractice() {
    nextPracticeWord();
}

let currentPracticeWord = 0;
const practiceWords = [
    { korean: '안녕하세요', english: 'Hello', romanization: 'annyeonghaseyo' },
    { korean: '감사합니다', english: 'Thank you', romanization: 'gamsahamnida' },
    { korean: '사랑해요', english: 'I love you', romanization: 'saranghaeyo' },
    { korean: '죄송합니다', english: 'Sorry', romanization: 'joesonghamnida' },
    { korean: '네', english: 'Yes', romanization: 'ne' },
    { korean: '아니요', english: 'No', romanization: 'aniyo' },
    { korean: '물', english: 'Water', romanization: 'mul' },
    { korean: '음식', english: 'Food', romanization: 'eumsik' },
    { korean: '집', english: 'House', romanization: 'jip' },
    { korean: '학교', english: 'School', romanization: 'hakgyo' }
];

function playModelPronunciation() {
    const word = practiceWords[currentPracticeWord];
    playKoreanSound(word.korean);
}

function nextPracticeWord() {
    currentPracticeWord = (currentPracticeWord + 1) % practiceWords.length;
    const word = practiceWords[currentPracticeWord];
    
    document.getElementById('practice-word').textContent = word.korean;
    document.getElementById('practice-translation').textContent = word.english;
    document.getElementById('practice-romanization').textContent = word.romanization;
    
    // Clear feedback
    document.getElementById('practice-feedback').textContent = '';
    document.getElementById('recording-status').textContent = '';
}

function repeatPractice() {
    nextPracticeWord();
}

let isRecording = false;
let mediaRecorder = null;

function startRecording() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Microphone access not supported in this browser');
        return;
    }
    
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            isRecording = true;
            
            document.getElementById('start-recording').style.display = 'none';
            document.getElementById('stop-recording').style.display = 'inline-block';
            document.getElementById('recording-status').textContent = 'Recording...';
            document.getElementById('recording-status').className = 'recording-status recording';
        })
        .catch(err => {
            console.error('Error accessing microphone:', err);
            alert('Could not access microphone');
        });
}

function stopRecording() {
    if (mediaRecorder && isRecording) {
        mediaRecorder.stop();
        isRecording = false;
        
        document.getElementById('start-recording').style.display = 'inline-block';
        document.getElementById('stop-recording').style.display = 'none';
        document.getElementById('recording-status').textContent = 'Processing...';
        document.getElementById('recording-status').className = 'recording-status processing';
        
        // Simulate processing and feedback
        setTimeout(() => {
            document.getElementById('recording-status').textContent = 'Recording complete!';
            document.getElementById('recording-status').className = 'recording-status';
            
            // Simulate feedback
            const feedback = document.getElementById('practice-feedback');
            const randomFeedback = ['Good pronunciation!', 'Try to speak more clearly', 'Excellent!', 'Keep practicing'];
            feedback.textContent = randomFeedback[Math.floor(Math.random() * randomFeedback.length)];
            feedback.className = 'practice-feedback good';
            
            updatePronunciationProgress();
        }, 2000);
    }
}

// Recognition functionality
function setupPronunciationRecognition() {
    const playModelBtn = document.getElementById('play-recognition-model');
    const startRecognitionBtn = document.getElementById('start-recognition');
    
    if (playModelBtn) {
        playModelBtn.addEventListener('click', playRecognitionModel);
    }
    
    if (startRecognitionBtn) {
        startRecognitionBtn.addEventListener('click', startRecognition);
    }
}

function initializeRecognition() {
    nextRecognitionWord();
}

let currentRecognitionWord = 0;
const recognitionWords = [
    { korean: '안녕하세요', english: 'Hello' },
    { korean: '감사합니다', english: 'Thank you' },
    { korean: '사랑해요', english: 'I love you' },
    { korean: '죄송합니다', english: 'Sorry' },
    { korean: '네', english: 'Yes' },
    { korean: '아니요', english: 'No' }
];

function playRecognitionModel() {
    const word = recognitionWords[currentRecognitionWord];
    playKoreanSound(word.korean);
}

function nextRecognitionWord() {
    currentRecognitionWord = (currentRecognitionWord + 1) % recognitionWords.length;
    const word = recognitionWords[currentRecognitionWord];
    
    document.getElementById('recognition-word').textContent = word.korean;
    document.getElementById('recognition-feedback').textContent = '';
    document.getElementById('recognition-result').textContent = '';
}

function startRecognition() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('Speech recognition not supported in this browser');
        return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'ko-KR';
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onstart = () => {
        document.getElementById('recognition-feedback').textContent = 'Listening...';
    };
    
    recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        const expected = recognitionWords[currentRecognitionWord].korean;
        
        document.getElementById('recognition-result').textContent = `You said: ${result}`;
        
        if (result.includes(expected) || expected.includes(result)) {
            document.getElementById('recognition-result').className = 'recognition-result correct';
            document.getElementById('recognition-feedback').textContent = 'Correct! Well done!';
        } else {
            document.getElementById('recognition-result').className = 'recognition-result incorrect';
            document.getElementById('recognition-feedback').textContent = `Try again. Expected: ${expected}`;
        }
        
        updateRecognitionStats();
    };
    
    recognition.onerror = (event) => {
        document.getElementById('recognition-feedback').textContent = 'Recognition error. Please try again.';
    };
    
    recognition.start();
}

function updateRecognitionStats() {
    const wordsPracticed = parseInt(document.getElementById('words-practiced').textContent) + 1;
    const accuracy = Math.min(95, Math.floor(Math.random() * 20) + 80); // Simulate accuracy
    
    document.getElementById('words-practiced').textContent = wordsPracticed;
    document.getElementById('accuracy-score').textContent = accuracy + '%';
}

// Comparison functionality
function setupPronunciationComparison() {
    const playModelBtn = document.getElementById('play-model-audio');
    const recordBtn = document.getElementById('record-comparison');
    
    if (playModelBtn) {
        playModelBtn.addEventListener('click', playComparisonModel);
    }
    
    if (recordBtn) {
        recordBtn.addEventListener('click', recordComparison);
    }
}

function initializeComparison() {
    nextComparisonWord();
}

let currentComparisonWord = 0;
const comparisonWords = [
    { korean: '안녕하세요', english: 'Hello' },
    { korean: '감사합니다', english: 'Thank you' },
    { korean: '사랑해요', english: 'I love you' }
];

function playComparisonModel() {
    const word = comparisonWords[currentComparisonWord];
    playKoreanSound(word.korean);
    
    // Simulate audio visualizer
    const visualizer = document.getElementById('model-visualizer');
    visualizer.textContent = 'Model audio playing...';
    visualizer.style.background = '#28a745';
    
    setTimeout(() => {
        visualizer.textContent = 'Model audio complete';
        visualizer.style.background = '#e0e0e0';
    }, 2000);
}

function recordComparison() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Microphone access not supported in this browser');
        return;
    }
    
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            
            const visualizer = document.getElementById('user-visualizer');
            visualizer.textContent = 'Recording...';
            visualizer.style.background = '#dc3545';
            
            setTimeout(() => {
                mediaRecorder.stop();
                visualizer.textContent = 'Recording complete';
                visualizer.style.background = '#e0e0e0';
                
                // Simulate comparison analysis
                setTimeout(() => {
                    showComparisonAnalysis();
                }, 1000);
            }, 3000);
        })
        .catch(err => {
            console.error('Error accessing microphone:', err);
            alert('Could not access microphone');
        });
}

function showComparisonAnalysis() {
    const analysis = document.getElementById('comparison-analysis');
    analysis.innerHTML = `
        <h4>Pronunciation Analysis</h4>
        <p><strong>Similarity:</strong> 85%</p>
        <p><strong>Clarity:</strong> Good</p>
        <p><strong>Rhythm:</strong> Slightly fast</p>
        <p><strong>Recommendation:</strong> Try to slow down your speech slightly for better clarity.</p>
    `;
}

function nextComparisonWord() {
    currentComparisonWord = (currentComparisonWord + 1) % comparisonWords.length;
    const word = comparisonWords[currentComparisonWord];
    
    document.getElementById('comparison-word').textContent = word.korean;
    document.getElementById('comparison-analysis').innerHTML = '';
}

function updatePronunciationProgress() {
    const practicedCount = parseInt(document.querySelector('.practiced-count').textContent) + 1;
    const totalPractice = parseInt(document.querySelector('.total-practice').textContent);
    
    document.querySelector('.practiced-count').textContent = practicedCount;
    
    const progressFill = document.querySelector('.pronunciation-progress .progress-fill');
    if (progressFill) {
        const percentage = (practicedCount / totalPractice) * 100;
        progressFill.style.width = `${percentage}%`;
    }
}

// Grammar functionality
function setupGrammarCards() {
    setupGrammarModes();
    setupGrammarCategories();
    setupGrammarPractice();
    setupGrammarExercises();
    setupGrammarQuiz();
    updateGrammarProgress();
}

function setupGrammarModes() {
    const modeButtons = document.querySelectorAll('.grammar-modes .mode-btn');
    
    modeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const mode = button.dataset.mode;
            switchGrammarMode(mode);
        });
    });
}

function switchGrammarMode(mode) {
    // Remove active class from all mode buttons and content
    document.querySelectorAll('.grammar-modes .mode-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.grammar-mode-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to selected mode button and content
    document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
    document.getElementById(`${mode}-mode`).classList.add('active');
    
    // Initialize mode-specific content
    if (mode === 'practice') {
        initializeGrammarPractice();
    } else if (mode === 'exercises') {
        initializeGrammarExercises();
    } else if (mode === 'quiz') {
        initializeGrammarQuiz();
    }
}

function setupGrammarCategories() {
    const categoryButtons = document.querySelectorAll('.grammar-category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            switchGrammarCategory(category);
        });
    });
}

function switchGrammarCategory(category) {
    // Remove active class from all category buttons and sections
    document.querySelectorAll('.grammar-category-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.grammar-section').forEach(section => section.classList.remove('active'));
    
    // Add active class to selected category button and section
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    document.getElementById(category).classList.add('active');
}

function setupGrammarPractice() {
    const practiceOptions = document.querySelectorAll('.practice-option');
    const nextBtn = document.getElementById('next-practice');
    const hintBtn = document.getElementById('hint-practice');
    
    practiceOptions.forEach(option => {
        option.addEventListener('click', () => {
            checkPracticeAnswer(option);
        });
    });
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextPracticeQuestion);
    }
    
    if (hintBtn) {
        hintBtn.addEventListener('click', showPracticeHint);
    }
}

function checkPracticeAnswer(selectedOption) {
    const correctAnswer = '사과를';
    const userAnswer = selectedOption.dataset.answer;
    const feedback = document.getElementById('practice-feedback');
    
    // Remove previous classes
    document.querySelectorAll('.practice-option').forEach(option => {
        option.classList.remove('correct', 'incorrect');
    });
    
    if (userAnswer === correctAnswer) {
        selectedOption.classList.add('correct');
        feedback.textContent = 'Correct! 사과를 is the object marker for "apple"';
        feedback.className = 'practice-feedback correct';
    } else {
        selectedOption.classList.add('incorrect');
        feedback.textContent = 'Incorrect. The correct answer is 사과를 (object marker)';
        feedback.className = 'practice-feedback incorrect';
    }
}

function nextPracticeQuestion() {
    const questions = [
        {
            question: "Complete the sentence: 저는 ___ 먹어요",
            options: ["사과를", "사과는", "사과가", "사과에"],
            correct: "사과를"
        },
        {
            question: "Choose the correct particle: 친구___ 와요",
            options: ["은", "는", "이", "가"],
            correct: "가"
        },
        {
            question: "Complete: 학교___ 가요",
            options: ["에", "에서", "을", "를"],
            correct: "에"
        }
    ];
    
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    const questionElement = document.getElementById('practice-question');
    const optionsContainer = document.querySelector('.practice-options');
    const feedback = document.getElementById('practice-feedback');
    
    questionElement.textContent = randomQuestion.question;
    feedback.textContent = '';
    feedback.className = 'practice-feedback';
    
    // Clear previous classes
    document.querySelectorAll('.practice-option').forEach(option => {
        option.classList.remove('correct', 'incorrect');
    });
    
    // Update options
    const options = optionsContainer.querySelectorAll('.practice-option');
    options.forEach((option, index) => {
        option.textContent = randomQuestion.options[index];
        option.dataset.answer = randomQuestion.options[index];
    });
}

function showPracticeHint() {
    const feedback = document.getElementById('practice-feedback');
    feedback.textContent = 'Hint: Remember that 을/를 marks the object of a sentence!';
    feedback.className = 'practice-feedback';
}

function initializeGrammarPractice() {
    nextPracticeQuestion();
}

function setupGrammarExercises() {
    const exerciseInputs = document.querySelectorAll('.exercise-input');
    const checkButtons = document.querySelectorAll('.exercise-type .btn');
    
    exerciseInputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkExerciseAnswer(input);
            }
        });
    });
    
    checkButtons.forEach(button => {
        button.addEventListener('click', () => {
            const input = button.parentElement.querySelector('.exercise-input');
            if (input) {
                checkExerciseAnswer(input);
            }
        });
    });
    
    setupDragAndDrop();
}

function checkExerciseAnswer(input) {
    const correctAnswer = '를';
    const userAnswer = input.value.trim();
    
    if (userAnswer === correctAnswer) {
        input.style.borderColor = '#4caf50';
        input.style.backgroundColor = '#e8f5e8';
        setTimeout(() => {
            input.value = '';
            input.style.borderColor = '#e0e0e0';
            input.style.backgroundColor = 'white';
        }, 2000);
    } else {
        input.style.borderColor = '#f44336';
        input.style.backgroundColor = '#ffebee';
        setTimeout(() => {
            input.style.borderColor = '#e0e0e0';
            input.style.backgroundColor = 'white';
        }, 2000);
    }
}

function setupDragAndDrop() {
    const wordItems = document.querySelectorAll('.word-item');
    const sentenceSlots = document.querySelectorAll('.sentence-slot');
    
    wordItems.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', item.textContent);
            item.style.opacity = '0.5';
        });
        
        item.addEventListener('dragend', (e) => {
            item.style.opacity = '1';
        });
    });
    
    sentenceSlots.forEach(slot => {
        slot.addEventListener('dragover', (e) => {
            e.preventDefault();
            slot.classList.add('drag-over');
        });
        
        slot.addEventListener('dragleave', () => {
            slot.classList.remove('drag-over');
        });
        
        slot.addEventListener('drop', (e) => {
            e.preventDefault();
            const word = e.dataTransfer.getData('text/plain');
            slot.textContent = word;
            slot.classList.add('filled');
            slot.classList.remove('drag-over');
        });
    });
}

function initializeGrammarExercises() {
    // Reset all inputs and slots
    document.querySelectorAll('.exercise-input').forEach(input => {
        input.value = '';
        input.style.borderColor = '#e0e0e0';
        input.style.backgroundColor = 'white';
    });
    
    document.querySelectorAll('.sentence-slot').forEach(slot => {
        slot.textContent = '';
        slot.classList.remove('filled', 'drag-over');
    });
}

function setupGrammarQuiz() {
    const startBtn = document.getElementById('start-grammar-quiz');
    const nextBtn = document.getElementById('next-grammar-question');
    
    if (startBtn) {
        startBtn.addEventListener('click', startGrammarQuiz);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextGrammarQuestion);
    }
    
    // Setup quiz options
    const quizOptions = document.querySelectorAll('.quiz-option');
    quizOptions.forEach(option => {
        option.addEventListener('click', () => {
            checkQuizAnswer(option);
        });
    });
}

let grammarQuizData = {
    currentQuestionIndex: 0,
    score: 0,
    questions: [
        {
            question: "Which particle is used to mark the object of a sentence?",
            options: ["은/는", "이/가", "을/를", "에"],
            correct: "을/를"
        },
        {
            question: "What is the correct word order in Korean?",
            options: ["SVO", "SOV", "VSO", "VOS"],
            correct: "SOV"
        },
        {
            question: "Which particle marks the topic of conversation?",
            options: ["이/가", "을/를", "은/는", "에"],
            correct: "은/는"
        },
        {
            question: "What does -요 ending mean?",
            options: ["Formal", "Polite informal", "Casual", "Rude"],
            correct: "Polite informal"
        },
        {
            question: "Which particle is used for location?",
            options: ["을/를", "이/가", "에", "은/는"],
            correct: "에"
        }
    ]
};

function startGrammarQuiz() {
    grammarQuizData.currentQuestionIndex = 0;
    grammarQuizData.score = 0;
    
    document.getElementById('start-grammar-quiz').style.display = 'none';
    document.getElementById('next-grammar-question').style.display = 'inline-block';
    
    nextGrammarQuestion();
}

function nextGrammarQuestion() {
    const { currentQuestionIndex, questions } = grammarQuizData;
    
    if (currentQuestionIndex >= questions.length) {
        endGrammarQuiz();
        return;
    }
    
    const question = questions[currentQuestionIndex];
    
    document.getElementById('grammar-quiz-question').textContent = question.question;
    document.getElementById('grammar-current-question').textContent = currentQuestionIndex + 1;
    document.getElementById('grammar-total-questions').textContent = questions.length;
    
    const options = document.querySelectorAll('.quiz-option');
    options.forEach((option, index) => {
        option.textContent = question.options[index];
        option.dataset.answer = question.options[index];
        option.classList.remove('correct', 'incorrect');
    });
    
    document.getElementById('grammar-quiz-feedback').textContent = '';
    document.getElementById('grammar-quiz-feedback').className = 'quiz-feedback';
}

function checkQuizAnswer(selectedOption) {
    const { currentQuestionIndex, questions } = grammarQuizData;
    const question = questions[currentQuestionIndex];
    const userAnswer = selectedOption.dataset.answer;
    const feedback = document.getElementById('grammar-quiz-feedback');
    
    // Remove previous classes
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.classList.remove('correct', 'incorrect');
    });
    
    if (userAnswer === question.correct) {
        selectedOption.classList.add('correct');
        feedback.textContent = 'Correct!';
        feedback.className = 'quiz-feedback correct';
        grammarQuizData.score++;
    } else {
        selectedOption.classList.add('incorrect');
        feedback.textContent = `Incorrect. The correct answer is ${question.correct}`;
        feedback.className = 'quiz-feedback incorrect';
    }
    
    document.getElementById('grammar-quiz-score').textContent = grammarQuizData.score;
    
    // Show next button after a delay
    setTimeout(() => {
        document.getElementById('next-grammar-question').style.display = 'inline-block';
    }, 1000);
}

function endGrammarQuiz() {
    const { score, questions } = grammarQuizData;
    const percentage = Math.round((score / questions.length) * 100);
    
    document.getElementById('grammar-quiz-question').textContent = `Quiz Complete! You scored ${score}/${questions.length} (${percentage}%)`;
    document.querySelector('.quiz-options').style.display = 'none';
    document.getElementById('grammar-quiz-feedback').innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <h3>Quiz Results</h3>
            <p>Score: ${score}/${questions.length}</p>
            <p>Percentage: ${percentage}%</p>
            <p>${percentage >= 80 ? 'Excellent!' : percentage >= 60 ? 'Good job!' : 'Keep practicing!'}</p>
        </div>
    `;
    document.getElementById('next-grammar-question').style.display = 'none';
    document.getElementById('start-grammar-quiz').style.display = 'inline-block';
    document.getElementById('start-grammar-quiz').textContent = 'Restart Quiz';
}

function initializeGrammarQuiz() {
    // Reset quiz state
    grammarQuizData.currentQuestionIndex = 0;
    grammarQuizData.score = 0;
    
    document.getElementById('start-grammar-quiz').style.display = 'inline-block';
    document.getElementById('next-grammar-question').style.display = 'none';
    document.getElementById('start-grammar-quiz').textContent = 'Start Quiz';
    document.querySelector('.quiz-options').style.display = 'grid';
}

function updateGrammarProgress() {
    const learnedRules = document.querySelector('.learned-rules');
    const totalRules = document.querySelector('.total-rules');
    const progressFill = document.querySelector('.grammar-progress .progress-fill');
    
    if (learnedRules && totalRules && progressFill) {
        const learned = parseInt(learnedRules.textContent);
        const total = parseInt(totalRules.textContent);
        const percentage = (learned / total) * 100;
        
        progressFill.style.width = `${percentage}%`;
    }
}

// Writing functionality
function setupWritingCards() {
    setupWritingModes();
    setupWritingCategories();
    setupTracingCanvas();
    setupFreehandCanvas();
    setupTypingPractice();
    setupDictationPractice();
    updateWritingProgress();
}

function setupWritingModes() {
    const modeButtons = document.querySelectorAll('.writing-modes .mode-btn');
    
    modeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const mode = button.dataset.mode;
            switchWritingMode(mode);
        });
    });
}

function switchWritingMode(mode) {
    // Remove active class from all mode buttons and content
    document.querySelectorAll('.writing-modes .mode-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.writing-mode-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to selected mode button and content
    document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
    document.getElementById(`${mode}-mode`).classList.add('active');
    
    // Initialize mode-specific content
    if (mode === 'tracing') {
        initializeTracingMode();
    } else if (mode === 'freehand') {
        initializeFreehandMode();
    } else if (mode === 'typing') {
        initializeTypingMode();
    } else if (mode === 'dictation') {
        initializeDictationMode();
    }
}

function setupWritingCategories() {
    const categoryButtons = document.querySelectorAll('.writing-category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            switchWritingCategory(category);
        });
    });
}

function switchWritingCategory(category) {
    // Remove active class from all category buttons and sections
    document.querySelectorAll('.writing-category-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.writing-section').forEach(section => section.classList.remove('active'));
    
    // Add active class to selected category button and section
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    document.getElementById(category).classList.add('active');
}

function setupTracingCanvas() {
    const canvas = document.getElementById('tracingCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    
    // Mouse events
    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        lastX = e.clientX - rect.left;
        lastY = e.clientY - rect.top;
    });
    
    canvas.addEventListener('mousemove', (e) => {
        if (!isDrawing) return;
        
        const rect = canvas.getBoundingClientRect();
        const currentX = e.clientX - rect.left;
        const currentY = e.clientY - rect.top;
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(currentX, currentY);
        ctx.strokeStyle = '#4caf50';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.stroke();
        
        lastX = currentX;
        lastY = currentY;
    });
    
    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
    });
    
    canvas.addEventListener('mouseout', () => {
        isDrawing = false;
    });
    
    // Touch events for mobile
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        lastX = touch.clientX - rect.left;
        lastY = touch.clientY - rect.top;
    });
    
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (!isDrawing) return;
        
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const currentX = touch.clientX - rect.left;
        const currentY = touch.clientY - rect.top;
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(currentX, currentY);
        ctx.strokeStyle = '#4caf50';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.stroke();
        
        lastX = currentX;
        lastY = currentY;
    });
    
    canvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        isDrawing = false;
    });
    
    // Control buttons
    const clearBtn = document.getElementById('clear-tracing');
    const showGuideBtn = document.getElementById('show-guide');
    const nextCharBtn = document.getElementById('next-character');
    const practiceBtn = document.getElementById('practice-mode');
    
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            document.getElementById('tracing-feedback').textContent = '';
        });
    }
    
    if (showGuideBtn) {
        showGuideBtn.addEventListener('click', () => {
            const guide = document.getElementById('stroke-guide');
            guide.style.display = guide.style.display === 'none' ? 'block' : 'none';
        });
    }
    
    if (nextCharBtn) {
        nextCharBtn.addEventListener('click', nextTracingCharacter);
    }
    
    if (practiceBtn) {
        practiceBtn.addEventListener('click', togglePracticeMode);
    }
}

function nextTracingCharacter() {
    const characters = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
    const currentChar = document.getElementById('tracing-character').textContent;
    const currentIndex = characters.indexOf(currentChar);
    const nextIndex = (currentIndex + 1) % characters.length;
    
    document.getElementById('tracing-character').textContent = characters[nextIndex];
    
    // Clear canvas
    const canvas = document.getElementById('tracingCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update character info
    updateCharacterInfo(characters[nextIndex]);
}

function updateCharacterInfo(character) {
    const characterData = {
        'ㄱ': { name: '기역 (giyeok)', sound: '/g/', tip: 'Start from top-left, draw down and right' },
        'ㄴ': { name: '니은 (nieun)', sound: '/n/', tip: 'Start from top, draw down and curve right' },
        'ㄷ': { name: '디귿 (digeut)', sound: '/d/', tip: 'Start from top-left, draw down and right' },
        'ㄹ': { name: '리을 (rieul)', sound: '/r/l/', tip: 'Start from top, draw down and curve' },
        'ㅁ': { name: '미음 (mieum)', sound: '/m/', tip: 'Draw a square shape' },
        'ㅂ': { name: '비읍 (bieup)', sound: '/b/', tip: 'Start from top-left, draw down and right' },
        'ㅅ': { name: '시옷 (siot)', sound: '/s/', tip: 'Draw a V shape' },
        'ㅇ': { name: '이응 (ieung)', sound: '/ng/', tip: 'Draw a circle' },
        'ㅈ': { name: '지읒 (jieut)', sound: '/j/', tip: 'Start from top-left, draw down and right' },
        'ㅊ': { name: '치읓 (chieut)', sound: '/ch/', tip: 'Start from top-left, draw down and right' },
        'ㅋ': { name: '키읔 (kieuk)', sound: '/k/', tip: 'Start from top-left, draw down and right' },
        'ㅌ': { name: '티읕 (tieut)', sound: '/t/', tip: 'Start from top-left, draw down and right' },
        'ㅍ': { name: '피읖 (pieup)', sound: '/p/', tip: 'Start from top-left, draw down and right' },
        'ㅎ': { name: '히읗 (hieut)', sound: '/h/', tip: 'Start from top-left, draw down and right' }
    };
    
    const data = characterData[character];
    if (data) {
        document.querySelector('.character-name').textContent = data.name;
        document.querySelector('.character-sound').textContent = data.sound;
        document.querySelector('.character-tip').textContent = data.tip;
    }
}

function togglePracticeMode() {
    const btn = document.getElementById('practice-mode');
    const canvas = document.getElementById('tracingCanvas');
    
    if (btn.textContent === 'Practice Mode') {
        btn.textContent = 'Exit Practice';
        btn.classList.add('btn-warning');
        canvas.style.borderColor = '#ff9800';
        // Add practice mode functionality
    } else {
        btn.textContent = 'Practice Mode';
        btn.classList.remove('btn-warning');
        canvas.style.borderColor = '#e0e0e0';
    }
}

function setupFreehandCanvas() {
    const canvas = document.getElementById('freehandCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    
    // Brush settings
    let brushSize = 5;
    let brushColor = '#000000';
    
    const brushSizeSlider = document.getElementById('brush-size');
    const brushColorPicker = document.getElementById('brush-color');
    const brushSizeValue = document.getElementById('brush-size-value');
    
    if (brushSizeSlider) {
        brushSizeSlider.addEventListener('input', (e) => {
            brushSize = e.target.value;
            brushSizeValue.textContent = brushSize;
        });
    }
    
    if (brushColorPicker) {
        brushColorPicker.addEventListener('change', (e) => {
            brushColor = e.target.value;
        });
    }
    
    // Drawing functions
    function startDrawing(e) {
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        lastX = e.clientX - rect.left;
        lastY = e.clientY - rect.top;
    }
    
    function draw(e) {
        if (!isDrawing) return;
        
        const rect = canvas.getBoundingClientRect();
        const currentX = e.clientX - rect.left;
        const currentY = e.clientY - rect.top;
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(currentX, currentY);
        ctx.strokeStyle = brushColor;
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.stroke();
        
        lastX = currentX;
        lastY = currentY;
    }
    
    function stopDrawing() {
        isDrawing = false;
    }
    
    // Mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Touch events
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        startDrawing(e.touches[0]);
    });
    
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        draw(e.touches[0]);
    });
    
    canvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        stopDrawing();
    });
    
    // Control buttons
    const clearBtn = document.getElementById('clear-freehand');
    const saveBtn = document.getElementById('save-drawing');
    
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });
    }
    
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            const link = document.createElement('a');
            link.download = 'korean-writing-practice.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    }
}

function setupTypingPractice() {
    const startBtn = document.getElementById('start-typing');
    const resetBtn = document.getElementById('reset-typing');
    const checkBtn = document.getElementById('check-typing');
    const input = document.getElementById('typing-input');
    
    let startTime = null;
    let timer = null;
    
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            startTime = Date.now();
            input.disabled = false;
            input.focus();
            startBtn.disabled = true;
            
            // Start timer
            timer = setInterval(updateTypingStats, 100);
        });
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            input.value = '';
            input.disabled = true;
            startBtn.disabled = false;
            startTime = null;
            clearInterval(timer);
            updateTypingStats();
        });
    }
    
    if (checkBtn) {
        checkBtn.addEventListener('click', checkTyping);
    }
    
    function updateTypingStats() {
        if (!startTime) {
            document.getElementById('typing-speed').textContent = '0';
            document.getElementById('typing-accuracy').textContent = '0';
            document.getElementById('typing-time').textContent = '0';
            return;
        }
        
        const elapsed = (Date.now() - startTime) / 1000;
        const words = input.value.trim().split(/\s+/).length;
        const speed = Math.round((words / elapsed) * 60);
        
        document.getElementById('typing-time').textContent = Math.round(elapsed);
        document.getElementById('typing-speed').textContent = speed;
        
        // Calculate accuracy
        const targetText = document.getElementById('typing-text').textContent;
        const accuracy = calculateAccuracy(input.value, targetText);
        document.getElementById('typing-accuracy').textContent = accuracy;
    }
    
    function calculateAccuracy(input, target) {
        if (!input || !target) return 0;
        
        const inputWords = input.trim().split(/\s+/);
        const targetWords = target.trim().split(/\s+/);
        
        let correct = 0;
        const minLength = Math.min(inputWords.length, targetWords.length);
        
        for (let i = 0; i < minLength; i++) {
            if (inputWords[i] === targetWords[i]) {
                correct++;
            }
        }
        
        return Math.round((correct / targetWords.length) * 100);
    }
    
    function checkTyping() {
        const input = document.getElementById('typing-input');
        const target = document.getElementById('typing-text').textContent;
        const accuracy = calculateAccuracy(input.value, target);
        
        if (accuracy >= 90) {
            alert('Excellent! Your accuracy is ' + accuracy + '%');
        } else if (accuracy >= 70) {
            alert('Good job! Your accuracy is ' + accuracy + '%');
        } else {
            alert('Keep practicing! Your accuracy is ' + accuracy + '%');
        }
    }
}

function setupDictationPractice() {
    const playBtn = document.getElementById('play-dictation');
    const repeatBtn = document.getElementById('repeat-dictation');
    const slowBtn = document.getElementById('slow-dictation');
    const checkBtn = document.getElementById('check-dictation');
    const nextBtn = document.getElementById('next-dictation');
    const hintBtn = document.getElementById('show-hint');
    const translationBtn = document.getElementById('show-translation');
    
    const dictationTexts = [
        { korean: '안녕하세요', english: 'Hello', romanization: 'annyeonghaseyo' },
        { korean: '감사합니다', english: 'Thank you', romanization: 'gamsahamnida' },
        { korean: '사랑해요', english: 'I love you', romanization: 'saranghaeyo' },
        { korean: '미안합니다', english: 'I\'m sorry', romanization: 'mianhamnida' },
        { korean: '좋은 하루 되세요', english: 'Have a good day', romanization: 'joeun haru doeseyo' }
    ];
    
    let currentDictation = 0;
    
    if (playBtn) {
        playBtn.addEventListener('click', () => {
            playDictationAudio(dictationTexts[currentDictation].korean);
        });
    }
    
    if (repeatBtn) {
        repeatBtn.addEventListener('click', () => {
            playDictationAudio(dictationTexts[currentDictation].korean);
        });
    }
    
    if (slowBtn) {
        slowBtn.addEventListener('click', () => {
            playDictationAudio(dictationTexts[currentDictation].korean, 0.5);
        });
    }
    
    if (checkBtn) {
        checkBtn.addEventListener('click', () => {
            checkDictationAnswer();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextDictationExercise();
        });
    }
    
    if (hintBtn) {
        hintBtn.addEventListener('click', () => {
            showDictationHint();
        });
    }
    
    if (translationBtn) {
        translationBtn.addEventListener('click', () => {
            showDictationTranslation();
        });
    }
    
    function playDictationAudio(text, rate = 1) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ko-KR';
            utterance.rate = rate;
            speechSynthesis.speak(utterance);
        } else {
            alert('Speech synthesis not supported in this browser');
        }
    }
    
    function checkDictationAnswer() {
        const input = document.getElementById('dictation-text');
        const correct = dictationTexts[currentDictation].korean;
        const feedback = document.getElementById('dictation-feedback');
        
        if (input.value.trim() === correct) {
            feedback.textContent = 'Correct! Well done!';
            feedback.className = 'dictation-feedback success';
        } else {
            feedback.textContent = `Incorrect. The correct answer is: ${correct}`;
            feedback.className = 'dictation-feedback error';
        }
    }
    
    function nextDictationExercise() {
        currentDictation = (currentDictation + 1) % dictationTexts.length;
        document.getElementById('dictation-text').value = '';
        document.getElementById('dictation-feedback').textContent = '';
        document.getElementById('dictation-feedback').className = 'dictation-feedback';
    }
    
    function showDictationHint() {
        const hint = dictationTexts[currentDictation].romanization;
        alert(`Hint: ${hint}`);
    }
    
    function showDictationTranslation() {
        const translation = dictationTexts[currentDictation].english;
        alert(`Translation: ${translation}`);
    }
}

function initializeTracingMode() {
    // Initialize tracing mode specific content
    nextTracingCharacter();
}

function initializeFreehandMode() {
    // Initialize freehand mode specific content
    const canvas = document.getElementById('freehandCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function initializeTypingMode() {
    // Initialize typing mode specific content
    const input = document.getElementById('typing-input');
    if (input) {
        input.value = '';
        input.disabled = true;
    }
}

function initializeDictationMode() {
    // Initialize dictation mode specific content
    const input = document.getElementById('dictation-text');
    if (input) {
        input.value = '';
    }
}

function updateWritingProgress() {
    const charactersWritten = document.querySelector('.characters-written');
    const totalCharacters = document.querySelector('.total-characters');
    const progressFill = document.querySelector('.writing-progress .progress-fill');
    
    if (charactersWritten && totalCharacters && progressFill) {
        const written = parseInt(charactersWritten.textContent);
        const total = parseInt(totalCharacters.textContent);
        const percentage = (written / total) * 100;
        
        progressFill.style.width = `${percentage}%`;
    }
}
