import createCheckList from "./CheckList";
import createTimer from "./Timer";
import makeInterface from "./Util/Sound";

window.onload = () => {

    //Find Main Element
    const main: HTMLElement = document.querySelector("main");
    const header: HTMLElement = document.querySelector("header");
    main.innerHTML = "";

    createCheckList().then(checkList=>{

        createTimer().then(timer=>{

            main.appendChild(checkList);
            main.appendChild(timer);
            
            header.appendChild(makeInterface());
        });
    });
}