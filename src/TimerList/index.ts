import HuntTimer from "./HuntTimer";
import Timer from "./Timer";
import { SMUDGE_DATA, HUNT_DATA } from "./data";
import { createElement as _ } from "../Util/Element";

export default class TimerList extends HTMLElement {
    private _data: Array<Timer>;

    constructor(){
        super();
        this._data = [
            new Timer("Smudge Cooldown", SMUDGE_DATA),
            new Timer("Hunt Cooldown", HUNT_DATA),
            new HuntTimer()
        ]
    }

    connectedCallback(){
        this.appendChild(_("ul", this._data.map(e=>_("li", e))))
    }
}

customElements.define("timer-list", TimerList);
