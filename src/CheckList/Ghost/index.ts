/** Ghost.ts
 * 
 * @author Alex Malotky
 */
import * as Icons from "../../Util/UnicodeIcons";
import {GhostData} from "./data";
import { SPEED_TYPES, HUNT_TYPES } from "../Alternative";
import {createSoundButton} from "../../Util/Sound";
import { createElement as _ } from "../../Util/Element";

/** Ghost Class
 * 
 */
export default class Ghost extends HTMLLIElement{
    // Elements
    private _name: HTMLElement;
    private _info: Element;
    private _evidence: Element;
    

    //Ghost Info
    private _disproven: boolean;
    private _required: string;
    private _hunt: number|Array<number>;
    private _speed: number|Array<number>;

    //List Elements
    private _styleElement: HTMLElement;
    private _btnRemove: Element;

    //private _target: HTMLElement;
    
    constructor(data: GhostData){
        super();
        this._disproven = false;
        
        //Name Information
        this._name = _("h2", {class: "name"}, data.name);

        //Main Evidence Information
        this._evidence = _("ol",
            data.evidence.map((s:string)=>_("li", s))
        )

        //Alternative Evidence Information
        this._info = _("div", {class:"info"},

            //Warning Information
            data.warning? "<p class='warn'>"+data.warning+"</p>": null,

            _("ul",
                //Speed Information
                data.speed? createSoundButton(data.speed): null,

                //Main Information
                data.info? data.info.map(s=>_("li", s)): null,

                //Required Information
                data.required? _("li", data.required): null,
            ),

            //Additional Info Link
            data.link? _("p", _("a", {target:'_blank',  href:data.link}, "More Info")): null
        );

        //Alternative Ghost Information
        this._hunt = data.hunt;
        this._speed = data.speed;
        
        //Required Evidence Information
        this._required = data.required || "";


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
        this.appendChild(this._styleElement);
        this.appendChild(this._btnRemove);
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
        this.classList.add("no");
    }

    /** Show Ghost on List
     * 
     */
    public show(): void{
        this.classList.remove("no");
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
        if(this._speed){
            if(typeof this._speed === "number"){
                return this._speed > SPEED_TYPES.Average;
            } else {
                for(let s of this._speed){
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
        if(this._speed){
            if(typeof this._speed === "number"){
                return this._speed < SPEED_TYPES.Average;
            } else {
                for(let s of this._speed){
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
        if(this._speed){
            if(typeof this._speed === "number"){
                return this._speed == SPEED_TYPES.Average;
            } else {
                for(let s of this._speed){
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
        if(this._hunt){
            if(typeof this._hunt === "number"){
                return this._hunt > HUNT_TYPES.Normal;
            } else {
                for(let h of this._hunt){
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
        if(this._hunt){
            if(typeof this._hunt === "number"){
                return this._hunt < HUNT_TYPES.Normal;
            } else {
                for(let h of this._hunt){
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
        if(this._hunt){
            if(typeof this._hunt === "number"){
                return this._hunt == HUNT_TYPES.Normal;
            } else {
                for(let h of this._hunt){
                    if(h == HUNT_TYPES.Normal)
                        return true;
                }

                return false;
            }
        }

        return true;
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
        let hidden: Boolean = this.classList.contains("no");
        return Number(this.style.order) + (Number(this._disproven || hidden) * 10);
    }

    /** Ghost List Item Order Setter
     * 
     */
    public set order(value: number){
        this.style.order = (value + (Number(this._disproven) * 10)).toString();
    }

    /** Display Ghost Information
     * 
     */
    public display(target:HTMLElement): void{
        target.innerHTML = "";
        target.appendChild(this._name);
        target.appendChild(this._evidence);
        target.appendChild(this._info);
    }
}

customElements.define("ghost-item", Ghost, {extends: "li"})