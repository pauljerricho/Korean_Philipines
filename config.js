// Korean Language App Configuration
// API Keys and Settings

const CONFIG = {
    // Google Translate API Key
    // Get your API key from: https://console.cloud.google.com/
    GOOGLE_TRANSLATE_API_KEY: 'YOUR_GOOGLE_TRANSLATE_API_KEY',
    
    // Azure Speech Services
    // Get your keys from: https://portal.azure.com/
    AZURE_SPEECH_KEY: 'YOUR_AZURE_SPEECH_KEY',
    AZURE_SPEECH_REGION: 'YOUR_AZURE_REGION', // e.g., 'eastus', 'westus2'
    
    // Korean Language Learning API (if available)
    KOREAN_API_ENDPOINT: 'https://api.korean-learning.com/v1',
    KOREAN_API_KEY: 'YOUR_KOREAN_API_KEY',
    
    // App Settings
    APP_SETTINGS: {
        // Speech settings
        SPEECH_RATE: 0.8,
        SPEECH_PITCH: 1.0,
        SPEECH_VOLUME: 1.0,
        
        // Voice settings
        KOREAN_VOICE: 'ko-KR-SunHiNeural', // Natural Korean voice
        FILIPINO_VOICE: 'fil-PH-BlessicaNeural', // Natural Filipino voice
        ENGLISH_VOICE: 'en-US-AriaNeural', // Natural English voice
        
        // Learning settings
        DAILY_GOAL_WORDS: 10,
        DAILY_GOAL_CHARACTERS: 5,
        QUIZ_QUESTIONS_PER_SESSION: 10,
        
        // UI settings
        ANIMATION_SPEED: 300,
        NOTIFICATION_DURATION: 3000,
        
        // Progress tracking
        SAVE_PROGRESS_INTERVAL: 5000, // 5 seconds
        MAX_ACTIVITY_HISTORY: 50
    },
    
    // Feature flags
    FEATURES: {
        SPEECH_RECOGNITION: true,
        TEXT_TO_SPEECH: true,
        REAL_TIME_TRANSLATION: true,
        PROGRESS_TRACKING: true,
        ACHIEVEMENTS: true,
        STUDY_STREAK: true
    },
    
    // Language settings
    LANGUAGES: {
        SOURCE: 'ko', // Korean
        TARGET: 'tl', // Filipino (Tagalog)
        FALLBACK: 'en' // English fallback
    },
    
    // API Endpoints
    ENDPOINTS: {
        GOOGLE_TRANSLATE: 'https://translation.googleapis.com/language/translate/v2',
        GOOGLE_SPEECH: 'https://texttospeech.googleapis.com/v1/text:synthesize',
        AZURE_SPEECH: 'https://{region}.tts.speech.microsoft.com/cognitiveservices/v1',
        AZURE_SPEECH_TOKEN: 'https://{region}.api.cognitive.microsoft.com/sts/v1.0/issuetoken',
        KOREAN_DICTIONARY: 'https://krdict.korean.go.kr/api/search',
        CULTURAL_INFO: 'https://api.korean-culture.com/v1'
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else {
    window.CONFIG = CONFIG;
}

// Usage instructions
console.log('🔧 Korean Language App Configuration Loaded');
console.log('📝 To enable full features:');
console.log('1. Get Google Translate API key from: https://console.cloud.google.com/');
console.log('2. Replace YOUR_GOOGLE_TRANSLATE_API_KEY in config.js');
console.log('3. Restart the app to enable real-time translation');
console.log('4. Speech features work without API keys (using browser APIs)');
