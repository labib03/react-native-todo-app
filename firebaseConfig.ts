import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDeCFA6BjMtckzcP9LDOCcQBssSCiS2AmM",
  authDomain: "react-native-test-app-8196e.firebaseapp.com",
  projectId: "react-native-test-app-8196e",
  storageBucket: "react-native-test-app-8196e.appspot.com",
  messagingSenderId: "138535449353",
  appId: "1:138535449353:web:a2fefe172b55dc14c899d8",
  measurementId: "G-1HPZKDJK9N",
};

// const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
