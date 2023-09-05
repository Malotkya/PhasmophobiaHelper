/** index.ts
 * 
 * @author Alex Malotky
 */
import Phasmophobia from "./Phasmophobia";
import { createInputElements, createEvidenceListElement, createGhostListElement, createDisplayTargetElement } from "./Html";
import Evidence, {createAllEvidence} from "./Evidence";
import Ghost, {createAllGhosts} from "./Ghost";
import makeInterface from "./Sound";

//On Load Event
window.onload = () => {

    //Find Main Element
    const main: HTMLElement = document.querySelector("main");
    const header: HTMLElement = document.querySelector("header");
    main.innerHTML = "";

    const [evidenceSectionElement, evidenceListElement] = createEvidenceListElement();
    const [ghostSectionElement, ghostListElement] = createGhostListElement();
    const [displaySectionElement, displayTargetElement] = createDisplayTargetElement();

    createAllGhosts(ghostListElement, displayTargetElement).then((ghostList:Array<Ghost>)=>{

        //Display First Ghost
        ghostList[0].display(displayTargetElement);

        createAllEvidence(evidenceListElement).then((evidenceList: Array<Evidence>)=>{

            //Display Everything
            main.appendChild(evidenceSectionElement);
            main.appendChild(ghostSectionElement);
            main.appendChild(displaySectionElement);

            //Create Game
            let game = new Phasmophobia(evidenceList, ghostList);

            //Create Inputs
            const [numEvidence, btnReset] = createInputElements(header);
            btnReset.addEventListener("click", event=>game.reset());
            numEvidence.addEventListener("change", event=>game.evidenceCount = Number(numEvidence.value))
            numEvidence.value = game.evidenceCount.toString();

            header.appendChild(makeInterface());
        });

        evidenceListElement.addEventListener("click", ()=>{
            ghostList[0].display(displayTargetElement);
        });
    });
}

/** Find Current Ghost on Display
 * 
 * Will return null if the ghost can't be found.
 * 
 * @param {Array<Ghost>} list 
 * @param {Element} current 
 * @returns {Ghost}
 */
function findCurrentGhost(list: Array<Ghost>, current: Element): Ghost{
    let nameNode = current.querySelector(".name");
    if(nameNode){
        let name:string = nameNode.textContent
        for(let ghost of list){
            if(ghost.name === name)
                return ghost;
        }
    }

    return null;
}

/** Find the Top Ghost
 * 
 * Looks for the top ghost of the list, and excludes ghosts that are crossed off.
 * Will return null if all ghosts are crossed off.
 * Assumes list is in alphabetical order!
 * 
 * @param {Array<Ghost>} list 
 * @returns {Ghost}
 */
function findTopGhost(list: Array<Ghost>): Ghost{
    let top: Ghost = null;
    let index:number = 0;

    //Loop through finding start.
    while(top!==null && index<list.length){
        if(!list[index].isCorssedOff())
            top = list[index];

        index++;
    }

    //Loop thorugh finding top.
    while(index<list.length){
        if(top.order > list[index].order) {
            if(!list[index].isCorssedOff())
                top = list[index];
        }
        index++;
    }

    return top;
}