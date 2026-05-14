/** Ghost.ts
 * 
 * @author Alex Malotky
 */
import * as Icons from "../../Util/UnicodeIcons";
import { GhostData } from "@Data/Ghosts";
import { AudioInitData } from "../../Util/Sound/Audio";
import { EVIDENCE_OVERRIDE, SPEED_TYPES, HUNT_TYPES } from "@Data/Evidence";
import { createElement as _ } from "../../Util/Element";

/** Ghost Class
 * 
 */
export default class Ghost extends HTMLElement{
    // Elements
    readonly name: string;
    readonly evidence: string[];
    readonly required: string|undefined;

    readonly speed: number|number[]|undefined;
    readonly hunt: number|number[]|undefined;
    readonly warning:string|undefined;
    readonly info:(string|(AudioInitData&{content?:string}))[];
    readonly link: string|undefined;

    

    //Ghost Info
    private _disproven: boolean;

    //List Elements
    private _styleElement: HTMLElement;
    private _btnRemove: Element;

    //private _target: HTMLElement;
    
    constructor(data: GhostData){
        super();
        this._disproven = false;
        this.role = "listitem";
        
        //Name Information
        this.name = data.name;
        this.evidence = data.evidence;
        this.warning = data.warning;
        this.speed = data.speed;
        this.hunt = data.hunt;
        this.required = data.required;
        this.link = data.link;
        this.info = data.info;

        //Remove Button List Element
        this._btnRemove = _("button", Icons.EX);
        this._btnRemove.addEventListener("click", event=>{
            event.stopPropagation()
            this.flip()
        });

        //Name List Element
        this._styleElement = _("span", data.name);

        //List Element
        this.className = "ghost";
        
    }

    connectedCallback() {
        this.appendChild(this._styleElement);
        this.appendChild(this._btnRemove);
    }

    disconnectedCallback() {
        this.innerHTML = "";
    }

    /** Cross Off Ghost from List
     * 
     */
    public crossOff(): void{
        this._styleElement.style.textDecoration = "line-through";
        this._btnRemove.textContent = Icons.RESET;
        this.style.order = String(Number(this.style.order) + 10);
        this._disproven = true;
    }

    /** Un Cross Off Ghost from List
     * 
     */
    public unCrossOff(): void{
        this._btnRemove.textContent = Icons.EX;
        this._styleElement.style.textDecoration = "";
        this.style.order = String(Number(this.style.order) - 10);
        this._disproven = false;
    }

    /** Hide Ghost from List
     * 
     */
    public hide(): void{
        this._disproven = true;
        this.style.display = "none";
        this.hidden = true;
    }

    /** Show Ghost on List
     * 
     */
    public show(): void{
        this._disproven = false;
        this.style.display = "";
        this.hidden = false;
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

    /** Check the speed of the ghost.
     * 
     * @param {number} value 
     * @returns {boolean}
     */
    public checkAlternative(value: number): boolean {

        switch (value){
            case SPEED_TYPES.Fast:
                return this.isFastSpeed();

            case SPEED_TYPES.Average:
                return this.isAverageSpeed();

            case SPEED_TYPES.Slow:
                return this.isSlowSpeed();

            case HUNT_TYPES.Early:
                return this.isEarlyHunter();

            case HUNT_TYPES.Normal:
                return this.isNormalHunter();

            case HUNT_TYPES.Late:
                return this.isLateHunter();

            default:
                console.warn("Unknown Alternative Value: " + value);
        }

        return false;
    }

    /** Is Ghost Fast
     * 
     * @returns {boolean}
     */
    private isFastSpeed(): boolean {
        if(this.speed){
            if(typeof this.speed === "number"){
                return this.speed > SPEED_TYPES.Average;
            } else {
                for(let s of this.speed){
                    if(s > SPEED_TYPES.Average)
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
    private isSlowSpeed(): boolean {
        if(this.speed){
            if(typeof this.speed === "number"){
                return this.speed < SPEED_TYPES.Average;
            } else {
                for(let s of this.speed){
                    if(s < SPEED_TYPES.Average)
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
    private isAverageSpeed(): boolean {
        if(this.speed){
            if(typeof this.speed === "number"){
                return this.speed == SPEED_TYPES.Average;
            } else {
                for(let s of this.speed){
                    if(s == SPEED_TYPES.Average)
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
    private isEarlyHunter(): boolean {
        if(this.hunt){
            if(typeof this.hunt === "number"){
                return this.hunt > HUNT_TYPES.Normal;
            } else {
                for(let h of this.hunt){
                    if(h > HUNT_TYPES.Normal)
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
    private isLateHunter(): boolean {
        if(this.hunt){
            if(typeof this.hunt === "number"){
                return this.hunt < HUNT_TYPES.Normal;
            } else {
                for(let h of this.hunt){
                    if(h < HUNT_TYPES.Normal)
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
    private isNormalHunter(): boolean {
        if(this.hunt){
            if(typeof this.hunt === "number"){
                return this.hunt == HUNT_TYPES.Normal;
            } else {
                for(let h of this.hunt){
                    if(h == HUNT_TYPES.Normal)
                        return true;
                }

                return false;
            }
        }

        return true;
    }

    /** Ghost List Item Order Getter
     * 
     */
    public get order(){
        return Number(this.style.order) + (Number(this._disproven) * 10);
    }

    /** Ghost List Item Order Setter
     * 
     */
    public set order(value: number){
        if(value > EVIDENCE_OVERRIDE)
            value -= EVIDENCE_OVERRIDE
        this.style.order = String(value);
    }
}

customElements.define("ghost-item", Ghost)