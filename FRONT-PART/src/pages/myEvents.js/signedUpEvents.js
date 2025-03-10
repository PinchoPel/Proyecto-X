import { linkCSS } from "../../componentes/common/linkCSS.js";
import { noEvents } from "../home/aside/noEvents.js";
import { eventsFetch } from "../home/section/eventsFetch.js";
import { renderEvents } from "../home/section/renderEvents.js";
import { renderMyCreatedEvents } from "./myCreatedEvents.js";
linkCSS("./src/pages/myEvents.js/myEvents.css")

export const renderSignedUpEvent = async () =>{
    const sectionEvents = document.querySelector("#sectionEvents");
    const returnToMenu = document.querySelector("#Mis-eventos");
    sectionEvents.classList = "myEventsSignedUp";
    sectionEvents.innerHTML = "";
    const myEvents = await eventsFetch("mysite/myevents");
    await renderEvents(myEvents);
    const h3 = document.createElement("h3");
    h3.textContent = "Ver eventos creados por mí";
    h3.id = "h3MyEvents";
    const h2 = document.querySelector("#h2SectionEvents");
    h2.textContent = "Eventos en los que participo";
    h2.classList = "MyEvents";
    h2.insertAdjacentElement("afterend", h3);
    h3.addEventListener("click", async () => {await renderMyCreatedEvents()})
    noEvents("No tienes en los que participes");
    returnToMenu.textContent = "Volver al Inicio";
};