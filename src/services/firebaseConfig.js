import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBttG50YyMiNEg4GqCDTIfWbqjdH_h_lP8",
  authDomain: "wagehere-a65cd.firebaseapp.com",
  databaseURL: "https://wagehere-a65cd-default-rtdb.firebaseio.com",
  projectId: "wagehere-a65cd",
  storageBucket: "wagehere-a65cd.appspot.com",
  messagingSenderId: "357729344430",
  appId: "1:357729344430:web:234f6d789e5e69f6a6463f",
  measurementId: "G-NCGS7K82TZ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
