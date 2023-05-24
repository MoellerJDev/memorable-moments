import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyCvAEosw5tCUKcLYWyHhavTlqrMdiUIjZI",

  authDomain: "memorable-moments-9f679.firebaseapp.com",

  projectId: "memorable-moments-9f679",

  storageBucket: "memorable-moments-9f679.appspot.com",

  messagingSenderId: "438400251278",

  appId: "1:438400251278:web:d29597e8944811eb04e0df",

  measurementId: "G-1LK5ZVJD9S"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export { app, analytics, firestore };