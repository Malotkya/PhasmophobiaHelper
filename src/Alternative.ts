import Ghost from "./Ghost";

export const AVERAGE_SPEED = 1.7;
export const NORMAL_HUNT = 50;

export const SPEED_TYPES = [
    "",
    "Fast",
    "Average",
    "Slow",
    "Both"
]

export const HUNT_TYPES = [
    "",
    "Early",
    "Normal",
    "Late",
    "Both"
];

class Alternative_Type{
    private _speedState:string;
    private _huntState:string;

    constructor(){
        this._speedState = "";
        this._huntState = "";
    }

    public speedEvent(s: string): void{
        for(let t of SPEED_TYPES){
            if(t === s){
                this._speedState = t;
                return;
            }
        }
        
        throw new Error("Unkown Speed Event!");
    }

    public huntEvent(s: string): void{
        for(let t of HUNT_TYPES){
            if(t === s){
                this._huntState = t;
                return;
            }
        }
        
        throw new Error("Unkown Hunt Event!");
    }

    public reset(): void {
        this._huntState = "";
        this._speedState = "";
    }

    public update(list: Array<Ghost>): Array<Ghost>{
        return list.filter((ghost:Ghost)=> {
            switch(this._speedState){
                case SPEED_TYPES[1]:
                    if(!ghost.isFastSpeed())
                        return false;
                    break;

                case SPEED_TYPES[2]:
                    if(!ghost.isAverageSpeed())
                        return false;
                    break;

                case SPEED_TYPES[3]:
                    if(!ghost.isSlowSpeed())
                        return false;
                    break;

                case SPEED_TYPES[4]:
                    if(!(ghost.isSlowSpeed() && ghost.isFastSpeed()))
                        return false;
                    break;
            }

            switch(this._huntState){
                case HUNT_TYPES[1]:
                    if(!ghost.isEarlyHunter())
                        return false;
                    break;

                case HUNT_TYPES[2]:
                    if(!ghost.isNormalHunter())
                        return false;
                    break;

                case HUNT_TYPES[3]:
                    if(!ghost.isLateHunter())
                        return false;
                    break;
                
                case HUNT_TYPES[4]:
                    if(!(ghost.isEarlyHunter() && ghost.isLateHunter()))
                        return false;
                    break;
            }

            return true;
        });
    }
    
} const Alternative = new Alternative_Type();

export function createSpeedSelector(): Array<HTMLElement|HTMLSelectElement>{
    const text = document.createElement("span");
    text.className = "name";
    text.textContent = "Speed: ";

    const input = document.createElement("select");
    input.id = "speed";
    for(let i in SPEED_TYPES){
        const option = document.createElement("option");
        option.value = i;
        option.textContent = SPEED_TYPES[i];

        input.appendChild(option);
    }

    input.addEventListener("click", event=>{
        event.stopPropagation();
    });

    input.addEventListener("change", event=>{
        try {
            Alternative.speedEvent(SPEED_TYPES[Number(input.value)]);
        } catch(e:any){
            console.warn("Unknown speed value: " + input.value);
        }
    });

    const label = document.createElement("label");
    label.className = "alternative";
    label.setAttribute("for", "speed");
    label.appendChild(text);
    label.appendChild(input);

    return [
        label,
        input
    ];
}

export function createHuntSelector(): Array<HTMLElement|HTMLSelectElement>{
    const text = document.createElement("span");
    text.className = "name";
    text.textContent = "Hunt: ";

    const input = document.createElement("select");
    input.id = "hunt";
    for(let i in HUNT_TYPES){
        const option = document.createElement("option");
        option.value = i;
        option.textContent = HUNT_TYPES[i];

        input.appendChild(option);
    }

    input.addEventListener("click", event=>{
        event.stopPropagation();
    });

    input.addEventListener("change", event=>{
        try{
            Alternative.huntEvent(HUNT_TYPES[Number(input.value)]);
        } catch(e:any){
            console.warn("Unknown hunt value: " + input.value);
        }
    });

    const label = document.createElement("label");
    label.className = "alternative";
    label.setAttribute("for", "hunt");
    label.appendChild(text);
    label.appendChild(input);

    return [
        label,
        input
    ];
}

export default Alternative;