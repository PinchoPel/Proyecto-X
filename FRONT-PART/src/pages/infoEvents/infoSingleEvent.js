import { linkCSS } from "../../componentes/common/linkCSS.js";
import { createModalDiv } from "../../componentes/common/modalDiv.js";
import { getUserRole } from "../../componentes/common/userRole.js";
import { createEvent } from "../createEvent/createEventElements.js";
import { eventsFetch } from "../home/section/eventsFetch.js";
import { renderEvents } from "../home/section/renderEvents.js";
import { modifySingleEvent } from "../modifyEvent.js/modifyEvent.js";
import { fetchDeleteEvent } from "./deleteEvent.js";
import { fetchSignUp } from "./fetchSignUp.js";
import { getUserName } from "./getUserName.js";
import { leaveEvent } from "./leaveEvent.js";
import { visitProfile } from "./visitProfile.js";

export const infoSingleEvent = async  (eventId) => {
    linkCSS("./src/pages/infoEvents/singleEvent.css")
    const sectionEvents = document.querySelector("#sectionEvents");
    const singleEvent = await eventsFetch(eventId); 
    sectionEvents.innerHTML = "";
    await renderEvents([singleEvent]);

    const h2 = document.querySelector("#h2SectionEvents");
    const titleEventEnlarged = document.querySelector(".eventTitle");
    const anchorInformation =  document.querySelector(".selectEvent");
    const eventDivEnlarged = document.querySelector(".eventDiv");
    const belowDiv = document.createElement("div");
    const divTags = document.createElement("div");
    const divParticipants = document.createElement("div");
    const divActionsButtons = document.createElement("div");
    const description = document.createElement("h4");
    const descriptionEvent = document.createElement("p");
    const author = document.createElement("p");
    const authorEvent = document.createElement("p");
    const h4Participants = document.createElement("h4");
    const returnHomeButton = document.createElement("button");
    const role = getUserRole();
    const userName = getUserName();
    const participants = singleEvent.participants;
    for (const profileParticipant of participants) {
        const participantImage = document.createElement("img");
        participantImage.src = profileParticipant.image;
        participantImage.classList = "participantImage";
        divParticipants.append(participantImage);
        participantImage.addEventListener("click", ()=>{
            visitProfile(profileParticipant);
        })
    };
    if (localStorage.getItem("userToken")) {
        const participateButton = document.createElement("button");
        const participateImage = document.createElement("img");
        const spanparticipateButton = document.createElement("span");
        participateImage.classList = "toggleeye";
        participateImage.src = "./src/images/star-svgrepo-com.svg";
        spanparticipateButton.textContent = "Unirse al evento";
        spanparticipateButton.classList = "spanButton";
        if (singleEvent.author == userName) {  
            participateButton.classList = "hidden";
            participateButton.disabled = true;
        }
        for (const participant of participants) {
            if (participant.userName == userName ) {
                participateImage.src = "./src/images/exit-door-sign-svgrepo-com.svg";
                spanparticipateButton.textContent = "Salir del evento";
            }else{
                participateImage.src = "./src/images/star-svgrepo-com.svg";
                spanparticipateButton.textContent = "Unirse al evento";
            }
        };
        participateButton.append(participateImage, spanparticipateButton);
        divActionsButtons.append(participateButton);

        participateButton.addEventListener("click", async function (event){
            event.target.disabled ? (event.preventDefault(), event.stopPropagation()) : null;
            event.preventDefault();
            await fetchSignUp(eventId);
            await infoSingleEvent(eventId);
        });
    };
    if (role == "admin" || singleEvent.author == userName ) {
        const editButton = document.createElement("button");
        const editImage = document.createElement("img");
        const spanEditButton = document.createElement("span");
        const eliminateButton = document.createElement("button");
        const eliminateImage = document.createElement("img");
        const spaneliminateButton  = document.createElement("span");
        editImage.classList = "toggleeye";
        editImage.src = "./src/images/edit-2-svgrepo-com.svg";
        eliminateImage.classList = "toggleeye";
        eliminateImage.src = "./src/images/trash-bin-trash-svgrepo-com.svg";
        spanEditButton.textContent = "Editar evento";
        spanEditButton.classList = "spanButton";
        spaneliminateButton.textContent = "Eliminar evento";
        spaneliminateButton.classList = "spanButton";
        editButton.append(editImage, spanEditButton);
        eliminateButton.append(eliminateImage, spaneliminateButton);
        divActionsButtons.append(editButton, eliminateButton);
        editButton.addEventListener("click", ()=>{
            createEvent();
            modifySingleEvent(eventId);
        });
        eliminateButton.addEventListener("click", (event) => {
            event.preventDefault();
            createModalDiv("¿De verdad quieres eliminar este evento?", async ()=> await fetchDeleteEvent(eventId))
        });
    };
    eventDivEnlarged.id = "eventDivEnlarged";
    h2.textContent = singleEvent.title;
    sectionEvents.classList = "singleEvent";
    belowDiv.id = "belowDivEvent";
    divTags.id = "divTags";
    divParticipants.id = "divParticipants";
    description.textContent = "Descripción del evento";
    descriptionEvent.textContent = singleEvent.description;
    author.textContent = "Creado por: ";
    authorEvent.textContent = singleEvent.author;
    anchorInformation.remove();
    h4Participants.textContent = "Ya inscritos en el evento";
    divActionsButtons.id = "divActionsButtons";
    returnHomeButton.id = "returnFromEvent";
    returnHomeButton.textContent = "Cerrar evento";
    for (let index = 0; index < singleEvent.tags.length; index++) {
        const tagEvent = document.createElement("p");
        tagEvent.textContent = singleEvent.tags[index];
        divTags.append(tagEvent);
    };
    belowDiv.append(divTags, description, descriptionEvent);
    titleEventEnlarged.insertAdjacentElement("beforebegin", author);
    author.insertAdjacentElement("afterend", authorEvent);
    descriptionEvent.insertAdjacentElement("afterend", h4Participants);
    eventDivEnlarged.append(belowDiv, divParticipants, divActionsButtons, returnHomeButton);

    returnHomeButton.addEventListener("click", async (event)=>{ 
        event.preventDefault();
        await leaveEvent(sectionEvents, eventDivEnlarged, singleEvent.author);
    });
};