// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { FacebookAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCB-bnkv3jOXYUQeZ2aC1SSblnz0_JBPmo",
    authDomain: "outstagram-62e38.firebaseapp.com",
    projectId: "outstagram-62e38",
    storageBucket: "outstagram-62e38.appspot.com",
    messagingSenderId: "579884428139",
    appId: "1:579884428139:web:c970c2712dc42e14a8ba2e"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new FacebookAuthProvider();

export { app as default, auth, provider };