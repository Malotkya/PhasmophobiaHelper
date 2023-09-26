/** Alternative.ts
 *  Alternative Evidence Options
 * 
 * 
 * @author Alex Malotky
 */
import { SOUND } from "../UnicodeIcons";
import { persistAttribute } from "../Memory";
import HTMLToggleInputElement from "../HTMLToggleInput";

import {bpm, convert} from "./Speed";
import { setAudioFile, playAudio } from "./Audio";

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
export const INITAL_VOLUME = 0.25;

export const sldVolume = document.createElement("input");
    sldVolume.type = "range";
    sldVolume.id = "volume";
    sldVolume.min = "0";
    sldVolume.max = "1";
    sldVolume.step = "0.01";
    sldVolume.style.width = "200px";
export const lblVolume = document.createElement("span");

    sldVolume.addEventListener("change", ()=>{
        lblVolume.textContent = `${Math.round(Number(sldVolume.value) * 100)}%`
    });
    persistAttribute(sldVolume, String(INITAL_VOLUME));

/** Audio Select
 * 
 */
export const METRONOME = "/sound/metronome-85688.mp3";
export const FOOTSTEP  = "/sound/footstep.wav";

export const selAudio = new HTMLToggleInputElement(METRONOME, FOOTSTEP);
    selAudio.id = "selAudio";

    selAudio.addEventListener("change", ()=>{
        setAudioFile(selAudio.value);
    });
    persistAttribute(selAudio, METRONOME);

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
export function createSoundButton(speed: number): string{
    return `${speed}m/s <button class='speed' value='${bpm(speed)}'>${SOUND}</button>`
}

/** Make Volume Interface
 * 
 * Creates a nice interface to display on web page.
 * 
 * @returns {HTMLElement}
 */
export default function makeInterface(): HTMLElement{
    const div = document.createElement("div");
    div.className = "input";

    const label = document.createElement("label");
    label.setAttribute("for", "volume");
    label.appendChild(sldVolume);
    label.appendChild(lblVolume);

    div.appendChild(btnMain);
    div.appendChild(label);
    div.appendChild(selAudio);
    return div;
}