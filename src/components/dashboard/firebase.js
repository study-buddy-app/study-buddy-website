import firebase from "firebase/app"
import "firebase/storage"
import 'firebase/firestore'



export const app = firebase.initializeApp({
  apiKey: "AIzaSyAe8fbC3BFx9asMGQDUUIGm2XkCYB3nv9U",
  authDomain: "study-buddy-files.firebaseapp.com",
  projectId: "study-buddy-files",
  storageBucket: "study-buddy-files.appspot.com",
  messagingSenderId: "452293956396",
  appId: "1:452293956396:web:1ece3e3e63c773f79d1289",
  measurementId: "G-SBE92BPXHM"
});
    
  

      
      const db = firebase.firestore();
      db.settings({timestampsInSnapshots: true})
    
  


     