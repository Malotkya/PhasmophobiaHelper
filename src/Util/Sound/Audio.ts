/** /Util/Sound/Audio
 * 
 * @author Alex Malotky
 */
import { Fallback } from "./Fallback";

/** Audio Interface
 * 
 * Contains elements of Audio that is required by this file.
 * 
 */
export interface audio_interface {
    play: ()=>Promise<void>;
    volume: number,
    onerror?: OnErrorEventHandlerNonNull,
    cloneNode: ()=>any
}

//Audio Interface Object
let audio:audio_interface = new Fallback();

/** Set Audio File
 * 
 * If the file fails to load, will use fallback bleep.
 * 
 * @param {string} fileName 
 */
export function setAudioFile(fileName:string){
    audio = new Audio(fileName);
    audio.onerror = () => audio = new Fallback();
}

/** Play Audio File
 * 
 * 
 * @param {number} volume 
 */
export function playAudio(volume: number){
    const temp:audio_interface = audio.cloneNode();
    temp.volume = volume;
    temp.play();
}