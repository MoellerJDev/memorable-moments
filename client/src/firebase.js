import firebase from 'firebase/app';
import 'firebase/auth';

// Initialize Firebase
const firebaseConfig = {
  // Your Firebase configuration
};

firebase.initializeApp(firebaseConfig);

// Export the Firebase authentication instance
export const auth = firebase.auth();
