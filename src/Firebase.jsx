// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "nanosemic-8c9f3.firebaseapp.com",
  projectId: "nanosemic-8c9f3",
  storageBucket: "nanosemic-8c9f3.firebasestorage.app",
  messagingSenderId: "809538966068",
  appId: "1:809538966068:web:7e0dca0f0f62142593f061"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);