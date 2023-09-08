import { getClock } from "./Clock";

export default async function createTimer(): Promise<HTMLElement>{
    const element = document.createElement("div");
    element.id = "timer-main";

    element.appendChild(getClock());

    return element;
}