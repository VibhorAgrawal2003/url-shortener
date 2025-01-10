import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAwx1-pWeSqOAsfl_4BgcX2LrWPr1LqtTk",
    authDomain: "chip-url-shortener.firebaseapp.com",
    projectId: "chip-url-shortener",
    storageBucket: "chip-url-shortener.firebasestorage.app",
    messagingSenderId: "299209890978",
    appId: "1:299209890978:web:4e2093d4334ac0421d8bfb"
};
  
const firebaseApp = initializeApp(firebaseConfig);
export { firebaseApp };