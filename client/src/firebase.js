// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE,
  authDomain: "example-b81a7.firebaseapp.com",
  projectId: "example-b81a7",
  storageBucket: "example-b81a7.appspot.com",
  messagingSenderId: "362229792431",
  appId: "1:362229792431:web:de58798728fcbc6cc75e5a",
  measurementId: "G-4PNW52CM8R"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);