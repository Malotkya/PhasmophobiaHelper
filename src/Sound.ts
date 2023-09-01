/** Alternative.ts
 *  Alternative Evidence Options
 * 
 * Help From:
 * https://stackoverflow.com/questions/48938140/cross-browser-html5-javascript-generate-single-tick-sound
 */

/** Audio Context Section
 * 
 * All the objects used to create the beep.
 */
const audioContext = new (window.AudioContext)();
const masterGain = audioContext.createGain();
    masterGain.gain.value = 0.5;
    masterGain.connect(audioContext.destination);
const nodeGain1 = audioContext.createGain();
    nodeGain1.gain.value = 0.5;
    nodeGain1.connect(masterGain);

//Constants used to define and generate tic
const frequency: number = 103;
const length: number = 0.03;

/** Play Tick Function
 * 
 */
function tick():void {
    var oscillatorNode = new OscillatorNode(audioContext, {type: 'square'});
    oscillatorNode.frequency.value = frequency;
    oscillatorNode.connect( nodeGain1);
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
    sldVolume.value = "0.5";
    sldVolume.style.width = "200px";

const lblVolume = document.createElement("span");
    lblVolume.textContent = "50%";

    sldVolume.addEventListener("change", ()=>{
        masterGain.gain.value = new Number(sldVolume.value).valueOf();
        nodeGain1.gain.value = new Number(sldVolume.value).valueOf();
        lblVolume.textContent = `${Math.round(new Number(sldVolume.value).valueOf() * 100)}%`
    });

/** Sound is Playing
 * 
 * @returns {Boolean}
 */
const isPlaying = ():Boolean => btnMain.textContent === RUNNING_STRING;

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

//Speed of thread
let speed:number = 1;

/** Sound Thread
 * 
 * Calls itself to continualy keep playing sound.
 */
function soundThread():void {
    if(isPlaying())
        tick();

        setTimeout(soundThread, speed);
}; soundThread();

/** Generate Sound
 * 
 * @param {number} s - speed of ghost in m/s
 */
export function generateSound(s: number):void {  
    speed = convert(s);
    btnMain.textContent = RUNNING_STRING;
}

/** Stop Sound
 * 
 */
export function stopSound(): void{
    btnMain.textContent = DEFULT_STRING;
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