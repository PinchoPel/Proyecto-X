import { linkCSS } from "../../componentes/common/linkCSS.js";
import { multiselectionTag } from "../createEvent/multiselectionTag.js";
import { previousSight } from "../createEvent/previousSight.js";
import { noTag, warningsCreateEventForm } from "../createEvent/warningCreateEventForm.js";
import { eventsFetch } from "../home/section/eventsFetch.js";
import { infoSingleEvent } from "../infoEvents/infoSingleEvent.js";

export const modifySingleEvent = async (eventId) => {
    linkCSS("./src/pages/modifyEvent.js/modifyEvents.css")
    const eventModified = await eventsFetch(eventId); 
    const form = document.querySelector("#createEventForm");
    const divButton = document.createElement("div");
    const legendModify = document.querySelector("#createElementLegend");
    const inputEventTitle = document.querySelector("#createEventTitle");
    const imageEvent = document.querySelector("#imagePreviousSight");
    const createEventImageInput = document.querySelector("#createEventImage");
    const imageLabel = document.querySelector("#createEventImageLabel");
    const inputEventDate = document.querySelector("#createEventDate");
    const inputEventLocation = document.querySelector("#createEventLocation");
    const eventTag = document.querySelector("#createEventTag");
    const selectedOptions = document.querySelector("#selectedOptions");
    const inputEventDescription = document.querySelector("#createEventDescription");
    const buttonSubmit = document.querySelector("#createEventButtonSubmit");
    const cancelChanges = document.createElement("button");
    const buttonModify = document.createElement("button");

    divButton.id = "modifyEventDivButton";
    legendModify.textContent = "Modificar evento";
    inputEventTitle.value = eventModified.title;
    imageEvent.src = eventModified.image;
    imageEvent.classList = "eventImage";
    createEventImageInput.remove();
    imageLabel.textContent = "Haz clic para cambiar la imagen";
    inputEventDate.value = eventModified.date.split("T")[0];
    inputEventLocation.value = eventModified.location;
    let selectedTags = [...eventModified.tags]; 
    buttonSubmit.classList.add("hidden");
    
    selectedOptions.textContent = `Interes marcados: ${selectedTags.join(" ")}`;
    eventTag.addEventListener("click", ()=>{
        multiselectionTag(selectedTags);
        selectedOptions.textContent = `Interes marcados: ${selectedTags.join(" ")}`;
    });
    inputEventDescription.value = eventModified.description;
    buttonModify.textContent = "Guardar cambios";
    cancelChanges.textContent = "No hacer cambios";    
    
    divButton.append(buttonModify, cancelChanges);
    form.append(divButton);
    imageLabel.insertAdjacentElement("afterend", imageEvent);
    
    createEventImageInput.addEventListener("change", ()=> imageEvent.classList.add("hidden"));

    cancelChanges.addEventListener("click", async () => await infoSingleEvent(eventId));

    imageLabel.addEventListener("click", ()=>{
        const modifyEventImageInput = document.createElement("input");
        modifyEventImageInput .type = "file";
        modifyEventImageInput .id = "modifyEventImage";
        modifyEventImageInput .required = true;
        modifyEventImageInput .name = "image";
        modifyEventImageInput.classList = "hidden";
        imageLabel.setAttribute("for",  "modifyEventImage");
        imageLabel.insertAdjacentElement("beforebegin", modifyEventImageInput);
        modifyEventImageInput.addEventListener("change",() => previousSight("#modifyEventImage", "#imagePreviousSight", "#createEventImageLabel"));
    });

    buttonModify.addEventListener("click", async (event)=>{
        event.preventDefault(); 
        warningsCreateEventForm();
        noTag(selectedTags);
        if (!document.querySelector(".errorFormMessage")) {
            const token = localStorage.getItem("userToken");
            const modifyEventForm = new FormData(form);
            selectedTags.forEach(opcion => {
                modifyEventForm.append("tags[]", opcion);
            });  
            const response = await fetch(`http://localhost:3000/api/v1/events/modifyEvent/${eventId}`,{
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: modifyEventForm
            });
                await response.json();
                await infoSingleEvent(eventId);
        };          
    });         
};