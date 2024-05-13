/** /Util/HTMLToggleInput
 * 
 * Used to visualize binary options.
 * 
 * @author Alex Malotky
 */

/** HTML Toggle Input Element
 * 
 */
export default class HTMLToggleInputElement extends HTMLElement {
    //Internal Elements
    private _slider: HTMLSpanElement;
    private _input: HTMLInputElement;

    //Optional Values
    private _options: Array<string>

    /** Constructor
     * 
     * @param {string} option1 
     * @param {string} option2 
     */
    constructor(option1?:string, option2?: string){
        super();

        //Wrapper Styling
        this.style.position = "relative";
        this.style.display = "inline-block";
        this.style.width = "2.5em";
        this.style.height = "calc(2.5ch + 1px)";
        this.style.borderRadius = "2.5em";
        this.style.backgroundColor = "white";
        this.style.cursor = "pointer";

        //Input Styling
        this._input = document.createElement("input");
        this._input.type = "checkbox";
        this._input.style.opacity = "0";
        this._input.style.width = "0";
        this._input.style.height = "0";

        //Slider Styling
        this._slider = document.createElement("span");
        this._slider.style.content = "";
        this._slider.style.position = "absolute";
        this._slider.style.top = "calc((.5ch / 2) - 0.5px)";
        this._slider.style.height = "2ch"
        this._slider.style.width = "2ch";
        this._slider.style.left = "4px";
        this._slider.style.backgroundColor = "#444";
        this._slider.style.borderRadius = "2.5em";
        this._slider.style.transition = "400ms";

        this.appendChild(this._input);
        this.appendChild(this._slider);

        this._options = [option1, option2];

        this._input.addEventListener("change", event=>{
            this.update();
        });
    }

    /** Attributes Getter.
     * 
     */
    static get observedAttributes(){
        return ["options", "value"];
    }

    /** Attribute Change Callback
     * 
     * @param {string} name of attribute
     * @param {string} oldValue 
     * @param {string} newValue 
     */
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

    /** Options Setter
     * 
     */
    set options(value: Array<string>){
        if(value.length){
            if(value.length < 2){
                console.warn("Not enough options given!");
            } else if(value.length > 2){
                console.warn("Too many options given, only the first two will be used!");
            }

            this._options = value;
            this._input.checked = false;
            this.update();
        } else {
            console.error("Options not an Array!");
        }
    }

    /** Options Getter
     * 
     */
    get options(){
        return this._options;
    }

    /** Value Setter
     * 
     */
    set value(value: string){
        if(this._options[0] === value){
            this._input.checked = false;
        } else if(this._options[1] === value){
            this._input.checked = true;
        }
        this.update();
    }

    /** Value Getter
     * 
     */
    get value(){
        return this._options[Number(this._input.checked)];
    }

    set id(value: string){
        super.id = `${value}Wrapper`;
        this._input.id = value;
    }

    get id(){
        return this._input.id;
    }

    /** Style Updates
     * 
     * Called after setting values.
     */
    private update(){
        this._slider.style.left = this._input.checked? "calc(2.5em - 2ch - 5px)" : "4px";
        this.style.backgroundColor = this._input.checked? "cyan" : "white";
    }
}

customElements.define("toggle-input", HTMLToggleInputElement);