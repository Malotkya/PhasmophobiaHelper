/** StopWatch.ts
 * 
 * @author Alex Malotky
 */
import {addTask, formatTime, formatSeconds} from "./Clock";
import Timer from "./Timer";

/** StopWatch Class
 * 
 */
export default class StopWatch extends Timer {
    //Running boolean
    private _running: boolean;

    /** Constructor
     * 
     * @param {HTMLElement} target 
     */
    constructor(target: HTMLElement){
        super({name: "Stop Watch", list:[]}, target);
    }

    /** Start Timer
     * 
     */
    public start(){
        this._running = true;
        this._start = Date.now();
        this._startElement.textContent = formatTime(this._start);
        addTask(this);
    }

    /** Stop Timer
     * 
     */
    public stop(){
        this._running = false;
    }

    /** Update Timer
     * 
     * Returns true if timer is done.
     * 
     * @param {number} now - millisecons
     * @returns {boolean}
     */
    public update(now:number): boolean{
        const delta: number = now - this._start;

        this._valueElement.textContent = formatSeconds(delta / 1000);

        return !this._running;
    }
}