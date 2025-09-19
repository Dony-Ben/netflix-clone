import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDVm5QCGoOnhBpKYTMK2ZBsd6AztWjbjJU",
  authDomain: "netflix-clone-b1d20.firebaseapp.com",
  projectId: "netflix-clone-b1d20",
  storageBucket: "netflix-clone-b1d20.firebasestorage.app",
  messagingSenderId: "707411607424",
  appId: "1:707411607424:web:03e40c817ac8a815494b65",
  measurementId: "G-2J900GJC4S"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
