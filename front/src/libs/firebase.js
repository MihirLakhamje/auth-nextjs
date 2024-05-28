// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8RHRuUVb8SvPxasvHit9TAywgfr6yhfI",
  authDomain: "auth-95df2.firebaseapp.com",
  projectId: "auth-95df2",
  storageBucket: "auth-95df2.appspot.com",
  messagingSenderId: "326954080986",
  appId: "1:326954080986:web:bd240153f3e069f24223e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);