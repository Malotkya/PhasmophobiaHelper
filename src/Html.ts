import { createSpeedSelector, createHuntSelector } from "./Alternative";

/** Create Input HTML Elements
 * 
 * @param {HTMLElement} target 
 * @returns {[HTMLInputElement, HTMLButtonElement]} [numEvidenceInput, btnReset]
 */
export function createInputElements(target: HTMLElement): Array<HTMLInputElement|HTMLButtonElement>{
    const label: HTMLElement = document.createElement("label");
    label.textContent = "Evidence: ";
    label.setAttribute("for", "numEvidence");

    const numEvidence: HTMLInputElement = document.createElement("input");
    numEvidence.type = "number";
    numEvidence.max = "3";
    numEvidence.min = "1";

    label.appendChild(numEvidence);
    
    const btnReset: HTMLButtonElement = document.createElement("button");
    btnReset.textContent = "Reset";
    btnReset.id = "btnReset";

    const div: HTMLElement = document.createElement("div");
    div.className = "input";
    div.appendChild(label);
    div.appendChild(btnReset);

    target.appendChild(div);
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
    const [section, list] = createListElement("evidence-section", "evidence-list", "Evidence:");

    const alternative = document.createElement("section");
    alternative.id = "alternative-list";
    alternative.appendChild(createHuntSelector());
    alternative.appendChild(createSpeedSelector());
    section.appendChild(alternative);

    return [
        section,
        list
    ];
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