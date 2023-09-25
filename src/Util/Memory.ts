/** Memory.ts
 * 
 * Used to persist desired attributes of HTMLElements
 * 
 * @author Alex Malotky
 */

/** Attribute Interface
 * 
 */
interface attribute {
    name: string,
    value: string
}

/** Persist Attributes Function
 * 
 * Defaults to "value" attribute if no attribute is specified.
 * 
 * @param element 
 * @param initValue 
 */
export function persistAttribute(element: HTMLElement, initValue?: string|attribute){
    let att: attribute;
    if(typeof initValue === "undefined"){
        att = {
            name: "value",
            value: ""
        };
    } else if (typeof initValue === "string"){
        att = {
            name: "value",
            value: initValue
        };
    } else {
        if(initValue.name === "")
            initValue.name = "value";
        att = initValue;
    }

    //Make sure element has an id.
    if(element.id.length !== 0){
        const key: string = `${element.id}:${att.name}`;

        element.addEventListener("change", event=>{
            localStorage.setItem(key, getValue(element, att.name));
        });

        
        let value:string = localStorage.getItem(key);
        if(value === null){
            value = att.value;
        }

        setValue(element, att.name, value);
        let event = new Event('change');
        element.dispatchEvent(event);
    } else {
        console.error("No id on element:");
        console.error(element);
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
            if(element instanceof HTMLInputElement || element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement)
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
            if(element instanceof HTMLInputElement || element instanceof HTMLSelectElement) {
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