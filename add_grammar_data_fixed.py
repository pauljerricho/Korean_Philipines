import sqlite3
import json

# Connect to the database
conn = sqlite3.connect('korean_philippines.db')
cursor = conn.cursor()

# Create grammar tables
cursor.execute('''
CREATE TABLE IF NOT EXISTS grammar_lessons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    level TEXT NOT NULL,
    lesson_id TEXT NOT NULL,
    title TEXT NOT NULL,
    explanation TEXT NOT NULL,
    order_index INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
''')

cursor.execute('''
CREATE TABLE IF NOT EXISTS grammar_examples (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lesson_id INTEGER NOT NULL,
    korean TEXT NOT NULL,
    breakdown TEXT,
    translation TEXT NOT NULL,
    filipino TEXT NOT NULL,
    order_index INTEGER NOT NULL,
    FOREIGN KEY (lesson_id) REFERENCES grammar_lessons (id)
)
''')

cursor.execute('''
CREATE TABLE IF NOT EXISTS grammar_rules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lesson_id INTEGER NOT NULL,
    rule_text TEXT NOT NULL,
    order_index INTEGER NOT NULL,
    FOREIGN KEY (lesson_id) REFERENCES grammar_lessons (id)
)
''')

cursor.execute('''
CREATE TABLE IF NOT EXISTS grammar_particles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lesson_id INTEGER NOT NULL,
    particle TEXT NOT NULL,
    name TEXT NOT NULL,
    usage TEXT NOT NULL,
    rule_text TEXT NOT NULL,
    order_index INTEGER NOT NULL,
    FOREIGN KEY (lesson_id) REFERENCES grammar_lessons (id)
)
''')

cursor.execute('''
CREATE TABLE IF NOT EXISTS grammar_particle_examples (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    particle_id INTEGER NOT NULL,
    example_text TEXT NOT NULL,
    order_index INTEGER NOT NULL,
    FOREIGN KEY (particle_id) REFERENCES grammar_particles (id)
)
''')

cursor.execute('''
CREATE TABLE IF NOT EXISTS grammar_conjugations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lesson_id INTEGER NOT NULL,
    tense TEXT NOT NULL,
    informal TEXT NOT NULL,
    formal TEXT NOT NULL,
    example_verb TEXT NOT NULL,
    order_index INTEGER NOT NULL,
    FOREIGN KEY (lesson_id) REFERENCES grammar_lessons (id)
)
''')

cursor.execute('''
CREATE TABLE IF NOT EXISTS grammar_practice (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    level TEXT NOT NULL,
    question_type TEXT NOT NULL,
    question TEXT NOT NULL,
    correct_answer TEXT NOT NULL,
    options TEXT NOT NULL,
    explanation TEXT,
    order_index INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
''')

cursor.execute('''
CREATE TABLE IF NOT EXISTS grammar_quiz (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    level TEXT NOT NULL,
    question TEXT NOT NULL,
    correct_answer TEXT NOT NULL,
    options TEXT NOT NULL,
    explanation TEXT,
    order_index INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
''')

