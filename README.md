# 🎤 Voiceopedia - Mobile App

**Voices that matter. Stories from around the world.**

Voiceopedia is a cross-platform mobile application that amplifies diverse voices and fosters a global community. Users can share their personal experiences through audio recordings and listen to stories from around the world.

## ✨ Features

### 🎤 Audio Recording & Playback
- **Real-time audio recording** using device microphone
- **Live duration tracking** during recording
- **Audio playback** to listen before submitting
- **Re-recording functionality** if you don't like your recording
- **Permission handling** for microphone access

### 🌍 Story Sharing
- **Submit personal stories** with audio recordings
- **Rich metadata** including title, description, country, and tags
- **Explore stories** from around the world
- **Search and filter** by tags, country, or title
- **Support integration** with GoFundMe links

### 📱 Mobile-Optimized
- **Cross-platform** (iOS, Android, Web)
- **Touch-friendly interface** with proper touch targets
- **Safe area support** for notched devices
- **Native features** including splash screen and status bar
- **Offline capable** with Firebase integration

### 🔥 Firebase Integration
- **Real-time data storage** in Firestore
- **Dynamic content** that updates without code changes
- **User-generated content** with proper validation
- **Scalable architecture** for global reach

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- pnpm (recommended) or npm
- Android Studio (for Android development)
- Xcode (for iOS development, Mac only)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/voiceopedia-mobile.git
cd voiceopedia-mobile

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

### Mobile Development

```bash
# Build for mobile
pnpm run build

# Sync with Capacitor
npx cap sync

# Open in Android Studio
npx cap open android

# Open in Xcode (Mac only)
npx cap open ios
```

### Testing

```bash
# Web browser
pnpm run dev

# Android device
npx cap run android

# iOS device (Mac only)
npx cap run ios
```

## 📱 Mobile App Setup

### Android
1. Install [Android Studio](https://developer.android.com/studio)
2. Connect Android device or use emulator
3. Enable USB debugging on device
4. Run `npx cap run android`

### iOS (Mac only)
1. Install [Xcode](https://developer.apple.com/xcode/) from App Store
2. Connect iPhone or use iOS Simulator
3. Run `npx cap run ios`

## 🛠️ Technology Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS + Framer Motion
- **Mobile**: Capacitor (iOS & Android)
- **Backend**: Firebase Firestore
- **Audio**: Web Audio API
- **Package Manager**: pnpm

## 📁 Project Structure

```
voiceopedia-mobile/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Main application pages
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Firebase and utility functions
│   ├── i18n/          # Internationalization
│   ├── assets/        # Static assets
│   ├── mobile.css     # Mobile-specific styles
│   └── main.jsx       # Application entry point
├── android/           # Android native project
├── ios/              # iOS native project
├── public/           # Public assets
├── scripts/          # Build and utility scripts
├── capacitor.config.json
├── mobile-dev.sh     # Mobile development helper
└── MOBILE_README.md  # Detailed mobile guide
```

## 🎯 Key Features Explained

### Audio Recording
The app uses the Web Audio API to capture audio from the device microphone. Users can:
- Start/stop recording with visual feedback
- See real-time duration
- Play back recordings before submitting
- Re-record if they're not satisfied

### Firebase Integration
All data is stored in Firebase Firestore:
- Stories with audio metadata
- User-generated content
- Real-time updates across devices
- Scalable cloud infrastructure

### Mobile Optimization
- Touch-friendly buttons (44px+ minimum)
- Safe area support for notched devices
- Native splash screen and status bar
- Smooth animations and transitions

## 🔧 Development

### Available Scripts

```bash
# Development
pnpm run dev          # Start development server
pnpm run build        # Build for production
pnpm run preview      # Preview production build

# Mobile
./mobile-dev.sh       # Interactive mobile development script
npx cap sync          # Sync web build with mobile platforms
npx cap open android  # Open in Android Studio
npx cap open ios      # Open in Xcode
```

### Firebase Configuration

The app uses Firebase for data storage. To set up your own Firebase project:

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Firestore Database
3. Update `src/lib/firebase.js` with your config
4. Set up Firestore security rules

### Environment Variables

Create a `.env` file for local development:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
```

## 📦 Building for Production

### Android APK
```bash
pnpm run build
npx cap sync
npx cap open android
# In Android Studio: Build → Build Bundle(s) / APK(s)
```

### iOS App Store
```bash
pnpm run build
npx cap sync
npx cap open ios
# In Xcode: Product → Archive
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Capacitor](https://capacitorjs.com/) for cross-platform mobile development
- [Firebase](https://firebase.google.com/) for backend services
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations

## 📞 Support

If you have any questions or need help:
- Open an [issue](https://github.com/yourusername/voiceopedia-mobile/issues)
- Check the [MOBILE_README.md](MOBILE_README.md) for detailed mobile setup
- Review the [Firebase documentation](https://firebase.google.com/docs)

---

**Made with ❤️ for amplifying voices around the world** 