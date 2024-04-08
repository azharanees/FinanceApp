import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCylDkuoQ6e2YrrL7UnKEfGjhOIS6iL3pg",
    authDomain: "info-6132-2f2d7.firebaseapp.com",
    projectId: "info-6132-2f2d7",
    storageBucket: "info-6132-2f2d7.appspot.com",
    messagingSenderId: "445125461947",
    appId: "1:445125461947:web:dcc2022466f998a699a69e"
  };
      
const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);
  
