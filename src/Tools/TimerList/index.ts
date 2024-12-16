import HuntTimer from "./HuntTimer";
import Timer from "./Timer";
import { SMUDGE_DATA, HUNT_DATA } from "./data";
import { createElement as _ } from "../../Util/Element";

export default class TimerList extends HTMLElement {
    private _data: Array<Timer>;
    private _hunt: HuntTimer;

    constructor(){
        super();
        this._hunt = new HuntTimer();
        this._data = [
            new Timer("Smudge Cooldown", SMUDGE_DATA),
            new Timer("Hunt Cooldown", HUNT_DATA),
            this._hunt
        ]
    }

    connectedCallback(){
        this.appendChild(_("ul", this._data.map(e=>_("li", e))))
    }

    disconnectedCallback(){
        this.innerHTML = "";
    }

    get huntTimer():HuntTimer {
        return this._hunt;
    }
}

customElements.define("timer-list", TimerList);
