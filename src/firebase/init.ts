import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyA0Zx2-KFWQuB0FInNsl6ZRakGVp9KLIJk",
    authDomain: "fir-mfa-51e82.firebaseapp.com",
    projectId: "fir-mfa-51e82",
    storageBucket: "fir-mfa-51e82.appspot.com",
    messagingSenderId: "481514149212",
    appId: "1:481514149212:web:9a320a8f00afdd27d6dd99"
  };

let app:FirebaseApp;

if (getApps().length==0){
    app=initializeApp(firebaseConfig);
}else {
    app = getApp();
}

export { app }