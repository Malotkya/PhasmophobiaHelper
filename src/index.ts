/** index.ts
 * 
 * @author Alex Malotky
 */
import Phasmophobia from "./Phasmophobia";
import { createInputElements } from "./Html";

//On Load Event
window.onload = () => {

    //Find all targets for game.
    let evidenceTarget = document.querySelector("#evidence-list");
    let ghostTarget = document.querySelector("#ghost-list");
    let displayTarget = document.querySelector("#display");

    if(evidenceTarget && ghostTarget && displayTarget){

        //Create Game
        let game = new Phasmophobia(evidenceTarget, ghostTarget, displayTarget);

        const [numEvidence, btnReset] = createInputElements(document.querySelector("header"));
        btnReset.addEventListener("click", event=>game.reset());
        numEvidence.addEventListener("change", event=>game.evidenceCount = Number(numEvidence.value))
        numEvidence.value = game.evidenceCount.toString();

    //Panik!!!
    } else {
        alert("Critical Error: couldn't find main elements!");
    }
}