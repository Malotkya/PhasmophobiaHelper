/** index.ts
 * 
 * @author Alex Malotky
 */
import Phasmophobia from "./Phasmophobia";
import { createInputElements, createEvidenceListELement, createGhostListELement, createDisplayTargetElement } from "./Html";

//On Load Event
window.onload = () => {

    //Find Main Element
    const main = document.querySelector("main");

    main.innerHTML = "";

    //Create Main Child Elements
    const evidenceTarget: HTMLElement = createEvidenceListELement(main);
    const ghostTarget: HTMLElement    = createGhostListELement(main);
    const displayTarget: HTMLElement  = createDisplayTargetElement(main);

    //Create Game
    let game = new Phasmophobia(evidenceTarget, ghostTarget, displayTarget);

    //Create Inputs
    const [numEvidence, btnReset] = createInputElements(document.querySelector("header"));
    btnReset.addEventListener("click", event=>game.reset());
    numEvidence.addEventListener("change", event=>game.evidenceCount = Number(numEvidence.value))
    numEvidence.value = game.evidenceCount.toString();
}