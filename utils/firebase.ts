// utils/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Firebase Authentication için ekleme

// Firebase config bilgileri
const firebaseConfig = {
  apiKey: "AIzaSyBCWFGAaomRG2UlEglv4w4NcVEnmSHbOWc",
  authDomain: "gs-store2.firebaseapp.com",
  projectId: "gs-store2",
  storageBucket: "gs-store2.appspot.com", // Burada bir düzeltme yaptım
  messagingSenderId: "566259982927",
  appId: "1:566259982927:web:8a7201f4fdd1ac30fd003a",
};

// Firebase uygulamasını başlat
const firebaseApp = initializeApp(firebaseConfig);

// Firestore ve Auth servislerini başlat
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
