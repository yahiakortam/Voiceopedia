import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play, Heart, Clock, MapPin, Search } from 'lucide-react'
import { useStories } from '../hooks/useFirestore'

export function Explore() {
  const { stories, loading, error } = useStories()
  const [filter, setFilter] = useState('')

  const filteredStories = stories.filter(story =>
    story.title.toLowerCase().includes(filter.toLowerCase()) ||
    story.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase())) ||
    story.country.toLowerCase().includes(filter.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search className="h-8 w-8 text-red-400" />
        </div>
        <p className="text-red-600 text-lg mb-4">Error loading stories</p>
        <p className="text-red-400 text-sm">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 pt-4">
      {/* Header */}
      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Explore Stories
        </h1>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
          <input
            type="text"
            placeholder="Search by title, tags, or country..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </motion.div>

      {/* Stories Grid */}
      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {filteredStories.map((story, index) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-blue-100 overflow-hidden hover:shadow-lg transition-all duration-200"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-blue-800 leading-tight flex-1 pr-4">
                  {story.title}
                </h3>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link 
                    to={`/listen/${story.id}`}
                    className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-md hover:bg-blue-600 transition-colors"
                  >
                    <Play className="h-5 w-5 ml-0.5" />
                  </Link>
                </motion.div>
              </div>

              {/* Description */}
              <p className="text-blue-600 text-sm mb-4 leading-relaxed">
                {story.description}
              </p>
              
              {/* Meta Info */}
              <div className="flex items-center space-x-4 text-xs text-blue-500 mb-4">
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{story.duration || '0:00'}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>{story.country || 'Unknown'}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {story.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1"
                >
                  <Link 
                    to={`/listen/${story.id}`}
                    className="block w-full bg-blue-500 text-white text-center py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors"
                  >
                    Listen
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1"
                >
                  <Link 
                    to={`/support/${story.id}`}
                    className="block w-full bg-white border-2 border-blue-200 text-blue-600 text-center py-3 rounded-xl font-medium hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Heart className="h-4 w-4" />
                      <span>Support</span>
                    </div>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredStories.length === 0 && (
        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-blue-400" />
          </div>
          <p className="text-blue-600 text-lg">No stories found matching your search.</p>
          <p className="text-blue-400 text-sm mt-2">Try adjusting your search terms.</p>
        </motion.div>
      )}
    </div>
  )
}

