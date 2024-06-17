// import firebase from 'firebase/app';
// import 'firebase/auth';

// const firebaseConfig = {
//     apiKey: "AIzaSyA0Zx2-KFWQuB0FInNsl6ZRakGVp9KLIJk",
//   authDomain: "fir-mfa-51e82.firebaseapp.com",
//   databaseURL: "https://fir-mfa-51e82-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "fir-mfa-51e82",
//   storageBucket: "fir-mfa-51e82.appspot.com",
//   messagingSenderId: "481514149212",
//   appId: "1:481514149212:web:9a320a8f00afdd27d6dd99"
// };

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// export default firebase;
// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
// let firebase =
//   getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
// export default firebase;
const app=initializeApp(firebaseConfig);
export {app};


