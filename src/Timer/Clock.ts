const clock = document.createElement("span");

export interface Task{
    index: number,
    type: string,
    description: string,
    endTime: number,
    delete: number
}
let queue: Array<Task> = [];

const refreshRate = 250;
function clockThread(): void{
    let now = new Date(Date.now());
    let h:string = `0${now.getHours() % 12}`;
    let m:string = `0${now.getMinutes()}`;
    let s:string = `0${now.getSeconds()}`;

    clock.textContent = `${h.slice(-2)}:${m.slice(-2)}:${s.slice(-2)}`;

    //Delete any tasks
    queue = queue.filter((task:Task)=>task.delete < now.valueOf());

    window.setTimeout(clockThread, refreshRate);
}clockThread();

export function getClock(){
    return clock;
}