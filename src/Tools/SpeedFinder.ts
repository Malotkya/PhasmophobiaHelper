import { createElement as _ } from "../Util/Element";
import { REFRESH_RATE } from "../Util/Sound";
import { inverseConvert, mps, getSpeedClass } from "../Util/Sound/Speed";
import SpecialArray from "../Util/SpecialArray";

const TIMEOUT = 1000; //1 second;

export default class SpeedFinder extends HTMLElement {
    connectedCallback(){
        const btnTapper = _("button", {id: "tapper"});
        const lblBpm = _("span", 0);
        const lblMps = _("span", 0);
        const lblClass = _("span", getSpeedClass(0));

        let lastTap:number = 0;
        const taps: SpecialArray<number> = new SpecialArray(20);

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
            if(taps.length === 0)
                return 0;

            let total:number = 0;
            taps.forEach(v=>total+=v);
            return inverseConvert(total / taps.length);
        }

        /** Update Display
         * 
         */
        function update(){
            const average = averageTaps();
            lblBpm.textContent = average.toFixed(2);
            lblMps.textContent = mps(average).toFixed(2);
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
                taps.clear();

                setTimeout(update);
            } else {
                taps.push(now - lastTap);
            }

            lastTap = now;
        });

        this.appendChild(_("p", 
            lblBpm, " bpm | ",
            lblMps, " m/s", _("br"),
            lblClass
        ));
        this.appendChild(btnTapper);
    }

    disconnectedCallback(){
        this.innerHTML = "";
    }
}

customElements.define("speed-finder", SpeedFinder);