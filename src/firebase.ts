import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Check if critical configuration is missing
const isFirebaseConfigured = !!firebaseConfig.apiKey && firebaseConfig.apiKey !== "AIzaSy_MISSING_KEY";

if (!isFirebaseConfigured) {
    console.error("❌ CRITICAL: Firebase configuration is missing! \n" +
        "To fix the white screen, you MUST add the following environment variables to your Netlify/Deployment settings:\n" +
        "1. VITE_FIREBASE_API_KEY\n" +
        "2. VITE_FIREBASE_AUTH_DOMAIN\n" +
        "3. VITE_FIREBASE_PROJECT_ID\n" +
        "4. VITE_FIREBASE_STORAGE_BUCKET\n" +
        "5. VITE_FIREBASE_MESSAGING_SENDER_ID\n" +
        "6. VITE_FIREBASE_APP_ID\n\n" +
        "Check your local .env file for the values.");
}

// Initialize Firebase only if the key exists to prevent internal SDK crash
const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : initializeApp({ apiKey: "invalid", projectId: "invalid" });

// Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');

// Firestore Database
export const db = getFirestore(app);
