/** Phasmophobia.ts
 * 
 * Main Game File
 * 
 */
import EvidenceList from "./Evidence/List";
import { SpeedList, HuntList } from "./Alternative/List";
import GhostList from "./Ghost/List";
import { createElement as _ } from "../Util/Element";
import { generateSound } from "../Util/Sound";

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

        this._target = _("div", {id:"display", class: "sub-section"});
        this._evidenceList = new EvidenceList();
        this._ghostList = new GhostList(this._target);
        this._speedList = new SpeedList();
        this._huntList = new HuntList();

        this._target.addEventListener("click", (event:Event)=>{
            const target = event.target as HTMLElement;

            if(target.classList.contains("speed")){
                const value = Number(target.getAttribute("value"));
                if(isNaN(value)){
                    alert("Sound value was not a number!");
                } else {
                    generateSound(value);
                }
            }
        });
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
        this.update();
    }

    connectedCallback(){
        const evidence = _("section", {id: "evidence-section"}, 
            this._evidenceList,
            this._speedList,
            this._huntList
        );
        evidence.addEventListener("click", (event:Event)=>{
            if((<HTMLElement>event.target).id === "btnReset") {
                this.reset();
            } else {
                this.update();
            }
        })
        this.appendChild(evidence);
        this.appendChild(_("section", {id: "ghost-section"},
            this._ghostList
        ));
        this.appendChild(_("section", {id: "display-section"},
            this._target
        ));  
    }

    disconnectedCallback(){
        this.innerHTML = "";
    }
}

customElements.define("check-list", CheckList)