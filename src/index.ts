import createCheckList from "./CheckList";
import makeInterface from "./Util/Sound";

window.onload = () => {

    //Find Main Element
    const main: HTMLElement = document.querySelector("main");
    const header: HTMLElement = document.querySelector("header");
    main.innerHTML = "";

    createCheckList(main).then(()=>{
        header.appendChild(makeInterface());
    });
}