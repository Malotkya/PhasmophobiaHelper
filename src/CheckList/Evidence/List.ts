/** EvidenceList.ts
 * 
 * @author Alex Malotky
 */
import GhostList from "../Ghost/List";
import { allEvidence } from "./data";
import Evidence from ".";
import CustomSet from "../../Util/CustomSet";
import { createElement as _ } from "../../Util/Element";

const DEFAULT_EVIDENCE_COUNT = 3;
const EVIDENCE_SCORE_OVERFLOW = 5;

/** Evidence List
 * 
 */
export default class EvidenceList extends HTMLElement {
    private _data: Array<Evidence>
    private _input: HTMLElement;

    //custom sets holding evidence proven/disproven
    private _induction: CustomSet<Evidence>; 
    private _deduction: Set<Evidence>;

    //Number of evidence needed to rule out a ghost.
    private _evidenceThreashold: number;

    constructor(){
        super()
        this._evidenceThreashold = 1;
        this.className = "sub-section";
        this._induction = new CustomSet(DEFAULT_EVIDENCE_COUNT);
        this._deduction = new Set();

        this._data = allEvidence.map(data=>{
            const evidence = new Evidence(data);

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
            });

            return evidence;
        });

        const numEvidence = <HTMLInputElement>_("input", {
            id: "numEvidence",
            type: "number",
            max: 3,
            min: 0
        });

        this._input = _("div", {class:"input"}, 
            _("button", {id: "btnReset"}, "Reset")
        );
    }

    /** Update Ghost List Visibility & Order
     * 
     */
    public filter(list: GhostList): void {
        let index:number = 0;
        while(index<list.length){
            const ghost = list.at(index);

            //Count Evidence Not Found
            let dScore = 0;
            for(let e of this._deduction){
                if(ghost.has(e.name)){
                    dScore++;
                }
                if(ghost.required === e.name){
                    dScore+=EVIDENCE_SCORE_OVERFLOW;
                }
            };

            //Count Evidence Found
            let iScore = 0;
            if(this._evidenceThreashold === DEFAULT_EVIDENCE_COUNT + 1) {
                for(let e of this._induction) {
                    if(ghost.required !== e.name){
                        iScore += EVIDENCE_SCORE_OVERFLOW;
                    } else {
                        iScore -= EVIDENCE_SCORE_OVERFLOW;
                    }
                }
            } else {
                for( let e of this._induction){
                    if(ghost.has(e.name)) {
                        iScore--;
                    }else {
                        iScore+=EVIDENCE_SCORE_OVERFLOW;
                    }
                }
            }
            

            if(iScore>1 || dScore >= this._evidenceThreashold) {
                list.pull(index);
            } else {
                //Reorder Ghost
                ghost.order = iScore;
                index++;
            }
        }
    }

    /** Reset the Game
     * 
     */
    public reset(): void{
        this._induction.clear()
        this._deduction.clear();
        this._data.forEach(e=>e.reset());
    }

    /** Evidence Count Setter.
     * 
     */
    public set evidenceCount(value: number){
        if(isNaN(value)) {
            value = DEFAULT_EVIDENCE_COUNT;
            alert("Evidence count must be a number!");
        }else if(value < 0){
            value = 0;
            alert("There can't be less then 0 evidence!");
        } else if(value > DEFAULT_EVIDENCE_COUNT){
            value = DEFAULT_EVIDENCE_COUNT;
            alert(`There can't be more then ${DEFAULT_EVIDENCE_COUNT} evidence!`);
        }

        this._induction.setMaxSize(value).forEach(e=>e.reset());
        if(value === 0){
            for(let e of this._data){
                if(e.name !== "Ghost Orbs") {
                    e.style.display = "none";
                    e.reset();
                }
                    
            }
        } else {
            for(let e of this._data)
                e.style.display = "";
        }
            

        this._evidenceThreashold = (DEFAULT_EVIDENCE_COUNT + 1) - value;
    }

    /** Evidence Count Getter.
     * 
     */
    public get evidenceCount(): number{
        return (DEFAULT_EVIDENCE_COUNT + 1) - this._evidenceThreashold;
    }

    connectedCallback() {
        this.appendChild(_("h2", "Evidence:"));
        this.appendChild(this._input);
        this.appendChild(_("ul", {class:"evidence-list"}, this._data));
    }

    disconnectedCallback() {
        this.innerHTML = "";
    }
}

customElements.define("evidence-list", EvidenceList);