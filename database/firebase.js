import firebase from 'firebase';
import 'firebase/firestore';

  var firebaseConfig = {
    apiKey: "AIzaSyAyFnZhIq1MTWjypQxRVMD3IVCW5xjSUQA",
    authDomain: "projeto-mobile-9a55e.firebaseapp.com",
    projectId: "projeto-mobile-9a55e",
    storageBucket: "projeto-mobile-9a55e.appspot.com",
    messagingSenderId: "1014495714703",
    appId: "1:1014495714703:web:de7445fc81f9dc358abffa"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore()

  export default {
      firebase,
      db,
  }