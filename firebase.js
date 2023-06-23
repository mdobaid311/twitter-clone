import {
    initializeApp,
    getApp,
    getApps
} from "firebase/app";
import {
    getFirestore
} from "firebase/firestore";
import {
    getStorage
} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDlXckpEmrJ7bSXZxwn3KnuGSlVWwCCJ6U",
    authDomain: "twitter-clone-df739.firebaseapp.com",
    projectId: "twitter-clone-df739",
    storageBucket: "twitter-clone-df739.appspot.com",
    messagingSenderId: "398675948975",
    appId: "1:398675948975:web:8e2d449a28912488622b5a"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export {
    db,
    storage
};