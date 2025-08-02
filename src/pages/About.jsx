import { motion } from 'framer-motion'
import { Heart, Globe, Users, ExternalLink, Mail, Twitter, Instagram } from 'lucide-react'

export function About() {
  const teamMembers = [
    { name: "Sarah Chen", role: "Founder & CEO", avatar: "SC" },
    { name: "Marcus Johnson", role: "Lead Developer", avatar: "MJ" },
    { name: "Aisha Patel", role: "Community Manager", avatar: "AP" },
    { name: "David Kim", role: "UX Designer", avatar: "DK" }
  ]

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
          About Voiceopedia
        </h1>
        <p className="text-blue-600">Our mission and story</p>
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
        <p className="leading-relaxed mb-4">
          Voiceopedia is a platform dedicated to amplifying voices that matter. We believe that every person has a story worth telling, and that these stories have the power to create understanding, empathy, and positive change in the world.
        </p>
        <p className="leading-relaxed">
          Through audio storytelling, we connect people across borders, cultures, and experiences, creating a global community of shared humanity.
        </p>
      </motion.div>

      {/* What We Do */}
      <motion.div 
        className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-blue-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Globe className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-blue-800">What We Do</h2>
        </div>
        
        <div className="space-y-4">
          {[
            {
              title: "Collect Stories",
              description: "We gather authentic voice recordings from people around the world sharing their experiences.",
              icon: "🎙️"
            },
            {
              title: "Provide Support",
              description: "We connect storytellers with resources and support networks to help them in their journey.",
              icon: "🤝"
            },
            {
              title: "Build Community",
              description: "We create connections between listeners and storytellers, fostering understanding and solidarity.",
              icon: "🌍"
            }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
            >
              <div className="text-2xl">{item.icon}</div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-1">{item.title}</h4>
                <p className="text-sm text-blue-600">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Team Section */}
      <motion.div 
        className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-blue-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-blue-800">Our Team</h2>
        </div>
        
        <p className="text-blue-600 leading-relaxed mb-6">
          Voiceopedia was created by a diverse team of developers, storytellers, and advocates who believe in the power of human connection. We are committed to creating a safe, inclusive space for all voices.
        </p>

        <div className="grid grid-cols-2 gap-4">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="text-center p-4 bg-blue-50 rounded-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-semibold">
                {member.avatar}
              </div>
              <h4 className="font-semibold text-blue-800 text-sm">{member.name}</h4>
              <p className="text-xs text-blue-600">{member.role}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <p className="text-sm text-blue-600 text-center">
            This is a demo application built to showcase the concept of voice-based storytelling and community support.
          </p>
        </div>
      </motion.div>

      {/* Get Involved */}
      <motion.div 
        className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-blue-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <h2 className="text-xl font-bold text-blue-800 mb-4">Get Involved</h2>
        <p className="text-blue-600 leading-relaxed mb-6">
          Want to be part of our mission? There are many ways to get involved:
        </p>
        
        <div className="space-y-3">
          {[
            { icon: Twitter, label: "Follow us on Twitter", color: "bg-blue-400" },
            { icon: Instagram, label: "Follow us on Instagram", color: "bg-pink-400" },
            { icon: Mail, label: "Contact Us", color: "bg-green-400" }
          ].map((item, index) => (
            <motion.button
              key={index}
              className={`w-full ${item.color} text-white p-4 rounded-xl font-medium hover:opacity-90 transition-opacity`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 1.0 + index * 0.1 }}
            >
              <div className="flex items-center justify-center space-x-3">
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
                <ExternalLink className="h-4 w-4" />
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

