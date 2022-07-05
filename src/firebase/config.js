import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAgBIBUq-399jMTZTlbTY1J8TIR8rfar3Q",
  authDomain: "clerify-6f807.firebaseapp.com",
  projectId: "clerify-6f807",
  storageBucket: "clerify-6f807.appspot.com",
  messagingSenderId: "1049325448407",
  appId: "1:1049325448407:web:e6fb8c02a5ce5a6d42d492",
}

//init firebase
firebase.initializeApp(firebaseConfig)

//init services
const db = firebase.firestore()
const authService = firebase.auth()

//timestamp
const timestamp = firebase.firestore.Timestamp

export { db, authService, timestamp }
