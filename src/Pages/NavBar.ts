/** Navigation Bar Class
 * 
 * @author Alex Malotky
 */
export default class NavBar{
    private _list: HTMLElement;
    private _home: HTMLElement;

    /** Constructor
     * 
     */
    constructor(){

        this._list = document.querySelector("nav");

        if(typeof this._list === "undefined")
            throw new Error("Unable to find NavBar!");
    }

    /** Routeing Event Listener Callback
     * 
     * Used to call app._route() when navbar is clicked.
     * 
     * @param {EventListener} callback 
     */
    public routeEvent(callback: EventListener): void{
        if(typeof callback !== "function")
            throw new Error("Event Listener must be a Function");

        this._list.addEventListener("click", callback);
    }

    /** Add link to router in navigation bar.
     * 
     * @param {string} name
     * @param {HTMLElement} element
     */
    public add(name:string, element: HTMLElement):void{
        let link = document.createElement("a");
        link.href = "/" + name.replace(/\s+/gm, "");
        link.textContent = name;

        this._list.appendChild(link);
    }
}