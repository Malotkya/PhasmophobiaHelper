/** Alternative.ts
 *  Alternative Evidence Options
 * 
 * 
 * @author Alex Malotky
 */
import { SOUND } from "../UnicodeIcons";
import { persistAttribute } from "../Memory";
import { btnMain, sldVolume, lblVolume, selAudio } from "./html";
import * as SC from "./constants"
import { Fallback } from "./Fallback";

/** Sound Interface
 * 
 * Contains elements of Audio that is required by this file.
 */
export interface audio_interface {
    play: ()=>Promise<void>;
    volume: number,
    onerror?: OnErrorEventHandlerNonNull,
    currentTime: number
}
let audio:audio_interface = new Fallback();
export function setAudioFile(fileName:string){
    audio = new Audio(fileName);
    audio.onerror = () => audio = new Fallback(sldVolume.value);
    audio.volume = Number(SC.INITAL_VOLUME);
}

/** Sound is Playing
 * 
 * @returns {boolean}
 */
const isPlaying = ():boolean => btnMain.textContent === SC.BUTTON_RUNNING_STRING;

/** In Beats per Minute Equation
 * 
 * Cubic Equation generated on Wolfram Alpha
 * 
 * @param {number} speed in m/s
 * @returns {number} in bpm
 */
const bpm_equation = (speed: number):number => -29.5033 + (108.606 * speed) - (22.2689 * Math.pow(speed, 2)) + (4.93617 * Math.pow(speed, 3));

/** In Beats per Minute
 * 
 * Cubic Equation generated on Wolfram Alpha
 * 
 * @param {number} speed in m/s
 * @returns {number} in bpm
 */
const bpm = (speed: number):number => SC.KNOWN_SPEEDS.get(speed) || bpm_equation(speed);

/** Convert to Microseconds
 * 
 * @param {number} speed  in m/s
 * @returns {number} in microseconds
 */
const convert = (speed: number):number => (60 / speed) * 1000;

//Numbers used by sound thread.
let speed:number = convert(bpm(1.7));
let lastPlayed:number = Date.now();

/** Sound Thread
 * 
 * Calls itself to continualy keep playing sound.
 */
function soundThread():void {
    if(isPlaying()){
        const now:number = Date.now();
        if(now >= lastPlayed+speed){
            audio.currentTime = 0
            audio.play();
            lastPlayed = now;
        }
    }

    window.setTimeout(soundThread, SC.REFRESH_RATE);
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
    btnMain.textContent = SC.BUTTON_RUNNING_STRING;
}

/** Stop Sound
 * 
 */
export function stopSound(): void{
    btnMain.textContent = SC.BUTTON_DEFULT_STRING;
}

export function createSoundButton(speed: number): string{
    return `${speed}m/s <button class='speed' value='${bpm(speed)}'>${SOUND}</button>`
}

btnMain.addEventListener("click", ()=>{
    if(isPlaying())
        stopSound();
    else
        generateSound(bpm(1.7));
});

sldVolume.addEventListener("change", ()=>{
    audio.volume = Number(sldVolume.value);
    lblVolume.textContent = `${Math.round(Number(sldVolume.value) * 100)}%`
});
persistAttribute(sldVolume, String(SC.INITAL_VOLUME));

selAudio.addEventListener("change", ()=>{
    setAudioFile(selAudio.value);
});
persistAttribute(selAudio, SC.METRONOME);

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