import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Capacitor } from '@capacitor/core'
import { SplashScreen } from '@capacitor/splash-screen'
import { StatusBar } from '@capacitor/status-bar'
import './index.css'
import './mobile.css'
import './i18n'
import App from './App.jsx'

// Initialize Capacitor plugins
const initializeCapacitor = async () => {
  if (Capacitor.isNativePlatform()) {
    try {
      // Hide splash screen after app is ready
      await SplashScreen.hide()
      
      // Set status bar style
      await StatusBar.setStyle({ style: 'dark' })
      await StatusBar.setBackgroundColor({ color: '#3B82F6' })
    } catch (error) {
      console.log('Capacitor plugins not available:', error)
    }
  }
}

// Initialize app
const root = createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Initialize Capacitor after app renders
initializeCapacitor()
