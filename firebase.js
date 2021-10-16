// Import the functions you need from the SDKs you need
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCo5t4u-sauxeMKnUV-FY3S1JhA0J0yLjE",
  authDomain: "ubereatsclone-dd0ff.firebaseapp.com",
  projectId: "ubereatsclone-dd0ff",
  storageBucket: "ubereatsclone-dd0ff.appspot.com",
  messagingSenderId: "795959609775",
  appId: "1:795959609775:web:51a1335cc78f2fe19ec75a",
  measurementId: "G-KJJTZC9SRJ"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig): firebase.app();

export default firebase;


