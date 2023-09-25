/** Evidence.ts
 * 
 * @author Alex Malotky
 */
import * as Icons from "../Util/UnicodeIcons";
import {getEvidence, EvidenceData} from "../Util/Database";
import { cache } from "../Util/Memory";

/** Create All Evidence Objects
 * 
 * Creates a list with all Evidence Objects.
 * 
 * @param {Element}target 
 * @returns {Array<Evidence>}
 */
export async function createAllEvidence(target: Element): Promise<Array<Evidence>>{
    const list: Array<Evidence> = (await cache("Evidence", getEvidence)).map((e:EvidenceData)=>new Evidence(e.name));
    for(let evidence of list){
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

        //Name Element
        this._name = document.createElement("span");
        this._name.textContent = name;
        this._name.className = "name";

        //Include Button
        this._btnInclude = document.createElement("button");
        this._btnInclude.textContent = Icons.CHECK_MARK;
        this._btnInclude.className = "include";

        //Exclude Button
        this._btnExclude = document.createElement("button");
        this._btnExclude.textContent = Icons.EX;
        this._btnExclude.className = "exclude";

        //Reset Button
        this._btnReset = document.createElement("button");
        this._btnReset.textContent = Icons.RESET;
        this._btnReset.className = "reset";
        this._btnReset.style.display = "none";

        //List Item
        this.className = "evidence";
        this.appendChild(this._name);
        this.appendChild(this._btnInclude);
        this.appendChild(this._btnExclude);
        this.appendChild(this._btnReset);

        this.reset();
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