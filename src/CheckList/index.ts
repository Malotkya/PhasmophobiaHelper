/** Phasmophobia.ts
 * 
 * Main Game File
 * 
 */
import EvidenceList from "./Evidence/List";
import { SpeedList, HuntList } from "./Alternative/List";
import GhostList from "./Ghost/List";
import { createElement as _ } from "../Util/Element";

/** Phasmophobia Class
 * 
 */
export default class CheckList extends HTMLElement{
    private _evidenceList: EvidenceList;
    private _speedList: SpeedList;
    private _huntList: HuntList;
    private _ghostList: GhostList;
    private _target: HTMLElement;

    /** Constructor
     */
    constructor(){
        super();

        this._target = _("div", {id:"display"});
        this._evidenceList = new EvidenceList();
        this._ghostList = new GhostList(this._target);
        this._speedList = new SpeedList();
        this._huntList = new HuntList();

        this._evidenceList.addEventListener("click", (event:Event)=>{
            if((<HTMLElement>event.target).id === "btnReset") {
                this.reset();
            } else {
                this.update();
            }
        })
    }

    /** Update Game Event
     * 
     */
    public update(){
        this._ghostList.reset();
        this._evidenceList.filter(this._ghostList);
        this._speedList.filter(this._ghostList);
        this._huntList.filter(this._ghostList);
        this._ghostList.update();
    }

    /** Reset Game Event
     * 
     */
    public reset(){
        this._evidenceList.reset();
        this._huntList.reset();
        this._speedList.reset();
        this._ghostList.reset();
    }

    /**Evidence Count Setter Passthrough
     * 
     * @param {number} value
     */
    set evidenceCount(value: number){
        this._evidenceList.evidenceCount = value;
    }

    connectedCallback(){
        this.appendChild(_("section", {id: "evidence-section"}, 
            this._evidenceList,
            this._speedList,
            this._huntList
        ));
        this.appendChild(_("section", {id: "ghost-section"},
            this._ghostList
        ));
        this.appendChild(_("section", {id: "display-section"},
            this._target
        ));  
    }

    disconectedCallback(){
        this.innerHTML = "";
    }
}

customElements.define("check-list", CheckList)