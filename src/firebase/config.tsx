// // Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAdjijJkQCqqhR_ZDErF8bp5KQ98qJm6-s",
  authDomain: "kirihare-web.firebaseapp.com",
  projectId: "kirihare-web",
  storageBucket: "kirihare-web.appspot.com",
  messagingSenderId: "363672539637",
  appId: "1:363672539637:web:5955b17ff54504c1db90bc"
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
