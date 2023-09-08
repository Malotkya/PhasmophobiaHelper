/** Phasmophobia.ts
 * 
 * @author Alex Malotky
 */
import Ghost from "./Ghost";
import Evidence from "./Evidence";
import Alternative from "./Alternative";
import CustomSet from "./CustomSet";

const DEFAULT_EVIDENCE_COUNT = 3;
const EVIDENCE_SCORE_OVERFLOW = 5;

/** Phasmophobia Class
 * 
 */
export default class Phasmophobia {
    //list used by game
    private _ghostList: Array<Ghost>
    private _evidenceList: Array<Evidence>

    //custom sets holding evidence proven/disproven
    private _induction: CustomSet<Evidence>; 
    private _deduction: Set<Evidence>;

    //Number of evidence needed to rule out a ghost.
    private _evidenceThreashold: number;

    constructor(evidenceList: Array<Evidence>, ghostList: Array<Ghost>){

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
                this.update();
            });

            //Evidence Not Found
            evidence.excludeEvent(()=>{
                evidence.notFound();
                this._induction.delete(evidence);
                this._deduction.add(evidence);
                this.update();
            });

            //Evidence Reset
            evidence.resetEvent(()=>{
                evidence.reset();
                this._induction.delete(evidence);
                this._deduction.delete(evidence);
                this.update();
            })
        });
        
        //Ghosts
        this._ghostList = ghostList;

        //Create lists
        this._induction = new CustomSet(DEFAULT_EVIDENCE_COUNT);
        this._deduction = new Set();
        Alternative.init(ghostList);
        
        //Initial Information
        this._evidenceThreashold = 1;
    }

    /** Update Ghost List Visibility & Order
     * 
     */
    private update(): void{
        for(let ghost of this._ghostList){

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

            //Hide Ghost if can't be found
            if(iScore>1 || dScore >= this._evidenceThreashold){
                ghost.hide();
            } else {
                ghost.show();
            }

            //Reorder Ghost
            ghost.order = iScore;
        };

        Alternative.update();

        //Sort the list
        this._ghostList.sort((lhs:Ghost,rhs:Ghost):number=>{
            if(lhs.order === rhs.order)
                return lhs.name.localeCompare(rhs.name);
            return lhs.order - rhs.order;
        });
    }

    /** Reset the Game
     * 
     */
    public reset(): void{
        this._induction.clear()
        this._deduction.clear();
        this._evidenceList.forEach(e=>e.reset());
        Alternative.reset();
        this._ghostList.sort((lhs:Ghost, rhs:Ghost)=>{
            lhs.reset();
            return lhs.name.localeCompare(rhs.name);
        });
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
        this.update();
    }

    /** Evidence Count Getter.
     * 
     */
    public get evidenceCount(): number{
        return (DEFAULT_EVIDENCE_COUNT + 1) - this._evidenceThreashold;
    }
}