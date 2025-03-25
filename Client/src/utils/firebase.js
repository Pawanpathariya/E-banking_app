// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:"AIzaSyC-GuSjj8vIqFOUE1RVODlc2d5bnjttZrs",
  authDomain: "e-banking-bd50e.firebaseapp.com",
  projectId: "e-banking-bd50e",
  storageBucket: "e-banking-bd50e.firebasestorage.app",
  messagingSenderId: "727792992202",
  appId: "1:727792992202:web:58c94a0ed9ddabf8995933",
  measurementId: "G-9JWYVC4SKX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth =getAuth(app)
const provider = new GoogleAuthProvider();

export {auth,provider}
