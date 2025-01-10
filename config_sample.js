import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    // your firebase config here..
};
  
const firebaseApp = initializeApp(firebaseConfig);
export { firebaseApp };