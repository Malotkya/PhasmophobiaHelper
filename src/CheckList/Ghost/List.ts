import Ghost from ".";
import { allGhosts } from "./data";
import { createElement as _, appendChildren } from "../../Util/Element";

export default class GhostList extends HTMLElement {
    private _target:HTMLElement;
    private _data:Array<Ghost>;
    private _removed:Array<Ghost>;

    constructor(displayTarget:HTMLElement) {
        super();
        this.className = "sub-section";
        this._target = displayTarget;

        this.addEventListener("click", (event:Event)=>{
            const target = (event.target as HTMLElement).closest("li") as Ghost;
            if(target)
                this.display(target)
        });

        this.reset();
    }

    sort() {
        this._data = this._data.sort((lhs:Ghost, rhs:Ghost)=>{
            let value = lhs.rawOrder() - rhs.rawOrder();
            if(value === 0){
                return lhs.name.localeCompare(rhs.name);
            }
            return value;
        });
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
        this._removed = [];

        for(let data of allGhosts){
            this._data.push(new Ghost(data));
        }
        this.update();
    }

    clear() {
        while(this._removed.length > 0)
            this._data.push(this._removed.pop());
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
        this._removed.push(this._data.splice(index, 1)[0]);
    }

    connectedCallback() {
        this.appendChild( _("h2", "Ghosts:") );
        this.appendChild( _("ul", {class:"ghost-list"}, this._data) );
    }

    disconnectedCallback() {
        this.innerHTML = "";
    }
}

customElements.define("ghost-list", GhostList)