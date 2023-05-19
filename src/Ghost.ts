import * as Icons from "./UnicodeIcons";
import Evidence, {EVIDENCE_TYPES} from "./Evidence"

export interface GhostObject{
    name: string,
    evidence: Array<any>,
    info: string,
    required: string
}

export function createAllGhosts(target: Element, display: Element): Array<Ghost>{
    return [
        new Banshee(target, display),
        new Demon(target, display),
        new Deogen(target, display),
        new Goryo(target, display),
        new Hantu(target, display),
        new Jinn(target, display),
        new Mare(target, display),
        new Moroi(target, display),
        new Myling(target, display),
        new Obake(target, display),
        new Oni(target, display),
        new Onryo(target, display),
        new Phantom(target, display),
        new Poltergeist(target, display),
        new Raiju(target, display),
        new Revenant(target, display),
        new Shade(target, display),
        new Spirit(target, display),
        new Thaye(target, display),
        new Mimic(target, display),
        new Twins(target, display),
        new Wraith(target, display),
        new Yokai(target, display),
        new Yurei(target, display)
    ];
}

export default class Ghost{
    private _name: Element;
    private _info: Element;
    private _evidence: Element;
    private _btnRemove: Element;

    private _disproven: boolean;
    private _required: string;

    private _element: HTMLElement;
    private _styleElement: HTMLElement;
    
    constructor(target: Element, display: Element, name: string, evidence: Array<string>, info: Array<string>, required?: string){
        this._disproven = false;
        
        this._name = document.createElement("h2");
        this._name.className = "name";
        this._name.textContent = name;

        this._info = document.createElement("ul");
        info.forEach(item=>{
            let li = document.createElement("li");
            li.innerHTML = item;
            this._info.appendChild(li);
        })

        if(typeof required === "undefined"){
            this._required = "";
        } else {
            this._required = required;
            this._info.innerHTML += `<li>Will always have ${required} as an evidence.</li>`
        }

        this._btnRemove = document.createElement("button");
        this._btnRemove.textContent = Icons.EX;
        this._btnRemove.addEventListener("click", event=>{
            event.stopPropagation()
            this.flip()
        });

        this._evidence = document.createElement("ol");
        evidence.forEach(string=>{
            let item = document.createElement("li");
            item.textContent = string;
            this._evidence.appendChild(item);
        });

        this._styleElement = document.createElement("span");
        this._styleElement.textContent = name;

        this._element = document.createElement("li");
        this._element.className = "ghost";
        this._element.appendChild(this._styleElement);
        this._element.appendChild(this._btnRemove);
        this._element.addEventListener("click", event=>this.display(display));

        target.appendChild(this._element);
    }

    public has(evidence: string): boolean{
        const list = this._evidence.children;
        for(let i=0; i<list.length; i++){
            if(list[i].textContent === evidence)
                return true;
        }

        return false;
    }

    public crossOff(){
        this.style.textDecoration = "line-through";
        this._btnRemove.textContent = Icons.RESET;
        let order = this.order
        this._disproven = true;
        this.order = order;
    }

    public unCrossOff(){
        this._btnRemove.textContent = Icons.EX;
        this.style.textDecoration = "";
        let order = this.order
        this._disproven = false;
        this.order = order;
    }

    public hide(){
        this._element.classList.add("no");
    }

    public show(){
        this._element.classList.remove("no");
    }

    public reset(){
        this.unCrossOff();
        this.show();
    }

    public flip(){
        if(this._disproven){
            this.unCrossOff();
        } else {
            this.crossOff();
        }
    }

    get style(){
        return this._styleElement.style;
    }

    get required(){
        return this._required;
    }

    get name(){
        return this._name.textContent;
    }

    get order(){
        return Number(this._element.style.order) - (Number(this._disproven) * 10);
    }

    set order(value: number){
        this._element.style.order = (value + (Number(this._disproven) * 10)).toString();
    }

    display(target: Element){
        target.innerHTML = "";
        target.append(this._name);
        target.append(this._evidence);
        target.append(this._info);
    }
}

export class Banshee extends Ghost {
    constructor(target: Element, display: Element){
        super(target, display, "Banshee",
            [EVIDENCE_TYPES.FINGERPRINTS, EVIDENCE_TYPES.GHOST_ORBS, EVIDENCE_TYPES.DOTS_PROJECTOR],
            [
                "Will target one player at a time",
                "Perfers singing/humming during ghost events.",
                "Has a special sound that can only be herd with the parabolic mic.",
                "<a target='_blank' href='https://youtu.be/zuiss03Zd9Q'>More Info</a>"
            ]);
    }
}

