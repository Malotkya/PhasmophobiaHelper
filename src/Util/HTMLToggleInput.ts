export default class HTMLToggleInputElement extends HTMLElement {
    private _switch: HTMLLabelElement;
    private _slider: HTMLSpanElement;
    private _input: HTMLInputElement;
    private _style: HTMLStyleElement;

    private _options: Array<string>
    private _value: string;

    constructor(option1?:string, option2?: string){
        super();

        this._style = document.createElement("style");
        this._style.innerHTML = `
        .switch {
            position: relative;
            display: inline-block;
            width: 60px;
            height: 34px;
          }
          
          .switch input {
            opacity: 0;
            width: 0;
            height: 0;
          }
          
          .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            border-radius: 34px;
            -webkit-transition: .4s;
            transition: .4s;
          }
          
          .slider:before {
            position: absolute;
            content: "";
            height: 26px;
            width: 26px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            -webkit-transition: .4s;
            transition: .4s;
          }
          
          input:checked + .slider {
            background-color: #2196F3;
          }
          
          input:focus + .slider {
            box-shadow: 0 0 1px #2196F3;
          }
          
          input:checked + .slider:before {
            -webkit-transform: translateX(26px);
            -ms-transform: translateX(26px);
            transform: translateX(26px);
          }
        `;
        this._switch = document.createElement("label");
        this._switch.className = "switch";
        this._input = document.createElement("input");
        this._input.type = "check";
        this._slider = document.createElement("span");
        this._slider.className = "slider";

        this.appendChild(this._style);
        this.appendChild(this._switch);
        this._switch.appendChild(this._input);
        this._switch.appendChild(this._slider);

        this._options = [option1, option2];

        this.addEventListener("click", event=>{
            if(event.target === this._input) {
                event.stopPropagation();
            } else {
                this._input.checked = !this._input.checked;
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