/** Ghost.ts
 * 
 * @author Alex Malotky
 */
import * as Icons from "./UnicodeIcons";
import {verifyIfEvidence} from "./Evidence"
import Database, {GhostData} from "./Database";

/** Create All Ghost Objects
 * 
 * Creates a list of all Ghost objects
 * 
 * @param {Element} target 
 * @param {Element} display 
 * @returns {Array<Ghost>}
 */
export async function createAllGhosts(target: Element, display: Element): Promise<Array<Ghost>>{
    const database = new Database();
    const results = await database.getGhosts();
    
    return results.map((data: GhostData)=>new Ghost(target, display, data));
}

/** Ghost Class
 * 
 */
export default class Ghost{
    //Info Elements
    private _name: Element;
    private _info: Element;
    private _evidence: Element;
    private _btnRemove: Element;

    //Ghost Info
    private _disproven: boolean;
    private _required: string;

    //List Elements
    private _element: HTMLElement;
    private _styleElement: HTMLElement;
    
    constructor(target: Element, display: Element, data: GhostData){
        this._disproven = false;
        
        //Name Information
        this._name = document.createElement("h2");
        this._name.className = "name";
        this._name.textContent = data.name;

        //Main Evidence Information
        this._evidence = document.createElement("ol");
        data.evidence.forEach((s:string)=>{
            if( !verifyIfEvidence(s) )
                console.warn(`Unknown Evidence type '${s}' on ghost '${data.name}'!`);

            let item = document.createElement("li");
            item.textContent = s;
            this._evidence.appendChild(item);
        });

        //Alternative Evidence Information
        this._info = document.createElement("div");
        this._info.className = "info";

        //Warning Information
        if(data.warning){
            this._info.innerHTML += "<p class='warn'>" + data.warning + "</p>";
        }

        //Main Information
        const list = document.createElement("ul");
        this._info.appendChild(list);
        if(data.info){
            data.info.forEach((item:string)=>{
                const li = document.createElement("li");
                li.innerHTML = item;
                list.appendChild(li);
            })
        } else {
            console.warn(`No info on ghost '${data.name}'.`);
        }
        
        //Required Evidence Information
        if(data.required){
            if( !verifyIfEvidence(data.required))
                console.warn(`Unknown REQUIRED Evidence type '${data.required}' on ghost '${data.name}'!`);

            this._required = data.required;
            list.innerHTML += `<li>Will always have ${data.required} as an evidence.</li>`
        } else {
            this._required = "";
        }

        //Additional Information Link
        if(data.link){
            this._info.innerHTML += `<p><a target='_blank' href='${data.link}'>More Info</a></p>`;
        }

        //Remove Button List Element
        this._btnRemove = document.createElement("button");
        this._btnRemove.textContent = Icons.EX;
        this._btnRemove.addEventListener("click", event=>{
            event.stopPropagation()
            this.flip()
        });

        //Name List Element
        this._styleElement = document.createElement("span");
        this._styleElement.textContent = data.name;

        //List Element
        this._element = document.createElement("li");
        this._element.className = "ghost";
        this._element.appendChild(this._styleElement);
        this._element.appendChild(this._btnRemove);
        this._element.addEventListener("click", event=>this.display(display));

        target.appendChild(this._element);
    }

    /** Has Evidence
     * 
     * @param {string} evidence 
     * @returns {boolean}
     */
    public has(evidence: string): boolean{
        const list = this._evidence.children;
        for(let i=0; i<list.length; i++){
            if(list[i].textContent === evidence)
                return true;
        }

        return false;
    }

    /** Cross Off Ghost from List
     * 
     */
    public crossOff(){
        this.style.textDecoration = "line-through";
        this._btnRemove.textContent = Icons.RESET;
        let order = this.order
        this._disproven = true;
        this.order = order;
    }

    /** Un Cross Off Ghost from List
     * 
     */
    public unCrossOff(){
        this._btnRemove.textContent = Icons.EX;
        this.style.textDecoration = "";
        let order = this.order
        this._disproven = false;
        this.order = order;
    }

    /** Hide Ghost from List
     * 
     */
    public hide(){
        this._element.classList.add("no");
    }

    /** Show Ghost on List
     * 
     */
    public show(){
        this._element.classList.remove("no");
    }

    /** Reset Ghost on List
     * 
     */
    public reset(){
        this.unCrossOff();
        this.show();
        this.order = 0;
    }

    /** Flip Ghost on list
     * 
     */
    public flip(){
        if(this._disproven){
            this.unCrossOff();
        } else {
            this.crossOff();
        }
    }

    /** Ghost is Corssed Off
     * 
     * @returns {boolean}
     */
    public isCorssedOff(): boolean{
        return this._disproven;
    }

    /** Ghost List Item Style Element
     * 
     */
    get style(){
        return this._styleElement.style;
    }

    /** Required Evidence Getter
     * 
     */
    get required(){
        return this._required;
    }

    /** Ghost Name Getter
     * 
     */
    get name(){
        return this._name.textContent;
    }

    /** Ghost List Item Order Getter
     * 
     */
    get order(){
        return Number(this._element.style.order) - (Number(this._disproven) * 10);
    }

    /** Ghost List Item Order Setter
     * 
     */
    set order(value: number){
        this._element.style.order = (value + (Number(this._disproven) * 10)).toString();
    }

    /** Display Ghost Information
     * 
     * @param {Element} target 
     */
    display(target: Element){
        target.innerHTML = "";
        target.append(this._name);
        target.append(this._evidence);
        target.append(this._info);
    }
}