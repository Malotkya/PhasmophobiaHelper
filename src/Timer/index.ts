import getClock from "./Clock";
import Timer, {createAllTimers} from "./Timer";
import StopWatch from "./StopWatch";
import HuntTimer from "./HuntTimer";

export default async function createTimer(): Promise<HTMLElement>{
    const element = document.createElement("div");
    element.id = "timer-main";

    const table = document.createElement("table");
    createAllTimers(table);
    new HuntTimer(table);
    new StopWatch(table);

    element.appendChild(getClock());
    element.appendChild(table);
    
    return element;
}