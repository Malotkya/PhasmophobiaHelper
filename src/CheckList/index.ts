/** index.ts
 * 
 * @author Alex Malotky
 */
import { createInputElements, createEvidenceListElement, createGhostListElement, createDisplayTargetElement, addAlternativeElements} from "./Html";
import Evidence, {createAllEvidence} from "./Evidence";
import Ghost, {createAllGhosts} from "./Ghost";
import Phasmophobia from "./Phasmophobia";

export default async function createCheckList(): Promise<HTMLElement>{
    const element = document.createElement("div");
    element.id = "checklist-main";

    const [evidenceSectionElement, evidenceListElement] = createEvidenceListElement();
    const [ghostSectionElement, ghostListElement] = createGhostListElement();
    const [displaySectionElement, displayTargetElement] = createDisplayTargetElement();

    const ghostList = await createAllGhosts(ghostListElement, displayTargetElement);

    //Display First Ghost
    ghostList[0].display();

    const evidenceList = await createAllEvidence(evidenceListElement);
        
    //Display Everything
    element.appendChild(evidenceSectionElement);
    element.appendChild(ghostSectionElement);
    element.appendChild(displaySectionElement);

    //Create Inputs
    const [numEvidence, btnReset] = createInputElements(evidenceSectionElement);
    const alternativeList = addAlternativeElements(evidenceSectionElement);

    //Create Game
    const game = new Phasmophobia(evidenceList, ghostList, alternativeList, ghostListElement);
    
    //Evidence Number Change Event
    numEvidence.addEventListener("change", event=>{
        game.evidenceCount = Number(numEvidence.value);
        game.update();
    });
    numEvidence.value = game.evidenceCount.toString();
    
    //Reset Event
    btnReset.addEventListener("click", event=>{
        event.stopPropagation();
        game.reset();
    });

    //Update Event
    evidenceSectionElement.addEventListener("click", event=>{
        game.update();
    });

    return element;
}