export class Demon extends Ghost {
    constructor(target: Element, display: Element){
        super(target, display, "Demon",
            [EVIDENCE_TYPES.FINGERPRINTS, EVIDENCE_TYPES.GHOST_WRITING, EVIDENCE_TYPES.FREEZING_TEMPS],
            [
                "Starts hunting at 70% average sanity, but has a chance to use its ability to hunt at any sanity.",
                "A smudge stick will prevent a hunt for 60 seconds instead of the normal 60 seconds.",
                "Can hunt every 20 seconds, faster then a normal ghost.",
                "Weakness: Crucifix's have a greater area of effect on a demon.",
                "<a target='_blank' href='https://youtu.be/UErl6rpUU24'>More Info</a>"
            ]);
    }
}

export class Deogen extends Ghost {
    constructor(target: Element, display: Element){
        super(target, display, "Deogen",
            [EVIDENCE_TYPES.SPIRIT_BOX, EVIDENCE_TYPES.GHOST_WRITING, EVIDENCE_TYPES.DOTS_PROJECTOR],
            [
                "Warning: The deogen will always know where you are!",
                "The deogen will move faster when it is far away from its target, moving slower once it is close.",
                "Deogen's have a special spirit box sounds if you use the spirit box directly ontop of the ghost.",
                "Weakness: Hunts at 40% average sanity.",
                "<a target='_blank' href='https://youtu.be/Xbs2hDYPBjE'>More Info</a>"
            ]);
    }
}

export class Goryo extends Ghost {
    constructor(target: Element, display: Element){
        super(target, display, "Goryo",
            [EVIDENCE_TYPES.EMF_LEVEL_FIVE, EVIDENCE_TYPES.FINGERPRINTS, EVIDENCE_TYPES.DOTS_PROJECTOR],
            [
                "Will not show " + EVIDENCE_TYPES.DOTS_PROJECTOR + " if there is a player in the room.",
                "Weakness: Not able to roam far away from its favorit room."
            ],
            EVIDENCE_TYPES.DOTS_PROJECTOR);
    
    }
}

export class Hantu extends Ghost {
    constructor(target: Element, display: Element){
        super(target, display, "Hantu",
            [EVIDENCE_TYPES.FINGERPRINTS, EVIDENCE_TYPES.GHOST_ORBS, EVIDENCE_TYPES.FREEZING_TEMPS],
            [
                "Will speed up when in a colder room, and will slow down in a warmer room.",
                "When a Hantu is visible you will also be able to see its' freezing breath.",
                "<a target='_blank' href='https://youtu.be/oaPInpuMY58'>More Info</a>"
            ],
            EVIDENCE_TYPES.FREEZING_TEMPS);
    }
}

export class Jinn extends Ghost {
    constructor(target: Element, display: Element){
        super(target, display, "Jinn",
            [EVIDENCE_TYPES.EMF_LEVEL_FIVE, EVIDENCE_TYPES.FINGERPRINTS, EVIDENCE_TYPES.FREEZING_TEMPS],
            [
                "Can drop your sanity by 25% if you are standing close to it for too long.",
                "The jinn has increased speed when the breaker is on.",
                "Weakness: Cannot turn off the breaker.",
                "<a target='_blank' href='https://youtu.be/bfvbEGpceas'>More Info</a>"
            ]);
    }
}

export class Mare extends Ghost {
    constructor(target: Element, display: Element){
        super(target, display, "Mare",
            [EVIDENCE_TYPES.SPIRIT_BOX, EVIDENCE_TYPES.GHOST_ORBS, EVIDENCE_TYPES.GHOST_WRITING],
            [
                "Will hunt at 40% average sanity if the lights are on and 60% average sanity if the lights are off.",
                "Has a chance of turning the lights off immediatly when they are turned on.",
                "More likely to break the lights during a ghost event.",
                "Weakness: Cannot turn on the lights",
                "<a target='_blank' href='https://youtu.be/M2Wtzf9TqF8'>More Info</a>"
            ]);
    }
}

export class Moroi extends Ghost {
    constructor(target: Element, display: Element){
        super(target, display, "Moroi",
            [EVIDENCE_TYPES.SPIRIT_BOX, EVIDENCE_TYPES.GHOST_WRITING, EVIDENCE_TYPES.FREEZING_TEMPS],
            [
                "Changes it speed based on the average sanity of the team.",
                "Starts out slower then an average ghost, going faster the lower it gets.",
                "Will curse a player that hears its, causing their sanity to drain even if they are in the light.",
                "<a target='_blank' href='https://youtu.be/cASjuPnV8Uk'>More Info</a>"
            ],
            EVIDENCE_TYPES.SPIRIT_BOX);
    }
}

