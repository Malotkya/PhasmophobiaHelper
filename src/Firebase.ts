/** Firebase.ts
 * 
 * Using this as a middleman untill I can figure out how to properly lazy load.
 * 
 * @author Alex Malotky
 */
import {initializeApp, FirebaseApp} from "firebase/app";
import {getFirestore, Firestore, collection, getDocs, QuerySnapshot} from "firebase/firestore"; 

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDQYcZb43MIFQ20F_yYqr2zmsFClaZEcOI",
    authDomain: "phasmophobiahelper.firebaseapp.com",  
    projectId: "phasmophobiahelper",  
    storageBucket: "phasmophobiahelper.appspot.com",
    messagingSenderId: "145603286815",
    appId: "1:145603286815:web:c6f8c191bb1e393fae422a",
    measurementId: "G-7THDK73W9X"
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const database:Firestore = getFirestore(app);

export {QuerySnapshot, DocumentReference} from "firebase/firestore";
export function getTable(name: string):Promise<QuerySnapshot>{
    return getDocs(collection(database, name));
}