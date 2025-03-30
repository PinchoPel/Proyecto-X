import { fetchFunction } from "../../componentes/common/fetchFunction.js";
import { loadedContent, loadScreen } from "../../componentes/common/loadScreen.js";
import { eventsFetch } from "../home/section/eventsFetch.js";
import { renderEvents } from "../home/section/renderEvents.js";
import { createEvent } from "./createEventElements.js";

const token = localStorage.getItem("userToken");

export const createEventFetch = async (selected) => {
    try {
        loadScreen();
        const createEventForm = new FormData(document.querySelector("#createEventForm"));
        selected.forEach(opcion => {
            createEventForm.append("tags[]", opcion);
        });  

        const response = await fetchFunction("POST", `events/newEvent`, { "Authorization": `Bearer ${token}`}, createEventForm)

            await response.json();
    
        if (response.ok) {
            const sectionEvents = document.querySelector(".CreateEvent");
            sectionEvents.innerHTML = "";
            const divAfterCreateElement = document.createElement("div");
            const divForButtons = document.createElement("div");
            const pSuccessCreateEvent = document.createElement("p");
            const pChoice = document.createElement("p");
            const buttonReturnMenu = document.createElement("button");
            const buttonNewEvent = document.createElement("button");
    
            divAfterCreateElement.id = "divAfterCreateElement";
            divForButtons.id = "divForButtons";
            pSuccessCreateEvent.textContent = "¡Enhorabuena, has creado un nuevo evento!";
            pChoice.textContent = "Elige qué quieres hacer a continuación"
            buttonReturnMenu.textContent = "Menú principal";
            buttonNewEvent.textContent = "Crear otro evento";
    
            divForButtons.append(buttonReturnMenu, buttonNewEvent);
            divAfterCreateElement.append(pSuccessCreateEvent,pChoice, divForButtons);
            sectionEvents.append(divAfterCreateElement);
    
            buttonReturnMenu.addEventListener("click", async ()=>{
                const aside = document.querySelector("#asideSectionHome");
                const sectionEvents = document.querySelector("#sectionEvents");
                const anchor = document.querySelector("#Crear-evento");
                const events = await eventsFetch("orderdates/1");
                sectionEvents.classList.remove("CreateEvent");
                aside.classList.remove("hidden");
                anchor.textContent = "Crear evento";
                await renderEvents(events);
            })
    
            buttonNewEvent.addEventListener("click",  ()=>{
                  createEvent();
            })
        }
    } catch (error) {
        console.error("Error al crear el evento:", error);
    }finally{
        loadedContent();
    }
};