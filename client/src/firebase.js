// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE,
  authDomain: "rd-project-c4126.firebaseapp.com",
  projectId: "rd-project-c4126",
  storageBucket: "rd-project-c4126.appspot.com",
  messagingSenderId: "128971404784",
  appId: "1:128971404784:web:e4139da64625e4e9c85935"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);