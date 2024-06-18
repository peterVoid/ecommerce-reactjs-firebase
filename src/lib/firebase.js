// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmYJbi7S-FGoPm-SRFMMIFC5G30wNpEFo",
  authDomain: "ecommerce-b89e4.firebaseapp.com",
  projectId: "ecommerce-b89e4",
  storageBucket: "ecommerce-b89e4.appspot.com",
  messagingSenderId: "56279776106",
  appId: "1:56279776106:web:82238fb03137445b76c313",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
