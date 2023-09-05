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
            btnReset.addEventListener("click", ()=>{
                game.reset();
                ghostList[0].display(displayTargetElement);
            });
            numEvidence.addEventListener("change", event=>game.evidenceCount = Number(numEvidence.value))
            numEvidence.value = game.evidenceCount.toString();

            header.appendChild(makeInterface());
        });

        evidenceListElement.addEventListener("click", ()=>{
            ghostList[0].display(displayTargetElement);
        });
    });
}