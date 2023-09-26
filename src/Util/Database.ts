/** Database.ts
 * 
 * @author Alex Malotky
 */
import {getFirestore, Firestore, collection, getDocs, DocumentReference, initializeApp, FirebaseApp} from "../Firebase";
import {cache} from "./Memory";

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
 * How the Ghost Class is expecting the data to be.
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

/** Evidence Data Interface
 * 
 * How the Ghost Class is expecting the data to be.
 */
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
    const evidence: any = {};
    (await cache("Evidence", getEvidence)).forEach((e:EvidenceData)=>evidence[e.id] = e.name);
    const raw = await getDocs(collection(database, "Ghosts"));

    const output: Array<GhostData> = [];

    raw.forEach(result=>{
        const data:any = result.data();

        //Convert to GhostData
        if(typeof data.name === "undefined"){
            console.error("No name on object and will be droped:\n" + JSON.stringify(result, null, 2));
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

                let required: string;
                if(data.required){
                    required = evidence[data.required.id];
                    if(typeof required === "undefined"){
                        console.warn(`Unknown Required Evidence Reference: ${data.required.id} on ghost '${data.name}'!`);
                    }
                }

                output.push(data);
            }
        }
    });

    //Sort by name.
    return output.sort((a,b)=>a.name.localeCompare(b.name));
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
            console.error("Unknown evidence object and will be dropped:\n" + JSON.stringify(result, null, 2));
        }
    });

    //Sort by name.
    return output.sort((a,b)=>a.name.localeCompare(b.name));
}