import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyAzbxHeRKElU4Zt47oqgAvVA9ox3Vub-Ak",
  authDomain: "portfolio-app-2868c.firebaseapp.com",
  projectId: "portfolio-app-2868c",
  storageBucket: "portfolio-app-2868c.appspot.com",
  messagingSenderId: "589865987127",
  appId: "1:589865987127:web:c61e604729ae83289163b2"
};

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)
  }
}

// Collections
export const usersCol = "users";

// Auth
export const fbAuth = firebase.auth();

// Firestore
export const fbDb = firebase.firestore();
