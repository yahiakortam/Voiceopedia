import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSeMdiLoKABZrD5ajx8rwxm6OqzNZdMLQ",
  authDomain: "voiceopedia.firebaseapp.com",
  projectId: "voiceopedia",
  storageBucket: "voiceopedia.firebasestorage.app",
  messagingSenderId: "903222504894",
  appId: "1:903222504894:web:028d03c7e24e93432f9def",
  measurementId: "G-BYDE1D1FFH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

