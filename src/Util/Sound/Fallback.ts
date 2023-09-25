import { sound_interface } from ".";

const audioContext = new (window.AudioContext)();
export const TIC_FREQUENCEY: number = 103;
export const TIC_LENGTH: number = 0.03;

export class Fallback implements sound_interface{
    private _gain:any;
    private static error: OnErrorEventHandler;
    public currentTime: number;

    constructor(volume?: string|number){
        this._gain = audioContext.createGain();
        this._gain.connect(audioContext.destination);

        if(volume)
            this.volume = Number(volume);
    }

    get volume(){
        return this._gain.value;
    }

    set volume(value: number){
        this._gain.value = value;
    }

    async play(){
        var oscillatorNode = new OscillatorNode(audioContext, {type: 'sawtooth'});
        oscillatorNode.frequency.value = TIC_FREQUENCEY;
        oscillatorNode.connect( this._gain );
        oscillatorNode.start(audioContext.currentTime);
        oscillatorNode.stop( audioContext.currentTime + TIC_LENGTH);
    }

    get onerror(){
        return Fallback.error;
    }
}