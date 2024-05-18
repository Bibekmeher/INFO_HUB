import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAi7jb2RYgSoUYeiPikfMXSxbuytTqJyKY",
  authDomain: "contact-7a37c.firebaseapp.com",
  projectId: "contact-7a37c",
  storageBucket: "contact-7a37c.appspot.com",
  messagingSenderId: "661082918569",
  appId: "1:661082918569:web:275b2c0e19134f983963b8",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
