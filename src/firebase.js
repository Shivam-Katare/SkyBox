import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const app = firebase.initializeApp({
  apiKey: "AIzaSyD9hs-ztJf5ub9DJsmXKIDLTlyg5PeAjBk",
  authDomain: "driveclone-ef5e9.firebaseapp.com",
  projectId: "driveclone-ef5e9",
  storageBucket: "driveclone-ef5e9.appspot.com",
  messagingSenderId: "664005463989",
  appId: "1:664005463989:web:cb2bcd4caa0692c50bd3fc",
})

const firestore = app.firestore()
export const database = {
  folders: firestore.collection("folders"),
  files: firestore.collection("files"),
  formatDoc: doc => {
    return { id: doc.id, ...doc.data() }
  },
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
}
export const storage = app.storage()
export const auth = app.auth()
export default app
