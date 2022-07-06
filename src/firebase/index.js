import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyCoRscPa5TbfkWsmRP67FYBK9YWLEdPWBU",
    authDomain: "aifone-personal-project.firebaseapp.com",
    projectId: "aifone-personal-project",
    storageBucket: "aifone-personal-project.appspot.com",
    messagingSenderId: "477888157731",
    appId: "1:477888157731:web:38a86b5eb4ea69ba043996",
    measurementId: "G-55DML3SM1G"
};

export const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
// const fbDatabase = getDatabase(app);
export const fStore = getFirestore(app);
export const fStorage = getStorage(app);