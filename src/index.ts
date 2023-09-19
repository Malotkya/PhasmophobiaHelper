import CheckList from "./CheckList";
import Timer from "./Timer";
import makeInterface from "./Util/Sound";
import getClock from "./Timer/Clock";
import App from "./Pages";

const app = new App();

app.add("", CheckList());
app.add("Check List", CheckList());
app.add("Timer", Timer());

app.onReady(()=>{
    const header: HTMLElement = document.querySelector("header");
    header.appendChild(makeInterface());
    header.appendChild(getClock());
});