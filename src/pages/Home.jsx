import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Mic, Heart, Users, Globe } from 'lucide-react'

export function Home() {
  return (
    <div className="space-y-8 pt-4">
      {/* Header Section */}
      <motion.div 
        className="text-center space-y-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative">
          <motion.div
            className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Globe className="h-10 w-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Voiceopedia
          </h1>
          <p className="text-lg text-blue-600 font-medium mt-2">
            Voices that matter. Stories from around the world.
          </p>
        </div>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link 
            to="/explore" 
            className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <div className="flex items-center justify-center space-x-3">
              <Search className="h-6 w-6" />
              <span className="text-lg font-semibold">Explore Stories</span>
            </div>
          </Link>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link 
            to="/report" 
            className="block w-full bg-white border-2 border-blue-200 text-blue-600 p-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center justify-center space-x-3">
              <Mic className="h-6 w-6" />
              <span className="text-lg font-semibold">Submit a Report</span>
            </div>
          </Link>
        </motion.div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-2 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <motion.div 
          className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-md border border-blue-100"
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-800">150+</div>
            <div className="text-sm text-blue-600">Stories Shared</div>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-md border border-blue-100"
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <Heart className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-800">$50K+</div>
            <div className="text-sm text-blue-600">Funds Raised</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Featured Section */}
      <motion.div 
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-blue-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h2 className="text-xl font-bold text-blue-800 mb-3">Featured Stories</h2>
        <p className="text-blue-600 leading-relaxed">
          Discover powerful voices sharing their experiences, struggles, and triumphs from around the globe. Every story matters, every voice deserves to be heard.
        </p>
        <motion.div 
          className="mt-4"
          whileHover={{ scale: 1.02 }}
        >
          <Link 
            to="/explore" 
            className="inline-flex items-center text-blue-500 font-medium hover:text-blue-600 transition-colors"
          >
            Start exploring →
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

