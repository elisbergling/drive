import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
var firebaseConfig = {
  apiKey: "AIzaSyA2n4algUIGQr75V200SUPcAweuTmyuf-s",
  authDomain: "drive-3b76d.firebaseapp.com",
  projectId: "drive-3b76d",
  storageBucket: "drive-3b76d.appspot.com",
  messagingSenderId: "21859226707",
  appId: "1:21859226707:web:5d8693acf7d53ae09562a6",
  measurementId: "G-KFGMVDFDWP",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const db = firebase.firestore();

export const fieldValue = firebase.firestore.FieldValue;
