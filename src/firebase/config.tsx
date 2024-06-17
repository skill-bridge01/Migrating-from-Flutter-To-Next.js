// // Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDniNJJM0IGRe7KJIgxV--P5CGmnkWs5YE",
  authDomain: "kirihare-test-9833d.firebaseapp.com",
  projectId: "kirihare-test",
  storageBucket: "kirihare-test.appspot.com",
  messagingSenderId: "702239445524",
  appId: "1:702239445524:web:1dcc5d976177e1f166cd01"
};

// Initialize Firebase
let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);
const firebaseApp = initializeApp(firebaseConfig);

// export { firebase_app };

export { firebaseApp, firebase_app, app};