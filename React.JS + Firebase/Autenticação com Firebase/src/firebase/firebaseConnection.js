import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDKdQhuGzyIgCki0B1D-qWZn2xgXTH9Etw",
  authDomain: "learningfirebase-2bf69.firebaseapp.com",
  projectId: "learningfirebase-2bf69",
  storageBucket: "learningfirebase-2bf69.appspot.com",
  messagingSenderId: "929906241617",
  appId: "1:929906241617:web:02144f6e18073ff6824870",
  measurementId: "G-QXZMJ4R70L",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp)

export { db, auth };
