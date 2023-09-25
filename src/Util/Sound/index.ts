/** Alternative.ts
 *  Alternative Evidence Options
 * 
 * Help From:
 * https://stackoverflow.com/questions/48938140/cross-browser-html5-javascript-generate-single-tick-sound
 * 
 * @author Alex Malotky
 */

import { SOUND } from "../UnicodeIcons";
import { persistAttribute } from "../Memory";
import * as SC from "./constants"

/** Audio Context Section
 * 
 * All the objects used to create the beep.
 */
const audioContext = new (window.AudioContext)();
const masterGain = audioContext.createGain();
    masterGain.gain.value = SC.INITAL_VOLUME;
    masterGain.connect(audioContext.destination); 



/** Play Tick Function
 * 
 */
function tick():void {
    var oscillatorNode = new OscillatorNode(audioContext, {type: 'sawtooth'});
    oscillatorNode.frequency.value = SC.TIC_FREQUENCEY;
    oscillatorNode.connect( masterGain );
    oscillatorNode.start(audioContext.currentTime);
    oscillatorNode.stop( audioContext.currentTime + SC.TIC_LENGTH);
}

/**HTML Element Section
 * 
 * All HTML Elements that interact with the audio.
 */

/** Button Main
 * 
 */
const btnMain = document.createElement("button");
    btnMain.textContent = SC.BUTTON_DEFULT_STRING;
    btnMain.id = "btnSound";

    btnMain.addEventListener("click", ()=>{
        if(isPlaying())
            stopSound();
        else
            generateSound(1.7);
    });

/** Volume Slider
 * 
 */
const sldVolume = document.createElement("input");
    sldVolume.type = "range";
    sldVolume.id = "volume";
    sldVolume.min = "0";
    sldVolume.max = "1";
    sldVolume.step = "0.01";
    sldVolume.style.width = "200px";

const lblVolume = document.createElement("span");
    lblVolume.textContent = `${SC.INITAL_VOLUME * 100}%`;

    sldVolume.addEventListener("change", ()=>{
        masterGain.gain.value = Number(sldVolume.value);
        lblVolume.textContent = `${Math.round(Number(sldVolume.value) * 100)}%`
    });

    persistAttribute(sldVolume, String(SC.INITAL_VOLUME));

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
let speed:number = convert(1.7);
let lastPlayed:number = Date.now();

/** Sound Thread
 * 
 * Calls itself to continualy keep playing sound.
 */
function soundThread():void {
    if(isPlaying()){
        const now:number = Date.now();
        if(now >= lastPlayed+speed){
            tick();
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
    return div;
}