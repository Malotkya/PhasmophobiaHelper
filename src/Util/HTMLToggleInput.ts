export default class HTMLToggleInputElement extends HTMLElement {
    private _slider: HTMLSpanElement;
    private _input: HTMLInputElement;

    private _options: Array<string>

    constructor(option1?:string, option2?: string){
        super();

        this.style.position = "relative";
        this.style.display = "inline-block";
        this.style.width = "60px";
        this.style.height = "34px";
        this.style.borderRadius = "34px";
        this.style.backgroundColor = "white";
        this.style.cursor = "pointer";

        this._input = document.createElement("input");
        this._input.style.opacity = "0";
        this._input.style.width = "0";
        this._input.style.height = "0";

        this._slider = document.createElement("span");
        this._slider.style.content = "";
        this._slider.style.position = "absolute";
        this._slider.style.top = "4px";
        this._slider.style.height = "26px"
        this._slider.style.height = "26px";
        this._slider.style.width = "26px";
        this._slider.style.left = "4px";
        this._slider.style.bottom = "4px";
        this._slider.style.backgroundColor = "#444";
        this._slider.style.borderRadius = "34px";
        this._slider.style.transition = "400ms";

        this.appendChild(this._input);
        this.appendChild(this._slider);

        this._options = [option1, option2];

        this.addEventListener("click", event=>{
            if(event.target === this._input) {
                event.stopPropagation();
            } else {
                this._input.checked = !this._input.checked;
                this._slider.style.left = this._input.checked? "26px" : "4px";
                this.style.backgroundColor = this._input.checked? "cyan" : "white";
                this.dispatchEvent(new Event("change", {composed: true}));
            }
        });
    }

    static get observedAttributes(){
        return ["options", "value"];
    }

    attributeChangedCallback(name:string, oldValue:string, newValue:string){
        switch (name){
            case "options":
                this.options = JSON.parse(newValue);
                break;

            case "value":
                this.value = newValue;
                break;
        }
    }

    set options(value: Array<string>){
        if(value.length){
            if(value.length < 2){
                console.warn("Not enough options given!");
            } else if(value.length > 2){
                console.warn("Too many options given, only the first two will be used!");
            }

            this._options = value;
            this._input.checked = false;
        } else {
            console.error("Options not an Array!");
        }
    }

    get options(){
        return this._options;
    }

    set value(value: string){
        if(this._options[0] === value){
            this._input.checked = false;
        } else if(this._options[1] === value){
            this._input.checked = true;
        }
    }

    get value(){
        return this._options[Number(this._input.checked)];
    }
}

customElements.define("toggle-input", HTMLToggleInputElement);