// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBP5rGvn_dMyYYu1qOZiXSa3dWWlX0PlSE",
  authDomain: "login-auth-e5d06.firebaseapp.com",
  projectId: "login-auth-e5d06",
  storageBucket: "login-auth-e5d06.appspot.com",
  messagingSenderId: "204052967957",
  appId: "1:204052967957:web:7171031a3d2958f7fb541c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
