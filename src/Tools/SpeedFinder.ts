import { createElement as _ } from "../Util/Element";
import { REFRESH_RATE } from "../Util/Sound";
import { inverseConvert, mps, getSpeedClass } from "../Util/Sound/Speed";

const TIMEOUT = 1000; //1 second;

export default class SpeedFinder extends HTMLElement {
    connectedCallback(){
        const btnTapper = _("button", {id: "tapper"});
        const lblBpm = _("span");
        const lblMps = _("span");
        const lblClass = _("span");

        let lastTap:number = 0;
        const taps: Array<number> = [];

        /** Detect if the Person has stopped tapping.
         * 
         */
        function hasTimmedOut():boolean {
            return (Date.now() - lastTap) >= TIMEOUT;
        }

        /** Get Average Tap Speed
         * 
         * @returns {number}
         */
        function averageTaps():number {
            let total:number = 0;
            taps.forEach(v=>total+=v);

            return inverseConvert(total / taps.length);
        }

        /** Update Display
         * 
         */
        function update(){
            const average = averageTaps();
            lblBpm.textContent = String(average);
            lblMps.textContent = String(mps(average));
            lblClass.textContent = getSpeedClass(average);

            if(!hasTimmedOut()) {
                window.setTimeout(update, REFRESH_RATE);
            }
        }

        /** Button Click Event
         * 
         */
        btnTapper.addEventListener("click", ()=>{
            const now = Date.now();

            if(hasTimmedOut()){
                while(taps.length > 0)
                    taps.pop();

                update();
            } else {
                taps.push(now - lastTap);
            }

            lastTap = now;
        });

        this.appendChild(_("p", 
            "Bpm: ", lblBpm,
            " ", "M/s: ", lblMps,
            " ", "Speed: ", lblClass
        ));
        this.appendChild(btnTapper);
    }

    disconnectedCallback(){
        this.innerHTML = "";
    }
}

customElements.define("speed-finder", SpeedFinder);