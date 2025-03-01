import { eventsFetch } from "../home/section/eventsFetch.js";
import { renderEvents } from "../home/section/renderEvents.js";

export const leaveEvent = async  (sectionEvents, eventDivEnlarged) => {
    const aside = document.querySelector("#asideSectionHome");
    aside.classList.remove("hidden");
    sectionEvents.classList.remove("singleEvent");
    eventDivEnlarged.classList.remove("eventDivEnlarged");
    const events = await eventsFetch("orderdates/1");
    await renderEvents(events);
};