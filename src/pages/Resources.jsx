import { motion } from 'framer-motion'
import { Phone, MapPin, ExternalLink, Heart, Home, Scale, Stethoscope, Brain } from 'lucide-react'
import { useResources } from '../hooks/useFirestore'

const categoryIcons = {
  food: Heart,
  housing: Home,
  legal: Scale,
  healthcare: Stethoscope,
  'mental health': Brain
}

const categoryColors = {
  food: 'bg-green-500',
  housing: 'bg-blue-500',
  legal: 'bg-purple-500',
  healthcare: 'bg-red-500',
  'mental health': 'bg-indigo-500'
}

export function Resources() {
  const { resources, loading, error } = useResources()

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
        <p className="text-red-600 text-lg mb-4">Error loading resources</p>
        <p className="text-red-400 text-sm">{error}</p>
      </div>
    )
  }

  // Group resources by category
  const groupedResources = resources.reduce((acc, resource) => {
    const category = resource.category.toLowerCase()
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(resource)
    return acc
  }, {})

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
          Resources
        </h1>
        <p className="text-blue-600">Support services and assistance</p>
      </motion.div>

      {/* Resource Categories */}
      <div className="space-y-6">
        {Object.entries(groupedResources).map(([category, categoryResources], categoryIndex) => {
          const IconComponent = categoryIcons[category] || Heart
          const colorClass = categoryColors[category] || 'bg-blue-500'
          
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="space-y-4"
            >
              {/* Category Header */}
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${colorClass} rounded-full flex items-center justify-center`}>
                  <IconComponent className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-blue-800 capitalize">{category}</h2>
              </div>

              {/* Category Resources */}
              <div className="space-y-3">
                {categoryResources.map((resource, resourceIndex) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: (categoryIndex * 0.1) + (resourceIndex * 0.05) }}
                    className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-blue-100 hover:shadow-lg transition-all duration-200"
                  >
                    <div className="space-y-4">
                      {/* Resource Header */}
                      <div>
                        <h3 className="text-lg font-bold text-blue-800 mb-2">{resource.name}</h3>
                        <p className="text-blue-600 text-sm leading-relaxed">{resource.description}</p>
                      </div>

                      {/* Contact Info */}
                      <div className="space-y-2">
                        {resource.phone && (
                          <div className="flex items-center space-x-2 text-blue-500">
                            <Phone className="h-4 w-4" />
                            <a href={`tel:${resource.phone}`} className="text-sm hover:text-blue-600 transition-colors">
                              {resource.phone}
                            </a>
                          </div>
                        )}
                        
                        {resource.address && (
                          <div className="flex items-center space-x-2 text-blue-500">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm">{resource.address}</span>
                          </div>
                        )}
                        
                        {resource.website && (
                          <div className="flex items-center space-x-2 text-blue-500">
                            <ExternalLink className="h-4 w-4" />
                            <a 
                              href={resource.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm hover:text-blue-600 transition-colors"
                            >
                              Visit Website
                            </a>
                          </div>
                        )}
                        
                        {resource.email && (
                          <div className="flex items-center space-x-2 text-blue-500">
                            <Heart className="h-4 w-4" />
                            <a href={`mailto:${resource.email}`} className="text-sm hover:text-blue-600 transition-colors">
                              {resource.email}
                            </a>
                          </div>
                        )}
                      </div>

                      {/* Hours */}
                      {resource.hours && (
                        <div className="bg-blue-50 rounded-xl p-3">
                          <p className="text-xs text-blue-600 font-medium">Hours: {resource.hours}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Empty State */}
      {Object.keys(groupedResources).length === 0 && (
        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="h-8 w-8 text-blue-400" />
          </div>
          <p className="text-blue-600 text-lg">No resources available yet.</p>
          <p className="text-blue-400 text-sm mt-2">Check back soon for support services.</p>
        </motion.div>
      )}
    </div>
  )
}

