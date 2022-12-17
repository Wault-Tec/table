import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

//TODO: keys are hardcoded to test the application locally
const firebaseConfig = {
    apiKey: "AIzaSyD5f-UfjzDNTK4vQ2EYwPs6h0qNGaNz54Y",
    authDomain: "table-8806d.firebaseapp.com",
    projectId: "table-8806d",
    storageBucket: "table-8806d.appspot.com",
    messagingSenderId: "1016417747631",
    appId: "1:1016417747631:web:4b277819da472cfb2fca5a"
};
  
const app = initializeApp(firebaseConfig);

export const firestore  = getFirestore(app);