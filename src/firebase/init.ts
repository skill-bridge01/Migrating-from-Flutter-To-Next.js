import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBRI6tbD1jqUGCL56RSzov2SsCbaSDrJd0",
  authDomain: "kirihare-web-pc.firebaseapp.com",
  projectId: "kirihare-web-pc",
  storageBucket: "kirihare-web-pc.appspot.com",
  messagingSenderId: "33560212503",
  appId: "1:33560212503:web:fc389a7920a43c762fd852",
  measurementId: "G-F3RNCE92FF",
};

let app: FirebaseApp;

if (getApps().length == 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export { app };
