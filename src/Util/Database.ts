/** Database.ts
 * 
 * @author Alex Malotky
 */
import { DocumentReference } from "../Firestore";

/** Ghost Data Interface
 * 
 * How that ghost data is stored in the database.
 */
interface GhostResult{
    id: string,
    name: string,
    evidence: Array<DocumentReference>,
    info?: Array<string>,
    required?: DocumentReference,
    link?: string,
    warning?: string,
    speed?: number|Array<number>,
    hunt?: number|Array<number>
}

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

interface EvidenceResult {
    id: string,
    name: string
}

export interface EvidenceData {
    id: string,
    name: string
}

/** Get Ghost Data
     * 
     * @returns {Array<GhostData>}
     */
export async function getGhosts(): Promise<Array<GhostData>>{
    const getTable = (await require("../Firestore.ts")).getTable;

    const evidence: any = {};
    (await getEvidence()).forEach(e=>evidence[e.id] = e.name);
    const raw: Array<GhostResult> = await getTable("Ghosts");

    const output: Array<GhostData> = [];

    raw.forEach((result:GhostResult)=>{
        //Convert to GhostData
        if(typeof result.name === "undefined"){
            console.error("No name on object and will be droped:\n" + JSON.stringify(result, null, 2));
        } else {

            if(typeof result.evidence === "undefined") {
                console.error(`No evidence on ghost '${result.name}' and will be droped.`);
            } else {

                //Link to Evidence Name
                let required: string;
                if(result.required){
                    required = evidence[result.required.id];
                    if(typeof required === "undefined"){
                        console.warn(`Unknown Required Evidence Reference: ${result.required.id} on ghost '${result.name}'!`);
                    }
                }

                output.push({
                    name: result.name,
                    evidence: result.evidence.map((ref:DocumentReference)=>{

                        //Link to Evidence Name
                        const e:string = evidence[ref.id];
                        if(typeof e === "undefined"){
                            console.warn(`Unknown Evidence Reference: ${ref.id} on ghost '${result.name}'!`);
                        }
                        return e;
                    }),
                    info: result.info,
                    required: required,
                    link: result.link,
                    warning: result.warning,
                    speed: result.speed,
                    hunt: result.hunt
                });
            }
        }
    });

    //Sort by name.
    output.sort((a,b)=>a.name.localeCompare(b.name));

    return output;
}

export async function getEvidence():Promise<Array<EvidenceData>>{
    const getTable = (await require("../Firestore.ts")).getTable;
    const raw: Array<EvidenceResult> = await getTable("Evidence");

    const output: Array<EvidenceData> = [];

    raw.forEach(result=>{
        if(typeof result.name === "string"){
            output.push(result);
        } else {
            console.error("Unknown evidence object and will be dropped:\n" + JSON.stringify(result, null, 2));
        }
    });

    //Sort by name.
    output.sort((a,b)=>a.name.localeCompare(b.name));

    return output;
}