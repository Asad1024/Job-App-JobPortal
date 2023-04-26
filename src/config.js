import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDYCFXUVuRRwaVXy38l1KFY43B7fuKLmHc",
  authDomain: "practice-cc4b9.firebaseapp.com",
  projectId: "practice-cc4b9",
  storageBucket: "practice-cc4b9.appspot.com",
  messagingSenderId: "830153740788",
  appId: "1:830153740788:web:c05459d5562b761dcba9a1",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
