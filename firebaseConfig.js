// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2O06sXPrBALjOmPfpXzd7SaX9AQ5kx1w",
  authDomain: "mydatasets-7a305.firebaseapp.com",
  projectId: "mydatasets-7a305",
  storageBucket: "mydatasets-7a305.appspot.com",
  messagingSenderId: "825066848561",
  appId: "1:825066848561:web:3104b820bb3efd97917010",
  measurementId: "G-15WELVDWX4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);