import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAhRMCoEUXvBM3Zd7E7A6oNUTTNH53yCK4",
  authDomain: "chatroom-43710.firebaseapp.com",
  projectId: "chatroom-43710",
  storageBucket: "chatroom-43710.firebasestorage.app",
  messagingSenderId: "689191145355",
  appId: "1:689191145355:web:233ef73821507c1acd698e",
  measurementId: "G-C1RPG66M49",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const dataCollection = collection(db, "chats");
export { dataCollection, addDoc, onSnapshot, Timestamp, db };