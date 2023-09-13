/** Ghost.ts
 * 
 * @author Alex Malotky
 */
import * as Icons from "../Util/UnicodeIcons";
import {verifyIfEvidence} from "./Evidence"
import {getGhosts, GhostData} from "../Util/Database";
import { AVERAGE_SPEED, NORMAL_HUNT } from "./Alternative";
import {createSoundButton} from "../Util/Sound";

/** Create All Ghost Objects
 * 
 * Creates a list of all Ghost objects
 * 
 * @param {Element} target 
 * @param {Element} display 
 * @returns {Array<Ghost>}
 */
export async function createAllGhosts(target: HTMLElement, display: HTMLElement): Promise<Array<Ghost>>{
    const list = (await getGhosts()).map((data: GhostData)=>new Ghost(display, data));
    for(let ghost of list){
        target.appendChild(ghost.element);
    }
    return list;
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
    private _hunt: number|Array<number>;
    private _speed: number|Array<number>;

    //List Elements
    private _element: HTMLElement;
    private _styleElement: HTMLElement;

    private _target: HTMLElement;
    
    constructor(target: HTMLElement, data: GhostData){
        this._disproven = false;
        this._target = target;
        
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

        //Alternative Ghost Information
        this._hunt = data.hunt;
        this._speed = data.speed;

        if(data.speed){
            const li = document.createElement("li");
            if(typeof data.speed === "number") {
                li.innerHTML += "Moves at " + createSoundButton(data.speed);
            } else {
                switch (data.speed.length){
                    case 0:
                        console.warn(`Empty speed array on ghost: '${data.name}'!`);
                        break;
                    
                    case 1:
                        li.innerHTML += "Moves at " + createSoundButton(data.speed[0]);
                        break;
                    
                    case 2:
                        li.innerHTML += "Moves at " + createSoundButton(data.speed[0])
                            + " and " + createSoundButton(data.speed[1]);
                        break;

                    default:
                        li.innerHTML += "Moves between " + createSoundButton(data.speed[0])
                            + " and " + createSoundButton(data.speed[data.speed.length-1]); 
                }
            }
            list.appendChild(li);
        }
        
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
        this._element.addEventListener("click", event=>this.display());
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
    public crossOff(): void{
        this.style.textDecoration = "line-through";
        this._btnRemove.textContent = Icons.RESET;
        let order = this.order
        this._disproven = true;
        this.order = order;
    }

    /** Un Cross Off Ghost from List
     * 
     */
    public unCrossOff(): void{
        this._btnRemove.textContent = Icons.EX;
        this.style.textDecoration = "";
        let order = this.order
        this._disproven = false;
        this.order = order;
    }

    /** Hide Ghost from List
     * 
     */
    public hide(): void{
        this._element.classList.add("no");
    }

    /** Show Ghost on List
     * 
     */
    public show(): void{
        this._element.classList.remove("no");
    }

    /** Reset Ghost on List
     * 
     */
    public reset(): void{
        this.unCrossOff();
        this.show();
        this.order = 0;
    }

    /** Flip Ghost on list
     * 
     */
    private flip(): void{
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

    /** Is Ghost Fast
     * 
     * @returns {boolean}
     */
    public isFastSpeed(): boolean {
        if(this._speed){
            if(typeof this._speed === "number"){
                return this._speed > AVERAGE_SPEED;
            } else {
                for(let s of this._speed){
                    if(s > AVERAGE_SPEED)
                        return true;
                }

                return false;
            }
        }

        return true;
    }

    /** Is Ghost Slow
     * 
     * @returns {boolean}
     */
    public isSlowSpeed(): boolean {
        if(this._speed){
            if(typeof this._speed === "number"){
                return this._speed < AVERAGE_SPEED;
            } else {
                for(let s of this._speed){
                    if(s < AVERAGE_SPEED)
                        return true;
                }

                return false;
            }
        }

        return true;
    }

    /** Is Ghost Average
     * 
     * @returns {boolean}
     */
    public isAverageSpeed(): boolean {
        if(this._speed){
            if(typeof this._speed === "number"){
                return this._speed == AVERAGE_SPEED;
            } else {
                for(let s of this._speed){
                    if(s == AVERAGE_SPEED)
                        return true;
                }

                return false;
            }
        }

        return true;
    }

    /** Does Ghost Hunt Early
     * 
     * @returns {boolean}
     */
    public isEarlyHunter(): boolean {
        if(this._hunt){
            if(typeof this._hunt === "number"){
                return this._hunt > NORMAL_HUNT;
            } else {
                for(let h of this._hunt){
                    if(h > NORMAL_HUNT)
                        return true;
                }

                return false;
            }
        }

        return true;
    }

    /** Does Ghost Hunt Late
     * 
     * @returns {boolean}
     */
    public isLateHunter(): boolean {
        if(this._hunt){
            if(typeof this._hunt === "number"){
                return this._hunt < NORMAL_HUNT;
            } else {
                for(let h of this._hunt){
                    if(h < NORMAL_HUNT)
                        return true;
                }

                return false;
            }
        }

        return true;
    }

    /** Does Ghost Hunt Normal
     * 
     * @returns {boolean}
     */
    public isNormalHunter(): boolean {
        if(this._hunt){
            if(typeof this._hunt === "number"){
                return this._hunt == NORMAL_HUNT;
            } else {
                for(let h of this._hunt){
                    if(h == NORMAL_HUNT)
                        return true;
                }

                return false;
            }
        }

        return true;
    }

    /** Ghost List Item Style Element
     * 
     */
    private get style(): CSSStyleDeclaration{
        return this._styleElement.style;
    }

    /** Required Evidence Getter
     * 
     */
    public get required(): string{
        return this._required;
    }

    /** Ghost Name Getter
     * 
     */
    public get name(): string{
        return this._name.textContent;
    }

    /** Ghost List Item Order Getter
     * 
     */
    public get order(){
        let hidden: Boolean = this._element.classList.contains("no");
        return Number(this._element.style.order) + (Number(this._disproven || hidden) * 10);
    }

    /** Ghost List Item Order Setter
     * 
     */
    public set order(value: number){
        this._element.style.order = (value + (Number(this._disproven) * 10)).toString();
    }

    public get element(): HTMLElement{
        return this._element;
    }

    /** Display Ghost Information
     * 
     * @param {Element} target 
     */
    public display(): void{
        this._target.innerHTML = "";
        this._target.append(this._name);
        this._target.append(this._evidence);
        this._target.append(this._info);
    }
}