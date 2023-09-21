/** Alternative.ts
 *  Alternative Evidence Options
 * 
 * Help From:
 * https://stackoverflow.com/questions/48938140/cross-browser-html5-javascript-generate-single-tick-sound
 * 
 * @author Alex Malotky
 */

import { SOUND } from "./UnicodeIcons";
import Memory from "./Memory";

/** Audio Context Section
 * 
 * All the objects used to create the beep.
 */
const INIT_VOLUME = 0.25
const audioContext = new (window.AudioContext)();
const masterGain = audioContext.createGain();
    masterGain.gain.value = INIT_VOLUME;
    masterGain.connect(audioContext.destination); 

//Constants used to define and generate tic
const frequency: number = 103;
const length: number = 0.03;

/** Play Tick Function
 * 
 */
function tick():void {
    var oscillatorNode = new OscillatorNode(audioContext, {type: 'sawtooth'});
    oscillatorNode.frequency.value = frequency;
    oscillatorNode.connect( masterGain );
    oscillatorNode.start(audioContext.currentTime);
    oscillatorNode.stop( audioContext.currentTime + length);
}

/**HTML Element Section
 * 
 * All HTML Elements that interact with the audio.
 */

//Constants for main button.
const RUNNING_STRING = "Stop Sound";
const DEFULT_STRING = "Play Normal Speed";

/** Button Main
 * 
 */
const btnMain = document.createElement("button");
    btnMain.textContent = DEFULT_STRING;
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
    lblVolume.textContent = `${INIT_VOLUME * 100}%`;

    sldVolume.addEventListener("change", ()=>{
        masterGain.gain.value = Number(sldVolume.value);
        lblVolume.textContent = `${Math.round(Number(sldVolume.value) * 100)}%`
    });

    Memory(sldVolume, String(INIT_VOLUME));

/** Sound is Playing
 * 
 * @returns {boolean}
 */
const isPlaying = ():boolean => btnMain.textContent === RUNNING_STRING;

/** In Beats per Minute
 * 
 * Equation generated on Wolfram Alpha
 * 
 * @param {number} speed in m/s
 * @returns {number} in bpm
 */
const bpm = (speed: number):number => -19.5643 + (76.7883 * speed) + (1.40251 * Math.pow(speed, 2));

/** Convert to Microseconds
 * 
 * @param {number} speed  in m/s
 * @returns {number} in microseconds
 */
const convert = (speed: number):number => (60 / bpm(speed)) * 1000;

//Numbers used by sound thread.
let speed:number = convert(1.7);
let lastPlayed:number = Date.now();
const REFRESH_RATE:number = 100;

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
    btnMain.textContent = RUNNING_STRING;
}

/** Stop Sound
 * 
 */
export function stopSound(): void{
    btnMain.textContent = DEFULT_STRING;
}

export function createSoundButton(speed: number): string{
    return `${speed}m/s <button class='speed' value='${speed}'>${SOUND}</button>`
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