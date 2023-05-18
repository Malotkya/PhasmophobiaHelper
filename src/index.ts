import Phasmophobia from "./Phasmophobia";

window.onload = () => {
    let evidenceTarget = document.querySelector("#evidence-list");
    let ghostTarget = document.querySelector("#ghost-list");
    let displayTarget = document.querySelector("#display");

    if(evidenceTarget && ghostTarget && displayTarget){
        let game = new Phasmophobia(evidenceTarget, ghostTarget, displayTarget);

        let btnReset = document.querySelector("#btnReset");
        if(btnReset){
            btnReset.addEventListener("click", event=>game.reset());
        }
        
        let numEvidence:HTMLInputElement = document.querySelector("#numEvidence");
        if(numEvidence){
            numEvidence.addEventListener("change", event=>game.evidenceCount = Number(numEvidence.value))
            numEvidence.value = game.evidenceCount.toString();
        }
    } else {
        alert("Critical Error: couldn't find main elements!");
    }
}