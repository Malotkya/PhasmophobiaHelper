/** Firestore.ts
 * 
 * Using this as a middleman untill I can figure out how to properly lazy load.
 * 
 * @author Alex Malotky
 */
export {initializeApp, FirebaseApp} from "firebase/app";
export {getFirestore, Firestore, collection, getDocs, DocumentReference} from "firebase/firestore";