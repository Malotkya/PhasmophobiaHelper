import * as Icons from "./UnicodeIcons";

export const EVIDENCE_TYPES = {
    DOTS_PROJECTOR: "Dots Projector", 
    EMF_LEVEL_FIVE: "EMF Level 5",
    FREEZING_TEMPS: "Freezing",
    FINGERPRINTS: "Fingerprints",
    GHOST_ORBS: "Ghost Orbs",
    GHOST_WRITING: "Ghost Writing",
    SPIRIT_BOX: "Spirit Box"
};

export default class Evidence{
    private _name: Element;
    private _btnInclude: HTMLElement;
    private _btnExclude: HTMLElement;
    private _btnReset: HTMLElement;
    
    private _element: HTMLElement;

    constructor(name: string, target: Element){
        this._name = document.createElement("span");
        this._name.textContent = name;
        this._name.className = "name";

        this._btnInclude = document.createElement("button");
        this._btnInclude.textContent = Icons.CHECK_MARK;
        this._btnInclude.className = "include";

        this._btnExclude = document.createElement("button");
        this._btnExclude.textContent = Icons.EX;
        this._btnExclude.className = "exclude";

        this._btnReset = document.createElement("button");
        this._btnReset.textContent = Icons.RESET;
        this._btnReset.className = "reset";
        this._btnReset.style.display = "none";

        this._element = document.createElement("li");
        this._element.className = "evidence";
        this._element.appendChild(this._name);
        this._element.appendChild(this._btnInclude);
        this._element.appendChild(this._btnExclude);
        this._element.appendChild(this._btnReset);

        this.reset();
        target.appendChild(this._element);
    }

    public found(){
        this._element.classList.add("yes");
        this._element.classList.remove("no");
        this._btnReset.style.display = "";
        this._btnExclude.style.display = "";
        this._btnInclude.style.display = "none";
    }

    public notFound(){
        this._element.classList.add("no");
        this._element.classList.remove("yes");
        this._btnReset.style.display = "";
        this._btnExclude.style.display = "none";
        this._btnInclude.style.display = "";
    }

    public reset(){
        this._element.classList.remove("yes");
        this._element.classList.remove("no");
        this._btnReset.style.display = "none";
        this._btnExclude.style.display = "";
        this._btnInclude.style.display = "";
    }

    get includeButton(){
        return this._btnInclude;
    }

    get excludeButton(){
        return this._btnExclude;
    }

    get resetButton(){
        return this._btnReset;
    }

    get name(){
        return this._name.textContent;
    }

    get style(){
        return this._element.style;
    }
}

export function createAllEvidence(target: Element): Array<Evidence>{
    return [
        new Evidence(EVIDENCE_TYPES.DOTS_PROJECTOR, target),
        new Evidence(EVIDENCE_TYPES.EMF_LEVEL_FIVE, target),
        new Evidence(EVIDENCE_TYPES.FREEZING_TEMPS, target),
        new Evidence(EVIDENCE_TYPES.FINGERPRINTS, target),
        new Evidence(EVIDENCE_TYPES.GHOST_ORBS, target),
        new Evidence(EVIDENCE_TYPES.GHOST_WRITING, target),
        new Evidence(EVIDENCE_TYPES.SPIRIT_BOX, target),
    ];
}