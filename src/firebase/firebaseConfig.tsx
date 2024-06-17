// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  
  // apiKey: "AIzaSyA0Zx2-KFWQuB0FInNsl6ZRakGVp9KLIJk",
  // authDomain: "fir-mfa-51e82.firebaseapp.com",
  // projectId: "fir-mfa-51e82",
  // storageBucket: "fir-mfa-51e82.appspot.com",
  // messagingSenderId: "481514149212",
  // appId: "1:481514149212:web:9a320a8f00afdd27d6dd99",
  // measurementId: "G-CR5PK4J43L",

  // apiKey: "AIzaSyAIRO50KmNRLxF_nV9Uoro3ovXG7vzZFKI",
  // authDomain: "kirihare-web.firebaseapp.com",
  // projectId: "kirihare-web",
  // storageBucket: "kirihare-web.appspot.com",
  // messagingSenderId: "363672539637",
  // appId: "1:363672539637:web:4c134516a1b50bbfdb90bc",
  // measurementId: "G-DH9YHPZBPG",

//   NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyAIRO50KmNRLxF_nV9Uoro3ovXG7vzZFKI"
// NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="kirihare-web.firebaseapp.com"
// NEXT_PUBLIC_FIREBASE_PROJECT_ID="kirihare-web"
// NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="kirihare-web.appspot.com"
// NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="363672539637"
// NEXT_PUBLIC_FIREBASE_APP_ID="1:363672539637:web:4c134516a1b50bbfdb90bc"
// NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="G-DH9YHPZBPG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
