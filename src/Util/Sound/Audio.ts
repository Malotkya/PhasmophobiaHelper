/** /Util/Sound/Audio
 * 
 * @author Alex Malotky
 */
import { Fallback } from "./Fallback";

//File Names
export const METRONOME_FILE = "./sound/metronome-85688.mp3";
export const FOOTSTEP_FILE  = "./sound/footstep.wav";

/** Audio Interface
 * 
 * Contains elements of Audio that is required by this file.
 * 
 */
export type audio_interface = EventTarget&{
    play: ()=>Promise<void>;
    volume: number,
    cloneNode: ()=>any
}

//Audio Interface Object
let audio:audio_interface|undefined;

/** Set Audio File
 * 
 * If the file fails to load, will use fallback bleep.
 * 
 * @param {string} fileName 
 */
export function setAudioFile(fileName:string){
    audio = new Audio(fileName);
    audio?.addEventListener("error", () => {
        alert(`Failed to load '${fileName}', switching to fallback.`);
        audio = new Fallback();
    });
}

/** Play Audio File
 * 
 * 
 * @param {number} volume 
 */
export function playAudio(volume: number){
    if(audio){
        const temp:audio_interface = audio.cloneNode();
        temp.volume = volume;
        temp.play();
    }
}