# Insert grammar lessons data
lessons_data = [
    # Beginner Level
    ('beginner', 'sentence-structure', 'Sentence Structure (문장 구조)', 
     'Korean follows Subject-Object-Verb (SOV) order, different from English and Filipino.', 1),
    ('beginner', 'particles-basic', 'Basic Particles (기본 조사)', 
     'Particles are essential markers that show the relationship between words.', 2),
    ('beginner', 'verb-conjugation', 'Verb Conjugation (동사 활용)', 
     'Korean verbs change form based on tense, politeness, and formality.', 3),
    ('beginner', 'question-formation', 'Question Formation (의문문)', 
     'Learn how to form questions in Korean by changing intonation or adding question words.', 4),
    ('beginner', 'negation', 'Negation (부정문)', 
     'Learn how to make negative sentences in Korean using 안, 못, and 지 않다.', 5),
    ('beginner', 'time-expressions', 'Time Expressions (시간 표현)', 
     'Learn how to express time, dates, and duration in Korean.', 6),
    
    # Intermediate Level
    ('intermediate', 'honorifics', 'Honorifics (존댓말)', 
     'Korean has a complex honorific system based on social hierarchy and politeness.', 1),
    ('intermediate', 'complex-particles', 'Complex Particles (복합 조사)', 
     'Advanced particles that express more specific relationships between words.', 2),
    ('intermediate', 'causative-passive', 'Causative and Passive (사동사와 피동사)', 
     'Learn how to express causative and passive voice in Korean.', 3),
    ('intermediate', 'conditional', 'Conditional Sentences (조건문)', 
     'Expressing conditions and hypothetical situations using -면, -으면 patterns.', 4),
    ('intermediate', 'quoted-speech', 'Quoted Speech (인용문)', 
     'Learn how to quote someone\'s speech using -라고, -다고 patterns.', 5),
    ('intermediate', 'comparison', 'Comparison (비교문)', 
     'Express comparisons using -보다, -만큼, -처럼 patterns.', 6),
    
    # Advanced Level
    ('advanced', 'subjunctive', 'Subjunctive Mood (가정법)', 
     'Express hypothetical situations and wishes using -았/었으면, -면 좋겠다.', 1),
    ('advanced', 'complex-sentences', 'Complex Sentences (복문)', 
     'Learn how to create complex sentences with multiple clauses.', 2),
    ('advanced', 'literary-style', 'Literary Style (문어체)', 
     'Formal written Korean used in literature and formal documents.', 3),
    ('advanced', 'idioms-expressions', 'Idioms and Expressions (관용어)', 
     'Common Korean idioms and expressions used in daily conversation.', 4),
    ('advanced', 'business-korean', 'Business Korean (비즈니스 한국어)', 
     'Formal Korean used in business and professional settings.', 5),
    ('advanced', 'academic-korean', 'Academic Korean (학술 한국어)', 
     'Korean used in academic writing and research papers.', 6)
]

for lesson in lessons_data:
    cursor.execute('''
        INSERT INTO grammar_lessons (level, lesson_id, title, explanation, order_index)
        VALUES (?, ?, ?, ?, ?)
    ''', lesson)

# Get lesson IDs for foreign key references
cursor.execute('SELECT id, lesson_id FROM grammar_lessons')
lesson_ids = {lesson_id: id for id, lesson_id in cursor.fetchall()}

# Insert examples
examples_data = [
    (lesson_ids['sentence-structure'], '저는 사과를 먹어요', '저는 + 사과를 + 먹어요', 'I eat an apple', 'Ako ay kumakain ng mansanas', 1),
    (lesson_ids['sentence-structure'], '친구가 학교에 가요', '친구가 + 학교에 + 가요', 'A friend goes to school', 'Ang kaibigan ay pumupunta sa paaralan', 2),
    (lesson_ids['particles-basic'], '저는 학생이에요', '저는 + 학생 + 이에요', 'I am a student', 'Ako ay isang estudyante', 1),
    (lesson_ids['particles-basic'], '사과를 먹어요', '사과를 + 먹어요', 'I eat an apple', 'Kumakain ako ng mansanas', 2),
    (lesson_ids['verb-conjugation'], '가요', '가다 → 가요', 'I go', 'Pupunta ako', 1),
    (lesson_ids['verb-conjugation'], '갔어요', '가다 → 갔어요', 'I went', 'Pumunta ako', 2),
    (lesson_ids['question-formation'], '어디에 가세요?', '어디에 + 가세요?', 'Where are you going?', 'Saan ka pupunta?', 1),
    (lesson_ids['question-formation'], '뭐 해요?', '뭐 + 해요?', 'What are you doing?', 'Ano ang ginagawa mo?', 2),
    (lesson_ids['negation'], '안 가요', '안 + 가요', 'I don\'t go', 'Hindi ako pupunta', 1),
    (lesson_ids['negation'], '못 해요', '못 + 해요', 'I can\'t do it', 'Hindi ko kaya', 2),
    (lesson_ids['time-expressions'], '오늘 학교에 가요', '오늘 + 학교에 + 가요', 'I go to school today', 'Pupunta ako sa paaralan ngayon', 1),
    (lesson_ids['time-expressions'], '어제 친구를 만났어요', '어제 + 친구를 + 만났어요', 'I met a friend yesterday', 'Nakipagkita ako sa kaibigan kahapon', 2),
]

