/** Evidence.ts
 * 
 * @author Alex Malotky
 */
import * as Icons from "../../Util/UnicodeIcons";
import {allEvidence} from "./data";
import { createElement as _ } from "../../Util/Element";
/** Create All Evidence Objects
 * 
 * Creates a list with all Evidence Objects.
 * 
 * @param {Element}target 
 * @returns {Array<Evidence>}
 */
export function createAllEvidence(target: Element): Array<Evidence>{
    const list: Array<Evidence> = [];

    for(let data of allEvidence){
        const evidence = new Evidence(data);
        list.push(evidence);
        target.appendChild(evidence);
    }
    
    return list;
}

/** Evidence Class
 * 
 */
export default class Evidence extends HTMLLIElement{
    private _name: Element;
    private _btnInclude: HTMLElement;
    private _btnExclude: HTMLElement;
    private _btnReset: HTMLElement;

    constructor(name: string){
        super();
        this.className = "evidence";

        this._name       = _("span", {class:"name"}, name);
        this._btnInclude = _("button", {class:"include"}, Icons.CHECK_MARK);
        this._btnExclude = _("button", {class: "exclude"}, Icons.EX);
        this._btnReset   = _("button", {class: "reset", style: "display: none"}, Icons.RESET);

        this.reset();
    }

    connectedCallback(){
        this.appendChild(this._name);
        this.appendChild(this._btnInclude);
        this.appendChild(this._btnExclude);
        this.appendChild(this._btnReset);
    }

    disconnectedCallback() {
        this.innerHTML = "";
    }

    /** Evidence Found
     * 
     */
    public found(): void{
        this.classList.add("yes");
        this.classList.remove("no");
        this._btnReset.style.display = "";
        this._btnExclude.style.display = "";
        this._btnInclude.style.display = "none";
    }

    /** Evidence Not Found
     * 
     */
    public notFound(): void{
        this.classList.add("no");
        this.classList.remove("yes");
        this._btnReset.style.display = "";
        this._btnExclude.style.display = "none";
        this._btnInclude.style.display = "";
    }

    /** Reset Evidence
     * 
     */
    public reset(): void{
        this.classList.remove("yes");
        this.classList.remove("no");
        this._btnReset.style.display = "none";
        this._btnExclude.style.display = "";
        this._btnInclude.style.display = "";
    }

    /** Name Getter
     * 
     */
    public get name(): string{
        return this._name.textContent;
    }

    /** Include Event
     * 
     * Called if the event is found.
     * 
     * @param {Function} callback 
     */
    public includeEvent(callback:(e:MouseEvent)=>void): void{
        this._name.addEventListener("click", callback);
        this._btnInclude.addEventListener("click", callback);
    }

    /** Exclude Event
     * 
     * Called if the event is not found
     * 
     * @param {Function} callback 
     */
    public excludeEvent(callback:(e:MouseEvent)=>void): void{
        this._btnExclude.addEventListener("click", callback);
    }

    /** Reset Event
     * 
     * Called if the game is reset.
     * 
     * @param {Function} callback  
     */
    public resetEvent(callback:(e:MouseEvent)=>void): void{
        this._btnReset.addEventListener("click", callback);
    }
}

customElements.define("evidence-item", Evidence, {extends: "li"});