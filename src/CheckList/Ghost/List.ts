import Ghost from ".";
import { allGhosts } from "./data";
import { createElement as _, appendChildren } from "../../Util/Element";

export default class GhostList extends HTMLElement {
    private _target:HTMLElement;
    private _data:Array<Ghost>;

    constructor(displayTarget:HTMLElement) {
        super();
        this.className = "sub-section";
        this._target = displayTarget;

        this.addEventListener("click", (event:Event)=>{
            const target = (event.target as HTMLElement).closest("ghost-item") as Ghost;
            this.display(target)
        });

        this.reset();
    }

    update() {
        const list = this.querySelector("ul");
        if(list){
            list.innerHTML = "";
            appendChildren(list, this._data);
        }
        this.display();
    }
    
    reset() {
        this._data = [];

        for(let data of allGhosts){
            this._data.push(new Ghost(data));
        }
        this.display();
    }

    private display(target?:Ghost|null){
        if(!(target))
            target = this.at(0);
        target.display(this._target);
    }

    at(index:number):Ghost{
        return this._data[index];
    }

    get length():number {
        return this._data.length;
    }

    pull(index:number):void {
        this._data.slice(index, 1);
    }

    connectedCallback() {
        this.appendChild( _("h2", "Ghosts:") );
        this.appendChild( _("ul", {class:"ghost-list"}, this._data) );
    }

    disconectedCallback() {
        this.innerHTML = "";
    }
}

customElements.define("ghost-list", GhostList)