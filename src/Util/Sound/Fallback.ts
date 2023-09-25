/** Fallback.ts
 * 
 * Fallback Audio using original bleep.
 * 
 * Help From:
 * https://stackoverflow.com/questions/48938140/cross-browser-html5-javascript-generate-single-tick-sound
 */
import { audio_interface } from ".";

const audioContext = new (window.AudioContext)();
export const TIC_FREQUENCEY: number = 103;
export const TIC_LENGTH: number = 0.03;

export class Fallback implements audio_interface{
    private _masterGain: any;
    private _nodeGain: any;

    constructor(volume?: string|number){
        this._masterGain = audioContext.createGain();
        this._masterGain.connect(audioContext.destination);

        this._nodeGain = audioContext.createGain();
        this._nodeGain.connect(this._masterGain);

        if(volume)
            this.volume = Number(volume);
    }

    get volume(): number{
        return this._masterGain.value;
    }

    set volume(value: number){
        this._masterGain.value = value;
        this._nodeGain.value = value;
    }

    async play(){
        var oscillatorNode = new OscillatorNode(audioContext, {type: 'sawtooth'});
        oscillatorNode.frequency.value = TIC_FREQUENCEY;
        oscillatorNode.connect( this._nodeGain );
        oscillatorNode.start(audioContext.currentTime);
        oscillatorNode.stop(audioContext.currentTime + TIC_LENGTH);
    }

    get currentTime():number{
        return audioContext.currentTime;
    }

    set currentTime(value:number){
        //Do Nothing
    }
}