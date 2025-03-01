import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCd9QIH5zlMA8lvZpi59cIE9jo52AhJsKo",
  authDomain: "perpusna-85048.firebaseapp.com",
  projectId: "perpusna-85048",
  storageBucket: "perpusna-85048.firebasestorage.app",
  messagingSenderId: "590077743218",
  appId: "1:590077743218:web:5a511b518db58293b0b2eb",
  measurementId: "G-HGF0FLVW88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
