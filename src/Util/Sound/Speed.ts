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

/** In Beats per Minute Equation
 * 
 * Cubic Equation generated on Wolfram Alpha using points above.
 * 
 * @param {number} speed in m/s
 * @returns {number} in bpm
 */
const bpm_equation = (speed: number):number => -29.5033 + (108.606 * speed) - (22.2689 * Math.pow(speed, 2)) + (4.93617 * Math.pow(speed, 3));

/** In Beats per Minute
 * 
 * Uses Reference Map or Equation.
 * 
 * @param {number} speed in m/s
 * @returns {number} in bpm
 */
export const bpm = (speed: number):number => KNOWN_SPEEDS.get(speed) || bpm_equation(speed);

/** Convert to Microseconds
 * 
 * @param {number} speed in bpm
 * @returns {number} im bpMs
 */
export const convert = (speed: number):number => (60 / speed) * 1000;