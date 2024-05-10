import CheckList from "./CheckList";
import TimerList from "./TimerList";
import { createElement as _, appendChildren } from "./Util/Element";
import {makeSoundInterface} from "./Util/Sound";
import {makeClockInterface} from "./Util/Clock";

const ANCHOR_REGEX = /(?<=#).*(?=$)/;

const Error = (message:string) => _("p", {class: "error"}, message);

window.onload = () => {
    const main = document.querySelector("main");
    const header = document.querySelector("header");

    const checkList = new CheckList();
    const timer = new TimerList();
    const navigation = _("nav", 
        _("a", {href: "#checkList"}, "Check List"),
        _("a", {href: "#timers"}, "Timers")
    )

    /** Basic Routing
     * 
     * @param {string} target 
     */
    const routing = (target:string) => {
        main.innerHTML = "";
        switch(target){
            case "checkList":
                main.appendChild(checkList);
                break;

            case "timers":
                main.appendChild(timer);
                break;

            default:
                main.appendChild(Error(`Unable to find '${target}'!`))
        }
    }

    navigation.addEventListener("click", (event:Event)=>{
        const link:HTMLAnchorElement|null = (<HTMLElement>event.target).closest("a");

        if(link){
            const match = link.href.match(ANCHOR_REGEX);

            if(match) {
                routing(match[0])
            }
        }
    });

    header.appendChild(navigation);
    header.appendChild(_("div", {class: "status"}, 
        makeClockInterface(),
        makeSoundInterface()
    ));

    const initMatch = window.location.href.match(ANCHOR_REGEX);
    if(initMatch){
        routing(initMatch[0]);
    } else {
        routing("checkList");
    }
}