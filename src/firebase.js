import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDx_YxGyGgxj2CUyCNPJL8qZzV6Q0B_dPg",
  authDomain: "placementapp-123.firebaseapp.com",
  projectId: "placementapp-123",
  storageBucket: "placementapp-123.appspot.com",
  messagingSenderId: "183510151817",
  appId: "1:183510151817:web:9151f2e2dee1fa15e38c58",
  measurementId: "G-N2K8170RWZ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const storage = firebase.storage();

export { firebaseApp, db, storage };



