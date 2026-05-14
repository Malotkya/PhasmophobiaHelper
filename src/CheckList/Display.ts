import type Ghost from "./Ghost";
import { createElement as _ } from "../Util/Element";
import { createSoundButton } from "../Util/Sound";
import { generateSound } from "../Util/Sound";
import { AudioData } from "../Util/Sound/Audio";

export default class DisplayElement extends HTMLElement {
    private _name:HTMLHeadingElement = _("h2", {class: "name"});
    private _evidence:HTMLOListElement = _("ol");
    private _warning:HTMLParagraphElement = _("p", {class: "warn"});
    private _info:HTMLUListElement = _("ul");
    private _link:HTMLAnchorElement = _("a", {target: '_blank'}, "More Info");

    constructor() {
        super();
        this.classList.add("sub-section");

        this.addEventListener("click", (event:Event)=>{
            const target = event.target as HTMLElement;

            if(target.classList.contains("speed")){
                const value = Number(target.getAttribute("value"));
                if(isNaN(value)){
                    alert("Sound value was not a number!");
                } else {
                    generateSound(value);
                }
            }
        });
    }

    display(ghost:Ghost|null) {
        if(!ghost)
            return;

        this._name.textContent = ghost.name;
        this._evidence.replaceChildren(
            ...ghost.evidence.map(s=>_("li", s))
        );
        this._info.innerHTML = "";
        if(ghost.speed) {
            this._info.append(createSoundButton(ghost.speed));
        }
        this._info.append(...ghost.info.map(s=>_("li",
            typeof s === "object"?
                [
                    s.content?
                        s.content + "\n":
                        null,
                    AudioData(s)
                ]:
                s
            )
        ));
        if(ghost.required) {
            this._info.append(_("li", "Always has: "+ghost.required))
        }

        if(ghost.warning) {
            this._warning.hidden = false;
            this._warning.textContent = ghost.warning;
        } else {
            this._warning.hidden = true;
            this._warning.textContent = "";
        }

        if(ghost.link) {
            this._link.hidden = false;
            this._link.href = ghost.link;
        } else {
            this._link.hidden = true;
            this._link.href = "";
        }
    }

    disconnectedCallback(){
        this.innerHTML = "";
    }

    connectedCallback(){
        this.appendChild(this._name);
        this.appendChild(this._evidence);
        this.appendChild(_("div", {class: "info"},
            this._warning,
            this._info,
            _("p",
                this._link
            )
        ));
    }
}

customElements.define("ghost-display", DisplayElement)