export class Myling extends Ghost {
    constructor(target: Element, display: Element){
        super(target, display, "Banshee",
            [EVIDENCE_TYPES.EMF_LEVEL_FIVE, EVIDENCE_TYPES.FINGERPRINTS, EVIDENCE_TYPES.GHOST_WRITING],
            [
                "Has a greater chance of making paranormal sounds on the parabolic mic.",
                "Weakness: You will only be able to hear a myling at close range when it is hunting.",
                "<a target='_blank' href='https://youtu.be/R2-PM3_iE8A'>More Info</a>"
            ]);
    }
}

export class Obake extends Ghost {
    constructor(target: Element, display: Element){
        super(target, display, "Obake",
            [EVIDENCE_TYPES.EMF_LEVEL_FIVE, EVIDENCE_TYPES.FINGERPRINTS, EVIDENCE_TYPES.GHOST_ORBS],
            [
                "Has a chance to have extra fingers, when leaving " + EVIDENCE_TYPES.FINGERPRINTS + ".",
                "Has a chance to not leave " + EVIDENCE_TYPES.FINGERPRINTS + " at all.",
                EVIDENCE_TYPES.FINGERPRINTS + " evidence will disapear faster.",
                "Weakness: Has a chance to flash a different ghost model while hunting.",
                "<a target='_blank' href='https://youtu.be/Gl6nWRgXVlQ'>More Info</a>"
            ],
            EVIDENCE_TYPES.FINGERPRINTS);
    }
}

export class Oni extends Ghost {
    constructor(target: Element, display: Element){
        super(target, display, "Oni",
            [EVIDENCE_TYPES.EMF_LEVEL_FIVE, EVIDENCE_TYPES.FREEZING_TEMPS, EVIDENCE_TYPES.DOTS_PROJECTOR],
            [
                "Can throw objects very far, very fast.",
                "This ghost will be more active the more people there are in the ghost room."
            ]);
    }
}

export class Onryo extends Ghost {
    constructor(target: Element, display: Element){
        super(target, display, "Onryo",
            [EVIDENCE_TYPES.SPIRIT_BOX, EVIDENCE_TYPES.GHOST_ORBS, EVIDENCE_TYPES.FREEZING_TEMPS],
            []);
    }
}

export class Phantom extends Ghost {
    constructor(target: Element, display: Element){
        super(target, display, "Phantom",
            [EVIDENCE_TYPES.SPIRIT_BOX, EVIDENCE_TYPES.FINGERPRINTS, EVIDENCE_TYPES.DOTS_PROJECTOR],
            [
                "Will flicker at a slower rate then a normal ghost during a hunt.",
                "Can randomly wander to the position of one of the players<br>Note: The ouji board has no chance of summoning the ghost.",
                "Weakness: Will disapear if a picture is taken of a phantom, and no glitches will apear on the photo.",
                "<a target='_blank' href='https://youtu.be/GFLie5hzbjk'>More Info</a>"
            ]);
    }
}

export class Poltergeist extends Ghost {
    constructor(target: Element, display: Element){
        super(target, display, "Poltergeist",
            [EVIDENCE_TYPES.SPIRIT_BOX, EVIDENCE_TYPES.FINGERPRINTS, EVIDENCE_TYPES.GHOST_WRITING],
            [
                "Can throw items further and harder then a normal ghost.",
                "Has a chance to through multiple items all at once.",
                "Weakness: A poltergeist will throw an item every half a second during a hunt.",
                "<a target='_blank' href='https://youtu.be/ZXFP5LLhD9A'>More Info</a>"
            ]);
    }
}

export class Raiju extends Ghost {
    constructor(target: Element, display: Element){
        super(target, display, "Raiju",
            [EVIDENCE_TYPES.EMF_LEVEL_FIVE, EVIDENCE_TYPES.GHOST_ORBS, EVIDENCE_TYPES.DOTS_PROJECTOR],
            [
                "Can hunt at 65% average sanity if near electonics, otherwise it will hunt at the normal 50%.",
                "The ghost will move at near Revenant speeds if it is near electronics.",
                "Weakness: The ghost effects lights at a greater range then normal.",
                "<a target='_blank' href='https://youtu.be/rX1-vaWPnHg'>More Info</a>"
            ]);
    }
}

export class Revenant extends Ghost {
    constructor(target: Element, display: Element){
        super(target, display, "Revenant",
            [EVIDENCE_TYPES.GHOST_ORBS, EVIDENCE_TYPES.GHOST_WRITING, EVIDENCE_TYPES.FREEZING_TEMPS],
            [
                "Currently the fastest ghost in the game.",
                "Weakness: Will move increadably slow if it does not see a player.",
                "<a target='_blank' href='https://youtu.be/5P-4CPhM-Ak'>More Info</a>"
            ]);
    }
}

