// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBfxOmarOk-c8itlndfU9s61wIxQmpfwRQ",
    authDomain: "project-i-auth.firebaseapp.com",
    projectId: "project-i-auth",
    storageBucket: "project-i-auth.appspot.com",
    messagingSenderId: "668463417846",
    appId: "1:668463417846:web:65048903bda7c0e6f49fd7",
    measurementId: "G-GB97YN2EGP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app); // Firestore instance
const auth = getAuth(app); // Firebase Auth instance

export { firestore, auth };