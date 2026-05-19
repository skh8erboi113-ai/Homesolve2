import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  "projectId": "studio-4450623487-72853",
  "appId": "1:725222207194:web:4ebe989442aea45511ffe3",
  "apiKey": process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "YOUR_FIREBASE_API_KEY",
  "authDomain": "studio-4450623487-72853.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "725222207194"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
