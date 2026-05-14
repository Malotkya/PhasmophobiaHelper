import { EvidenceData, SPEED_TYPES, HUNT_TYPES } from "@Data/Evidence";
import { createElement as _ } from "../Util/Element";
import { persistAttributes, reloadAttributes } from "../Util/Memory";
import { AllGhosts } from "@Data/Ghosts";

export class JsonSettingsEditor<T extends Object> extends HTMLElement {
    private _input:HTMLTextAreaElement;
    private _update:HTMLButtonElement;
    private _reset:HTMLButtonElement;
    private _purge:HTMLButtonElement;
    private _callback:((v:T)=>any)|undefined

    constructor(name:string, data:T) {
        super();
        this.id = name.replace(" ", "_");
        this._input = _("textarea");

        this.addEventListener("change", (e)=>{
            if(e.target !== this) {
                e.stopPropagation();
            } else if(this._callback) {
                this._callback(this.value);
            }
        });

        this._update = _("button", "Save Changes");
        this._update.addEventListener("click", ()=>{
            try {
                this._send(JSON.parse(this._input.value));
            } catch (e) {
                alert("JSON is invalid!");
            }
            
        });

        this._reset = _("button", "Reset Changes");
        this._reset.addEventListener("click", ()=>{
            reloadAttributes(this);
        });

        this._purge = _("button", "Reset to Default");
        this._purge.addEventListener("click", ()=>{
            this._send(data);
        })

        persistAttributes(this, {
            value: JSON.stringify(data, null, 2)
        });
    }

    private _send(data:T) {
        this.setAttribute("value", JSON.stringify(data, null, 2));
        this.dispatchEvent(new Event("change"));
        this.dispatchEvent(new CustomEvent("reset", {bubbles: true}));
    }

    static readonly observedAttributes = ["value"];

    attributeChangedCallback(name:string, _:string, value:string) {
        if(name === "value") {
            this._input.value = value;
        }
    }

    get value():T {
        const string = this.getAttribute("value")!
        return JSON.parse(string);
    }

    set value(value:T) {
        this.setAttribute("value", JSON.stringify(value, null, 2));
    }

    disconnectedCallback(){
        this.innerHTML = "";
    }

    connectedCallback() {
        this.append(
            _("h3", this.id.replace("_", " ")),
            this._input,
            _("div", {class: "btn-group"},
                this._update,
                this._reset,
                this._purge
            )
        )
    }

    updateEvent(handler:(value:T)=>any){
        if(this._callback)
            return;

        this._callback = handler;
        handler(this.value);
    }

    reset() {
        this._purge.click();
    }
}

customElements.define("json-editor", JsonSettingsEditor);

export const GhostDataEditor = new JsonSettingsEditor("Ghost Data", AllGhosts);
export const EvidenceDataEditor = new JsonSettingsEditor("Evidence Types", EvidenceData);
export const SpeedDataEditor = new JsonSettingsEditor("Ghost Speed Data", SPEED_TYPES);
export const HuntDataEditor = new JsonSettingsEditor("Hunt Sanity Data", HUNT_TYPES);