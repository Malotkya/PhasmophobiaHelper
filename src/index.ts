/** index.ts
 * 
 * @author Alex Malotky
 */
import { createInputElements, createEvidenceListElement, createGhostListElement, createDisplayTargetElement, addAlternativeElements} from "./Html";
import Evidence, {createAllEvidence} from "./Evidence";
import Ghost, {createAllGhosts} from "./Ghost";
import makeInterface from "./Sound";
import Phasmophobia from "./Phasmophobia";

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
        ghostList[0].display();

        createAllEvidence(evidenceListElement).then((evidenceList: Array<Evidence>)=>{

            //Display Everything
            main.appendChild(evidenceSectionElement);
            main.appendChild(ghostSectionElement);
            main.appendChild(displaySectionElement);

            //Create Inputs
            const [numEvidence, btnReset] = createInputElements(header);
            const alternativeList = addAlternativeElements(evidenceSectionElement);
            header.appendChild(makeInterface());

            //Create Game
            const game = new Phasmophobia(evidenceList, ghostList, alternativeList, ghostListElement);
            
            //Evidence Number Change Event
            numEvidence.addEventListener("change", event=>{
                game.evidenceCount = Number(numEvidence.value);
                game.update();
            });
            numEvidence.value = game.evidenceCount.toString();
            
            //Reset Event
            btnReset.addEventListener("click", ()=>{
                game.reset();
            });

            //Update Event
            evidenceSectionElement.addEventListener("click", ()=>{
                game.update();
            });
        });
    });
}