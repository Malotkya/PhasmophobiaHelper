/** Timer.ts
 * 
 * @author Alex Malotky
 */
import {Task, addTask, removeTask, formatTime, formatSeconds} from "./Clock";
import { TimerData } from "./data";
import { createElement as _ } from "../Util/Element";


/** Timer Class
 * 
 */
export default class Timer extends HTMLLIElement implements Task{
    //HTML Elements
    //protected _titleElement: HTMLElement;
    protected _valueElement: HTMLElement;
    protected _infoElement: HTMLElement
    protected _button: HTMLElement;

    //Instance Variables
    private _name: string;
    protected _start: number;
    protected _steps: TimerData
    protected _index: number;

    /** Constructor
     * 
     * @param {string} name;
     * @param {TimerData} data 
     */
    constructor(name:string, data: TimerData){
        super();
        this._name = name;
        this.startTime = 0;
        this._steps = data;
        this._index = this._steps.length;

        this._valueElement = _("span", {class: "time"});
        this._infoElement  = _("p", {class: "info"});
        this._button = _("button", "Start");
        this._button.addEventListener("click", event=>{
            event.stopPropagation();
            if(this.isRunning()) {
                this.stop();
            } else {
                this.start();
            }
        });

        //Init Display Elements
        this.updateElements();
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

    connectedCallback(){
        this.appendChild(_("h2", {class: "title"}, this._name));
        this.appendChild(this._button);
        this.appendChild(this._valueElement);
        this.appendChild(this._infoElement);
    }

    diconnectedCallback(){
        this.innerHTML = "";
    }
}

customElements.define("timer-item", Timer, {extends: "li"})