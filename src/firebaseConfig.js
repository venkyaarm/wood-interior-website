// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGQTIHI8-3wdDoLxPh90sOLH6NvjeMxNU",
  authDomain: "wood-interior-website.firebaseapp.com",
  projectId: "wood-interior-website",
  storageBucket: "wood-interior-website.firebasestorage.app",
  messagingSenderId: "556176296466",
  appId: "1:556176296466:web:cdb17f308bb4a3b81266cb"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
