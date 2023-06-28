import Ghost, { createAllGhosts } from "./Ghost";
import Evidence, { createAllEvidence } from "./Evidence";
import CustomSet from "./CustomSet";

const DEFAULT_EVIDENCE_COUNT = 3;

export default class Phasmophobia {
    private _ghostList: Array<Ghost>
    private _evidenceList: Array<Evidence>

    private _induction: CustomSet<Evidence>; 
    private _deduction: Set<Evidence>;

    private _evidenceThreashold;

    constructor(evidenceTarget: Element, ghostTarget: Element, displayTarget: Element){

        this._evidenceList = createAllEvidence(evidenceTarget);
        this._ghostList = createAllGhosts(ghostTarget, displayTarget);

        this._induction = new CustomSet(DEFAULT_EVIDENCE_COUNT);
        this._deduction = new Set();
        
        this._ghostList[0].display(displayTarget);
        this._evidenceThreashold = 1;

        this._evidenceList.forEach(evidence=>{
            evidence.includeEvent(()=>{
                evidence.found();
                let replaced = this._induction.add(evidence);
                if(replaced)
                    replaced.reset();
                this._deduction.delete(evidence);
                this.update();
            });
        
            evidence.excludeEvent(()=>{
                evidence.notFound();
                this._induction.delete(evidence);
                this._deduction.add(evidence);
                this.update();
            });
    
            evidence.resetEvent(()=>{
                evidence.reset();
                this._induction.delete(evidence);
                this._deduction.delete(evidence);
                this.update();
            })
        });

        evidenceTarget.addEventListener("click", ()=>{
            let current: Ghost = findCurrentGhost(this._ghostList, displayTarget);
            if(current.order > 0)
                findTopGhost(this._ghostList).display(displayTarget);
        })
    }

    update(){
        this._ghostList.forEach(ghost=>{
            let dCount = 0;
            this._deduction.forEach(e=>{
                if(ghost.has(e.name)){
                    dCount++;
                }
                if(ghost.required === e.name){
                    dCount+=5;
                }
            });

            let iCount = 0;
            this._induction.forEach(e=>{
                if(ghost.has(e.name)) {
                    iCount--;
                } else {
                    iCount+=5;
                }
            });

            if(iCount>1 || dCount >= this._evidenceThreashold){
                ghost.hide();
            } else {
                ghost.show();
            }
            ghost.order = iCount;
        });
    }

    reset(){
        this._induction.clear()
        this._deduction.clear();
        this._ghostList.forEach(g=>g.reset());
        this._evidenceList.forEach(e=>e.reset());
    }

    set evidenceCount(value: number){
        let reset = this._induction.setMaxSize(value);
        reset.forEach(e=>e.reset());

        if(value < 1){
            value = 1;
            alert("There can't be less then 1 evidence!");
        } else if(value > DEFAULT_EVIDENCE_COUNT){
            value = DEFAULT_EVIDENCE_COUNT;
            alert(`There can't be more then ${DEFAULT_EVIDENCE_COUNT} evidence!`);
        }

        this._evidenceThreashold = (DEFAULT_EVIDENCE_COUNT + 1) - value;
        this.update();
    }

    get evidenceCount(){
        return (DEFAULT_EVIDENCE_COUNT + 1) - this._evidenceThreashold;
    }
}

function findCurrentGhost(list: Array<Ghost>, current: Element): Ghost{
    let nameNode = current.querySelector(".name");
    if(nameNode){
        let name:string = nameNode.textContent
        for(let ghost of list){
            if(ghost.name === name)
                return ghost;
        }
    }

    return null;
}

function findTopGhost(list: Array<Ghost>){
    let top = list[0];
    for(let index = 1; index<list.length; index++){
        if(top.order > list[index].order)
            top = list[index];
    }
    return top;
}