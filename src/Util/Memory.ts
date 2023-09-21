interface attribute {
    name: string,
    value: string
}

export default function Memory(element: HTMLInputElement|HTMLSelectElement, initValue?: string|attribute){
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
        init = initValue;
    }

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
    }
}

function getValue(element: HTMLInputElement|HTMLSelectElement, attribute: string): string{
    switch(attribute){
        case "value":
            return element.value;

        case "checked":
            if(element instanceof HTMLInputElement)
                return String(element.checked);
            
            console.warn("No attribute 'checked' on HTMLSelectElement");
            return  String(false);

        default:
            console.warn(`Unknown attribute '${attribute}' for element '${element.id}'!`);
            return (element as any)[attribute];
    }
}

function setValue(element: HTMLInputElement|HTMLSelectElement, attribute:string, value:string): void{
    switch(attribute){
        case "value":
            element.value = value;
            break;

        case "checked":
            if(element instanceof HTMLInputElement)
                element.checked = value === 'true';
            else
                console.warn("No attribute 'checked' on HTMLSelectElement");
            break;

        default:
            console.warn(`Unknown attribute '${attribute}' for element '${element.id}'!`);
            (element as any)[attribute] = value;
    }
}
