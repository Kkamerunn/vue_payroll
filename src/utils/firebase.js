// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile, 
  onAuthStateChanged,
  reauthenticateWithCredential,
  updateEmail
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8B6OP0DHJhRGPHJBaK86loZwPHQy60YM",
  authDomain: "vue-payrroll-management.firebaseapp.com",
  projectId: "vue-payrroll-management",
  storageBucket: "vue-payrroll-management.appspot.com",
  messagingSenderId: "962107690470",
  appId: "1:962107690470:web:4f8ed86b7399ab94769a27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    reauthenticateWithCredential,
    updateEmail
}