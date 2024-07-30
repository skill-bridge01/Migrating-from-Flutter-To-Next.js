import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAdjijJkQCqqhR_ZDErF8bp5KQ98qJm6-s",
  authDomain: "kirihare-web.firebaseapp.com",
  projectId: "kirihare-web",
  storageBucket: "kirihare-web.appspot.com",
  messagingSenderId: "363672539637",
  appId: "1:363672539637:web:5955b17ff54504c1db90bc"
};


let app: FirebaseApp;

if (getApps().length == 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export { app };
