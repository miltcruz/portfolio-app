import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyBQPoUZiCxjRRjm_iMXbCCQF2_UNMuOyjY",
  authDomain: "portfolio-app-34a72.firebaseapp.com",
  databaseURL: "https://portfolio-app-34a72.firebaseio.com",
  projectId: "portfolio-app-34a72",
  storageBucket: "portfolio-app-34a72.appspot.com",
  messagingSenderId: "789328836660",
  appId: "1:789328836660:web:1dc364c1963484a2713261"
};

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)
  }
}

 // Auth
 export const fbAuth = firebase.auth();

 // Firestore
 export const fbDb = firebase.firestore();