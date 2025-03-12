import { cleanFilters } from "../home/aside/cleanFilters.js";
import { eventsFetch } from "../home/section/eventsFetch.js";
import { renderEvents } from "../home/section/renderEvents.js";
import { renderMyCreatedEvents } from "../myEvents.js/myCreatedEvents.js";
import { renderSignedUpEvent } from "../myEvents.js/signedUpEvents.js";
import { getUserName } from "./getUserName.js";

export const leaveEvent = async  (sectionEvents, eventDivEnlarged, author) => {
    const myEvents = document.querySelector("#Mis-eventos");
    const userName = getUserName();
    if (!myEvents) {
        const aside = document.querySelector("#asideSectionHome");
        aside.classList.remove("hidden");
        sectionEvents.classList.remove("singleEvent");
        eventDivEnlarged.classList.remove("eventDivEnlarged");
        const events = await eventsFetch("orderdates/1");
        await renderEvents(events);
        cleanFilters();
    }
    else if (myEvents) {
        if (myEvents.textContent == "Volver al Inicio" && userName == author) {
            await renderMyCreatedEvents();   
            cleanFilters();  
            }
        else if (myEvents.textContent == "Volver al Inicio" && userName !== author){
            await renderSignedUpEvent();
            cleanFilters();
        }
        else{
            const aside = document.querySelector("#asideSectionHome");
            aside.classList.remove("hidden");
            sectionEvents.classList.remove("singleEvent");
            eventDivEnlarged.classList.remove("eventDivEnlarged");
            const events = await eventsFetch("orderdates/1");
            await renderEvents(events);
            cleanFilters();
        }
    }
};