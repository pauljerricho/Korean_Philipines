# Korean Language App for Philippines 🇰🇷🇵🇭

A comprehensive Korean language learning platform designed specifically for Filipino learners, featuring structured learning levels, interactive lessons, pronunciation guides, cultural insights, and a complete mobile app experience.

## ✨ Features

### 🎓 Learning Levels System
- **Beginner (초급)** - Basic Korean for daily life
- **Elementary (초중급)** - Build vocabulary and basic grammar
- **Intermediate (중급)** - Master complex grammar and conversation
- **Advanced (고급)** - Master Korean language and culture
- **Progressive Unlocking** - Complete requirements to unlock next level
- **Structured Curriculum** - Organized lessons for systematic learning

### 📚 Comprehensive Learning
- **Vocabulary Builder** with Korean-Filipino-English translations
- **Hangul Mastery** - Learn Korean alphabet with interactive cards
- **Grammar Lessons** - From basic to advanced Korean grammar
- **Writing Practice** - Character tracing and memory exercises
- **Quiz System** - Test your knowledge with interactive quizzes
- **Progress Tracking** - Monitor your learning journey

### 🔊 Advanced Pronunciation Guide
- **Azure Speech Services** for natural, high-quality Korean and Filipino pronunciation
- **Multi-language voice support** - Korean, Filipino, and English voices
- **Voice customization** - adjustable speed, pitch, and voice selection
- **Speech recognition** for pronunciation practice with microphone
- **Interactive practice words** with dual-language audio feedback
- **Real-time pronunciation feedback** and voice comparison

### ✍️ Writing Practice
- **Character tracing** exercises
- **Memory writing** with answer validation
- **Character builder** - combine consonants and vowels
- **Stroke order** guidance
- **Visual feedback** for correct writing

### 📖 Grammar Lessons
- **Sentence structure** patterns
- **Particle usage** (은/는, 이/가, 을/를)
- **Polite endings** (요, 입니다)
- **Question formation**
- **Progressive lessons** from basic to advanced

### 🎯 Quiz System
- **20+ questions** covering all topics
- **Multiple choice** format
- **Instant feedback** with explanations
- **Score tracking** and progress monitoring
- **Randomized questions** for varied practice

### 📊 Progress Dashboard
- **Learning statistics** - vocabulary, Hangul, quiz scores
- **Achievement system** with unlockable badges
- **Study streak** tracking
- **Recent activity** log
- **Visual progress** indicators

### 💝 Support System
- **Donation Tiers** - Coffee, Lunch, Dinner, Monthly, Patron
- **Payment Integration** - PayPal, Stripe, GCash, PayMaya
- **Supporter Benefits** - Badges, early access, premium content
- **Progress Tracking** - Monthly goals and supporter recognition
- **Transparent Funding** - See how your support helps

### 📱 Mobile App Ready
- **Cordova/PhoneGap** - Cross-platform mobile development
- **Android & iOS** - Native app experience
- **Offline Mode** - Learn without internet connection
- **Push Notifications** - Study reminders and updates
- **App Store Ready** - Professional mobile app deployment

## 🚀 Technical Highlights

- **Modern Web Technologies** - HTML5, CSS3, JavaScript ES6+
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Local Storage** - Saves progress offline
- **Font Awesome** - Icons
- **Mobile-First Design** - Optimized for mobile learning

## API Integration

### Azure Speech Services
- **High-Quality TTS**: Natural Korean, Filipino, and English voices
- **Neural Voices**: Advanced AI-powered speech synthesis
- **Customizable Speech**: Adjustable speed, pitch, and voice selection
- **Speech Recognition**: Practice pronunciation with microphone input
- **API Key Required**: Get from Azure Portal for premium features
- **Fallback Support**: Web Speech API when Azure is unavailable

### Google Translate API
- **Real-time Translation**: Instant Korean to Filipino translation
- **Fallback System**: Built-in translations when API is unavailable
- **Setup Required**: Get API key from Google Cloud Console
- **Cost**: Pay-per-use pricing model

### Local Storage
- **Progress Tracking**: Saves learning progress locally
- **Achievement System**: Tracks unlocked achievements
- **Study Streak**: Maintains daily study streak data
- **Activity History**: Stores recent learning activities

## 🚀 Getting Started

### Basic Setup (No API Keys Required)
1. **Download** or clone this repository
2. **Open** `index.html` in your web browser
3. **Start Learning** Korean!

All basic features work immediately without any setup.

