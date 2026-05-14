/** /Util/Sound/Audio
 * 
 * @author Alex Malotky
 */
import { Fallback } from "./Fallback";
import { createElement as _ } from "../Element";
import { SOUND } from "../UnicodeIcons";

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
let volume:number = 0;

export function setVolume(value:number){
    volume = value;
}

/** Set Audio File
 * 
 * If the file fails to load, will use fallback bleep.
 * 
 * @param {string} fileName 
 */
export function setAudioFile(fileName:string){
    audio = new Audio(fileName);
    audio.addEventListener("error", () => {
        alert(`Failed to load '${fileName}', switching to fallback.`);
        audio = new Fallback();
    });
}

/** Play Audio File
 * 
 * 
 * @param {number} volume 
 */
export function playAudio(){
    if(audio){
        const temp:audio_interface = audio.cloneNode();
        temp.volume = volume;
        temp.play();
    }
}

export type AudioInitData = {
    title?: string,
    data: string|string[]|Record<string, string>
};

export function AudioData({title, data}:AudioInitData):HTMLElement {
    
    if(typeof data === "object") {
        const list:HTMLAudioElement[] = [];
        const select = _("select", {class: "audio-select"},
            title? _("option", {disabled: true, selected: true, style: "display: none;", value: title}, title): null
        );
        select.addEventListener("change", ()=>{
            const audio = list[Number(select!.value)];
            if(audio) {
                audio.volume = volume;
                audio?.play();
            }
            if(title)
                select.value = title;
        });

        if(Array.isArray(data)) {
            data.forEach((file, index)=>{
                select.append(_("option", {value: index}, title? index+1: file));
                list.push(new Audio(file));
            })
            for(const file of data) {
                
            }
        } else {
            for(const name in data) {
                const file = data[name];
                select.append(_("option", {value: list.length}, name));
                list.push(new Audio(file));
            }
        }

        return select;
    } 

    const audio = new Audio(String(data));
    const button = _("button", title || SOUND);
    button.addEventListener("click", ()=>{
        audio.volume = volume;
        audio.play();
    })
    return button;
}