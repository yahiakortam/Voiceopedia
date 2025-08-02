import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Your web app's Firebase configuration
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

const storiesData = [
  {
    id: "1",
    title: "The Refugee's Journey",
    description: "A poignant story of a refugee's arduous journey to find safety and a new home.",
    duration: "3:45",
    tags: ["#refugee", "#journey", "#hope"],
    country: "Syria",
    audioFile: "audio1.mp3"
  },
  {
    id: "2",
    title: "Overcoming Anxiety",
    description: "An intimate account of one person's struggle with and triumph over mental health challenges.",
    duration: "5:10",
    tags: ["#mentalhealth", "#anxiety", "#wellness"],
    country: "USA",
    audioFile: "audio2.mp3"
  },
  {
    id: "3",
    title: "Life in a War Zone",
    description: "A powerful testimony from someone living in a conflict-ridden area, sharing daily struggles and resilience.",
    duration: "4:20",
    tags: ["#war", "#conflict", "#resilience"],
    country: "Ukraine",
    audioFile: "audio3.mp3"
  }
];

const resourcesData = [
  {
    category: "Food",
    name: "Community Food Bank",
    description: "Provides free groceries and meals to families in need.",
    phone: "(123) 456-7890",
    address: "123 Main St, Anytown, USA",
    website: "https://www.communityfoodbank.org",
    hours: "Mon-Fri: 9 AM - 5 PM"
  },
  {
    category: "Housing",
    name: "Shelter Support Services",
    description: "Assistance with emergency shelter, transitional housing, and permanent housing solutions.",
    phone: "(987) 654-3210",
    address: "456 Oak Ave, Anytown, USA",
    website: "https://www.sheltersupport.org",
    hours: "24/7 Hotline"
  },
  {
    category: "Mental Health",
    name: "Crisis Counseling Center",
    description: "Confidential counseling and support for individuals experiencing mental health crises.",
    phone: "(555) 123-4567",
    address: "789 Pine Ln, Anytown, USA",
    website: "https://www.crisiscounseling.org",
    hours: "Mon-Sun: 8 AM - 10 PM"
  }
];

const organizationInfoData = {
  name: "Voiceopedia",
  tagline: "Voices that matter. Stories from around the world.",
  mission: "Voiceopedia is a platform dedicated to amplifying voices that matter. We believe that every person has a story worth telling, and that these stories have the power to create understanding, empathy, and positive change in the world. Through audio storytelling, we connect people across borders, cultures, and experiences, creating a global community of shared humanity.",
  about: "Voiceopedia was created by a diverse team of developers, storytellers, and advocates who believe in the power of human connection. We are committed to creating a safe, inclusive space for all voices.",
  phone: "+1 (800) 123-4567",
  email: "info@voiceopedia.org",
  address: "789 Global St, World City, Earth",
  website: "https://www.voiceopedia.org",
  twitter: "https://twitter.com/voiceopedia",
  instagram: "https://instagram.com/voiceopedia",
  hours: "Online 24/7"
};

async function populateFirestore() {
  console.log("Populating Firestore...");

  // Add stories
  for (const story of storiesData) {
    await addDoc(collection(db, "stories"), story);
    console.log(`Added story: ${story.title}`);
  }

  // Add resources
  for (const resource of resourcesData) {
    await addDoc(collection(db, "resources"), resource);
    console.log(`Added resource: ${resource.name}`);
  }

  // Add organization info (only one document)
  await addDoc(collection(db, "organizationInfo"), organizationInfoData);
  console.log("Added organization info.");

  console.log("Firestore population complete!");
}

populateFirestore().catch(console.error);


