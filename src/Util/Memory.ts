/** /Util/Memory
 * 
 * Used to persist desired attributes of HTMLElements
 * 
 * @author Alex Malotky
 */
import HTMLToggleInputElement from "./HTMLToggleInput";

/** Attribute Interface
 * 
 */
interface attributes{
    [name:string]:string|number
}

/** Persist Key
 * 
 * @param {string} id 
 * @returns {string}
 */
const KEY = (id:string):string => `${id}:attributes`;

/** Persist Map
 * 
 */
const persistMap: Map<string, Array<string>> = new Map();

/** Perseist Event Listener
 * 
 */
document.addEventListener("change", function PersistListener(event:Event){
    const target = event.target as HTMLElement;

    if(target.id && persistMap.has(target.id)){
        const att:attributes = {};

        for(let name of persistMap.get(target.id))
            att[name] = getValue(target, name);
        
        localStorage.setItem(KEY(target.id), JSON.stringify(att));
    }
})

/** Persist Attributes Function
 * 
 * Defaults to "value" attribute if no attribute is specified.
 * 
 * @param element 
 * @param initValue 
 */
export function persistAttributes(element: HTMLElement, initValues: attributes){
    if(typeof initValues !== "object")
        throw new TypeError("initValues is maleformed!");

    if( !(element instanceof HTMLElement) )
        throw new TypeError("element must be an HTMLElement!");

    if( element.id.length === 0) {
        console.warn("No id on element to persist:\n%o", element);
    } else {
        const value:string = localStorage.getItem(KEY(element.id));
        if(value){
            initValues = JSON.parse(value);
        }
        for(let name in initValues){
            setValue(element, name, String(initValues[name]));
        }
        element.dispatchEvent(new Event('change'));
        persistMap.set(element.id, Object.getOwnPropertyNames(initValues));
    }
}

/** Get attribute value based on Element type and Attribute type.
 * 
 * @param {HTMLElement} element 
 * @param {string} attribute 
 * @returns {string}
 */
function getValue(element: HTMLElement, attribute: string): string{
    switch(attribute){
        case "value":
            if(element instanceof HTMLInputElement || element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement || element instanceof HTMLToggleInputElement)
                return element.value;

        case "checked":
            if(element instanceof HTMLInputElement)
                return String(element.checked);

        default:
            return element.getAttribute(attribute);
    }
}

/** Set attribute value based on Element type and Attribute type.
 * 
 * @param {HTMLElement} element 
 * @param {string} attribute 
 * @param {string} value 
 */
function setValue(element: HTMLElement, attribute:string, value:string): void{
    switch(attribute){
        case "value":
            if(element instanceof HTMLInputElement || element instanceof HTMLSelectElement || element instanceof HTMLToggleInputElement) {
                element.value = value;
                break;
            }

        case "checked":
            if(element instanceof HTMLInputElement){
                element.checked = value.toLowerCase() === "true";
                break;
            }
                

        default:
            element.setAttribute(attribute, value);
    }
}