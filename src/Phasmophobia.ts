/** Phasmophobia.ts
 * 
 * @author Alex Malotky
 */
import Ghost from "./Ghost";
import Evidence from "./Evidence";
import CustomSet from "./CustomSet";

const DEFAULT_EVIDENCE_COUNT = 3;

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

    //number of abailable evidence.
    private _evidenceThreashold;

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
        
        //Initial Information
        this._evidenceThreashold = 1;
    }

    /** Update Ghost List Visibility & Order
     * 
     */
    update(){
        for(let ghost of this._ghostList){

            //Count Evidence Not Found
            let dCount = 0;
            this._deduction.forEach(e=>{
                if(ghost.has(e.name)){
                    dCount++;
                }
                if(ghost.required === e.name){
                    dCount+=5;
                }
            });

            //Count Evidence Found
            let iCount = 0;
            this._induction.forEach(e=>{
                if(ghost.has(e.name)) {
                    iCount--;
                } else {
                    iCount+=5;
                }
            });

            //Hide Ghost if can't be found
            if(iCount>1 || dCount >= this._evidenceThreashold){
                ghost.hide();
            } else {
                ghost.show();
            }

            //Reorder Ghost
            ghost.order = iCount;
        };

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
    reset(){
        this._induction.clear()
        this._deduction.clear();
        this._ghostList.forEach(g=>g.reset());
        this._evidenceList.forEach(e=>e.reset());
    }

    /** Evidence Count Setter.
     * 
     */
    set evidenceCount(value: number){
        let reset = this._induction.setMaxSize(value);
        reset.forEach(e=>e.reset());

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
    get evidenceCount(){
        return (DEFAULT_EVIDENCE_COUNT + 1) - this._evidenceThreashold;
    }
}