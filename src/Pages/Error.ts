/** Make Error Message
 * 
 * Prints easy to read error message for html page.
 * 
 * @param {any|string} error 
 * @param {string|number} code
 * @returns {string}
 */
export default function makeErrorMessage(error: any|string, code?: string|number): HTMLElement{
    let message: string;
    if(typeof error === "string"){
        message = error;
    } else {
        message = error.message || "An unknown error occured!";
    }

    if(typeof code === "undefined") {
        code = error.code || "Error";
    }
    
    const element: HTMLElement = document.createElement("h2");
    element.className = "error";
    element.textContent = `${code}: ${message}`;

    return element;
}