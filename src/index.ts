import createCheckList from "./CheckList";

window.onload = () => {

    //Find Main Element
    const main: HTMLElement = document.querySelector("main");
    const header: HTMLElement = document.querySelector("header");
    main.innerHTML = "";

    createCheckList(main, header);
}