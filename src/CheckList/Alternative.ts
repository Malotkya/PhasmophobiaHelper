import Evidence from "./Evidence";

//Ghost Speed Constants
export const SPEED_TYPES:any = {
    "Fast": 2,
    "Average": 1.7,
    "Slow": 1,
};

//Ghost Hunt Constants
export const HUNT_TYPES:any = {
    "Early": 100,
    "Normal": 50,
    "Late": 0,
};

export function createAllSpeedEvidence(target: Element): Array<Alternative>{
    const list: Array<Alternative> = [];
    for(let name in SPEED_TYPES){
        const a = new Alternative(name, SPEED_TYPES[name])
        list.push(a);
        target.appendChild(a);
    }
    return list;
}

export function createAllHuntEvidence(target: Element): Array<Alternative>{
    const list: Array<Alternative> = [];
    for(let name in HUNT_TYPES){
        const a = new Alternative(name, HUNT_TYPES[name])
        list.push(a);
        target.appendChild(a);
    }
    return list;
}

export default class Alternative extends Evidence{
    private _value: number;

    constructor(name: string, value: any){
        super(name);
        this._value = Number(value);
    }

    get value(): number{
        return this._value;
    }
}

customElements.define("alternative-item", Alternative, {extends: "li"});