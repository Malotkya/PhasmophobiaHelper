/** index.ts
 * 
 * @author Alex Malotky
 */
import CheckList from "./CheckList";
import { createInputElements, createEvidenceListElement, createGhostListElement, createDisplayTargetElement, addAlternativeElements} from "./Html";
import Evidence, {createAllEvidence} from "./Evidence";
import Ghost, {createAllGhosts} from "./Ghost";
import makeInterface from "./Sound";
import alternative from "./Alternative";

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

            //Create Game
            const checkList = new CheckList(evidenceList, ghostList);

            //Create Inputs
            const [numEvidence, btnReset] = createInputElements(header);
            const [selHunt, selSpeed] = addAlternativeElements(evidenceSectionElement);

            //Reset Event
            btnReset.addEventListener("click", ()=>{
                checkList.reset();
                alternative.reset();
                selHunt.value = "0";
                selSpeed.value = "0";

                ghostListElement.innerHTML = "";
                for(let ghost of ghostList){
                    ghostListElement.appendChild(ghost.element)
                }

                ghostList[0].display();
            });

            //Evidence Number Change Event
            numEvidence.addEventListener("change", event=>{
                checkList.evidenceCount = Number(numEvidence.value)
            });

            numEvidence.value = checkList.evidenceCount.toString();

            header.appendChild(makeInterface());

            //Update Event
            evidenceSectionElement.addEventListener("click", ()=>{
                let list = ghostList;
                list = checkList.update(list);
                list = alternative.update(list);

                //Sort the list
                list.sort((lhs:Ghost,rhs:Ghost):number=>{
                    if(lhs.order === rhs.order)
                        return lhs.name.localeCompare(rhs.name);
                    return lhs.order - rhs.order;
                });

                ghostListElement.innerHTML = "";
                for(let ghost of list){
                    ghostListElement.appendChild(ghost.element);
                }

                list[0].display();
            });
        });
    });
}