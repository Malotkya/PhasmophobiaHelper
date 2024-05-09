export function createElement(name:string, attributes:any = {}, ...children:Array<any>):HTMLElement {
    // If attribute could be content
    if(attributes instanceof HTMLElement || Array.isArray(attributes) || typeof attributes !== "object") {
        children.unshift(attributes);
        attributes = {};
    }

    const element = document.createElement(name);
    for(let name in attributes)
        element.setAttribute(name, String(attributes[name]));
    
    appendChildren(element, children);
    return element;
}

export function appendChildren(element:HTMLElement, children:Array<any>) {
    for(let child of children){
        if(Array.isArray(child)) {
            appendChildren(element, child);
        } else if(child instanceof HTMLElement) {
            element.appendChild(child);
        } else if(child !== undefined && child !== null){
            element.innerHTML += String(child);
        }
    }
}