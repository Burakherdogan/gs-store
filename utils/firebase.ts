import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Firebase Authentication için ekleme
import { getDatabase } from 'firebase/database'; 

// Firebase config bilgileri
const firebaseConfig = {
  apiKey: "AIzaSyBCWFGAaomRG2UlEglv4w4NcVEnmSHbOWc",
  authDomain: "gs-store2.firebaseapp.com",
  databaseURL: "https://gs-store2-default-rtdb.firebaseio.com",
  projectId: "gs-store2",
  storageBucket: "gs-store2.appspot.com",
  messagingSenderId: "566259982927",
  appId: "1:566259982927:web:8a7201f4fdd1ac30fd003a",
};

// Firebase uygulamasını başlatma (app zaten varsa, yeniden başlatma)
const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Firestore, Auth ve Realtime Database servislerini başlat
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const rtdb = getDatabase(firebaseApp);

export { db, auth, rtdb };
