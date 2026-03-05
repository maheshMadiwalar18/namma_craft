import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCAaWXN6qojbBL_bHOwVBhy8f1nAJHUVuQ",
    authDomain: "vijnanalab.firebaseapp.com",
    projectId: "vijnanalab",
    storageBucket: "vijnanalab.firebasestorage.app",
    messagingSenderId: "407063617574",
    appId: "1:407063617574:web:11f5ac68215576f5d6c6e7"
};

const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');

// Firestore Database
export const db = getFirestore(app);
