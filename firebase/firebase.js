import * as firebase from 'firebase/app'
import {getFirestore} from "firebase/firestore";
require('firebase/auth')
const firebaseConfig = {
    };




const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app, db};


