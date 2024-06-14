import { createElement as _, appendChildren } from "../Util/Element";
import { persistAttributes } from "../Util/Memory";
import CheckList from "../CheckList";
import HuntTimer, {INTENSITY_OPTIONS, SIZE_OPTIONS} from "../TimerList/HuntTimer";
import { setGhostSpeed, INITAL_SPEED } from "../Util/Sound";
import { setAudioFile, FOOTSTEP_FILE, METRONOME_FILE } from "../Util/Sound/Audio";


export default class Settings extends HTMLElement {
    private _numEvidenceCount:HTMLInputElement;
    private _selMapIntensity: HTMLSelectElement;
    private _selMapSize: HTMLSelectElement;
    private _sldGhostSpeed:HTMLSelectElement;
    private _selAudio:HTMLSelectElement;

    constructor(checkList:CheckList, huntTimer:HuntTimer) {
        super();

        //Evidence Count Input
        this._numEvidenceCount = <HTMLInputElement>_("input", {
            id: "numEvidence",
            type: "number",
            max: 3,
            min: 0,
            style: "width: 55px"
        });
        this._numEvidenceCount.addEventListener("change", ()=>{
            checkList.evidenceCount = Number(this._numEvidenceCount.value);
        });
        persistAttributes(this._numEvidenceCount, {value: String(checkList.evidenceCount)});


        //Hunt Intensity Selector
        this._selMapIntensity = <HTMLSelectElement>_("select", {id: "selIntensity"},
            INTENSITY_OPTIONS.map((value, index)=>_("option", {value:index}, value))
        );
        this._selMapIntensity.addEventListener("change", ()=>{
            huntTimer.intencity = Number(this._selMapIntensity.value);
        });
        persistAttributes(this._selMapIntensity, {value: huntTimer.intencity});


        //Max Size Selector
        this._selMapSize = <HTMLSelectElement>_("select", {id:"selMapSize"},
            SIZE_OPTIONS.map((value, index)=>_("option", {value:index}, value))
        );
        this._selMapSize.addEventListener("change", ()=>{
            huntTimer.size = Number(this._selMapSize.value);
        });
        persistAttributes(this._selMapSize, {value:huntTimer.size});

        //Ghost Speed Selector
        this._sldGhostSpeed = <HTMLSelectElement>_("select", {id: "sldSpeed"},
            _("option", {value:0.5},  " 50%"),
            _("option", {value:0.75}, " 75%"),
            _("option", {value:1},    "100%"),
            _("option", {value:1.25}, "125%"),
            _("option", {value:1.5},  "150%"),
        );
        this._sldGhostSpeed.addEventListener("change", ()=>{
            setGhostSpeed(Number(this._sldGhostSpeed.value));
        });
        persistAttributes(this._sldGhostSpeed, {value:INITAL_SPEED});

        //Audio File Selector
        this._selAudio = <HTMLSelectElement>_("select", {id:"selAudio"},
            _("option", {value:METRONOME_FILE}, "Default"),
            _("option", {value:FOOTSTEP_FILE},  "Footsteps")
        );
        this._selAudio.addEventListener("change" ,()=>{
            setAudioFile(this._selAudio.value);
        });
        persistAttributes(this._selAudio, {value: FOOTSTEP_FILE});
    }

    disconnectedCallback(){
        this.innerHTML = "";
    }

    connectedCallback() {
        appendChildren(this, [
            _("h2", "Settings"),
            _("label", {for: this._numEvidenceCount.id}, 
                _("div", "Number of Evidence: "),
                _("div", this._numEvidenceCount)
            ),
            _("label", {for: this._sldGhostSpeed.id}, 
                _("div", "Ghost Speed: "),
                _("div", this._sldGhostSpeed)
            ),
            _("label", {for: this._selMapSize.id}, 
                _("div", "Map Size: "),
                _("div", this._selMapSize)
            ),
            _("label", {for: this._selMapIntensity.id}, 
                _("div", "Hunt Difficulty: "),
                _("div", this._selMapIntensity)
            ),
            _("label", {for: this._selAudio.id}, 
                _("div", "Metrinome Sound: "),
                _("div", this._selAudio)
            ),
        ])
    }
}

customElements.define("settings-menu", Settings);