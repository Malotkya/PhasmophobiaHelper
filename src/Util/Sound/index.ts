/** /Util/Sound
 *  Sound & Audio Handling
 * 
 * 
 * @author Alex Malotky
 */
import { SOUND } from "../UnicodeIcons";
import { persistAttributes } from "../Memory";
import HTMLToggleInputElement from "../HTMLToggleInput";
import { createElement as _ } from "../Element";

import {bpm, convert} from "./Speed";
import { setAudioFile, playAudio } from "./Audio";

/** Create Sound Button
 * 
 * @param {number} value 
 * @returns {Array}
 */
const SOUND_BUTTON = (value:number):Array<HTMLElement|string> => [`${value}m/s `, _('button',  {class:'speed', value:bpm(value)}, SOUND)];

/** Main Audio Interface Button
 * 
 */
const BUTTON_RUNNING_STRING = "Stop Sound";
const BUTTON_DEFULT_STRING = "Play Normal Speed";

const btnMain = _("button", {id: "btnSound"}, BUTTON_DEFULT_STRING);
btnMain.addEventListener("click", ()=>{
    if(isPlaying())
        stopSound();
    else
        generateSound(bpm(1.7));
});

/** Volume Slider
 * 
 */
const INITAL_VOLUME = 0.25;
const sldVolume = <HTMLInputElement>_("input", {
    type: "range",
    id: "volume",
    min: 0,
    max: 1,
    step: 0.01,
    style: "width: 200px"
});
const lblVolume = _("span", `${INITAL_VOLUME * 100}%`);
sldVolume.addEventListener("change", ()=>{
    let value = Number(sldVolume.value);
    if(isNaN(value)){
        value = 0;
        sldVolume.value = "0";
    }
    lblVolume.textContent = `${Math.round(value * 100)}%`
});
persistAttributes(sldVolume, {value:String(INITAL_VOLUME)});

/** Ghost Speed Slider
 * 
 */
const INITAL_SPEED = 1;
const sldSpeed = <HTMLInputElement>_("input", {
    type: "range",
    id: "sldSpeed",
    min: 0.5,
    max: 1.5,
    step: 0.1,
    style: "width: 200px"
});
const lblSpeed = _("span", `${INITAL_SPEED * 100}%`)
sldSpeed.addEventListener("change", ()=>{
    let value = Number(sldSpeed.value);
    if(isNaN(value)) {
        value = INITAL_SPEED;
        sldSpeed.value = String(INITAL_SPEED);
    }
    lblSpeed.textContent = `${Math.round(value * 100)}%`;
});
persistAttributes(sldSpeed, {value:String(INITAL_SPEED)});

/** Audio Select
 * 
 */
const METRONOME = "./sound/metronome-85688.mp3";
const FOOTSTEP  = "./sound/footstep.wav";

const selAudio = new HTMLToggleInputElement(METRONOME, FOOTSTEP);
    selAudio.id = "selAudio";
    selAudio.addEventListener("change", ()=>{
        setAudioFile(selAudio.value);
    });
    persistAttributes(selAudio, {value:METRONOME});

const lblMetronome = _("span", "Metronome");
const lblFootstep  = _("span", "Footstep");

    
/** Sound is Playing
 * 
 * @returns {boolean}
 */
function isPlaying():boolean{
    return btnMain.textContent === BUTTON_RUNNING_STRING;
}

/** - - - - - Sound Thread Section - - - - -
 * 
 */
let speed:number = convert(bpm(1.7));
let lastPlayed:number = Date.now();

//Sound Thread Refresh Rate
const REFRESH_RATE = 10;

/** Sound Thread
 * 
 * Calls itself to continualy keep playing sound.
 */
function soundThread():void {
    if(isPlaying()){
        const now:number = Date.now();
        if( now >= lastPlayed+(speed/ghostSpeed()) ){
            playAudio(Number(sldVolume.value));
            lastPlayed = now;
        }
    }

    window.setTimeout(soundThread, REFRESH_RATE);
}; soundThread();

/** Generate Sound
 * 
 * @param {number} s - speed of ghost in m/s
 */
export function generateSound(s: number):void {  
    speed = convert(s);
    startSound();
}

/** Set Ghost Speed
 * 
 * @param {number} s - 1 = 100% or normal speed
 */
export function setGhostSpeed(s:number):void {
    sldSpeed.value = String(s);
    sldSpeed.dispatchEvent(new Event("change"));
}

/** Get Ghost Speed
 * 
 */
const ghostSpeed = ():number => Number(sldSpeed.value);

/** Start Sound
 * 
 */
export function startSound():void {
    btnMain.textContent = BUTTON_RUNNING_STRING;
}

/** Stop Sound
 * 
 */
export function stopSound(): void{
    btnMain.textContent = BUTTON_DEFULT_STRING;
}

/** Create Sound Button
 * 
 * @param {number} speed 
 * @returns {Array}
 */
export function createSoundButton(speed: number|Array<number>): HTMLElement{
    if(typeof speed === "number") {
        return _("li", "Moves at ", SOUND_BUTTON(speed));
    } else if(Array.isArray(speed)) {
        switch(speed.length){
            case 0:
                throw new Error(`Empty speed array!`);
                    
            case 1:
                return _("li", "Moves at ", SOUND_BUTTON(speed[0]));
                    
            case 2:
                return _("li", "Moves at ", SOUND_BUTTON(speed[0]), " and ", SOUND_BUTTON(speed[1]));

            default:
                return _("li", "Moves between ", SOUND_BUTTON(speed[0]), " and ", SOUND_BUTTON(speed[speed.length-1]));
        }
    }

    throw new Error("Speed must be a number or an array of numbers!");
}

/** Make Volume Interface
 * 
 * Creates a nice interface to display on web page.
 * 
 * @returns {HTMLElement}
 */
export function makeSoundInterface(): HTMLElement{
    return _("div", {id:"audioInterface", class: "input"}, 
        _("div", btnMain),
        _("div", 
            _("lable", {for: sldVolume.id}, sldVolume, lblVolume)
        ),
        _("div", {class: "audioSelectWrapper"}, 
            _("label", {for: sldSpeed.id}, "Ghost Speed:", sldSpeed, lblSpeed)
        ),
        _("div", {class: "audioSelectWrapper"},
            _("label", {for: selAudio.id},
                lblMetronome,
                selAudio,
                lblFootstep
            )
        )
    );
}