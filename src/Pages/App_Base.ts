import makeErrorMessage from "./Error";

export const REMOVE_CHAR_REGEX: RegExp = /\/|\s+/gm;
export const REMOVE_WHITESPACE_REGEX: RegExp = /\s+/gm;

/** Base Application Class
 * 
 * This class is a layer of abstration between the application class and the window/dom elements.
 * 
 * @author Alex Malotky
 */
export default class App_Base{
    private _ready: Function;
    protected _routes: Map<string, HTMLElement>

    //HTML elements
    private _target: HTMLElement;

    constructor(window: any){

        //Dirty trick because typscript doesn't like window.route.
        if(window) {
            window.onpopstate = () => this._handler();
            window.route = () => this._route();
            window.onload = () => this._start();
        } else
            throw new Error("App needs window to work!");

        this._routes = new Map();
        this._target = document.querySelector("main");
    }

    /** Path Handler Function
     * 
     * Loads content, title, and description.
     */
    private _handler(): void{
        const location:string = window.location.pathname.replace(REMOVE_CHAR_REGEX, "");
        const element:HTMLElement = this._routes.get(location) || makeErrorMessage("Page not found");
        this._target.innerHTML = "";
        this._target.appendChild(element);
    }

    /** Route Clicked Function
     * 
     * This function currently only triggers on navbar clicks,
     * I am unsure if I will be adding this to other internal links.
     * 
     * @param {Event} event 
     */
    protected _route(event?: any): void{
        event = event || window.event;
        event.preventDefault();
        window.history.pushState({}, "", event.target.href);
        this._handler();
    }

    /** Start App Function
     * 
     */
    private _start(): void{
        this._handler();

        if(this._ready)
            this._ready();
    }

     /** On Ready Event Callback
     * 
     * @param {Function} callback
     */
    public onReady(callback: Function): void{
        if(typeof callback !== "function")
            throw new Error("Callback must be a function!");
            
        this._ready = callback;
    }
}