import { createSpeedSelector, createHuntSelector } from "./Alternative";

/** Create Input HTML Elements
 * 
 * @param {HTMLElement} section 
 * @returns {[HTMLInputElement, HTMLButtonElement]} [numEvidenceInput, btnReset]
 */
export function createInputElements(section: HTMLElement): Array<HTMLInputElement|HTMLButtonElement>{
    const target = section.querySelector("section");

    const numEvidence: HTMLInputElement = document.createElement("input");
    numEvidence.type = "number";
    numEvidence.max = "3";
    numEvidence.min = "0";
    
    const btnReset: HTMLButtonElement = document.createElement("button");
    btnReset.textContent = "Reset";
    btnReset.id = "btnReset";

    const div: HTMLElement = document.createElement("div");
    div.className = "input";
    div.appendChild(numEvidence);
    div.appendChild(btnReset);

    target.insertBefore(div, target.childNodes[1]);
    return [
        numEvidence,
        btnReset
    ];
}

/** Create List Display ELements
 * 
 * @param {string} articleId
 * @param {string} listId
 * @param {string} title
 * @returns {[HTMLElement, HTMLElement]} [articleElement, unorderListElement]
 */
function createListElement(articleId: string, listId:string, title: string): Array<HTMLElement>{
    const header: HTMLElement = document.createElement("h2");
    header.textContent = title;

    const list: HTMLElement = document.createElement("ul");
    list.id = listId;

    const section: HTMLElement = document.createElement("section");
    section.appendChild(header);
    section.appendChild(list);

    const article: HTMLElement = document.createElement("article");
    article.id = articleId;
    article.appendChild(section);

    return [
        article,
        list
    ];
}

/** Create Evidence List Element
 * 
 * @returns {[HTMLElement, HTMLElement]}
 */
export function createEvidenceListElement(): Array<HTMLElement>{
    return createListElement("evidence-section", "evidence-list", "Evidence:");
}

/** Create Alternative Evidence Input Elements
 * 
 * @returns {[HTMLElement, HTMLElement]}
 */
export function addAlternativeElements(target: HTMLElement): Array<HTMLSelectElement>{
    const [huntElement, huntInput] = createHuntSelector();
    const [speedElement, speedInput] = createSpeedSelector();

    const alternative = document.createElement("section");
    alternative.id = "alternative-list";
    alternative.appendChild(huntElement);
    alternative.appendChild(speedElement);

    target.appendChild(alternative);

    return [
        huntInput as HTMLSelectElement,
        speedInput as HTMLSelectElement
    ]
}

/** Create Ghost List Element
 * 
 * @returns {[HTMLElement, HTMLElement]}
 */
export function createGhostListElement(): Array<HTMLElement>{
    return createListElement("ghost-section", "ghost-list", "Ghosts:");
}

/** Create Display Target Element
 * 
 * @returns {[HTMLElement, HTMLElement]}
 */
export function createDisplayTargetElement(): Array<HTMLElement>{
    const section = document.createElement("section");
    section.id = "display";

    const article = document.createElement("article");
    article.id = "display-section";
    article.appendChild(section);

    return [
        article,
        section
    ];
}