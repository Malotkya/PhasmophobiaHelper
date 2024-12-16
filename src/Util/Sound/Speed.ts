/** /Util/Sound/Speed
 * 
 * Constants used for converting speed of ghost to usable numbers.
 * 
 * @author Alex Malotky
 */

//Conversions for sounds
const KNOWN_SPEEDS = new Map<number, number>();
    KNOWN_SPEEDS.set(3   , 228);
    KNOWN_SPEEDS.set(2.75, 204);
    KNOWN_SPEEDS.set(2.5 , 183);
    KNOWN_SPEEDS.set(2.25, 159);
    KNOWN_SPEEDS.set(1.87, 125);
    KNOWN_SPEEDS.set(1.7 , 115);
    KNOWN_SPEEDS.set(1.53, 102);
    KNOWN_SPEEDS.set(1.5 ,  99);
    KNOWN_SPEEDS.set(1.44,  96);
    KNOWN_SPEEDS.set(1.0 ,  64);
    KNOWN_SPEEDS.set(0.4 ,  10);

/** Inverse Known Speeds Get
 * 
 * @param {number} value 
 * @returns {number}
 */
function inverseKnownSpeedsGet(value:number):number|undefined {
    for(const [mps, bpm] of KNOWN_SPEEDS.entries()) {
        if(value >= bpm-2.5 && value <= bpm+2.5)
            return mps;
    }
}

/** In Beats per Minute Equation
 * 
 * Cubic Equation generated on Wolfram Alpha using points above.
 * 
 * @param {number} speed in m/s
 * @returns {number} in bpm
 */
const bpm_equation = (speed: number):number => -29.5033 + (108.606 * speed) - (22.2689 * Math.pow(speed, 2)) + (4.93617 * Math.pow(speed, 3));

/** In Meters per Second Equation
 * 
 * Cubic Equation generated on Wolfram Alpha using points above.
 * 
 * @param {number} speed in bpm
 * @returns {number} in m/s
 */
const mps_equation = (speed: number):number => 0.283168 + (0.0104645 * speed) + (0.0000258484 * Math.pow(speed, 2)) - (0.0000000867289 * Math.pow(speed, 3));

/** In Beats per Minute
 * 
 * Uses Reference Map or Equation.
 * 
 * @param {number} speed in m/s
 * @returns {number} in bpm
 */
export const bpm = (speed: number):number => KNOWN_SPEEDS.get(speed) || bpm_equation(speed);

/** In Meeters per Second
 * 
 * Uses Reference Map or Equation.
 * 
 * @param {number} speed in bpm
 * @returns {number} in m/s
 */
export const mps = (speed: number):number => inverseKnownSpeedsGet(speed) || mps_equation(speed);

/** Convert to Microseconds
 * 
 * @param {number} speed in bpm
 * @returns {number} im bpMs
 */
export const convert = (speed: number):number => (60 / speed) * 1000;

/** Convert to Microseconds
 * 
 * @param {number} speed in bpMs
 * @returns {number} im bpm
 */
export const inverseConvert = (speed: number):number => (1000 / speed) * 60;

/** Get Classification
 * 
 * @param {number} speed in bpm
 * @returns {string}
 */
export function getSpeedClass(value:number) {
    const average = KNOWN_SPEEDS.get(1.7);

    if(value === 0 || isNaN(value)){
        return "Unknown";
    }else if(value < average - 8) {
        return "Slow";
    } else if(value < average + 8){
        return "Average";
    } else {
        return "Fast";
    }
}