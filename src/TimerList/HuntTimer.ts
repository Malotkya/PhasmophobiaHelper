import {MINUTE} from "./data";
import Timer from "./Timer";
import { persistAttributes } from "../Util/Memory";
import { createElement as _ } from "../Util/Element";

//Durations of Hunts in Milliseconds
// Gotten from: https://phasmophobia.fandom.com/wiki/Hunt#Start_of_a_hunt
const HUNT_DURATION: Array<Array<number>> = [
    //Low
    [ 15000, 30000, 40000 ],

    //Medium
    [ 20000, 40000, 50000 ],

    //High
    [ 30000, 50000, 60000 ]
];

//Hunt Intensity Select Options
export const INTENSITY_OPTIONS = [
    "Amature / Low",
    "Intermediate / Medium",
    "Profesional+ / High"
]

//Map Size Select Options
export const SIZE_OPTIONS = [
    "Small",
    "Medium",
    "Large"
]

//Cursed Modifier in Milliseconds
const CURSED: number = 20000;

/** Hunt Timer Class
 * 
 */
export default class HuntTimer extends Timer {
    //HTML Input Elements
    private _intencity: number;
    private _size: number;

    private _chbCursed: HTMLInputElement;

    /** Constructor
     * 
     */
    constructor(){
        super("Hunt Duration", [
            {
                time: HUNT_DURATION[0][0],
                info: "Hide!"
            },
            {
                time: HUNT_DURATION[0][0] + MINUTE,
                info: "Safe!"
            }
        ]);

        //Default Values
        this._intencity = 0;
        this._size = 0;

        //Cursed Checkbox
        this._chbCursed = <HTMLInputElement>_("input", {type:"checkbox", id:"chbCursed"});
        this._chbCursed.addEventListener("change", ()=>this.updateValue());
        persistAttributes(this._chbCursed, {checked: "false"});
        
        this.setAttribute("id", "huntTimer");
    }

    set intencity(value:number){
        if(isNaN(value) || value < 0){
            this._intencity = 0;
        } else if(value >= INTENSITY_OPTIONS.length){
            this._intencity = INTENSITY_OPTIONS.length-1;
        } else {
            this._intencity = value;
        }
        this.updateValue();
    }

    get intencity():number{
        return this._intencity;
    }

    set size(value:number){
        if(isNaN(value) || value < 0){
            this._size = 0;
        } else if(value >= INTENSITY_OPTIONS.length){
            this._size = SIZE_OPTIONS.length-1;
        } else {
            this._size = value;
        }
        this.updateValue();
    }

    get size():number{
        return this._size;
    }

    /** Update Timer Value
     * 
     */
    private updateValue(){
        //Get If Cursed Hunt
        let cursed: number = Number(this._chbCursed.checked);

        //Calculate Value
        const value = HUNT_DURATION[this._intencity][this._size] + (CURSED * cursed);

        //Update Timer
        this._steps[0].time = value;
        this._steps[1].time = value + MINUTE;
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.insertBefore(
            _("div", {class: "input"},
                _("label", {for: "chbCursed"},
                    this._chbCursed,
                    " Cursed"
                )
            )
        , this._button);
    }
}

customElements.define("hunt-timer-item", HuntTimer)