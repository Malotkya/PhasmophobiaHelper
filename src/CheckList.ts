/** Phasmophobia.ts
 * 
 * @author Alex Malotky
 */
import Ghost from "./Ghost";
import Evidence from "./Evidence";
import CustomSet from "./CustomSet";

const DEFAULT_EVIDENCE_COUNT = 3;
const EVIDENCE_SCORE_OVERFLOW = 5;

/** Phasmophobia Class
 * 
 */
export default class CheckList {
    //list used by game
    private _evidenceList: Array<Evidence>

    //custom sets holding evidence proven/disproven
    private _induction: CustomSet<Evidence>; 
    private _deduction: Set<Evidence>;

    //Number of evidence needed to rule out a ghost.
    private _evidenceThreashold: number;

    constructor(evidenceList: Array<Evidence>){

        this._evidenceList = evidenceList;

        //Events for find/not finding evedence.
        this._evidenceList.forEach(evidence=>{

            //Evidence Found
            evidence.includeEvent(()=>{
                evidence.found();
                let replaced = this._induction.add(evidence);
                if(replaced)
                    replaced.reset();
                this._deduction.delete(evidence);
            });

            //Evidence Not Found
            evidence.excludeEvent(()=>{
                evidence.notFound();
                this._induction.delete(evidence);
                this._deduction.add(evidence);
            });

            //Evidence Reset
            evidence.resetEvent(()=>{
                evidence.reset();
                this._induction.delete(evidence);
                this._deduction.delete(evidence);
            })
        });

        //Create lists
        this._induction = new CustomSet(DEFAULT_EVIDENCE_COUNT);
        this._deduction = new Set();
        
        //Initial Information
        this._evidenceThreashold = 1;
    }

    /** Update Ghost List Visibility & Order
     * 
     */
    public update(list: Array<Ghost>): Array<Ghost>{
        return list.filter((ghost:Ghost)=>{

            //Count Evidence Not Found
            let dScore = 0;
            this._deduction.forEach(e=>{
                if(ghost.has(e.name)){
                    dScore++;
                }
                if(ghost.required === e.name){
                    dScore+=EVIDENCE_SCORE_OVERFLOW;
                }
            });

            //Count Evidence Found
            let iScore = 0;
            this._induction.forEach(e=>{
                if(ghost.has(e.name)) {
                    iScore--;
                } else {
                    iScore+=EVIDENCE_SCORE_OVERFLOW;
                }
            });

            //Reorder Ghost
            ghost.order = iScore;

            //Hide Ghost if can't be found
            if(iScore>1 || dScore >= this._evidenceThreashold)
                return false;

            return true;
        });
    }

    /** Reset the Game
     * 
     */
    public reset(): void{
        this._induction.clear()
        this._deduction.clear();
        this._evidenceList.forEach(e=>e.reset());
    }

    /** Evidence Count Setter.
     * 
     */
    public set evidenceCount(value: number){
        this._induction.setMaxSize(value).forEach(e=>e.reset());

        if(value < 1){
            value = 1;
            alert("There can't be less then 1 evidence!");
        } else if(value > DEFAULT_EVIDENCE_COUNT){
            value = DEFAULT_EVIDENCE_COUNT;
            alert(`There can't be more then ${DEFAULT_EVIDENCE_COUNT} evidence!`);
        }

        this._evidenceThreashold = (DEFAULT_EVIDENCE_COUNT + 1) - value;
    }

    /** Evidence Count Getter.
     * 
     */
    public get evidenceCount(): number{
        return (DEFAULT_EVIDENCE_COUNT + 1) - this._evidenceThreashold;
    }
}