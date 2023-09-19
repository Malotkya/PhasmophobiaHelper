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
    /** Constructor
     * 
     * @param {HTMLElement} target 
     */
    constructor(target: HTMLElement){
        super({name: "Stop Watch", list:[]}, target);
    }

    /** Update Timer
     * 
     * Returns true if timer is done.
     * 
     * @param {number} now - millisecons
     * @returns {boolean}
     */
    public update(now:number): void{
        const delta: number = now - this._start;

        this.value = delta / 1000;
    }
}