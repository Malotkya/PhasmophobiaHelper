import { createElement as _ } from "../Util/Element";
import TimerList from "./TimerList";
import SpeedFinder from "./SpeedFinder";

export default class Tools extends HTMLElement {
    public timers:TimerList;
    public speed:SpeedFinder

    constructor(){
        super();
        this.timers = new TimerList();
        this.speed = new SpeedFinder();

    }
    connectedCallback(){
        this.appendChild(_("section",
            _("h2", "Timers:"),
            this.timers
        ));

        this.appendChild(_("section",
            _("h2", "Speed Finder:"),
            this.speed
        ))
    }

    disconnectedCallback(){
        this.innerHTML = "";
    }
}

customElements.define("tools-menu", Tools)