import {createAllTimers} from "./Timer";
import StopWatch from "./StopWatch";
import HuntTimer from "./HuntTimer";

const timer = document.createElement("div");
    timer.id = "timer-main";

const list = document.createElement("ul");
new StopWatch(list);
createAllTimers(list);
new HuntTimer(list);


timer.appendChild(list);

export default function Timer(): HTMLElement{
    return timer;
}