for example in examples_data:
    cursor.execute('''
        INSERT INTO grammar_examples (lesson_id, korean, breakdown, translation, filipino, order_index)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', example)

# Insert rules
rules_data = [
    (lesson_ids['sentence-structure'], 'Subject comes first (저는)', 1),
    (lesson_ids['sentence-structure'], 'Object comes second (사과를)', 2),
    (lesson_ids['sentence-structure'], 'Verb comes last (먹어요)', 3),
    (lesson_ids['particles-basic'], 'Use 은 after consonants, 는 after vowels', 1),
    (lesson_ids['particles-basic'], 'Use 이 after consonants, 가 after vowels', 2),
    (lesson_ids['particles-basic'], 'Use 을 after consonants, 를 after vowels', 3),
    (lesson_ids['verb-conjugation'], 'Present tense: -어요/-아요', 1),
    (lesson_ids['verb-conjugation'], 'Past tense: -었어요/-았어요', 2),
    (lesson_ids['verb-conjugation'], 'Future tense: -을 거예요/-ㄹ 거예요', 3),
    (lesson_ids['question-formation'], 'Add question words like 어디, 뭐, 언제', 1),
    (lesson_ids['question-formation'], 'Change intonation to make questions', 2),
    (lesson_ids['negation'], 'Use 안 before verbs for simple negation', 1),
    (lesson_ids['negation'], 'Use 못 before verbs for inability', 2),
    (lesson_ids['negation'], 'Use 지 않다 for formal negation', 3),
    (lesson_ids['time-expressions'], 'Time words usually come at the beginning', 1),
    (lesson_ids['time-expressions'], 'Use 에 for specific times', 2),
]

for rule in rules_data:
    cursor.execute('''
        INSERT INTO grammar_rules (lesson_id, rule_text, order_index)
        VALUES (?, ?, ?)
    ''', rule)

# Insert particles
particles_data = [
    (lesson_ids['particles-basic'], '은/는', 'Topic Marker', 'Marks the topic of conversation', 'Use 은 after consonants, 는 after vowels', 1),
    (lesson_ids['particles-basic'], '이/가', 'Subject Marker', 'Marks the subject of the sentence', 'Use 이 after consonants, 가 after vowels', 2),
    (lesson_ids['particles-basic'], '을/를', 'Object Marker', 'Marks the object of the sentence', 'Use 을 after consonants, 를 after vowels', 3),
    (lesson_ids['complex-particles'], '에/에서', 'Location Particles', '에 for static locations, 에서 for action locations', '에 for destinations, 에서 for places of action', 1),
    (lesson_ids['complex-particles'], '와/과', 'And Particle', 'Connects nouns meaning "and"', 'Use 와 after vowels, 과 after consonants', 2),
    (lesson_ids['complex-particles'], '도', 'Also Particle', 'Means "also" or "too"', 'Can replace other particles', 3),
]

for particle in particles_data:
    cursor.execute('''
        INSERT INTO grammar_particles (lesson_id, particle, name, usage, rule_text, order_index)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', particle)

# Get particle IDs
cursor.execute('SELECT id, particle FROM grammar_particles')
particle_ids = {particle: id for id, particle in cursor.fetchall()}

# Insert particle examples
particle_examples_data = [
    (particle_ids['은/는'], '저는 학생이에요', 1),
    (particle_ids['은/는'], '한국어는 어려워요', 2),
    (particle_ids['이/가'], '친구가 와요', 1),
    (particle_ids['이/가'], '비가 와요', 2),
    (particle_ids['을/를'], '사과를 먹어요', 1),
    (particle_ids['을/를'], '책을 읽어요', 2),
    (particle_ids['에/에서'], '학교에 가요', 1),
    (particle_ids['에/에서'], '학교에서 공부해요', 2),
    (particle_ids['와/과'], '사과와 바나나', 1),
    (particle_ids['와/과'], '친구와 만나요', 2),
    (particle_ids['도'], '저도 가요', 1),
    (particle_ids['도'], '사과도 좋아해요', 2),
]

for example in particle_examples_data:
    cursor.execute('''
        INSERT INTO grammar_particle_examples (particle_id, example_text, order_index)
        VALUES (?, ?, ?)
    ''', example)

# Insert conjugations
conjugations_data = [
    (lesson_ids['verb-conjugation'], 'Present (현재)', '가요', '갑니다', '가다 (to go)', 1),
    (lesson_ids['verb-conjugation'], 'Past (과거)', '갔어요', '갔습니다', '가다 (to go)', 2),
    (lesson_ids['verb-conjugation'], 'Future (미래)', '갈 거예요', '갈 것입니다', '가다 (to go)', 3),
    (lesson_ids['verb-conjugation'], 'Present (현재)', '먹어요', '먹습니다', '먹다 (to eat)', 4),
    (lesson_ids['verb-conjugation'], 'Past (과거)', '먹었어요', '먹었습니다', '먹다 (to eat)', 5),
    (lesson_ids['verb-conjugation'], 'Future (미래)', '먹을 거예요', '먹을 것입니다', '먹다 (to eat)', 6),
]

for conj in conjugations_data:
    cursor.execute('''
        INSERT INTO grammar_conjugations (lesson_id, tense, informal, formal, example_verb, order_index)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', conj)

# Insert practice questions
practice_data = [
    ('beginner', 'fill_blank', 'Complete the sentence: 저는 _____ 한국어를 공부합니다.', '집에서', '["학교에서", "집에서", "도서관에서", "카페에서"]', 'Use 에서 for places where actions happen', 1),
    ('beginner', 'particle', 'Choose the correct particle: 사과_____ 먹어요', '을', '["을", "를", "에", "에서"]', 'Use 을 after consonants, 를 after vowels', 2),
    ('beginner', 'conjugation', 'Choose the correct conjugation: 가다 (past tense)', '갔어요', '["가요", "갔어요", "갈 거예요", "가세요"]', 'Past tense uses -었어요/-았어요', 3),
    ('beginner', 'question', 'Make this a question: 학교에 가요', '학교에 가요?', '["학교에 가요?", "학교에 가세요?", "학교에 가나요?", "학교에 가요!"]', 'Add question mark or change intonation', 4),
    ('beginner', 'negation', 'Make this negative: 가요', '안 가요', '["안 가요", "못 가요", "가지 않아요", "가요 안"]', 'Use 안 before verbs for simple negation', 5),
    ('intermediate', 'honorific', 'Choose the correct honorific level for a teacher', '갑니다', '["가요", "갑니다", "가", "가세요"]', 'Use -습니다/-ㅂ니다 for very formal situations', 6),
    ('intermediate', 'particle', 'Choose the correct particle: 친구_____ 만나요', '와', '["와", "과", "을", "를"]', 'Use 와 after vowels, 과 after consonants', 7),
    ('intermediate', 'conditional', 'Complete: 비가 오면 _____', '집에 있어요', '["집에 있어요", "집에 가요", "학교에 가요", "밖에 나가요"]', 'Use -면 for conditional statements', 8),
    ('advanced', 'subjunctive', 'Complete: 시간이 있으면 _____', '갈 거예요', '["갈 거예요", "가요", "갔어요", "가세요"]', 'Use -으면 for hypothetical situations', 9),
    ('advanced', 'complex', 'Choose the correct complex sentence structure', '친구가 와서 같이 공부했어요', '["친구가 와서 같이 공부했어요", "친구가 와고 같이 공부했어요", "친구가 와지만 같이 공부했어요", "친구가 와서도 같이 공부했어요"]', 'Use -서 to connect cause and effect', 10),
]

for practice in practice_data:
    cursor.execute('''
        INSERT INTO grammar_practice (level, question_type, question, correct_answer, options, explanation, order_index)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', practice)

# Insert quiz questions
quiz_data = [
    ('beginner', 'Which particle is used to mark the subject of a sentence?', '이/가', '["이/가", "을/를", "에", "에서"]', '이/가 marks the subject, 을/를 marks the object', 1),
    ('beginner', 'What is the correct word order in Korean?', 'Subject-Object-Verb', '["Subject-Object-Verb", "Subject-Verb-Object", "Verb-Subject-Object", "Object-Subject-Verb"]', 'Korean follows SOV order, different from English', 2),
    ('beginner', 'How do you make a question in Korean?', 'Add question words or change intonation', '["Add question words or change intonation", "Always add -나요", "Change verb ending", "Add -까요"]', 'Questions can be made by adding question words or changing intonation', 3),
    ('beginner', 'What does 안 mean?', 'Not (negation)', '["Not (negation)", "Yes", "Maybe", "Always"]', '안 is used for simple negation before verbs', 4),
    ('beginner', 'Which time expression means "today"?', '오늘', '["오늘", "어제", "내일", "지금"]', '오늘 means today, 어제 means yesterday, 내일 means tomorrow', 5),
    ('intermediate', 'Which honorific level is most formal?', '-습니다/-ㅂ니다', '["-습니다/-ㅂ니다", "-어요/-아요", "-어/-아", "-세요"]', '-습니다/-ㅂ니다 is the most formal level', 6),
    ('intermediate', 'What is the difference between 에 and 에서?', '에 for destinations, 에서 for places of action', '["에 for destinations, 에서 for places of action", "에 for action, 에서 for destinations", "No difference", "에 is formal, 에서 is informal"]', '에 indicates destination, 에서 indicates place where action occurs', 7),
    ('intermediate', 'What does -면 mean?', 'If/when', '["If/when", "Because", "But", "And"]', '-면 is used for conditional statements meaning "if" or "when"', 8),
    ('intermediate', 'Which particle means "also" or "too"?', '도', '["도", "와", "과", "에"]', '도 means "also" or "too" and can replace other particles', 9),
    ('intermediate', 'How do you quote someone\'s speech?', 'Use -라고 or -다고', '["Use -라고 or -다고", "Use -면", "Use -서", "Use -지만"]', '-라고 is used for commands, -다고 for statements', 10),
    ('advanced', 'What is the subjunctive mood used for?', 'Hypothetical situations and wishes', '["Hypothetical situations and wishes", "Past events", "Future plans", "Current actions"]', 'Subjunctive mood expresses hypothetical situations and wishes', 11),
    ('advanced', 'Which is correct for "I wish I had time"?', '시간이 있었으면 좋겠어요', '["시간이 있었으면 좋겠어요", "시간이 있으면 좋겠어요", "시간이 있어서 좋겠어요", "시간이 있지만 좋겠어요"]', 'Use -았/었으면 for past hypothetical situations', 12),
    ('advanced', 'What is literary style used for?', 'Formal written Korean', '["Formal written Korean", "Casual conversation", "Questions", "Commands"]', 'Literary style is used in formal written Korean', 13),
    ('advanced', 'Which is business Korean?', '감사합니다', '["감사합니다", "고마워", "고마워요", "고맙습니다"]', '감사합니다 is the most formal way to say thank you', 14),
    ('advanced', 'What makes academic Korean different?', 'Complex sentence structures and formal vocabulary', '["Complex sentence structures and formal vocabulary", "Simple sentences", "Casual expressions", "Question forms"]', 'Academic Korean uses complex structures and formal vocabulary', 15),
]

for quiz in quiz_data:
    cursor.execute('''
        INSERT INTO grammar_quiz (level, question, correct_answer, options, explanation, order_index)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', quiz)

# Commit changes
conn.commit()
conn.close()

print("Grammar data added successfully!")
print("Lessons:", len(lessons_data))
print("Examples:", len(examples_data))
print("Rules:", len(rules_data))
print("Particles:", len(particles_data))
print("Particle Examples:", len(particle_examples_data))
print("Conjugations:", len(conjugations_data))
print("Practice Questions:", len(practice_data))
print("Quiz Questions:", len(quiz_data))
