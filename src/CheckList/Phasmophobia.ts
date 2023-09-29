/** Phasmophobia.ts
 * 
 * Main Game File
 * 
 */
import Evidence from "./Evidence";
import Alternative from "./Alternative";
import Ghost from "./Ghost";
import EvidenceList from "./EvidenceList";
import AlternativeList from "./AlternativeList";

/** Phasmophobia Class
 * 
 */
export default class Phasmophobia {
    private _evidenceList: EvidenceList;
    private _alternativeList: AlternativeList;
    private _mainGhostList: Array<Ghost>;
    private _target: HTMLElement;

    /** Constructor
     * 
     * @param {Array<Evidence>} evidenceList 
     * @param {Array<Ghost>} ghostList 
     * @param {Array<HTMLSelectElement|HTMLInputELement>} alternativeList 
     * @param {HTMLElement} target 
     */
    constructor(evidenceList: Array<Evidence>, ghostList: Array<Ghost>, huntList: Array<Alternative>, speedList: Array<Alternative>, target: HTMLElement){
        this._evidenceList = new EvidenceList(evidenceList);
        this._alternativeList = new AlternativeList(huntList, speedList);
        this._mainGhostList = ghostList
        this._target = target;
    }

    /** Update Game Event
     * 
     */
    public update(){
        let list: Array<Ghost> = [].concat(this._mainGhostList);
        list = this._evidenceList.update(list);
        list = this._alternativeList.update(list);

        //Sort the list
        list.sort((lhs:Ghost,rhs:Ghost):number=>{
            if(lhs.order === rhs.order)
                return lhs.name.localeCompare(rhs.name);
            return lhs.order - rhs.order;
        });

        //Display new List
        this._target.innerHTML = "";
        let needsUpdate: boolean = true;
        for(let ghost of list){
            this._target.appendChild(ghost);
            if(ghost.isDisplayed())
                needsUpdate = false;
        }

        //Display top ghost
        if(needsUpdate)
            list[0].display();
    }

    /** Reset Game Event
     * 
     */
    public reset(){
        this._evidenceList.reset();
        this._alternativeList.reset();

        this._target.innerHTML = "";
        for(let ghost of this._mainGhostList){
            ghost.reset();
            this._target.appendChild(ghost)
        }

        this._mainGhostList[0].display();
    }

    /** Evidence Count Getter Passthrough
     * 
     */
    get evidenceCount(){
        return this._evidenceList.evidenceCount;
    }

    /**Evidence Count Setter Passthrough
     * 
     * @param {number} value
     */
    set evidenceCount(value: number){
        this._evidenceList.evidenceCount = value;
    }
}