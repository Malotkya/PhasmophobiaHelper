/**Step Interface 
 * 
 * Used in Timer Class
 */
interface step {
    time: number,
    info: string
}

/**Timer Data
 * 
 */
export type TimerData = Array<step>

//Minute in Miliseconds
export const MINUTE: number = 60000;

export const SMUDGE_DATA:TimerData = [
    {
        time: 60000,
        info: "Safe from Hunts"
    }, 
    {
        time: 90000,
        info: "Demons can Hunt"
    },
    {
        time: 180000,
        info: "Spirits can't Hunt"
    },
    {
        time: 180000 + MINUTE,
        info: "Everything can Hunt"
    }
];

export const HUNT_DATA:TimerData = [
    {
        time: 20000,
        info: "Ghosts can't hunt."
    },
    {
        time: 25000,
        info: "Demons can start hunting again."
    },
    {
        time: 25000 + MINUTE,
        info: "Everything can hunt again."
    }
];