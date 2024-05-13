/** /Util/Sound/Fallback
 * Fallback Audio if unable to load Sound Files.
 * 
 * Help From:
 * https://stackoverflow.com/questions/48938140/cross-browser-html5-javascript-generate-single-tick-sound
 */
import { audio_interface } from "./Audio";

//Constants used to make Sounds.
export const TIC_FREQUENCEY: number = 103;
export const TIC_LENGTH: number = 0.03;

/** Fallback Audio Class
 * 
 */
export class Fallback implements audio_interface{
    private _context: AudioContext;
    private _masterGain: any;

    /** Constructor
     * 
     * @param {number} volume 
     */
    constructor(volume: string|number = 0.5){
        this._context = new (window.AudioContext || (window as any).webkitAudioContext)();

        this._masterGain = this._context.createGain();
        this._masterGain.connect(this._context.destination);

        if(volume)
            this.volume = Number(volume);
    }

    /** Volume Getter
     * 
     */
    get volume(): number{
        return this._masterGain.gain.value;
    }

    /** Volume Setter
     * 
     */
    set volume(value: number){
        this._masterGain.gain.value = value;
    }

    /** Play Sound
     * 
     */
    async play(){
        var oscillatorNode = new OscillatorNode(this._context, {type: 'sawtooth'});
        oscillatorNode.frequency.value = TIC_FREQUENCEY;
        oscillatorNode.connect( this._masterGain );
        oscillatorNode.start(this._context.currentTime);
        oscillatorNode.stop(this._context.currentTime + TIC_LENGTH);
    }

    /** Current Time Getter
     * 
     */
    public cloneNode(){
        return this;
    }
}