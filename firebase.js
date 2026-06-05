import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB90GWJgPic-sbiWdqZvlJh-O-oDLAr144",
  authDomain: "environmentquiz.firebaseapp.com",
  projectId: "environmentquiz",
  storageBucket: "environmentquiz.firebasestorage.app",
  messagingSenderId: "620461091551",
  appId: "1:620461091551:web:7aef683215e23030cb976a",
  measurementId: "G-DP2DDNSJYS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };