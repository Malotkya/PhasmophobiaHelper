/** Timer.ts
 * 
 * @author Alex Malotky
 */
import {Task, addTask, formatTime, formatSeconds} from "./Clock";

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
        "name": "Hunt Ends",
        "list": [
            {
                time: 20000,
                info: "Ghosts can hunt with a special ability or curse."
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
    protected _startElement: HTMLElement;
    protected _valueElement: HTMLElement;
    protected _infoElement: HTMLElement

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
        //Initalize instance info.
        this._name = data.name;
        this._start = 0;
        this._steps = data.list;
        this._index = this._steps.length;

        //Create Elements
        this._titleElement = document.createElement("td");
        this._startElement = document.createElement("td");
        this._valueElement = document.createElement("td");
        this._infoElement  = document.createElement("td");

        //Control buttons
        const button = document.createElement("button");
        button.textContent = data.name;
        button.addEventListener("click", event=>{
            event.stopPropagation();
            this.start();
        });

        this._titleElement.appendChild(button);

        //Update Display Elements
        this.updateElements();
        
        //Display Row
        const row = document.createElement("tr");
        row.appendChild(this._titleElement);
        row.appendChild(this._startElement);
        row.appendChild(this._valueElement);
        row.appendChild(this._infoElement);

        target.appendChild(row);
    }

    /** Start Timer
     * 
     */
    public start(): void {
        this._start = Date.now();
        this._startElement.textContent = formatTime(this._start);
        this._index = 0;
        addTask(this);
    }

    /** Update Timer
     * 
     * Returns true if timer is done.
     * 
     * @param {number} now - millisecons
     * @returns {boolean}
     */
    public update(now: number): boolean{
        if(this._index >= this._steps.length)
            return true;

        let current = this._steps[this._index].time;
        let delta = now - this._start;
        while(delta > current){
            if(++this._index >= this._steps.length){
                this.updateElements();
                return true;
            }

            current = this._steps[this._index].time;
            delta = now - this._start;
        }

        this.updateElements(current - delta);
        return false;
    }

    /** Update Elements
     * 
     * Defaults to "---" if no value is entered.
     * 
     * @param {number} value 
     */
    private updateElements(value?:number): void {
        //Update value of timer
        if(typeof value === "undefined" || this._index === this._steps.length-1){
            this._valueElement.textContent = "---"
        } else {
            this._valueElement.textContent = formatSeconds(value / 1000)
        }

        //Update start of timer
        if(this._start === 0){
            this._startElement.textContent = formatTime();
        } else {
            this._startElement.textContent = formatTime(this._start);
        }

        //Update timer info
        if(this._index >= this._steps.length){
            this._infoElement.textContent = "";
        } else {
            this._infoElement.textContent = this._steps[this._index].info;
        }
    }

    //Get the time of the timer
    get time():number{
        return this._start;
    }

    //Get the id of the timer
    get id():string{
        return this._name;
    }
}