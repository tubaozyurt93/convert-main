// Import the functions you need from the SDKs you need
import firebase from "firebase/app"
import "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXaF6mWgif4IZFE7sNoVM2LFIXgdURaPU",
  authDomain: "convertor-8e846.firebaseapp.com",
  projectId: "convertor-8e846",
  storageBucket: "convertor-8e846.appspot.com",
  messagingSenderId: "647776962394",
  appId: "1:647776962394:web:4bd5fd6a57baaee133d563"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }
  
  
  export const auth = firebase.auth() 