/** Memory.ts
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
    [name:string]:string
}

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
        console.error("No id on element:\n%o", element);
    } else {
        const key:string = `${element.id}:attributes`;
        const value:string = localStorage.getItem(key);
        let dispatch:Event|null = null;
        if(value){
            initValues = JSON.parse(value);
            dispatch = new Event('change');
        }

        for(let name in initValues){
            setValue(element, name, initValues[name]);
        }
        if(dispatch)
            element.dispatchEvent(dispatch);

        element.addEventListener("change", event=>{
            const att:attributes = {};
            for(let name in initValues)
                att[name] = getValue(element, name);
            
            localStorage.setItem(key, JSON.stringify(att));
        });
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
                element.checked = value === 'true';
                break;
            }
                

        default:
            element.setAttribute(attribute, value);
    }
}

/** Cache Database Function
 * 
 * @param {string} key 
 * @param {Function} download 
 * @returns {any}
 */
export async function cache(key: string, download: Function):Promise<any>{
    const today:string = new Date().toLocaleDateString();

    //Update
    if(window.localStorage.getItem(`${key}:lastUpdate`) !== today){
        const data:any = await download();
        window.localStorage.setItem(`${key}:lastUpdate`, today);
        window.localStorage.setItem(`${key}:data`, JSON.stringify(data));
        return data;
    }

    return JSON.parse(window.localStorage.getItem(`${key}:data`));
}