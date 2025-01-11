import { initializeApp } from 'firebase/app';
import { getAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore'; // Firestore'u import et

const firebaseConfig = {
  apiKey: "AIzaSyCOj1G4mEqPeol7aYVhTJlmIVK4nT4TDs0",
  authDomain: "kuzine-app.firebaseapp.com",
  projectId: "kuzine-app",
  storageBucket: "kuzine-app.appspot.com",
  messagingSenderId: "457398453268",
  appId: "1:457398453268:web:d263c8c5a86780c1f05301",
  measurementId: "G-6MCZFM37SJ"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Firestore'u başlat
const db = getFirestore(app);

// Firebase Authentication'ı başlat
const auth = getAuth(app);
auth.setPersistence(getReactNativePersistence(AsyncStorage));

export { db, auth };
