import CheckList from "./CheckList";
import TimerList from "./TimerList";
import { createElement as _, appendChildren } from "./Util/Element";
import {makeSoundInterface} from "./Util/Sound";
import {makeClockInterface} from "./Util/Clock";

window.onload = () => {
    const main = document.querySelector("main");
    const header = document.querySelector("header");

    const navigation = _("nav", 
        _("a", {href: "#checkList"}, "Check List"),
        _("a", {href: "#timers"}, "Timers")
    )

    navigation.addEventListener("click", (event:Event)=>{

    });

    header.appendChild(navigation);
    header.appendChild(_("div", {class: "status"}, 
        makeClockInterface(),
        makeSoundInterface()
    ));

    main.appendChild(new TimerList());
    main.appendChild(new CheckList());
}