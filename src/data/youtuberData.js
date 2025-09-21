const youtuberData = [
  {
    id: 'korean-with-sejin',
    name: 'Korean with Sejin',
    channel: 'Korean with Sejin',
    subscribers: '1.2M',
    language: 'English/Korean',
    level: 'All Levels',
    description: 'Native Korean teacher with 10+ years experience. Learn Korean through K-drama, K-pop, and real-life conversations. Perfect for Filipino learners!',
    specialties: ['K-drama Korean', 'K-pop Lyrics', 'Real Conversations', 'Cultural Context', 'TOPIK Prep'],
    thumbnail: 'https://picsum.photos/400/250?random=1',
    isSpecial: true,
    rating: 4.9,
    totalVideos: 450,
    uploadFrequency: '3x/week',
    joinDate: '2018-03-15',
    videos: [
      {
        title: 'Learn Korean with BTS Songs - Complete Guide',
        duration: '28:45',
        views: '2.1M',
        url: 'https://www.youtube.com/watch?v=QzmEnohlhZ4',
        thumbnail: 'https://picsum.photos/300/200?random=10',
        publishedAt: '2024-01-15'
      },
      {
        title: 'Korean Drama Phrases You Need to Know',
        duration: '22:30',
        views: '1.8M',
        url: 'https://www.youtube.com/watch?v=QzmEnohlhZ4',
        thumbnail: 'https://picsum.photos/300/200?random=11',
        publishedAt: '2024-01-08'
      },
      {
        title: 'TOPIK I Complete Study Guide',
        duration: '35:20',
        views: '1.5M',
        url: 'https://www.youtube.com/watch?v=QzmEnohlhZ4',
        thumbnail: 'https://picsum.photos/300/200?random=12',
        publishedAt: '2024-01-01'
      }
    ],
    social: {
      youtube: 'https://www.youtube.com/@koreanwithsejin',
      instagram: 'https://www.instagram.com/koreanwithsejin',
      tiktok: 'https://www.tiktok.com/@koreanwithsejin',
      website: 'https://koreanwithsejin.com'
    },
    features: ['Live Classes', 'Study Materials', 'Community Discord', 'Mobile App']
  },
  {
    id: 'talk-to-me-in-korean',
    name: 'Talk To Me In Korean',
    channel: 'Talk To Me In Korean',
    subscribers: '2.5M',
    language: 'English',
    level: 'All Levels',
    description: 'The most comprehensive Korean learning platform. Structured lessons from absolute beginner to advanced level with native Korean teachers.',
    specialties: ['Grammar', 'Conversation', 'Culture', 'Business Korean', 'TOPIK'],
    thumbnail: 'https://picsum.photos/400/250?random=2',
    rating: 4.8,
    totalVideos: 1200,
    uploadFrequency: 'Daily',
    joinDate: '2010-01-01',
    videos: [
      {
        title: 'Korean Grammar in Use - Basic Level',
        duration: '20:15',
        views: '3.2M',
        url: 'https://www.youtube.com/watch?v=3CgVgLQxQhI',
        thumbnail: 'https://picsum.photos/300/200?random=13',
        publishedAt: '2024-01-20'
      },
      {
        title: 'Korean Conversation Practice',
        duration: '18:30',
        views: '2.7M',
        url: 'https://www.youtube.com/watch?v=4CgVgLQxQhI',
        thumbnail: 'https://picsum.photos/300/200?random=11',
        publishedAt: '2024-01-18'
      },
      {
        title: 'Korean Culture and Etiquette',
        duration: '25:10',
        views: '2.1M',
        url: 'https://www.youtube.com/watch?v=5CgVgLQxQhI',
        thumbnail: 'https://picsum.photos/300/200?random=10',
        publishedAt: '2024-01-15'
      }
    ],
    social: {
      youtube: 'https://www.youtube.com/@talktomeinkorean',
      instagram: 'https://www.instagram.com/talktomeinkorean',
      website: 'https://talktomeinkorean.com',
      facebook: 'https://facebook.com/talktomeinkorean'
    },
    features: ['Premium Courses', 'Workbooks', 'Mobile App', 'Live Classes']
  },
  {
    id: 'korean-saeng',
    name: 'Korean Saeng',
    channel: 'Korean Saeng',
    subscribers: '1.8M',
    language: 'English',
    level: 'Beginner to Advanced',
    description: 'Native Korean teacher with clear explanations and practical daily expressions. Perfect for beginners who want to speak Korean naturally.',
    specialties: ['Daily Korean', 'Pronunciation', 'Grammar', 'Culture', 'Beginner Friendly'],
    thumbnail: 'https://picsum.photos/400/250?random=3',
    rating: 4.7,
    totalVideos: 380,
    uploadFrequency: '2x/week',
    joinDate: '2019-06-10',
    videos: [
      {
        title: 'Essential Korean Phrases for Beginners',
        duration: '22:30',
        views: '3.2M',
        url: 'https://www.youtube.com/watch?v=7CgVgLQxQhI',
        thumbnail: 'https://picsum.photos/300/200?random=12',
        publishedAt: '2024-01-12'
      },
      {
        title: 'Korean Pronunciation Masterclass',
        duration: '19:45',
        views: '2.7M',
        url: 'https://www.youtube.com/watch?v=8CgVgLQxQhI',
        thumbnail: 'https://picsum.photos/300/200?random=10',
        publishedAt: '2024-01-05'
      },
      {
        title: 'Korean Numbers and Counting',
        duration: '15:20',
        views: '1.9M',
        url: 'https://www.youtube.com/watch?v=9CgVgLQxQhI',
        thumbnail: 'https://picsum.photos/300/200?random=11',
        publishedAt: '2023-12-28'
      }
    ],
    social: {
      youtube: 'https://www.youtube.com/@koreansaeng',
      instagram: 'https://www.instagram.com/koreansaeng',
      tiktok: 'https://www.tiktok.com/@koreansaeng'
    },
    features: ['Beginner Course', 'Pronunciation Guide', 'Study Materials']
  },
  {
    id: 'korean-billy',
    name: 'Korean Billy',
    channel: 'Korean Billy',
    subscribers: '800K',
    language: 'English',
    level: 'Intermediate to Advanced',
    description: 'Learn real Korean expressions and cultural insights from a foreigner\'s perspective. Perfect for understanding Korean culture and slang.',
    specialties: ['Slang', 'Culture', 'Real Korean', 'Advanced Grammar', 'Cultural Context'],
    thumbnail: 'https://picsum.photos/400/250?random=2',
    rating: 4.6,
    totalVideos: 280,
    uploadFrequency: '1x/week',
    joinDate: '2017-09-20',
    videos: [
      {
        title: 'Korean Slang You Need to Know',
        duration: '14:20',
        views: '1.5M',
        url: 'https://www.youtube.com/watch?v=5CgVgLQxQhI',
        thumbnail: 'https://picsum.photos/300/200?random=10',
        publishedAt: '2024-01-10'
      },
      {
        title: 'Korean Culture Do\'s and Don\'ts',
        duration: '16:45',
        views: '1.2M',
        url: 'https://www.youtube.com/watch?v=6CgVgLQxQhI',
        thumbnail: 'https://picsum.photos/300/200?random=11',
        publishedAt: '2024-01-03'
      },
      {
        title: 'Advanced Korean Grammar Patterns',
        duration: '18:30',
        views: '980K',
        url: 'https://www.youtube.com/watch?v=7CgVgLQxQhI',
        thumbnail: 'https://picsum.photos/300/200?random=12',
        publishedAt: '2023-12-25'
      }
    ],
    social: {
      youtube: 'https://www.youtube.com/@koreanbilly',
      instagram: 'https://www.instagram.com/koreanbilly',
      twitter: 'https://twitter.com/koreanbilly'
    },
    features: ['Cultural Insights', 'Advanced Content', 'Community Forum']
  },
  {
    id: 'korean-class-101',
    name: 'KoreanClass101',
    channel: 'KoreanClass101',
    subscribers: '1.8M',
    language: 'English',
    level: 'All Levels',
    description: 'Structured Korean lessons with native speakers. Comprehensive curriculum from beginner to advanced with audio lessons and cultural insights.',
    specialties: ['Pronunciation', 'Listening', 'Reading', 'Writing', 'Structured Learning'],
    thumbnail: 'https://picsum.photos/400/250?random=4',
    rating: 4.5,
    totalVideos: 800,
    uploadFrequency: '3x/week',
    joinDate: '2012-04-01',
    videos: [
      {
        title: 'Korean Pronunciation Guide',
        duration: '22:10',
        views: '2.3M',
        url: 'https://www.youtube.com/watch?v=7CgVgLQxQhI',
        thumbnail: 'https://picsum.photos/300/200?random=12',
        publishedAt: '2024-01-14'
      },
      {
        title: 'Korean Listening Practice',
        duration: '19:30',
        views: '1.9M',
        url: 'https://www.youtube.com/watch?v=8CgVgLQxQhI',
        thumbnail: 'https://picsum.photos/300/200?random=10',
        publishedAt: '2024-01-07'
      },
      {
        title: 'Korean Reading Practice',
        duration: '24:15',
        views: '1.6M',
        url: 'https://www.youtube.com/watch?v=9CgVgLQxQhI',
        thumbnail: 'https://picsum.photos/300/200?random=11',
        publishedAt: '2023-12-30'
      }
    ],
    social: {
      youtube: 'https://www.youtube.com/@koreanclass101',
      instagram: 'https://www.instagram.com/koreanclass101',
      website: 'https://www.koreanclass101.com',
      facebook: 'https://facebook.com/koreanclass101'
    },
    features: ['Premium Courses', 'Audio Lessons', 'Mobile App', 'Study Tools']
  },
  {
    id: 'korean-unnie',
    name: 'Korean Unnie',
    channel: 'Korean Unnie',
    subscribers: '600K',
    language: 'English',
    level: 'Beginner',
    description: 'Friendly Korean lessons with easy explanations. Perfect for absolute beginners who want to start learning Korean in a fun way.',
    specialties: ['Basic Korean', 'Hangul', 'Simple Grammar', 'Daily Expressions', 'Beginner Friendly'],
    thumbnail: 'https://picsum.photos/400/250?random=3',
    rating: 4.4,
    totalVideos: 320,
    uploadFrequency: '2x/week',
    joinDate: '2020-02-15',
    videos: [
      {
        title: 'Learn Hangul in 30 Minutes',
        duration: '30:00',
        views: '1.7M',
        url: 'https://www.youtube.com/watch?v=9CgVgLQxQhI',
        thumbnail: 'https://picsum.photos/300/200?random=12',
        publishedAt: '2024-01-11'
      },
      {
        title: 'Basic Korean Greetings',
        duration: '11:25',
        views: '1.3M',
        url: 'https://www.youtube.com/watch?v=0CgVgLQxQhI',
        thumbnail: 'https://picsum.photos/300/200?random=10',
        publishedAt: '2024-01-04'
      },
      {
        title: 'Korean Family Terms',
        duration: '13:40',
        views: '950K',
        url: 'https://www.youtube.com/watch?v=1CgVgLQxQhI',
        thumbnail: 'https://picsum.photos/300/200?random=11',
        publishedAt: '2023-12-27'
      }
    ],
    social: {
      youtube: 'https://www.youtube.com/@koreanunnie',
      instagram: 'https://www.instagram.com/koreanunnie',
      tiktok: 'https://www.tiktok.com/@koreanunnie'
    },
    features: ['Beginner Course', 'Hangul Guide', 'Simple Lessons']
  },
  {
    id: 'korean-with-minjoo',
    name: 'Korean with Minjoo',
    channel: 'Korean with Minjoo',
    subscribers: '400K',
    language: 'English',
    level: 'Intermediate',
    description: 'Detailed grammar explanations and cultural context. Perfect for intermediate learners who want to deepen their understanding of Korean.',
    specialties: ['Grammar', 'Culture', 'Advanced Vocabulary', 'Test Prep', 'Detailed Explanations'],
    thumbnail: 'https://picsum.photos/400/250?random=5',
    rating: 4.3,
    totalVideos: 180,
    uploadFrequency: '1x/week',
    joinDate: '2021-08-10',
    videos: [
      {
        title: 'Korean Grammar Deep Dive',
        duration: '25:40',
        views: '980K',
        url: 'https://www.youtube.com/watch?v=1CgVgLQxQhI',
        thumbnail: 'https://picsum.photos/300/200?random=12',
        publishedAt: '2024-01-09'
      },
      {
        title: 'Korean Culture and Language',
        duration: '17:15',
        views: '750K',
        url: 'https://www.youtube.com/watch?v=2CgVgLQxQhI',
        thumbnail: 'https://picsum.photos/300/200?random=10',
        publishedAt: '2024-01-02'
      },
      {
        title: 'TOPIK II Preparation',
        duration: '32:20',
        views: '650K',
        url: 'https://www.youtube.com/watch?v=3CgVgLQxQhI',
        thumbnail: 'https://picsum.photos/300/200?random=11',
        publishedAt: '2023-12-26'
      }
    ],
    social: {
      youtube: 'https://www.youtube.com/@koreanwithminjoo',
      instagram: 'https://www.instagram.com/koreanwithminjoo',
      website: 'https://koreanwithminjoo.com'
    },
    features: ['Grammar Focus', 'Test Prep', 'Cultural Context']
  },
  {
    id: 'korean-with-josh',
    name: 'Korean with Josh',
    channel: 'Korean with Josh',
    subscribers: '350K',
    language: 'English',
    level: 'Beginner to Intermediate',
    description: 'Fun and engaging Korean lessons with a foreigner\'s perspective. Learn Korean through music, movies, and pop culture.',
    specialties: ['Pop Culture', 'Music', 'Movies', 'Fun Learning', 'Cultural Exchange'],
    thumbnail: 'https://picsum.photos/400/250?random=1',
    rating: 4.2,
    totalVideos: 250,
    uploadFrequency: '2x/week',
    joinDate: '2022-01-20',
    videos: [
      {
        title: 'Learn Korean with K-Pop',
        duration: '21:30',
        views: '850K',
        url: 'https://www.youtube.com/watch?v=4CgVgLQxQhI',
        thumbnail: 'https://picsum.photos/300/200?random=10',
        publishedAt: '2024-01-13'
      },
      {
        title: 'Korean Movie Phrases',
        duration: '18:45',
        views: '720K',
        url: 'https://www.youtube.com/watch?v=5CgVgLQxQhI',
        thumbnail: 'https://picsum.photos/300/200?random=11',
        publishedAt: '2024-01-06'
      },
      {
        title: 'Korean Dating Culture',
        duration: '16:20',
        views: '680K',
        url: 'https://www.youtube.com/watch?v=6CgVgLQxQhI',
        thumbnail: 'https://picsum.photos/300/200?random=12',
        publishedAt: '2023-12-29'
      }
    ],
    social: {
      youtube: 'https://www.youtube.com/@koreanwithjosh',
      instagram: 'https://www.instagram.com/koreanwithjosh',
      tiktok: 'https://www.tiktok.com/@koreanwithjosh'
    },
    features: ['Pop Culture Focus', 'Fun Content', 'Community']
  }
]

export default youtuberData