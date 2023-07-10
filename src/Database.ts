/** Database.ts
 * 
 * @author Alex Malotky
 */
import {initializeApp} from "firebase/app";
import {getFirestore, Firestore, collection, getDocs} from "firebase/firestore";

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

/** Ghost Data Interface
 * 
 * How that ghost data is stored in the database.
 */
export interface GhostData {
    name: string,
    evidence: Array<string>,
    info?: Array<string>,
    required?: string,
    link?: string,
    warning?: string
}

/** Database Class
 * 
 */
export default class Database {
    private _firestore: Firestore;
    constructor(){
        const app = initializeApp(firebaseConfig);
        this._firestore = getFirestore(app);
    }

    /** Get Ghost Data
     * 
     * @returns {Array<GhostData>}
     */
    async getGhosts(): Promise<Array<GhostData>>{
        const raw = await getDocs(collection(this._firestore, "Ghosts"));
        const output: Array<GhostData> = [];

        raw.forEach(result=>{
            //Convert to GhostData
            const data: any = result.data();

            if(typeof data.name === "undefined"){
                console.error("No name on object and will be droped:\n" + JSON.stringify(data, null, 2));
            } else {

                if(typeof data.evidence === "undefined") {
                    console.error(`No evidence on ghost '${data.name}' and will be droped.`)
                } else {
                    output.push(data);
                }
            }
        });

        //Sort by name.
        output.sort((a,b)=>a.name.localeCompare(b.name));

        return output;
    }
}