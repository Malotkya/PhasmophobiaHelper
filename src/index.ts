/** index.ts
 * 
 * @author Alex Malotky
 */
import Phasmophobia from "./Phasmophobia";

//On Load Event
window.onload = () => {

    //Find all targets for game.
    let evidenceTarget = document.querySelector("#evidence-list");
    let ghostTarget = document.querySelector("#ghost-list");
    let displayTarget = document.querySelector("#display");

    if(evidenceTarget && ghostTarget && displayTarget){

        //Create Game
        let game = new Phasmophobia(evidenceTarget, ghostTarget, displayTarget);

        //Reset Button
        let btnReset = document.querySelector("#btnReset");
        if(btnReset){
            btnReset.addEventListener("click", event=>game.reset());
        }
        
        //Evidence Count Selector
        let numEvidence:HTMLInputElement = document.querySelector("#numEvidence");
        if(numEvidence){
            numEvidence.addEventListener("change", event=>game.evidenceCount = Number(numEvidence.value))
            numEvidence.value = game.evidenceCount.toString();
        }

    //Panik!!!
    } else {
        alert("Critical Error: couldn't find main elements!");
    }
}