import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBSsmA-9qcmRSoTQziXclbWP6jMtQSOkfI",
  authDomain: "netflix-7f5c1.firebaseapp.com",
  projectId: "netflix-7f5c1",
  storageBucket: "netflix-7f5c1.firebasestorage.app",
  messagingSenderId: "589082170257",
  appId: "1:589082170257:web:5463c1242f4c0ce1ea8030",
  measurementId: "G-5V1DFPKQXV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
