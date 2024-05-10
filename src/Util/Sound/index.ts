/** Alternative.ts
 *  Alternative Evidence Options
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

const SOUND_BUTTON = (value:number) => `${value}m/s <button class='speed' value='${bpm(value)}'>${SOUND}</button>`;

/** Main Audio Interface Button
 * 
 */
const BUTTON_RUNNING_STRING = "Stop Sound";
const BUTTON_DEFULT_STRING = "Play Normal Speed";

const btnMain = document.createElement("button");
    btnMain.textContent = BUTTON_DEFULT_STRING;
    btnMain.id = "btnSound";


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
//sldVolume.style.width = "200px";
    
const lblVolume = document.createElement("span");

    sldVolume.addEventListener("change", ()=>{
        lblVolume.textContent = `${Math.round(Number(sldVolume.value) * 100)}%`
    });
    persistAttributes(sldVolume, {value:String(INITAL_VOLUME)});

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
const isPlaying = ():boolean => btnMain.textContent === BUTTON_RUNNING_STRING;

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
        if(now >= lastPlayed+speed){
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
 * @returns {string}
 */
export function createSoundButton(speed: number|Array<number>): string{
    if(typeof speed === "number") {
        return SOUND_BUTTON(speed);
    } else if(Array.isArray(speed)) {
        switch(speed.length){
            case 0:
                throw new Error(`Empty speed array!`);
                    
            case 1:
                return SOUND_BUTTON(speed[0]);
                    
            case 2:
                return SOUND_BUTTON(speed[0])+" and "+SOUND_BUTTON(speed[1]);

            default:
                return SOUND_BUTTON(speed[0])+" and "+SOUND_BUTTON(speed[speed.length-1]);
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
        _("div", {id: "audioSelectWrapper"},
            _("label", {for: selAudio.id},
                lblMetronome,
                selAudio,
                lblFootstep
            )
        )
    );
}