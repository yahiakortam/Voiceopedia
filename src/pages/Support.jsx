import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Heart, Target, Users, Calendar } from 'lucide-react'
import fundraisersData from '../lib/fundraisers.json'

export function Support() {
  const { id } = useParams()
  const fundraiser = fundraisersData.find(f => f.id === id)

  if (!fundraiser) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="h-8 w-8 text-blue-400" />
        </div>
        <p className="text-blue-600 text-lg mb-4">Fundraiser not found.</p>
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

  const progressPercentage = (fundraiser.amountRaised / fundraiser.goal) * 100

  return (
    <div className="space-y-6 pt-4">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link 
          to={`/listen/${id}`}
          className="inline-flex items-center space-x-2 text-blue-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Back to Story</span>
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div 
        className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-blue-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl font-bold text-blue-800 mb-2">{fundraiser.title}</h1>
        <p className="text-blue-600">by <span className="font-semibold">{fundraiser.name}</span></p>
      </motion.div>

      {/* Progress Section */}
      <motion.div 
        className="bg-gradient-to-br from-green-400 to-green-500 rounded-2xl p-6 text-white shadow-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">${fundraiser.amountRaised.toLocaleString()}</div>
              <div className="text-green-100">raised of ${fundraiser.goal.toLocaleString()} goal</div>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Target className="h-8 w-8" />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="w-full bg-white/20 rounded-full h-3">
              <motion.div 
                className="bg-white h-3 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
            </div>
            <div className="flex justify-between items-center text-sm text-green-100">
              <span>{Math.round(progressPercentage)}% funded</span>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>42 supporters</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bio Section */}
      <motion.div 
        className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-blue-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center space-x-2">
          <Heart className="h-5 w-5 text-red-500" />
          <span>About</span>
        </h3>
        <p className="text-blue-600 leading-relaxed">{fundraiser.bio}</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-2 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-md border border-blue-100 text-center">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Calendar className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-lg font-bold text-blue-800">12</div>
          <div className="text-xs text-blue-600">Days left</div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-md border border-blue-100 text-center">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Users className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-lg font-bold text-blue-800">42</div>
          <div className="text-xs text-blue-600">Supporters</div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <motion.button 
          className="w-full bg-gradient-to-r from-red-400 to-pink-500 text-white p-4 rounded-2xl shadow-lg font-semibold text-lg opacity-60 cursor-not-allowed"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled
        >
          <div className="flex items-center justify-center space-x-3">
            <Heart className="h-6 w-6" />
            <span>Donate Now (Demo)</span>
          </div>
        </motion.button>
        
        <p className="text-xs text-blue-500 text-center">
          This is a demo application. No actual donations will be processed.
        </p>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <a 
            href={fundraiser.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full bg-white border-2 border-blue-200 text-blue-600 p-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 font-medium"
          >
            <div className="flex items-center justify-center space-x-3">
              <ExternalLink className="h-5 w-5" />
              <span>View on GoFundMe</span>
            </div>
          </a>
        </motion.div>
      </motion.div>
    </div>
  )
}

