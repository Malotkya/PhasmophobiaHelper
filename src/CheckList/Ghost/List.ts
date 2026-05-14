import Ghost from ".";
import { AllGhosts } from "@Data/Ghosts";
import { createElement as _ } from "../../Util/Element";
import type DisplayElement from "../Display";

export default class GhostList extends HTMLElement {
    private _display:DisplayElement;
    private _list:HTMLUListElement;

    constructor(displayTarget:DisplayElement) {
        super();
        this.className = "sub-section";
        this._display = displayTarget;
        this._list = _("ul", {class:"ghost-list"},
            AllGhosts
                .sort((a, b)=>a.name.localeCompare(b.name))
                .map(g => new Ghost(g))
        );

        this.addEventListener("click", (event:Event)=>{
            const target = (event.target as HTMLElement).closest("[role=listitem]") as Ghost;
            if(target)
                this.display(target)
        });

        this.reset();
    }

    private get list():Ghost[] {
        return Array.from(this._list.children) as Ghost[];
    }

    [Symbol.iterator]() {
        return this._list.children[Symbol.iterator]() as ArrayIterator<Ghost>;
    }

    update() {
        this._list.replaceChildren( ...(this.list
            .sort((a, b)=>{
                const value = a.order - b.order;
                if(value === 0) 
                    return a.name.localeCompare(b.name);
                
                return value;
            })
        ));
        this.display();
    }
    
    reset() {
        this._list.replaceChildren(...(this.list
            .filter(g=>{
                g.reset();
                return true;
            }).sort((a, b)=>a.name.localeCompare(b.name))
        ));
        this.display();
    }

    private display(target?:Ghost|null){
        if(!target)
            target = this.at(0);

        this._display.display(target);
    }

    at(index:number):Ghost|null{
        const length = this._list.children.length;
        if( length === 0)
            return null;

        if(index < 0) {
            while(index < 0) {
                index += length;
            }
        } else if (index >= length) {
            index = index % length;
        }
        
        return this._list.children[index] as Ghost;
    }

    get length():number {
        return this._list.children.length;
    }

    connectedCallback() {
        this.appendChild( _("h2", "Ghosts:") );
        this.appendChild( this._list );
    }

    disconnectedCallback() {
        this.innerHTML = "";
    }
}

customElements.define("ghost-list", GhostList)