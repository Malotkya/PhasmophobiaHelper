
/** AlternativeList.ts
 * 
 * Alternative Evidence
 * 
 * @author Alex Malotky
 * 
 */
import Ghost from "./Ghost";
import Alternative from "./Alternative";

/** Alternative Check List
 * 
 */
export default class AlternativeList{
    //Elements
    private _alternativeList: Array<Alternative>
    
    private _induction: Set<Alternative>;
    private _deduction: Set<Alternative>;

    /** Constructor
     * 
     * @param {Array<Alternative>} alternativeList 
     */
    constructor(...lists: Array<Array<Alternative>>){
        this._alternativeList = [];
        this._induction = new Set();
        this._deduction = new Set();

        lists.forEach(list=>{
            this._alternativeList = this._alternativeList.concat(list);
        });

        this._alternativeList.forEach(alternative=>{

            //Alternate Found
            alternative.includeEvent(()=>{
                alternative.found();
                this._induction.add(alternative);
                this._deduction.delete(alternative);
            });

            //Alternate Not Found
            alternative.excludeEvent(()=>{
                alternative.notFound();
                this._induction.delete(alternative);
                this._deduction.add(alternative);
            });

            //Alternate Reset
            alternative.resetEvent(()=>{
                alternative.reset();
                this._induction.delete(alternative);
                this._deduction.delete(alternative);
            });
        });
    }

    /** Reset Event
     * 
     */
    public reset(): void {
        for(let alternative of this._alternativeList)
            alternative.reset();
        this._induction.clear();
        this._deduction.clear();
    }

    /** Update Event
     * 
     * Filters ghost from list based on inputs/states
     * 
     * @param {Array<Ghost>} list 
     * @returns {Array<Ghost>}
     */
    public update(list: Array<Ghost>): Array<Ghost>{
        return list.filter((ghost:Ghost)=> {
            for(let alternative of this._induction){
                if(!ghost.checkAlternative(alternative.value))
                    return false;
            }

            for(let alternative of this._deduction){
                if(ghost.checkAlternative(alternative.value))
                    return false
            }

            return true;
        });
    }
    
}
