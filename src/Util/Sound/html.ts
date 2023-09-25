/** Sound/html.ts
 * 
 * All HTML Elements that interact with the audio.
 * @author Alex Malotky
 */
import { BUTTON_DEFULT_STRING } from "./constants";

/** Button Main
 * 
 */
export const btnMain = document.createElement("button");
    btnMain.textContent = BUTTON_DEFULT_STRING;
    btnMain.id = "btnSound";

    /** Volume Slider
 * 
 */
export const sldVolume = document.createElement("input");
    sldVolume.type = "range";
    sldVolume.id = "volume";
    sldVolume.min = "0";
    sldVolume.max = "1";
    sldVolume.step = "0.01";
    sldVolume.style.width = "200px";

export const lblVolume = document.createElement("span");