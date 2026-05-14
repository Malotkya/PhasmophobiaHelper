
/** AlternativeList.ts
 * 
 * Alternative Evidence
 * 
 * @author Alex Malotky
 * 
 */
import Ghost from "../Ghost";
import GhostList from "../Ghost/List";
import { AlternativeEvidence } from "@Data/Evidence";
import Alternative from ".";
import { createElement as _ } from "../../Util/Element";
import { JsonSettingsEditor, HuntDataEditor, SpeedDataEditor } from "../../Settings/Data";

/** Alternative Check List
 * 
 */
export default class AlternativeList extends HTMLElement{
    private _data: Array<Alternative>;
    private _title:string;

    private _induction: Set<Alternative>;
    private _deduction: Set<Alternative>;

    /** Constructor
     * 
     * @param {string} title 
     * @param {sonSettingsEditor<AlternativeEvidence>} input
     */
    constructor(title:string, input: JsonSettingsEditor<AlternativeEvidence>){
        super();
        this.className = "sub-section";
        this._induction = new Set();
        this._deduction = new Set();

        this._title = title;
        this._data = [];

        input.updateEvent((data)=>{
            for(const name in data){
                const value = data[name];
                const alternative = new Alternative(name, value);
                this._data.push(alternative);

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
            }
        })
    }

    /** Reset Event
     * 
     */
    public reset(): void {
        this._induction.clear();
        this._deduction.clear();
        this._data.forEach(e=>e.reset())
    }

    private check(ghost:Ghost):Boolean{
        if(ghost.hidden)
            return false;
        
        for(let alternative of this._induction){
            if(!ghost.checkAlternative(alternative.value))
                return false;
        }

        for(let alternative of this._deduction){
            if(ghost.checkAlternative(alternative.value))
                return false
        }

        return true;
    }

    /** Update Event
     * 
     * Filters ghost from list based on inputs/states
     * 
     * @param {GhostList} list 
     */
    public filter(list: GhostList): void{
        for(const ghost of list){
            if(!this.check(ghost)) {
                ghost.hide()
            }
        }
    }

    connectedCallback() {
        this.appendChild(_("h2", this._title));
        this.appendChild(_("ul", {class:"evidence-list"}, this._data));
    }

    disconnectedCallback() {
        this.innerHTML = "";
    }
    
}

customElements.define("alternative-list", AlternativeList);

export class SpeedList extends AlternativeList {
    constructor(){
        super("Speed:", SpeedDataEditor);
    }
}

export class HuntList extends AlternativeList {
    constructor(){
        super("Hunts:", HuntDataEditor);
    }
}

customElements.define("speed-list", SpeedList);
customElements.define("hunt-list", HuntList);