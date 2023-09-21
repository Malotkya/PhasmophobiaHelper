import Timer, {MINUTE} from "./Timer";
import Memory from "../Util/Memory";

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
     * @param {HTMLElement} target 
     */
    constructor(target: HTMLElement){
        super({
            name: "Hunt Duration",
            list: [
                {
                    time: HUNT_DURATION[0][0],
                    info: "Hide!"
                },
                {
                    time: HUNT_DURATION[0][0] + MINUTE,
                    info: "Safe!"
                }
            ]}
            , target);

        //Hunt Intensity Selector
        this._selIntensity = document.createElement("select");
        this._selIntensity.id = "selIntensity";
        for(let index in INTENSITY_OPTIONS){
            let option = document.createElement("option");
            option.textContent = INTENSITY_OPTIONS[index];
            option.value = index;
            this._selIntensity.appendChild(option);
        }
        this._selIntensity.addEventListener("change", event=>{
            event.stopPropagation();
            this.updateValue();
        });
        Memory(this._selIntensity, "0");
        
        const lblIntensity = document.createElement("label");
        lblIntensity.setAttribute("for", "selIntensity");
        lblIntensity.textContent = "Duration:\n";
        lblIntensity.appendChild(this._selIntensity);


        //Max Size Selector
        this._selSize = document.createElement("select");
        this._selSize.id = "selMapSize";
        for(let index in SIZE_OPTIONS){
            let option = document.createElement("option");
            option.textContent = SIZE_OPTIONS[index];
            option.value = index;
            this._selSize.appendChild(option);
        }
        this._selSize.addEventListener("change", event=>{
            event.stopPropagation();
            this.updateValue();
        });
        Memory(this._selSize, "0");

        const lblSize = document.createElement("label");
        lblSize.setAttribute("for", "selMapSize");
        lblSize.textContent = "Map Size:\n";
        lblSize.appendChild(this._selSize);

        //Cursed Checkbox
        this._chbCursed = document.createElement("input");
        this._chbCursed.type = "checkbox";
        this._chbCursed.id = "chbCursed";
        Memory(this._chbCursed, {name:"checked", value:String(false)});

        const lblCursed = document.createElement("label");
        lblCursed.setAttribute("for", "chbCursed");
        lblCursed.textContent += " Cursed";
        lblCursed.insertBefore(this._chbCursed, lblCursed.childNodes[0]);
        this._chbCursed.addEventListener("change", event=>{
            event.stopPropagation();
            this.updateValue();
        });

        const container = document.createElement("div");
        container.className = "input";

        container.appendChild(lblSize);
        container.appendChild(lblIntensity);
        container.appendChild(lblCursed);

        this._element.insertBefore(container, this._button);
        this._element.id = "huntTimer";
    }

    /** Update Timer Value
     * 
     */
    private updateValue(){
        //Get and Validate Hunt Intensity Value
        let intensity: number = Number(this._selIntensity? this._selIntensity.value: 0);
        if(isNaN(intensity) || intensity < 0){
            intensity = 0;
        } else if(intensity >= INTENSITY_OPTIONS.length){
            intensity = INTENSITY_OPTIONS.length-1;
        }

        //Get and Validate Map Size Value
        let size: number = Number(this._selSize? this._selSize.value: 0);
        if(isNaN(size) || size < 0){
            size = 0;
        } else if(size >= SIZE_OPTIONS.length){
            size = SIZE_OPTIONS.length-1;
        }

        //Get If Cursed Hunt
        let cursed: number = Number(this._chbCursed? this._chbCursed.checked: false);

        //Calculate Value
        const value = HUNT_DURATION[intensity][size] + (CURSED * cursed);

        //Update Timer
        this._steps[0].time = value;
        this._steps[1].time = value + MINUTE;
    }
}