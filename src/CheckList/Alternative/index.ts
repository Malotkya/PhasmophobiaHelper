import Evidence from "../Evidence";
export {SPEED_TYPES, HUNT_TYPES} from "./data"

export default class Alternative extends Evidence{
    private _value: number;

    constructor(name: string, value: number){
        super(name);
        this._value = value;
    }

    get value(): number{
        return this._value;
    }
}

customElements.define("alternative-item", Alternative);