### Advanced Setup (With API Keys)
1. **Get Azure Speech Services Key**:
   - Go to [Azure Portal](https://portal.azure.com/)
   - Create a new Speech Services resource
   - Copy the API key and region
   - Open `config.js` and replace:
     - `YOUR_AZURE_SPEECH_KEY` with your Azure Speech key
     - `YOUR_AZURE_REGION` with your Azure region (e.g., 'eastus')

2. **Get Google Translate API Key** (Optional):
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable the Translation API
   - Create credentials (API Key)
   - Replace `YOUR_GOOGLE_TRANSLATE_API_KEY` in `config.js`

3. **Enable Advanced Features**:
   - **Natural voice synthesis** with Azure Speech Services
   - **Multi-language pronunciation** (Korean, Filipino, English)
   - **Real-time translation** with Google Translate
   - **Voice customization** controls

### Browser Requirements
- **Chrome 60+** (Recommended for best speech features)
- **Firefox 55+**
- **Safari 12+**
- **Edge 79+**

## 📱 Mobile App Development

### Prerequisites
- **Node.js** 14+ installed
- **Cordova CLI** installed globally: `npm install -g cordova`
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)

### Building the Mobile App
1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Add Platforms**:
   ```bash
   npm run platform:add:android
   npm run platform:add:ios
   ```

3. **Build for Android**:
   ```bash
   npm run build:android
   ```

4. **Build for iOS**:
   ```bash
   npm run build:ios
   ```

5. **Run on Device**:
   ```bash
   npm run dev          # Android
   npm run dev:ios      # iOS
   ```

### Mobile App Features
- **Offline Learning** - Download lessons for offline study
- **Push Notifications** - Daily study reminders
- **Native Performance** - Smooth animations and interactions
- **App Store Distribution** - Ready for Google Play and App Store

## 🎯 Learning Path

### Beginner Level (초급)
1. **Hangul Basics** - Learn Korean alphabet
2. **Basic Greetings** - Essential Korean greetings
3. **Numbers 1-10** - Korean number system

### Elementary Level (초중급)
1. **Family Members** - Korean family vocabulary
2. **Basic Grammar** - Essential particles and sentence structure

### Intermediate Level (중급)
1. **Daily Conversations** - Real-world dialogue practice
2. **Advanced Grammar** - Complex sentence structures

### Advanced Level (고급)
1. **Business Korean** - Professional language
2. **Cultural Context** - Understanding Korean culture

## 💝 Supporting the Project

This app is completely free and open source. Your support helps:

- 💰 **Cover server costs** and API fees
- 🚀 **Develop new features** and content
- 📱 **Create mobile app** versions
- 🌍 **Keep the app free** for everyone

### Support Tiers
- **☕ Coffee Support** ($5) - Thank you message + Supporter badge
- **🍱 Lunch Support** ($15) - All previous + Early access to features
- **🍽️ Dinner Support** ($30) - All previous + Premium content
- **💝 Monthly Supporter** ($10/month) - All benefits + Priority support
- **👑 Patron** ($50) - All benefits + Name in credits + Direct communication

## 📁 Project Structure

```
Korean_Philipines/
├── index.html              # Main application file
├── styles.css              # All styling and responsive design
├── script.js               # Main application logic
├── config.js               # API keys and configuration
├── levels.js               # Learning levels system
├── donation.js             # Donation and support system
├── config.xml              # Cordova mobile app configuration
├── package.json            # Node.js dependencies and scripts
└── README.md               # This file
```

## 🤝 Contributing

We welcome contributions! Please feel free to:

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Submit** a pull request

### Areas for Contribution
- 📚 **Content** - Add more vocabulary, grammar lessons
- 🎨 **Design** - Improve UI/UX
- 🔧 **Features** - Add new learning modules
- 🌐 **Translation** - Improve Filipino translations
- 📱 **Mobile** - Enhance mobile app features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Korean Language Institute** for language resources
- **Filipino Language Community** for cultural insights
- **Open Source Community** for amazing tools and libraries
- **All Supporters** who help keep this project free

## 📞 Contact

- **Website**: [koreanlearning.ph](https://koreanlearning.ph)
- **Email**: support@koreanlearning.ph
- **GitHub**: [github.com/koreanlearning/philippines-app](https://github.com/koreanlearning/philippines-app)

---

**Made with ❤️ for Filipino Korean learners**

*Start your Korean learning journey today!* 🇰🇷🇵🇭