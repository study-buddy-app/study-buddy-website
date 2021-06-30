import firebase from "firebase/app"
import "firebase/storage"

    const firebaseConfig = {
        apiKey: "AIzaSyCqUuOFFC5ddUGPoGZI0mRGplImkDbi9to",
        authDomain: "picture-uplaod.firebaseapp.com",
        projectId: "picture-uplaod",
        storageBucket: "picture-uplaod.appspot.com",
        messagingSenderId: "379618924112",
        appId: "1:379618924112:web:410ef1d3c9c79c4752e355",
        measurementId: "G-WVVH3VXL82"
      };
    
      firebase.initializeApp(firebaseConfig);

      const storage = firebase.storage();
      export { storage, firebase as default }

     