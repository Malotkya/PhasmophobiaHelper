import CheckList from "./CheckList";
import Timer from "./Timer";
import makeInterface from "./Util/Sound";
import getClock from "./Timer/Clock";
import App from "./Pages";

const app = new App();

app.add("", CheckList());
app.add("Check List", CheckList());
app.add("Timers", Timer());

app.onReady(()=>{
    const container: HTMLElement = document.createElement("div");
    container.className = "status";
    container.appendChild(getClock());
    container.appendChild(makeInterface());
    document.querySelector("header").appendChild(container);
});