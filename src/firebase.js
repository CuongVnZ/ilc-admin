// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYZxRAQmJ0NCCsOgGux_lncGgctsxreE8",
  authDomain: "astra-cfshop.firebaseapp.com",
  projectId: "astra-cfshop",
  storageBucket: "astra-cfshop.appspot.com",
  messagingSenderId: "947831167469",
  appId: "1:947831167469:web:79590702b0d1e1c9c0efe4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;