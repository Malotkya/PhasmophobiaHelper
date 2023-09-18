/** Database.ts
 * 
 * @author Alex Malotky
 */
import {initializeApp, FirebaseApp} from "firebase/app";
import {getFirestore, Firestore, collection, getDocs, DocumentReference} from "firebase/firestore";

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
    warning?: string,
    speed?: number|Array<number>,
    hunt?: number|Array<number>
}

export interface EvidenceData {
    id: string,
    name: string
}

const app: FirebaseApp = initializeApp(firebaseConfig);
const database:Firestore = getFirestore(app);

/** Get Ghost Data
     * 
     * @returns {Array<GhostData>}
     */
export async function getGhosts(): Promise<Array<GhostData>>{
    const evidence:any = {};
    (await getEvidence()).forEach(e=>evidence[e.id] = e.name);
    const raw = await getDocs(collection(database, "Ghosts"));

    const output: Array<GhostData> = [];

    raw.forEach(result=>{
        //Convert to GhostData
        const data: any = result.data();

        if(typeof data.name === "undefined"){
            console.error("No name on object and will be droped:\n" + JSON.stringify(data, null, 2));
        } else {

            if(typeof data.evidence === "undefined") {
                console.error(`No evidence on ghost '${data.name}' and will be droped.`);
            } else {
                //Link to Evidence Name
                data.evidence = data.evidence.map((ref:DocumentReference)=>{
                    const e:string = evidence[ref.id];
                    if(typeof e === "undefined"){
                        console.warn(`Unknown Evidence Reference: ${ref.id} on ghost '${data.name}'!`);
                    }
                    return e;
                });

                if(data.required){
                    const e:string = evidence[data.required.id];
                    if(typeof e === "undefined"){
                        console.warn(`Unknown Required Evidence Reference: ${data.required.id} on ghost '${data.name}'!`);
                    }
                    data.required = e;
                }

                output.push(data);
            }
        }
    });

    //Sort by name.
    output.sort((a,b)=>a.name.localeCompare(b.name));

    return output;
}

export async function getEvidence():Promise<Array<EvidenceData>>{
    const raw = await getDocs(collection(database, "Evidence"));
    const output: Array<EvidenceData> = [];

    raw.forEach(result=>{
        const data: any = result.data();
        if(typeof data.name === "string"){
            output.push({
                id: result.id,
                name: data.name
            });
        } else {
            console.error("Unknown evidence object and will be dropped:\n" + JSON.stringify(data, null, 2));
        }
    });

    //Sort by name.
    output.sort((a,b)=>a.name.localeCompare(b.name));

    return output;
}

export default database;