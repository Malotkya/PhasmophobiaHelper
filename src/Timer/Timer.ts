/** Timer.ts
 * 
 * @author Alex Malotky
 */
import {Task, addTask, removeTask, formatTime, formatSeconds} from "./Clock";

//Minute in Miliseconds
export const MINUTE: number = 60000;

/**Step Interface 
 * 
 * Used in Timer Class
 */
interface step {
    time: number,
    info: string
}

/**Timer Data
 * 
 */
interface TimerData {
    name: string,
    list?: Array<step>
}

/** Create All Timers
 * 
 * @param {HTMLElement} target 
 * @returns {Array<Timer>}
 */
export function createAllTimers(target: HTMLElement): Array<Timer>{
    return TIMER_TYPES.map(v=>new Timer(v, target));
            
}

//Types of Timers Used
export const TIMER_TYPES: Array<TimerData> = [
    {
        "name": "Smudge",
        "list": [
            {
                time: 60000,
                info: "Safe from Hunts"
            }, 
            {
                time: 90000,
                info: "Demons can Hunt"
            },
            {
                time: 180000,
                info: "Spirits can't Hunt"
            },
            {
                time: 180000 + MINUTE,
                info: "Everything can Hunt"
            }
        ]
    },
    {
        "name": "Hunt Cooldown",
        "list": [
            {
                time: 20000,
                info: "Ghosts can't hunt."
            },
            {
                time: 25000,
                info: "Demons can start hunting again."
            },
            {
                time: 25000 + MINUTE,
                info: "Everything can hunt again."
            }
        ]
    }
];

/** Timer Class
 * 
 */
export default class Timer implements Task{
    //HTML Elements
    protected _titleElement: HTMLElement;
    protected _valueElement: HTMLElement;
    protected _infoElement: HTMLElement
    protected _button: HTMLElement;
    protected _element: HTMLElement;

    //Instance Variables
    private _name: string;
    protected _start: number;
    protected _steps: Array<step>
    protected _index: number;

    /** Constructor
     * 
     * @param {TimerData} data 
     * @param {HTMLElement} target 
     */
    constructor(data: TimerData, target: HTMLElement){
        //Create Elements
        this._titleElement = document.createElement("h2");
        this._titleElement.textContent = data.name;
        this._titleElement.className = "title";
        this._valueElement = document.createElement("span");
        this._valueElement.className = "time";
        this._infoElement  = document.createElement("p");
        this._infoElement.className = "info";

        //Control button
        this._button = document.createElement("button");
        this._button.textContent = "Start";
        this._button.addEventListener("click", event=>{
            event.stopPropagation();
            if(this.isRunning()) {
                this.stop();
            } else {
                this.start();
            }
        });
        
        //Display Row
        this._element = document.createElement("li");
        this._element.appendChild(this._titleElement);
        this._element.appendChild(this._button);
        this._element.appendChild(this._valueElement);
        this._element.appendChild(this._infoElement);

        //Initalize instance info.
        this._name = data.name;
        this.startTime = 0;
        this._steps = data.list;
        this._index = this._steps.length;

        //Update Display Elements
        this.updateElements();

        target.appendChild(this._element);
    }

    /** Start Timer
     * 
     */
    public start(): void {
        this.startTime = Date.now();
        this._index = 0;
        this._button.textContent = "Stop";
        addTask(this);
    }

    public stop(): void{
        this._button.textContent = "Start";
        removeTask(this);
    }

    /** Update Timer
     * 
     * Returns true if timer is done.
     * 
     * @param {number} now - millisecons
     * @returns {boolean}
     */
    public update(now: number): void{
        if(this._index >= this._steps.length) {
            this.stop();
        }

        let current = this._steps[this._index].time;
        let delta = now - this._start;
        while(delta > current){
            if(++this._index >= this._steps.length){
                this.updateElements();
                this.stop();
                return;
            } else if(this._index === this._steps.length-1){
                this._button.textContent = "Start";
            }

            current = this._steps[this._index].time;
            delta = now - this._start;
        }

        this.updateElements(current - delta);
    }

    /** Update Elements
     * 
     * Defaults to "----" if no value is entered.
     * 
     * @param {number} value 
     */
    private updateElements(value?:number): void {
        this.value = value / 1000;
        //Update timer info
        if(this._index >= this._steps.length){
            this._infoElement.textContent = "";
        } else {
            this._infoElement.textContent = this._steps[this._index].info;
        }
    }

    public isRunning(){
        return this._button.textContent === "Stop";
    }

    //Get the id of the timer
    get id():string{
        return this._name;
    }

    set value(value: number){
        if(isNaN(value) || this._index === this._steps.length-1){
            this._valueElement.textContent = "----"
        } else {
            this._valueElement.textContent = formatSeconds(value)
        }
    }

    set startTime(value: number){
        this._start = value;
    }
}