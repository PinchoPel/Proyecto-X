import { noEvents } from "../home/aside/noEvents.js";
import { eventsFetch } from "../home/section/eventsFetch.js";
import { renderEvents } from "../home/section/renderEvents.js";
import { renderSignedUpEvent } from "./signedUpEvents.js";

export const renderMyCreatedEvents = async () => {
    const sectionEvents = document.querySelector("#sectionEvents");
    const returnToMenu = document.querySelector("#Mis-eventos");
    sectionEvents.classList = "myEventsCreated";
    sectionEvents.innerHTML = "";
    const myEvents = await eventsFetch("mysite/createdEvents");
    await renderEvents(myEvents);
    const h3 = document.createElement("h3");
    h3.textContent = "Ver eventos en los que participo";
    h3.id = "h3MyEvents";
    const h2 = document.querySelector("#h2SectionEvents");
    h2.textContent = "Eventos que he creado";
    h2.classList = "MyEvents";
    h2.insertAdjacentElement("afterend", h3);
    h3.addEventListener("click", async () => {await renderSignedUpEvent()})
    noEvents("No tienes eventos creados por ti");
    returnToMenu.textContent = "Volver al Inicio";
};