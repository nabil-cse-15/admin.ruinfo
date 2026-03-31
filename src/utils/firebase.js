
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAlLjiFr5196qgVoA7j6Fl3e272OGCnvrk",
  authDomain: "ruinfoapp.firebaseapp.com",
  projectId: "ruinfoapp",
  storageBucket: "ruinfoapp.firebasestorage.app",
  messagingSenderId: "672520347532",
  appId: "1:672520347532:web:b239b3f440a6565c9d00a9"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);