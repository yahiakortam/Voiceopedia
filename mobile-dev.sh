#!/bin/bash

echo "🚀 Voiceopedia Mobile Development Script"
echo "========================================"

# Function to build and sync
build_and_sync() {
    echo "📦 Building project..."
    pnpm run build
    
    echo "🔄 Syncing with Capacitor..."
    npx cap sync
    
    echo "✅ Build and sync complete!"
}

# Function to open Android Studio
open_android() {
    echo "📱 Opening Android Studio..."
    npx cap open android
}

# Function to run on device
run_device() {
    echo "📱 Running on connected device..."
    npx cap run android
}

# Function to run in browser
run_browser() {
    echo "🌐 Running in browser..."
    pnpm run dev
}

# Main menu
echo ""
echo "What would you like to do?"
echo "1) Build and sync project"
echo "2) Open Android Studio"
echo "3) Run on device"
echo "4) Run in browser"
echo "5) All of the above"
echo ""

read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        build_and_sync
        ;;
    2)
        open_android
        ;;
    3)
        build_and_sync
        run_device
        ;;
    4)
        run_browser
        ;;
    5)
        build_and_sync
        echo ""
        echo "🎉 Ready to develop!"
        echo "📱 Use 'npx cap open android' to open in Android Studio"
        echo "🌐 Use 'pnpm run dev' to run in browser"
        echo "📱 Use 'npx cap run android' to run on device"
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        ;;
esac 