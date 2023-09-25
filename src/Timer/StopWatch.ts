/** StopWatch.ts
 * 
 * @author Alex Malotky
 */
import Timer from "./Timer";

/** StopWatch Class
 * 
 */
export default class StopWatch extends Timer {
    /** Constructor
     * 
     */
    constructor(){
        super({name: "Stop Watch", list:[]});
        this.removeChild(this._infoElement);
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

customElements.define("stop-watch-item", StopWatch, {extends: "li"})