import NavBar from "./NavBar";
import App_Base from "./App_Base";

/** Application Class
 * 
 * @author Alex Malotky
 */
export default class App extends App_Base {
    private _navbar:NavBar;

    constructor(){
        //Dirty trick for typscript
        super(window);

        this._navbar = new NavBar();
        this._navbar.routeEvent(event=>this._route(event));
    }

    /** Add Router to App
     * 
     * @param {string} name 
     * @param {HTMLElement} element 
     */
    public add(name: string, element: HTMLElement): void{
        if( typeof name !== "string" )
            throw new Error("Name must be a String!");

        if( !(element instanceof HTMLElement) )
            throw new Error("Element must be an Html Element!");

        if(name !== "")
            this._navbar.add(name, element);
        this._routes.set(name.replace(/\s+/gm, ""), element);
    }

    /** Public Getter for Route Function
     * 
     * Made this public so a Router could get access to the route function
     * to prevent a reload when clicking on a link.
     */
    public get routeFunction(): (event?:any)=>void{
        return this._route;
    }
}