export class Shade extends Ghost {
    constructor(target: Element, display: Element){
        super(target, display, "Shade",
            [EVIDENCE_TYPES.GHOST_ORBS, EVIDENCE_TYPES.GHOST_WRITING, EVIDENCE_TYPES.FREEZING_TEMPS],
            [
                "Shades perfer using the ghost ball over a normal ghost event",
                "Weakness: A shade cannot hunt if there are more then one person in the room with it, and hunts at 35% average sanity.",
                "<a target='_blank' href='https://youtu.be/aiVVzCk_G8E'>More Info</a>"
            ]);
    }
}

export class Spirit extends Ghost {
    constructor(target: Element, display: Element){
        super(target, display, "Spirit",
            [EVIDENCE_TYPES.EMF_LEVEL_FIVE, EVIDENCE_TYPES.SPIRIT_BOX, EVIDENCE_TYPES.GHOST_WRITING],
            []);
    }
}

export class Thaye extends Ghost {
    constructor(target: Element, display: Element){
        super(target, display, "Thaye",
            [EVIDENCE_TYPES.GHOST_ORBS, EVIDENCE_TYPES.GHOST_WRITING, EVIDENCE_TYPES.DOTS_PROJECTOR],
            [
                "The more time you spend near a Thaye the more it will 'age'",
                "At the begining of the round  the thaye will be super active and can hunt as early as 70% average sanity.",
                "At it's oldes age a thaye will become very unactive and can only hunt at 15% average sanity.",
                "A Thaye will changes its answers on the spirit box, when asked how old it is, as it continues to age.",
                "<a target='_blank' href='https://youtu.be/unEztO9Sa3Y'>More Info</a>"
                
            ]);
    }
}

export class Mimic extends Ghost {
    constructor(target: Element, display: Element){
        super(target, display, "The Mimic",
            [EVIDENCE_TYPES.SPIRIT_BOX, EVIDENCE_TYPES.FINGERPRINTS, EVIDENCE_TYPES.FREEZING_TEMPS, EVIDENCE_TYPES.GHOST_ORBS],
            [
                "Will randomly have the abilitys of different ghost types, and will change throughout the match.",
                "Weakness: Ghost orbs will always follow the mimic around rather then staying in its ghost room.",
                "<a target='_blank' href='https://youtu.be/uB3Wl_3xIq4'>More Info</a>"
            ],
            EVIDENCE_TYPES.GHOST_ORBS);
    }
}

export class Twins extends Ghost {
    constructor(target: Element, display: Element){
        super(target, display, "The Twins",
            [EVIDENCE_TYPES.EMF_LEVEL_FIVE, EVIDENCE_TYPES.SPIRIT_BOX, EVIDENCE_TYPES.FREEZING_TEMPS],
            [
                "Has two interaction and hunt ranges.",
                "Weakness: Depending on which range it hunts from will change its speed!",
                "<a target='_blank' href='https://youtu.be/o3RQnuz_FJY'>More Info</a>"
            ]);
    }
}

export class Wraith extends Ghost {
    constructor(target: Element, display: Element){
        super(target, display, "Wraith",
            [EVIDENCE_TYPES.EMF_LEVEL_FIVE, EVIDENCE_TYPES.SPIRIT_BOX, EVIDENCE_TYPES.DOTS_PROJECTOR],
            [
                "Weakness: A wraith will never step in salt."
            ]);
    }
}

export class Yokai extends Ghost {
    constructor(target: Element, display: Element){
        super(target, display, "Yokai",
            [EVIDENCE_TYPES.SPIRIT_BOX, EVIDENCE_TYPES.GHOST_ORBS, EVIDENCE_TYPES.DOTS_PROJECTOR],
            [
                "Can hunt at 80% average team sanity if someone is talking near it.",
                "Weakness: It can only sence player electronics at short distances.",
                "<a target='_blank' href='https://youtu.be/qT_KeGs_Qwc'>More Info</a>"
            ]);
    }
}

export class Yurei extends Ghost {
    constructor(target: Element, display: Element){
        super(target, display, "Yurei",
            [EVIDENCE_TYPES.GHOST_ORBS, EVIDENCE_TYPES.FREEZING_TEMPS, EVIDENCE_TYPES.DOTS_PROJECTOR],
            [
                "Has an increased chance of performing a ghost event.",
                "Has a chance of performing a hidden ghost event were the doors in a room will close like a ghost event.",
                "Weakness: Cannot leave the room it is in once it has been smudged for 90 seconds.",
                "<a target='_blank' href='https://youtu.be/zgVOekUoZ0E'>More Info</a>"
            ]);
    }
}