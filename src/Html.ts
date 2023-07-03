export function createInputElements(target: HTMLElement): Array<HTMLInputElement|HTMLButtonElement>{
    const label: HTMLElement = document.createElement("label");
    label.textContent = "Evidence: ";
    label.setAttribute("for", "numEvidence");

    const numEvidence: HTMLInputElement = document.createElement("input");
    numEvidence.type = "number";
    numEvidence.max = "3";
    numEvidence.min = "1";

    label.appendChild(numEvidence);
    
    const btnReset: HTMLButtonElement = document.createElement("button");
    btnReset.textContent = "Reset";

    const div: HTMLElement = document.createElement("div");
    div.className = "input";
    div.appendChild(label);
    div.appendChild(btnReset);

    target.appendChild(div);
    return [
        numEvidence,
        btnReset
    ]
}