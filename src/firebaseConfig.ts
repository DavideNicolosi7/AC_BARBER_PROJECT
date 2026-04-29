import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyByaB7HOXbjHIWTbNVwXlzIgsgo7Cvrp8I",
  authDomain: "ac-barber.firebaseapp.com",
  projectId: "ac-barber",
  storageBucket: "ac-barber.firebasestorage.app",
  messagingSenderId: "594403279215",
  appId: "1:594403279215:web:9e9ebe9423e130ab83a89a",
  measurementId: "G-SWH8ZLE3XH",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
