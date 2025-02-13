import { eventsFetch } from "./eventsFetch.js";
import { linkCSS } from "../../../componentes/common/linkCSS.js";
import { renderEvents } from "./renderEvents.js";


export const createSectionHome = async () => {
    const divHome = document.querySelector("#divHome");
    const sectionEvents = document.createElement("section");
    linkCSS("./src/pages/home/section/sectionHome.css");
    sectionEvents.id = "sectionEvents";

    divHome.append(sectionEvents);
    const events = await eventsFetch("orderdates/1");
    renderEvents(events);
};