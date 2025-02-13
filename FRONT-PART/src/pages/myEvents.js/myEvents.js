import { linkCSS } from "../../componentes/common/linkCSS.js";
import { noEvents } from "../home/aside/noEvents.js";
import { eventsFetch } from "../home/section/eventsFetch.js";
import { renderEvents } from "../home/section/renderEvents.js";
linkCSS("./src/pages/myEvents.js/myEvents.css")

export const renderMyEvents = async () =>{
    const sectionEvents = document.querySelector("#sectionEvents");
    const aside = document.querySelector("#asideSectionHome");
    const returnToMenu = document.querySelector("#Mis-eventos");
    sectionEvents.classList = "myEvents";
    aside.classList = "hidden";
    sectionEvents.innerHTML = "";
    const myEvents = await eventsFetch("mysite/myevents");
    renderEvents(myEvents);
    noEvents("No tienes eventos creados ni eventos en los que participes");
    const h2 = document.querySelector("#h2SectionEvents");
    h2.textContent = "Mis Eventos";
    returnToMenu.textContent = "Volver al Inicio";
};