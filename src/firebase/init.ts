import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDniNJJM0IGRe7KJIgxV--P5CGmnkWs5YE",
    authDomain: "kirihare-test-9833d.firebaseapp.com",
    projectId: "kirihare-test",
    storageBucket: "kirihare-test.appspot.com",
    messagingSenderId: "702239445524",
    appId: "1:702239445524:web:1dcc5d976177e1f166cd01"

  };

let app:FirebaseApp;

if (getApps().length==0){
    app=initializeApp(firebaseConfig);
}else {
    app = getApp();
}

export { app }

