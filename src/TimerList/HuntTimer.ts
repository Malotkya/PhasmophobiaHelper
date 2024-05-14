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
const INTENSITY_OPTIONS = [
    "Amature / Low",
    "Intermediate / Medium",
    "Profesional+ / High"
]

//Map Size Select Options
const SIZE_OPTIONS = [
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
    private _selIntensity: HTMLSelectElement;
    private _selSize: HTMLSelectElement;
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

        //Change Event Listener
        this.addEventListener("change", (event:Event)=>this.updateValue());

        //Hunt Intensity Selector
        this._selIntensity = <HTMLSelectElement>_("select", {id: "selIntensity"},
            INTENSITY_OPTIONS.map((value, index)=>_("option", {value:index}, value))
        );
        persistAttributes(this._selIntensity, {value:"0"});

        //Max Size Selector
        this._selSize = <HTMLSelectElement>_("select", {id:"selMapSize"},
            SIZE_OPTIONS.map((value, index)=>_("option", {value:index}, value))
        );
        persistAttributes(this._selSize, {value:"0"});

        //Cursed Checkbox
        this._chbCursed = <HTMLInputElement>_("input", {type:"checkbox", id:"chbCursed"});
        persistAttributes(this._chbCursed, {checked: "false"});
        
        this.setAttribute("id", "huntTimer");
    }

    /** Update Timer Value
     * 
     */
    private updateValue(){
        //Get and Validate Hunt Intensity Value
        let intensity: number = Number(this._selIntensity.value);
        if(isNaN(intensity) || intensity < 0){
            intensity = 0;
        } else if(intensity >= INTENSITY_OPTIONS.length){
            intensity = INTENSITY_OPTIONS.length-1;
        }

        //Get and Validate Map Size Value
        let size: number = Number(this._selSize.value);
        if(isNaN(size) || size < 0){
            size = 0;
        } else if(size >= SIZE_OPTIONS.length){
            size = SIZE_OPTIONS.length-1;
        }

        //Get If Cursed Hunt
        let cursed: number = Number(this._chbCursed.checked);

        //Calculate Value
        const value = HUNT_DURATION[intensity][size] + (CURSED * cursed);

        //Update Timer
        this._steps[0].time = value;
        this._steps[1].time = value + MINUTE;
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.insertBefore(
            _("div", {class: "input"},
                _("label", {for: "selMapSize"},
                    "Map Size:\n",
                    this._selSize
                ),
                _("label", {for:"selIntensity"}, 
                    "Duration:\n",
                    this._selIntensity
                ),
                _("label", {for: "chbCursed"},
                    this._chbCursed,
                    " Cursed"
                )
            )
        , this._button);
    }
}

customElements.define("hunt-timer-item", HuntTimer)