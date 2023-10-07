// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJRAcUmIp50LYKem7tEkGjEwTCnvGlvQ4",
  authDomain: "thesis-4daf3.firebaseapp.com",
  projectId: "thesis-4daf3",
  storageBucket: "thesis-4daf3.appspot.com",
  messagingSenderId: "919213827023",
  appId: "1:919213827023:web:61246a4e09da9c8fce68ba",
  measurementId: "G-CJTYBQERZ7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
