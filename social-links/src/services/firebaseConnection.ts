import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCYPbrQf17DrptH7lk1QVy4HxXe1OWuPE0",
  authDomain: "reactlinks-e184a.firebaseapp.com",
  projectId: "reactlinks-e184a",
  storageBucket: "reactlinks-e184a.appspot.com",
  messagingSenderId: "702237298994",
  appId: "1:702237298994:web:54e215c21d1bcd6ae7072b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth, db}