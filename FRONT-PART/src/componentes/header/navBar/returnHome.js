import { eventsFetch } from "../../../pages/home/section/eventsFetch.js";
import { renderEvents } from "../../../pages/home/section/renderEvents.js";

export const returnHome = async (anchorSelector, anchorText, classRemove) => {
    const aside = document.querySelector("#asideSectionHome");
    const sectionEvents = document.querySelector("#sectionEvents");
    const anchor = document.querySelector(anchorSelector);
    const events = await eventsFetch("orderdates/1");
    sectionEvents.classList.remove(classRemove);
    aside.classList.remove("hidden");
    await renderEvents(events);
    anchor.textContent = anchorText;
};