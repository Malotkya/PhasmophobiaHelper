import {createAllTimers} from "./Timer";
import StopWatch from "./StopWatch";
import HuntTimer from "./HuntTimer";

const timer = document.createElement("div");
    timer.id = "timer-main";

const list = document.createElement("ul");
list.appendChild(new StopWatch());
createAllTimers(list);
list.appendChild(new HuntTimer());


timer.appendChild(list);

export default function Timer(): HTMLElement{
    return timer;
}