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
        super("Stop Watch", []);
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

    connectedCallback(): void {
        super.connectedCallback();
        this.removeChild(this._infoElement);
    }
}

customElements.define("stop-watch-item", StopWatch, {extends: "li"})