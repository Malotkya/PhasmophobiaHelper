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
function createListElement(listId:string, title: string): Array<HTMLElement>{
    const header: HTMLElement = document.createElement("h2");
    header.textContent = title;

    const list: HTMLElement = document.createElement("ul");
    list.id = listId;

    const section: HTMLElement = document.createElement("section");
    section.appendChild(header);
    section.appendChild(list);

    return [
        section,
        list
    ];
}

function createArticleListElement(articleId: string, listId:string, title: string): Array<HTMLElement>{
    const [section, list] = createListElement(listId, title);

    const article: HTMLElement = document.createElement("article");
    article.id = articleId;
    article.appendChild(section);

    return [
        article,
        list
    ]
}

/** Create Evidence List Element
 * 
 * @returns {[HTMLElement, HTMLElement]}
 */
export function createEvidenceListElement(): Array<HTMLElement>{
    return createArticleListElement("evidence-section", "evidence-list", "Evidence:")
}

/** Create Alternative Evidence Input Elements
 * 
 * @returns {[HTMLElement, HTMLElement]}
 */
export function addAlternativeElements(target: HTMLElement): Array<HTMLElement>{
    const [speedSection, speedList] = createSpeedListElement();
    const [huntSection, huntList] = createHuntListElement();

    target.appendChild(speedSection);
    target.appendChild(huntSection);

    return [
        speedList,
        huntList
    ];
}

/** Create Ghost List Element
 * 
 * @returns {[HTMLElement, HTMLElement]}
 */
export function createGhostListElement(): Array<HTMLElement>{
    return createArticleListElement("ghost-section", "ghost-list", "Ghosts:");
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

function createHuntListElement():Array<HTMLElement>{
    return createListElement("hunt-list", "Hunts:");
}

function createSpeedListElement():Array<HTMLElement>{
    return createListElement("speed-list", "Speed:");
}