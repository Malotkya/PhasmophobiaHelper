/** Database.ts
 * 
 * @author Alex Malotky
 */
import {QuerySnapshot, DocumentReference} from "../Firebase";
import {cache} from "./Memory";



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

/** Get Ghost Data
     * 
     * @returns {Array<GhostData>}
     */
export async function getGhosts(): Promise<Array<GhostData>>{
    //@ts-ignore
    const getTable = (await import(/*webpackIgnore: true*/ "/firebase.js")).getTable;

    const evidence: any = {};
    (await cache("Evidence", getEvidence)).forEach((e:EvidenceData)=>evidence[e.id] = e.name);

    const raw:QuerySnapshot = await getTable("Ghosts");

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
    //@ts-ignore
    const getTable = (await import(/*webpackIgnore: true*/ "/firebase.js")).getTable;
    const raw: QuerySnapshot = await getTable("Evidence");
    
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