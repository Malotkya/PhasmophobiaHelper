
/** Alternative.ts
 * 
 * Alternative Evidence
 * 
 * @author Alex Malotky
 * 
 */
import Ghost from "./Ghost";

//Ghost Speed Constants
const SPEED_ID = "speed";
export const AVERAGE_SPEED = 1.7;
export const SPEED_TYPES = [
    "",
    "Fast",
    "Average",
    "Slow",
    "Both"
];

/** Create Speed Selector
 * 
 * @returns {[HTMLElement, HTMLSelectElement]}
 */
export function createSpeedSelector(): Array<HTMLElement|HTMLSelectElement>{
    const text = document.createElement("span");
    text.className = "name";
    text.textContent = "Speed: ";

    const input = document.createElement("select");
    input.id = SPEED_ID;
    for(let i in SPEED_TYPES){
        const option = document.createElement("option");
        option.value = i;
        option.textContent = SPEED_TYPES[i];

        input.appendChild(option);
    }

    const label = document.createElement("label");
    label.className = "alternative";
    label.setAttribute("for", SPEED_ID);
    label.appendChild(text);
    label.appendChild(input);

    return [
        label,
        input
    ];
}

//Ghost Hunt Constants
const HUNT_ID = "hunt"
export const NORMAL_HUNT = 50;
export const HUNT_TYPES = [
    "",
    "Early",
    "Normal",
    "Late",
    "Both"
];

/** Create Hunt Selector
 * 
 * @returns {[HTMLElement, HTMLSelectElement]}
 */
export function createHuntSelector(): Array<HTMLElement|HTMLSelectElement>{
    const text = document.createElement("span");
    text.className = "name";
    text.textContent = "Hunts: ";

    const input = document.createElement("select");
    input.id = HUNT_ID;
    for(let i in HUNT_TYPES){
        const option = document.createElement("option");
        option.value = i;
        option.textContent = HUNT_TYPES[i];

        input.appendChild(option);
    }

    const label = document.createElement("label");
    label.className = "alternative";
    label.setAttribute("for", HUNT_ID);
    label.appendChild(text);
    label.appendChild(input);

    return [
        label,
        input
    ];
}

/** Alternative Check List
 * 
 */
export default class Alternative{
    //States
    private _speedState:number;
    private _huntState:number;

    //Elements
    private _inputs: Array<HTMLSelectElement|HTMLInputElement>

    /** Constructor
     * 
     * @param {Array<HTMLSelectElement|HTMLInputElement>} list 
     * @param {Function} updateEvent 
     */
    constructor(list: Array<HTMLSelectElement|HTMLInputElement>, updateEvent:()=>void){
        this._speedState = 0;
        this._huntState = 0;
        this._inputs = list;

        for(let input of list){
            input.addEventListener("click", event=>{
                event.stopPropagation();
            });
            
            input.addEventListener("change", event=>{
                try{
                    this.event(input.id, Number(input.value));
                } catch(e:any){
                    console.error(e);
                }
                updateEvent();
            });
        }
    }

    /** Alternative Events
     * 
     * @param {string} type - id of element calling event
     * @param {number} value - event number/value
     */
    private event(type: string, value: number){
        switch(type){
            case SPEED_ID:
                this.speedEvent(value);
                break;

            case HUNT_ID:
                this.huntEvent(value);
                break;

            default:
                throw new Error("Unknown Alternate Evidence: " + type);
        }
    }

    /** Speed Event
     * 
     * @param {number} e 
     */
    public speedEvent(e: number): void{
        if(e < 0 || e >= HUNT_TYPES.length)
            throw new Error("Unkown Speed Event!");

        this._speedState = e;
    }

    /** Hunt Event
     * 
     * @param {number} e 
     */
    public huntEvent(e: number): void{
        if(e < 0 || e >= HUNT_TYPES.length)
            throw new Error("Unkown Hunt Event!");

        this._huntState = e;
    }

    /** Reset Event
     * 
     */
    public reset(): void {
        this._huntState = 0;
        this._speedState = 0;
        for(let input of this._inputs)
            input.value = "0";
    }

    /** Update Event
     * 
     * Filters ghost from list based on inputs/states
     * 
     * @param {Array<Ghost>} list 
     * @returns {Array<Ghost>}
     */
    public update(list: Array<Ghost>): Array<Ghost>{
        return list.filter((ghost:Ghost)=> {
            switch(this._speedState){
                case 1:
                    if(!ghost.isFastSpeed())
                        return false;
                    break;

                case 2:
                    if(!ghost.isAverageSpeed())
                        return false;
                    break;

                case 3:
                    if(!ghost.isSlowSpeed())
                        return false;
                    break;

                case 4:
                    if(!(ghost.isSlowSpeed() && ghost.isFastSpeed()))
                        return false;
                    break;
            }

            switch(this._huntState){
                case 1:
                    if(!ghost.isEarlyHunter())
                        return false;
                    break;

                case 2:
                    if(!ghost.isNormalHunter())
                        return false;
                    break;

                case 3:
                    if(!ghost.isLateHunter())
                        return false;
                    break;
                
                case 4:
                    if(!(ghost.isEarlyHunter() && ghost.isLateHunter()))
                        return false;
                    break;
            }

            return true;
        });
    }
    
}
