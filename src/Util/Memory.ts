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

/** Memory Function
 * 
 * Defaults to "value" attribute if no attribute is specified.
 * 
 * @param element 
 * @param initValue 
 */
export default function Memory(element: HTMLElement, initValue?: string|attribute){
    let init: attribute;
    if(typeof initValue === "undefined"){
        init = {
            name: "value",
            value: ""
        };
    } else if (typeof initValue === "string"){
        init = {
            name: "value",
            value: initValue
        };
    } else {
        if(initValue.name === "")
            initValue.name = "value";
        init = initValue;
    }

    //Make sure element has an id.
    if(element.id.length !== 0){
        const key: string = `${element.id}:${init.name}`;

        element.addEventListener("change", event=>{
            localStorage.setItem(key, getValue(element, init.name));
        });

        
        let value:string = localStorage.getItem(key);
        if(value === null){
            value = init.value;
        }

        setValue(element, init.name, value);
        let event = new Event('change');
        element.dispatchEvent(event);
    } else {
        console.error("No id on element:");
        console.error(element);
    }
}

/** Get attribute value based on Element type and Attribute.
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

/** Set attribute value based on Element type and Attribute.
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
            if(element instanceof HTMLInputElement)
                element.checked = value === 'true';

        default:
            element.setAttribute(attribute, value);
    }
}
