import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play, Pause, Heart, ArrowLeft, Clock, MapPin, SkipBack, SkipForward } from 'lucide-react'
import { useState } from 'react'
import { useStories } from '../hooks/useFirestore'

export function Listen() {
  const { id } = useParams()
  const [isPlaying, setIsPlaying] = useState(false)
  const { stories, loading, error } = useStories()
  const story = stories.find(s => s.id === id)

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
          <Play className="h-8 w-8 text-red-400" />
        </div>
        <p className="text-red-600 text-lg mb-4">Error loading story</p>
        <p className="text-red-400 text-sm">{error}</p>
      </div>
    )
  }

  if (!story) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Play className="h-8 w-8 text-blue-400" />
        </div>
        <p className="text-blue-600 text-lg mb-4">Story not found.</p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            to="/explore"
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors"
          >
            Back to Explore
          </Link>
        </motion.div>
      </div>
    )
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="space-y-6 pt-4">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link 
          to="/explore"
          className="inline-flex items-center space-x-2 text-blue-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Back to Explore</span>
        </Link>
      </motion.div>

      {/* Story Header */}
      <motion.div 
        className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-blue-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl font-bold text-blue-800 mb-4">{story.title}</h1>
        <div className="flex items-center space-x-4 text-sm text-blue-500">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{story.duration || '0:00'}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>{story.country || 'Unknown'}</span>
          </div>
        </div>
      </motion.div>

      {/* Audio Player */}
      <motion.div 
        className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white shadow-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="text-center space-y-6">
          {/* Play Button */}
          <motion.button
            onClick={togglePlay}
            className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto shadow-lg hover:bg-white/30 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? (
              <Pause className="h-8 w-8" />
            ) : (
              <Play className="h-8 w-8 ml-1" />
            )}
          </motion.button>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-8">
            <motion.button
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <SkipBack className="h-5 w-5" />
            </motion.button>
            
            <motion.button
              onClick={togglePlay}
              className="p-4 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6 ml-0.5" />
              )}
            </motion.button>
            
            <motion.button
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <SkipForward className="h-5 w-5" />
            </motion.button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="w-full bg-white/20 rounded-full h-2">
              <motion.div 
                className="bg-white h-2 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "35%" }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
            <div className="flex justify-between text-sm text-white/80">
              <span>1:15</span>
              <span>{story.duration || '0:00'}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Story Details */}
      <motion.div 
        className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-blue-100 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div>
          <h3 className="text-lg font-bold text-blue-800 mb-3">Description</h3>
          <p className="text-blue-600 leading-relaxed">{story.description}</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-blue-800 mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {story.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-2 bg-blue-100 text-blue-600 text-sm font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Support Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Link 
          to={`/support/${story.id}`}
          className="block w-full bg-gradient-to-r from-red-400 to-pink-500 text-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <div className="flex items-center justify-center space-x-3">
            <Heart className="h-6 w-6" />
            <span className="text-lg font-semibold">Support this person</span>
          </div>
        </Link>
      </motion.div>
    </div>
  )
}

