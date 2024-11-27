import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDFrPOxGxQa_YjKjKa-sL5OxfRqYgYwxvA",
  authDomain: "i-moslam.firebaseapp.com",
  projectId: "i-moslam",
  storageBucket: "i-moslam.appspot.com",
  messagingSenderId: "859432261677",
  appId: "1:859432261677:web:b8d9c9a9b9b9b9a9b9b9b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;