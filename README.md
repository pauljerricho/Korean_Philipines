# 🇰🇷 Korean Learning App 🇵🇭

A comprehensive Korean language learning application with Filipino translations, designed for Filipino learners of Korean.

## Features

### 📚 Vocabulary Learning
- **10+ Categories**: Colors, Emotions, Family, Food, Numbers, Shopping, Time, Weather, Animals, Body, Clothes, House, School, Transport
- **Bilingual Support**: Korean, English, and Filipino translations
- **Audio Pronunciation**: Text-to-speech for both Korean and Filipino
- **Interactive Learning**: Click through words one by one
- **Progress Tracking**: Mark words as learned

### 📖 Grammar Learning
- **Three Levels**: Beginner, Intermediate, Advanced
- **Comprehensive Lessons**: Sentence structure, particles, conjugations, and more
- **Practice Questions**: Interactive exercises with immediate feedback
- **Quiz System**: Test your knowledge with multiple-choice questions
- **Real Examples**: Korean sentences with English and Filipino translations

## How to Use

### Local Development
1. Clone this repository
2. Install dependencies: `npm install`
3. Start the server: `node server.js`
4. Open http://localhost:3000

### GitHub Pages (Static Version)
1. Use `index_static.html` as your main page
2. All data is loaded from JavaScript files in the `data/` folder
3. No server required - works directly in the browser

## File Structure

```
├── index.html              # Main application (requires server)
├── index_static.html       # Static version for GitHub Pages
├── script.js              # Main JavaScript (server version)
├── script_static.js       # Static JavaScript (no server)
├── server.js              # Node.js server
├── styles.css             # Application styles
├── data/                  # Data files
│   ├── categories.js      # Vocabulary categories
│   ├── words.js          # Vocabulary words
│   ├── grammar_levels.js # Grammar difficulty levels
│   ├── grammar_lessons.js # Grammar lessons
│   ├── grammar_examples.js # Grammar examples
│   ├── grammar_rules.js  # Grammar rules
│   ├── grammar_particles.js # Korean particles
│   ├── grammar_conjugations.js # Verb conjugations
│   ├── grammar_practice.js # Practice questions
│   └── grammar_quiz.js   # Quiz questions
└── README.md
```

## Data Sources

The application uses a comprehensive database of Korean vocabulary and grammar:

- **Vocabulary**: 100+ words per category with Korean, English, and Filipino translations
- **Grammar**: 50+ lessons covering beginner to advanced topics
- **Practice**: 100+ interactive questions
- **Quiz**: 50+ quiz questions for testing knowledge

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express (for local development)
- **Data**: SQLite database (converted to JavaScript modules)
- **Audio**: Web Speech API
- **Icons**: Font Awesome

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For questions or support, please open an issue on GitHub.

---

Made with ❤️ for Korean language learners in the Philippines