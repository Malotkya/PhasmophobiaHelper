/** Phasmophobia.ts
 * 
 * @author Alex Malotky
 */
import Ghost, { createAllGhosts } from "./Ghost";
import Evidence, { createAllEvidence } from "./Evidence";
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

    constructor(evidenceTarget: Element, ghostTarget: Element, displayTarget: Element){

        //Create all Objects
        this._evidenceList = createAllEvidence(evidenceTarget);
        this._ghostList = createAllGhosts(ghostTarget, displayTarget);

        //Create lists
        this._induction = new CustomSet(DEFAULT_EVIDENCE_COUNT);
        this._deduction = new Set();
        
        //Initial Information
        this._ghostList[0].display(displayTarget);
        this._evidenceThreashold = 1;

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

        //Display new ghost if current ghost is hidden.
        evidenceTarget.addEventListener("click", ()=>{
            let current: Ghost = findCurrentGhost(this._ghostList, displayTarget);
            if(current.order > 0)
                findTopGhost(this._ghostList).display(displayTarget);
        })
    }

    /** Update Ghost List Visibility & Order
     * 
     */
    update(){
        this._ghostList.forEach(ghost=>{

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

/** Find Current Ghost on Display
 * 
 * Will return null if the ghost can't be found.
 * 
 * @param {Array<Ghost>} list 
 * @param {Element} current 
 * @returns {Ghost}
 */
function findCurrentGhost(list: Array<Ghost>, current: Element): Ghost{
    let nameNode = current.querySelector(".name");
    if(nameNode){
        let name:string = nameNode.textContent
        for(let ghost of list){
            if(ghost.name === name)
                return ghost;
        }
    }

    return null;
}

/** Find the Top Ghost
 * 
 * Looks for the top ghost of the list, and excludes ghosts that are crossed off.
 * Will return null if all ghosts are crossed off.
 * Assumes list is in alphabetical order!
 * 
 * @param {Array<Ghost>} list 
 * @returns {Ghost}
 */
function findTopGhost(list: Array<Ghost>): Ghost{
    let top: Ghost = null;
    let index:number = 0;

    //Loop through finding start.
    while(top!==null && index<list.length){
        if(!list[index].isCorssedOff())
            top = list[index];

        index++;
    }

    //Loop thorugh finding top.
    while(index<list.length){
        if(top.order > list[index].order) {
            if(!list[index].isCorssedOff())
                top = list[index];
        }
        index++;
    }

    return top;
}