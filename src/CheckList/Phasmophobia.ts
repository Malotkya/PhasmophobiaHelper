/** Phasmophobia.ts
 * 
 * Main Game File
 * 
 */
import Evidence from "./Evidence";
import Ghost from "./Ghost";
import CheckList from "./CheckList";
import Alternative from "./Alternative";

/** Phasmophobia Class
 * 
 */
export default class Phasmophobia {
    private _checkList: CheckList;
    private _alternative: Alternative;
    private _mainGhostList: Array<Ghost>;
    private _target: HTMLElement;

    /** Constructor
     * 
     * @param {Array<Evidence>} evidenceList 
     * @param {Array<Ghost>} ghostList 
     * @param {Array<HTMLSelectElement|HTMLInputELement>} alternativeList 
     * @param {HTMLElement} target 
     */
    constructor(evidenceList: Array<Evidence>, ghostList: Array<Ghost>, alternativeList: Array<HTMLSelectElement>, target: HTMLElement){
        this._checkList = new CheckList(evidenceList);
        this._alternative = new Alternative(alternativeList, ()=>this.update());
        this._mainGhostList = ghostList
        this._target = target;
    }

    /** Update Game Event
     * 
     */
    public update(){
        let list = [].concat(this._mainGhostList);
        list = this._checkList.update(list);
        list = this._alternative.update(list);

        //Sort the list
        list.sort((lhs:Ghost,rhs:Ghost):number=>{
            if(lhs.order === rhs.order)
                return lhs.name.localeCompare(rhs.name);
            return lhs.order - rhs.order;
        });

        //Display new List
        this._target.innerHTML = "";
        for(let ghost of list){
            this._target.appendChild(ghost.element);
        }

        //Display top ghost
        list[0].display();
    }

    /** Reset Game Event
     * 
     */
    public reset(){
        this._checkList.reset();
        this._alternative.reset();

        this._target.innerHTML = "";
        for(let ghost of this._mainGhostList){
            ghost.reset();
            this._target.appendChild(ghost.element)
        }

        this._mainGhostList[0].display();
    }

    /** Evidence Count Getter Passthrough
     * 
     */
    get evidenceCount(){
        return this._checkList.evidenceCount;
    }

    /**Evidence Count Setter Passthrough
     * 
     * @param {number} value
     */
    set evidenceCount(value: number){
        this._checkList.evidenceCount = value;
    }
}