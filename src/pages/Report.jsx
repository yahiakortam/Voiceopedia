import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mic, X, Plus, Upload, Send, Play } from 'lucide-react'
import { addStory } from '../lib/firestoreService'

export function Report() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    country: '',
    gofundmeLink: '',
    tags: []
  })
  const [newTag, setNewTag] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [audioBlob, setAudioBlob] = useState(null)
  const [audioUrl, setAudioUrl] = useState(null)
  const [recordingDuration, setRecordingDuration] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState(null)
  const [recordingStartTime, setRecordingStartTime] = useState(null)

  const availableTags = ['#refugee', '#mentalhealth', '#war', '#conflict', '#hope', '#resilience', '#wellness', '#journey']

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addTag = (tag) => {
    if (!formData.tags.includes(tag)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }))
    }
  }

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }))
  }

  const addCustomTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      const tag = newTag.startsWith('#') ? newTag : `#${newTag}`
      addTag(tag)
      setNewTag('')
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      const chunks = []

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data)
        }
      }

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' })
        const url = URL.createObjectURL(blob)
        setAudioBlob(blob)
        setAudioUrl(url)
        stream.getTracks().forEach(track => track.stop())
      }

      recorder.start()
      setMediaRecorder(recorder)
      setIsRecording(true)
      setRecordingDuration(0)
      
      // Update duration every second
      const durationInterval = setInterval(() => {
        setRecordingDuration(prev => prev + 1)
      }, 1000)
      
      // Store interval ID to clear it later
      recorder.durationInterval = durationInterval
    } catch (error) {
      console.error('Error accessing microphone:', error)
      alert('Unable to access microphone. Please check your permissions.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      // Clear the duration interval
      if (mediaRecorder.durationInterval) {
        clearInterval(mediaRecorder.durationInterval)
      }
      mediaRecorder.stop()
      setIsRecording(false)
    }
  }

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  const playRecording = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl)
      audio.onended = () => setIsPlaying(false)
      audio.onerror = () => {
        setIsPlaying(false)
        alert('Error playing audio. Please try recording again.')
      }
      audio.play().catch(error => {
        console.error('Error playing audio:', error)
        setIsPlaying(false)
        alert('Error playing audio. Please try recording again.')
      })
      setIsPlaying(true)
    }
  }

  const rerecord = () => {
    // Clear any existing intervals
    if (mediaRecorder && mediaRecorder.durationInterval) {
      clearInterval(mediaRecorder.durationInterval)
    }
    setAudioBlob(null)
    setAudioUrl(null)
    setRecordingDuration(0)
    setIsPlaying(false)
    setMediaRecorder(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Prepare the story data
      const storyData = {
        title: formData.title,
        description: formData.description,
        country: formData.country,
        tags: formData.tags,
        gofundmeLink: formData.gofundmeLink || '',
        audioFile: audioBlob ? 'recorded-audio.wav' : 'demo-audio.mp3',
        duration: audioBlob ? formatTime(recordingDuration) : '0:00',
        createdAt: new Date().toISOString()
      }
      
      // Save to Firebase
      await addStory(storyData)
      
      // Show success message
      alert('Thank you for your submission! Your story has been saved successfully.')
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        country: '',
        gofundmeLink: '',
        tags: []
      })
      setNewTag('')
      setIsRecording(false)
      // Clear any existing intervals
      if (mediaRecorder && mediaRecorder.durationInterval) {
        clearInterval(mediaRecorder.durationInterval)
      }
      setAudioBlob(null)
      setAudioUrl(null)
      setRecordingDuration(0)
      setIsPlaying(false)
      setMediaRecorder(null)
    } catch (error) {
      console.error('Error submitting story:', error)
      alert('There was an error submitting your story. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
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
          Submit a Report
        </h1>
        <p className="text-blue-600">Share your story with the world</p>
      </motion.div>

      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Title */}
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <label className="block text-sm font-semibold text-blue-800">Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Give your story a title"
            required
            className="w-full p-4 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </motion.div>

        {/* Voice Recording */}
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <label className="block text-sm font-semibold text-blue-800">Voice Recording</label>
          <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-2xl p-6 shadow-md">
            {!audioUrl ? (
              // Recording Interface
              <div className="text-center space-y-4">
                <motion.button
                  type="button"
                  onClick={toggleRecording}
                  className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-lg transition-all ${
                    isRecording 
                      ? 'bg-red-500 text-white' 
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mic className="h-8 w-8" />
                </motion.button>
                
                <div>
                  <p className={`font-medium ${isRecording ? 'text-red-600' : 'text-blue-600'}`}>
                    {isRecording ? 'Recording...' : 'Tap to record'}
                  </p>
                  {isRecording && (
                    <motion.div 
                      className="flex items-center justify-center space-x-2 mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-red-500">
                        Recording in progress - {formatTime(recordingDuration)}
                      </span>
                    </motion.div>
                  )}
                  {!isRecording && recordingDuration > 0 && (
                    <motion.div 
                      className="flex items-center justify-center mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <span className="text-sm text-blue-500">
                        Last recording: {formatTime(recordingDuration)}
                      </span>
                    </motion.div>
                  )}
                  <p className="text-xs text-blue-400 mt-2">
                    Record your voice to share your story
                  </p>
                </div>
              </div>
            ) : (
              // Playback Interface
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-green-600 font-medium mb-2">Recording Complete!</p>
                  <p className="text-sm text-blue-600">Duration: {formatTime(recordingDuration)}</p>
                </div>
                
                <div className="flex items-center justify-center space-x-4">
                  <motion.button
                    type="button"
                    onClick={playRecording}
                    disabled={isPlaying}
                    className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all ${
                      isPlaying 
                        ? 'bg-gray-400 text-white cursor-not-allowed' 
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                    whileHover={{ scale: isPlaying ? 1 : 1.05 }}
                    whileTap={{ scale: isPlaying ? 1 : 0.95 }}
                  >
                    <Play className="h-6 w-6 ml-1" />
                  </motion.button>
                  
                  <motion.button
                    type="button"
                    onClick={rerecord}
                    className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mic className="h-6 w-6" />
                  </motion.button>
                </div>
                
                 <div className="text-center space-y-2">
                   <p className="text-sm text-blue-600">
                     {isPlaying ? 'Playing...' : 'Tap play to listen to your recording'}
                   </p>
                   {isPlaying && (
                     <motion.div 
                       className="flex items-center justify-center space-x-2"
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                     >
                       <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                       <span className="text-xs text-green-600">Audio playing</span>
                     </motion.div>
                   )}
                   <p className="text-xs text-blue-400">
                     Tap the microphone to record again
                   </p>
                 </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Description */}
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <label className="block text-sm font-semibold text-blue-800">Description *</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Tell us more about your story..."
            rows={4}
            required
            className="w-full p-4 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
          />
        </motion.div>

        {/* Country */}
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <label className="block text-sm font-semibold text-blue-800">Country</label>
          <input
            type="text"
            value={formData.country}
            onChange={(e) => handleInputChange('country', e.target.value)}
            placeholder="Where are you from?"
            className="w-full p-4 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </motion.div>

        {/* Tags */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <label className="block text-sm font-semibold text-blue-800">Tags</label>
          
          {/* Available Tags */}
          <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-2xl p-4 shadow-md">
            <p className="text-sm text-blue-600 mb-3">Select relevant tags:</p>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <motion.button
                  key={tag}
                  type="button"
                  onClick={() => formData.tags.includes(tag) ? removeTag(tag) : addTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    formData.tags.includes(tag)
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tag}
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Custom Tag Input */}
          <div className="flex space-x-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add custom tag"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomTag())}
              className="flex-1 p-3 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <motion.button 
              type="button" 
              onClick={addCustomTag}
              className="px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="h-5 w-5" />
            </motion.button>
          </div>

          {/* Selected Tags */}
          {formData.tags.length > 0 && (
            <div className="bg-blue-50 rounded-2xl p-4">
              <p className="text-sm text-blue-600 mb-2">Selected tags:</p>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <motion.div
                    key={tag}
                    className="flex items-center space-x-2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-blue-200 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* GoFundMe Link */}
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <label className="block text-sm font-semibold text-blue-800">GoFundMe Link (Optional)</label>
          <input
            type="url"
            value={formData.gofundmeLink}
            onChange={(e) => handleInputChange('gofundmeLink', e.target.value)}
            placeholder="https://gofundme.com/your-campaign"
            className="w-full p-4 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <p className="text-xs text-blue-500">
            If you have a fundraising campaign, you can link it here
          </p>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold text-lg ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <div className="flex items-center justify-center space-x-3">
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="h-6 w-6" />
                  <span>Submit Story</span>
                </>
              )}
            </div>
          </button>
        </motion.div>
      </motion.form>
    </div>
  )
}

