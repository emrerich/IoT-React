// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592

// Initialize Firebase

const firebaseConfig = {
  apiKey: "AIzaSyDy-wdZzx5GP7ChJtPClQ88Nz4Rw2lVqYQ",
  authDomain: "leaf-iot-b21f8.firebaseapp.com",
  projectId: "leaf-iot-b21f8",
  storageBucket: "leaf-iot-b21f8.appspot.com",
  messagingSenderId: "440280545482",
  appId: "1:440280545482:web:05fd390ed71aade8b25c33",
  measurementId: "G-X3N3D6SC8E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
