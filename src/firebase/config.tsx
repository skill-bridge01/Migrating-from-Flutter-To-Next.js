// // Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBRI6tbD1jqUGCL56RSzov2SsCbaSDrJd0",
  authDomain: "kirihare-web-pc.firebaseapp.com",
  projectId: "kirihare-web-pc",
  storageBucket: "kirihare-web-pc.appspot.com",
  messagingSenderId: "33560212503",
  appId: "1:33560212503:web:fc389a7920a43c762fd852",
  measurementId: "G-F3RNCE92FF",
};

// Initialize Firebase
let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);
const firebaseApp = initializeApp(firebaseConfig);

// export { firebase_app };

export { firebaseApp, firebase_app, app };
