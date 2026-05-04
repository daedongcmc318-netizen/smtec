// SM TECH — Firebase initialization (modular SDK via gstatic CDN)
// Web app config (apiKey is safe to expose; security is enforced by Firestore Security Rules)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDm4WQQziF0E9_7b9TOfKmqL_tXEHkizsQ",
  authDomain: "smtec-b15da.firebaseapp.com",
  projectId: "smtec-b15da",
  storageBucket: "smtec-b15da.firebasestorage.app",
  messagingSenderId: "235214151335",
  appId: "1:235214151335:web:942771bc00bc0aa6428582",
  measurementId: "G-X36E06P8R5"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
