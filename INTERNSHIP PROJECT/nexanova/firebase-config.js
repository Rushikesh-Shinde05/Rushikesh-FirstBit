// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVKpzslG2vQZw-LK6wTAmWj5mm7aGGPkQ",
  authDomain: "nexanova-c3fd1.firebaseapp.com",
  projectId: "nexanova-c3fd1",
  storageBucket: "nexanova-c3fd1.firebasestorage.app",
  messagingSenderId: "747203123201",
  appId: "1:747203123201:web:f23cd9b4dc1b027660c800",
  measurementId: "G-7KVT25JS4R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);