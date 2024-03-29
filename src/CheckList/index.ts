/** index.ts
 * 
 * @author Alex Malotky
 */
import { createInputElements, createEvidenceListElement, createGhostListElement, createDisplayTargetElement, addAlternativeElements} from "./Html";
import Evidence, {createAllEvidence} from "./Evidence";
import Alternative, {createAllHuntEvidence, createAllSpeedEvidence} from "./Alternative";
import Ghost, {createAllGhosts} from "./Ghost";
import Phasmophobia from "./Phasmophobia";
import { generateSound } from "../Util/Sound";
import { persistAttribute } from "../Util/Memory";

//Main Check List Element
const checkList = document.createElement("div");
    checkList.id = "checklist-main";

//Other Check List Elements
const [evidenceSectionElement, evidenceListElement] = createEvidenceListElement();
const [ghostSectionElement, ghostListElement] = createGhostListElement();
const [displaySectionElement, displayTargetElement] = createDisplayTargetElement();
const [speedListElement, huntListElement] = addAlternativeElements(evidenceSectionElement);

createAllGhosts(ghostListElement, displayTargetElement).then((ghostList:Array<Ghost>)=>{
    //Display First Ghost
    ghostList[0].display();

    createAllEvidence(evidenceListElement).then((evidenceList:Array<Evidence>)=>{

        //Create Alternative Evidence
        const speedList = createAllSpeedEvidence(speedListElement);
        const huntList  = createAllHuntEvidence(huntListElement);

        //Display Everything
        checkList.appendChild(evidenceSectionElement);
        checkList.appendChild(ghostSectionElement);
        checkList.appendChild(displaySectionElement);

        //Create Inputs
        const [numEvidence, btnReset] = createInputElements(evidenceSectionElement);

        //Create Game
        const game = new Phasmophobia(evidenceList, ghostList, speedList, huntList, ghostListElement);
            
        //Evidence Number Change Event
        numEvidence.addEventListener("change", event=>{
            game.evidenceCount = Number(numEvidence.value);
            game.update();
        });
        numEvidence.id = "numEvidence";
        persistAttribute(numEvidence, game.evidenceCount.toString());
            
        //Reset Event
        btnReset.addEventListener("click", event=>{
            event.stopPropagation();
            game.reset();
        });

        //Update Event
        evidenceSectionElement.addEventListener("click", event=>{
            game.update();
        });

        //Sound Event
        displayTargetElement.addEventListener("click", event=>{
            const target:Element = (<Element>event.target);
            if(target.className === "speed"){
                event.stopPropagation();
                const speed: number = Number(target.getAttribute("value"));
                if(isNaN(speed)){
                    console.warn(target.getAttribute("value") + " is not a number!");
                } else {
                    generateSound(speed);
                }
            }
        });

    }); //End Create Evidence List

}); //End Create Ghost List

export default function CheckList(): HTMLElement{
    return checkList;
}