import CheckList from "./CheckList";
import Tools from "./Tools";
import Settings from "./Settings";
import { createElement as _, appendChildren } from "./Util/Element";
import {makeSoundInterface} from "./Util/Sound";
import {makeClockInterface} from "./Util/Clock";

const ANCHOR_REGEX = /(?<=#).*?(?=$|\?)/;

const Error = (message:string) => _("p", {class: "error"}, message);

window.onload = () => {
    const main = document.querySelector("main");
    const header = document.querySelector("header");

    const checkList = new CheckList();
    const tools = new Tools();
    const settings = new Settings(checkList, tools.timers.huntTimer)
    const navigation = _("nav", 
        _("div", _("a", {href: "#checkList"}, "Check List")),
        _("div", _("a", {href: "#tools"}, "Tools")),
        _("div", _("a", {href: "#settings"}, "Settings"))
    )

    const btnReset = _("button", {id:"btnReset"}, "Reset Evidence");
    btnReset.addEventListener("click", ()=>checkList.reset());

    /** Basic Routing
     * 
     * @param {string} target 
     */
    const routing = (target:string) => {
        main.innerHTML = "";
        switch(target.toLocaleLowerCase()){
            case "checklist":
                main.appendChild(checkList);
                break;

            case "tools":
                main.appendChild(tools);
                break;

            case "settings":
                main.appendChild(settings);
                break;

            default:
                main.appendChild(Error(`Unable to find '${target}'!`))
        }
    }

    navigation.addEventListener("click", (event:Event)=>{
        const link:HTMLAnchorElement|null = (<HTMLElement>event.target).closest("a");

        if(link){
            link.blur();
            const match = link.href.match(ANCHOR_REGEX);

            if(match) {
                event.preventDefault();
                window.history.pushState({}, "", link.href);
                routing(match[0]);
            }
        }
    });

    appendChildren(header, [
        navigation,
        makeClockInterface(),
        _("div", {class: "input"}, btnReset),
        makeSoundInterface()
    ])

    const initMatch = window.location.href.match(ANCHOR_REGEX);
    if(initMatch){
        routing(initMatch[0]);
    } else {
        routing("checkList");
    }

    window.onpopstate = () => {
        const match = window.location.href.match(ANCHOR_REGEX);

        if(match) {
            routing(match[0])
        } else {
            routing("CheckList");
        }
    }
}