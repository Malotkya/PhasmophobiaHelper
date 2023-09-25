/** Sound Constants
 * 
 * @author Alex Malotky
 */

//Sound Initial Volume
export const INITAL_VOLUME = 0.25;

//Thread Refresh Rate
export const REFRESH_RATE = 100;

//Constants used to define and generate tic
export const TIC_FREQUENCEY: number = 103;
export const TIC_LENGTH: number = 0.03;

//Constants for main button.
export const BUTTON_RUNNING_STRING = "Stop Sound";
export const BUTTON_DEFULT_STRING = "Play Normal Speed";

//Conversions for sounds
export const KNOWN_SPEEDS = new Map<number, number>();
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