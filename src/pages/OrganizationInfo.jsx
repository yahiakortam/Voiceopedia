import { motion } from 'framer-motion'
import { Heart, Globe, Users, ExternalLink, Mail, Twitter, Instagram, Phone, MapPin } from 'lucide-react'
import { useOrganizationInfo } from '../hooks/useFirestore'

export function OrganizationInfo() {
  const { organizationInfo, loading, error } = useOrganizationInfo()

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
          <Heart className="h-8 w-8 text-red-400" />
        </div>
        <p className="text-red-600 text-lg mb-4">Error loading organization information</p>
        <p className="text-red-400 text-sm">{error}</p>
      </div>
    )
  }

  if (!organizationInfo) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Globe className="h-8 w-8 text-blue-400" />
        </div>
        <p className="text-blue-600 text-lg">Organization information not available.</p>
        <p className="text-blue-400 text-sm mt-2">Please check back later.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 pt-4">
      {/* Header */}
      <motion.div 
        className="text-center space-y-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          {organizationInfo.name || 'Our Organization'}
        </h1>
        <p className="text-blue-600">{organizationInfo.tagline || 'Making a difference'}</p>
      </motion.div>

      {/* Mission Card */}
      <motion.div 
        className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Heart className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold">Our Mission</h2>
        </div>
        <p className="leading-relaxed">
          {organizationInfo.mission || 'We are dedicated to making a positive impact in our community through various support services and programs.'}
        </p>
      </motion.div>

      {/* About Section */}
      {organizationInfo.about && (
        <motion.div 
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-blue-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Globe className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-blue-800">About Us</h2>
          </div>
          <p className="text-blue-600 leading-relaxed">{organizationInfo.about}</p>
        </motion.div>
      )}

      {/* Contact Information */}
      <motion.div 
        className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-blue-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Phone className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-blue-800">Contact Us</h2>
        </div>
        
        <div className="space-y-4">
          {organizationInfo.phone && (
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-blue-500" />
              <a href={`tel:${organizationInfo.phone}`} className="text-blue-600 hover:text-blue-700 transition-colors">
                {organizationInfo.phone}
              </a>
            </div>
          )}
          
          {organizationInfo.email && (
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-blue-500" />
              <a href={`mailto:${organizationInfo.email}`} className="text-blue-600 hover:text-blue-700 transition-colors">
                {organizationInfo.email}
              </a>
            </div>
          )}
          
          {organizationInfo.address && (
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
              <span className="text-blue-600">{organizationInfo.address}</span>
            </div>
          )}
          
          {organizationInfo.website && (
            <div className="flex items-center space-x-3">
              <ExternalLink className="h-5 w-5 text-blue-500" />
              <a 
                href={organizationInfo.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                Visit our website
              </a>
            </div>
          )}
        </div>
      </motion.div>

      {/* Social Media Links */}
      {(organizationInfo.socialMedia || organizationInfo.twitter || organizationInfo.instagram) && (
        <motion.div 
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-blue-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-xl font-bold text-blue-800 mb-6">Follow Us</h2>
          
          <div className="space-y-3">
            {organizationInfo.twitter && (
              <motion.a
                href={organizationInfo.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-blue-400 text-white p-4 rounded-xl font-medium hover:bg-blue-500 transition-colors block"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center space-x-3">
                  <Twitter className="h-5 w-5" />
                  <span>Follow us on Twitter</span>
                  <ExternalLink className="h-4 w-4" />
                </div>
              </motion.a>
            )}
            
            {organizationInfo.instagram && (
              <motion.a
                href={organizationInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-pink-400 text-white p-4 rounded-xl font-medium hover:bg-pink-500 transition-colors block"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center space-x-3">
                  <Instagram className="h-5 w-5" />
                  <span>Follow us on Instagram</span>
                  <ExternalLink className="h-4 w-4" />
                </div>
              </motion.a>
            )}
          </div>
        </motion.div>
      )}

      {/* Hours */}
      {organizationInfo.hours && (
        <motion.div 
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-blue-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <h2 className="text-xl font-bold text-blue-800 mb-4">Hours of Operation</h2>
          <p className="text-blue-600">{organizationInfo.hours}</p>
        </motion.div>
      )}
    </div>
  )
}

