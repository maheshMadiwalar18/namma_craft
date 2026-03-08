import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSy_MISSING_KEY",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "MISSING.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "MISSING",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

if (!import.meta.env.VITE_FIREBASE_API_KEY) {
    console.error("❌ CRITICAL: Firebase API Key is missing. The app will likely crash or fail to load auth. Ensure you have added VITE_FIREBASE_API_KEY to your deployment environment variables.");
}

const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');

// Firestore Database
export const db = getFirestore(app);
