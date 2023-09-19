/** Clock.ts
 * 
 * @author Alex Malotky
 */

//Clock Elements viewd on page.
const clock = document.createElement("span");
    clock.id = "clock";
    clock.style.fontFamily = "monospace";

/** Task Interface
 * 
 */
export interface Task{
    id: string,
    update:(time:number)=>boolean
}

//Queue of Tasks
const queue: Set<Task> = new Set();

// Clock thread that updates clock and queue.
const REFRESH_RATE = 100;
function clockThread(): void{
    let now:number = Date.now();
    clock.textContent = formatTime(now);

    //Launch any schuduled tasks
    let index = 0;
    queue.forEach((task:Task)=>{
        if(task.update(now))
            queue.delete(task);
    });

    window.setTimeout(clockThread, REFRESH_RATE);
} clockThread();

/** Add Task to Queue
 * 
 * @param {Task} t 
 */
export function addTask(t:Task){
    queue.add(t);
}

/** Format Time
 * 
 * Returns "00:00:00" if nothing entered.
 * 
 * @param {number|Date} t 
 * @returns {string}
 */
export function formatTime(t?: number|Date):string{
    
    if(typeof t === "undefined"){
        return "00:00:00";
    } else if(typeof t === "number"){
        t = new Date(t);
    }

    let h:string = `0${t.getHours() % 12 || 12}`;
    let m:string = `0${t.getMinutes()}`;
    let s:string = `0${t.getSeconds()}`;

    return `${h.slice(-2)}:${m.slice(-2)}:${s.slice(-2)}`;
}

/** Format Seconds
 * 
 * @param {number} value 
 * @returns {string}
 */
export function formatSeconds(value: number): string{
    const m:number = Math.floor(value / 60);
    const s:string = `0${Math.round(value % 60)}`;

    if(m === 0){
        return value.toFixed(1);
    }
    
    return `${m}:${s.slice(-2)}`;
}

/** Get Clock Html Element
 * 
 * @returns {HTMLElement}
 */
export default function getClock(): HTMLElement{
    return clock;
}