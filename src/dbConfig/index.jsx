
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyGwUIUnfvascULkeTgQE_YVj2wshOjME",
  authDomain: "practice-todo-7b071.firebaseapp.com",
  databaseURL: "https://practice-todo-7b071-default-rtdb.firebaseio.com",
  projectId: "practice-todo-7b071",
  storageBucket: "practice-todo-7b071.firebasestorage.app",
  messagingSenderId: "936020136028",
  appId: "1:936020136028:web:6ec39c2014a5588d9c5699"
};

// Initialize Firebase
const dbConfig = initializeApp(firebaseConfig);
export default dbConfig;