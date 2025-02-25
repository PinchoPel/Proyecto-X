import { eventsFetch } from "../home/section/eventsFetch.js";
import { renderEvents } from "../home/section/renderEvents.js";

export const infoSingleEvent = async  (eventId) => {
    const sectionEvents = document.querySelector("#sectionEvents");
    const h2 = document.querySelector("#h2SectionEvents");
    const singleEvent = await eventsFetch(eventId);
    
    sectionEvents.classList = "singleEvent"; //igual no sirve
    sectionEvents.innerHTML = "";
    await renderEvents([singleEvent]);

    console.log(singleEvent);
    
    const divEventEnlarged = document.querySelector(".eventDiv");
    const returnToHome =  document.querySelector(".selectEvent");
    const belowDiv = document.createElement("div");
    const description = document.createElement("p");
    const descriptionEvent = document.createElement("p");
    const author = document.createElement("p");
    const authorEvent = document.createElement("p");

    description.textContent = "Descripción del evento";
    descriptionEvent.textContent = singleEvent.description;
    author.textContent = "Creado por: ";
    authorEvent.textContent = singleEvent.author;
    for (let index = 0; index < singleEvent.tags.length; index++) {
        const tagEvent = document.createElement("p");
        tagEvent.textContent = singleEvent.tags[index];

    }





    returnToHome.textContent = "Salir del evento";
    returnToHome.addEventListener("click", async (event)=>{ 
        if (returnToHome.textContent == "Salir del evento") {
            event.preventDefault();
            sectionEvents.classList.remove("singleEvent");
            const events = await eventsFetch("orderdates/1");
            await renderEvents(events);
        };
    });
};