import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAdjijJkQCqqhR_ZDErF8bp5KQ98qJm6-s",
  authDomain: "kirihare-web.firebaseapp.com",
  projectId: "kirihare-web",
  storageBucket: "kirihare-web.appspot.com",
  messagingSenderId: "363672539637",
  appId: "1:363672539637:web:5955b17ff54504c1db90bc"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
