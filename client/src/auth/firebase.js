import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCvAEosw5tCUKcLYWyHhavTlqrMdiUIjZI",
  authDomain: "memorable-moments-9f679.firebaseapp.com",
  projectId: "memorable-moments-9f679",
  storageBucket: "memorable-moments-9f679.appspot.com",
  messagingSenderId: "438400251278",
  appId: "1:438400251278:web:d29597e8944811eb04e0df",
  measurementId: "G-1LK5ZVJD9S"
};

let app;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]; // if already initialized, use that one
}

const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
