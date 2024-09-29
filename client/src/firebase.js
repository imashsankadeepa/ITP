// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-c1097.firebaseapp.com",
  projectId: "mern-auth-c1097",
  storageBucket: "mern-auth-c1097.appspot.com",
  messagingSenderId: "191963512102",
  appId: "1:191963512102:web:ce15c531e26310a4f115e7"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };