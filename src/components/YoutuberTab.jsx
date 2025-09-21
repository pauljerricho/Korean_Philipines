import React, { useState } from 'react'
import { Youtube, Instagram, Globe, Search, Star, Users, Calendar, Play, ExternalLink, Filter, SortAsc, Heart, Share2, Clock, Eye, Facebook, Twitter, MessageCircle } from 'lucide-react'

const YoutuberTab = ({ youtuberData }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterLevel, setFilterLevel] = useState('All Levels')
  const [sortBy, setSortBy] = useState('subscribers')
  const [viewMode, setViewMode] = useState('grid') // grid or list
  const [favorites, setFavorites] = useState(new Set())

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-green-200 text-green-800';
      case 'Intermediate': return 'bg-yellow-200 text-yellow-800';
      case 'Advanced': return 'bg-red-200 text-red-800';
      case 'All Levels': return 'bg-blue-200 text-blue-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  }

  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'youtube': return <Youtube size={20} className="text-red-600" />;
      case 'instagram': return <Instagram size={20} className="text-pink-600" />;
      case 'facebook': return <Facebook size={20} className="text-blue-600" />;
      case 'twitter': return <Twitter size={20} className="text-blue-400" />;
      case 'tiktok': return <MessageCircle size={20} className="text-black" />;
      case 'website': return <Globe size={20} className="text-gray-600" />;
      default: return <Globe size={20} className="text-gray-600" />;
    }
  }

  const formatNumber = (num) => {
    if (num.includes('M')) return num;
    if (num.includes('K')) return num;
    return parseInt(num).toLocaleString();
  }

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  }

  const filteredYoutubers = youtuberData
    .filter(youtuber => {
      const matchesSearch = youtuber.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            youtuber.channel.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            youtuber.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesLevel = filterLevel === 'All Levels' || youtuber.level.includes(filterLevel);
      return matchesSearch && matchesLevel;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'subscribers':
          return parseInt(b.subscribers.replace(/[^\d]/g, '')) - parseInt(a.subscribers.replace(/[^\d]/g, ''));
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'videos':
          return (b.totalVideos || 0) - (a.totalVideos || 0);
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const YoutuberCard = ({ youtuber }) => (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${
      youtuber.isSpecial ? 'ring-4 ring-yellow-400 ring-opacity-50 border-2 border-yellow-400' : ''
    }`}>
      {/* Thumbnail */}
      <div className="relative">
        <img
          src={youtuber.thumbnail}
          alt={youtuber.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = 'https://picsum.photos/400/250?random=99';
          }}
        />
        <div className="absolute top-4 right-4 flex space-x-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(youtuber.level)}`}>
            {youtuber.level}
          </span>
          {youtuber.isSpecial && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-400 text-black animate-pulse">
              ⭐ SPECIAL
            </span>
          )}
        </div>
        <div className="absolute top-4 left-4">
          <button
            onClick={() => toggleFavorite(youtuber.id)}
            className="p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all duration-200"
          >
            <Heart 
              size={20} 
              className={favorites.has(youtuber.id) ? 'text-red-500 fill-current' : 'text-gray-400'} 
            />
          </button>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
            {youtuber.subscribers} subscribers
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Channel Info */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-1">{youtuber.name}</h3>
          <p className="text-blue-600 text-sm font-medium">{youtuber.channel}</p>
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
            {youtuber.rating && (
              <div className="flex items-center">
                <Star size={16} className="text-yellow-500 fill-current mr-1" />
                <span>{youtuber.rating}</span>
              </div>
            )}
            {youtuber.totalVideos && (
              <div className="flex items-center">
                <Play size={16} className="mr-1" />
                <span>{youtuber.totalVideos} videos</span>
              </div>
            )}
            {youtuber.uploadFrequency && (
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>{youtuber.uploadFrequency}</span>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">{youtuber.description}</p>

        {/* Specialties */}
        <div className="flex flex-wrap gap-2 mb-4">
          {youtuber.specialties.slice(0, 4).map((specialty, index) => (
            <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
              {specialty}
            </span>
          ))}
          {youtuber.specialties.length > 4 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
              +{youtuber.specialties.length - 4} more
            </span>
          )}
        </div>

        {/* Features */}
        {youtuber.features && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {youtuber.features.map((feature, index) => (
                <span key={index} className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Popular Videos */}
        <div className="mb-4">
          <h4 className="text-md font-semibold text-gray-700 mb-2">Popular Videos:</h4>
          <div className="space-y-2">
            {youtuber.videos.slice(0, 2).map((video, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-16 h-12 object-cover rounded"
                  onError={(e) => {
                    e.target.src = 'https://picsum.photos/300/200?random=98';
                  }}
                />
                <div className="flex-1 min-w-0">
                  <a 
                    href={video.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors duration-200 line-clamp-2"
                  >
                    {video.title}
                  </a>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                    <span className="flex items-center">
                      <Eye size={12} className="mr-1" />
                      {formatNumber(video.views)}
                    </span>
                    <span className="flex items-center">
                      <Clock size={12} className="mr-1" />
                      {video.duration}
                    </span>
                  </div>
                </div>
                <ExternalLink size={16} className="text-gray-400 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-between items-center border-t border-gray-200 pt-4">
          <div className="flex space-x-3">
            {Object.entries(youtuber.social).map(([platform, url]) => (
              <a 
                key={platform}
                href={url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                title={platform}
              >
                {getSocialIcon(platform)}
              </a>
            ))}
          </div>
          <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200">
            <Share2 size={16} className="text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );

  const YoutuberListItem = ({ youtuber }) => (
    <div className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 ${
      youtuber.isSpecial ? 'ring-2 ring-yellow-400' : ''
    }`}>
      <div className="flex space-x-6">
        {/* Thumbnail */}
        <div className="relative flex-shrink-0">
          <img
            src={youtuber.thumbnail}
            alt={youtuber.name}
            className="w-32 h-24 object-cover rounded-lg"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&crop=face';
            }}
          />
          {youtuber.isSpecial && (
            <span className="absolute -top-2 -right-2 px-2 py-1 bg-yellow-400 text-black text-xs font-bold rounded-full">
              ⭐ SPECIAL
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-1">{youtuber.name}</h3>
              <p className="text-blue-600 text-sm font-medium mb-2">{youtuber.channel}</p>
              <p className="text-gray-700 text-sm mb-3 line-clamp-2">{youtuber.description}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center">
                  <Users size={16} className="mr-1" />
                  <span>{youtuber.subscribers}</span>
                </div>
                {youtuber.rating && (
                  <div className="flex items-center">
                    <Star size={16} className="text-yellow-500 fill-current mr-1" />
                    <span>{youtuber.rating}</span>
                  </div>
                )}
                {youtuber.totalVideos && (
                  <div className="flex items-center">
                    <Play size={16} className="mr-1" />
                    <span>{youtuber.totalVideos} videos</span>
                  </div>
                )}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(youtuber.level)}`}>
                  {youtuber.level}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {youtuber.specialties.slice(0, 5).map((specialty, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col space-y-2 ml-4">
              <button
                onClick={() => toggleFavorite(youtuber.id)}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
              >
                <Heart 
                  size={20} 
                  className={favorites.has(youtuber.id) ? 'text-red-500 fill-current' : 'text-gray-400'} 
                />
              </button>
              <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200">
                <Share2 size={20} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-3">
            {Object.entries(youtuber.social).map(([platform, url]) => (
              <a 
                key={platform}
                href={url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                title={platform}
              >
                {getSocialIcon(platform)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Recommended Korean Learning YouTubers</h2>
        <p className="text-xl text-gray-600 mb-8">Discover the best Korean language channels for every level</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-6">
          {/* Search */}
          <div className="relative w-full lg:w-1/3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by channel, name, or specialty..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Level Filter */}
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-500" />
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All Levels">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <SortAsc size={20} className="text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="subscribers">Subscribers</option>
                <option value="rating">Rating</option>
                <option value="videos">Videos</option>
                <option value="name">Name</option>
              </select>
            </div>

            {/* View Mode */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <div className="grid grid-cols-2 gap-1 w-4 h-4">
                  <div className="bg-current rounded"></div>
                  <div className="bg-current rounded"></div>
                  <div className="bg-current rounded"></div>
                  <div className="bg-current rounded"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <div className="space-y-1 w-4 h-4">
                  <div className="bg-current rounded h-1"></div>
                  <div className="bg-current rounded h-1"></div>
                  <div className="bg-current rounded h-1"></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-600">
          Showing {filteredYoutubers.length} of {youtuberData.length} channels
          {favorites.size > 0 && (
            <span className="ml-4 text-blue-600">
              • {favorites.size} favorites
            </span>
          )}
        </div>
      </div>

      {/* YouTubers Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredYoutubers.map(youtuber => (
            <YoutuberCard key={youtuber.id} youtuber={youtuber} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredYoutubers.map(youtuber => (
            <YoutuberListItem key={youtuber.id} youtuber={youtuber} />
          ))}
        </div>
      )}

      {/* Learning Tips Section */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl shadow-lg p-8">
        <h3 className="text-3xl font-bold mb-6 text-center">Learning Tips with YouTube</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-xl font-semibold mb-4 flex items-center">
              <Star className="mr-2" size={24} />
              For Beginners:
            </h4>
            <ul className="space-y-3 text-lg">
              <li className="flex items-start">
                <span className="text-yellow-300 mr-2">•</span>
                Start with Hangul pronunciation videos
              </li>
              <li className="flex items-start">
                <span className="text-yellow-300 mr-2">•</span>
                Watch videos with English/Filipino subtitles first
              </li>
              <li className="flex items-start">
                <span className="text-yellow-300 mr-2">•</span>
                Focus on basic vocabulary and simple grammar
              </li>
              <li className="flex items-start">
                <span className="text-yellow-300 mr-2">•</span>
                Repeat after the speaker to practice pronunciation
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4 flex items-center">
              <Users className="mr-2" size={24} />
              For Advanced Learners:
            </h4>
            <ul className="space-y-3 text-lg">
              <li className="flex items-start">
                <span className="text-yellow-300 mr-2">•</span>
                Watch vlogs or dramas without subtitles
              </li>
              <li className="flex items-start">
                <span className="text-yellow-300 mr-2">•</span>
                Focus on understanding nuances and cultural context
              </li>
              <li className="flex items-start">
                <span className="text-yellow-300 mr-2">•</span>
                Use shadow-reading techniques to improve fluency
              </li>
              <li className="flex items-start">
                <span className="text-yellow-300 mr-2">•</span>
                Engage with comments sections in Korean
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default YoutuberTab