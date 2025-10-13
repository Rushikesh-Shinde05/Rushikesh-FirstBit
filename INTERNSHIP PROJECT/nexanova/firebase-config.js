// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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
const auth = getAuth(app);

export { auth };
