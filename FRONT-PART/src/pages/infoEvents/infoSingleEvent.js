import { linkCSS } from "../../componentes/common/linkCSS.js";
import { getUserRole } from "../../componentes/common/userRole.js";
import { eventsFetch } from "../home/section/eventsFetch.js";
import { renderEvents } from "../home/section/renderEvents.js";
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
    const participateButton = document.createElement("button");
    const participateImage = document.createElement("img");
    const spanparticipateButton = document.createElement("span");
    const role = getUserRole();
    const userName = getUserName();
    
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
    }
    const returnHomeButton = document.createElement("button");
    const participants = singleEvent.participants;

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
    participateImage.classList = "toggleeye";
    participateImage.src = "./src/images/star-svgrepo-com.svg";
    spanparticipateButton.textContent = "Unirse al evento";
    spanparticipateButton.classList = "spanButton";
    if (singleEvent.author == userName) {
        participateButton.classList = "hidden";
        participateButton.disabled = true;
    }
    returnHomeButton.id = "returnFromEvent";
    returnHomeButton.textContent = "Salir del evento";
    for (let index = 0; index < singleEvent.tags.length; index++) {
        const tagEvent = document.createElement("p");
        tagEvent.textContent = singleEvent.tags[index];
        divTags.append(tagEvent);
    };
    for (const participant of participants) {
        if (participant.userName == userName ) {
            participateImage.src = "./src/images/exit-door-sign-svgrepo-com.svg";
            spanparticipateButton.textContent = "Salir del evento";
        }else{
            participateImage.src = "./src/images/star-svgrepo-com.svg";
            spanparticipateButton.textContent = "Unirse al evento";
        }
        const participantImage = document.createElement("img");
        participantImage.src = participant.image;
        participantImage.classList = "participantImage";
        divParticipants.append(participantImage);

        participantImage.addEventListener("click", ()=>{
            visitProfile(participant);
        })
    };
    belowDiv.append(divTags, description, descriptionEvent);
    titleEventEnlarged.insertAdjacentElement("beforebegin", author);
    author.insertAdjacentElement("afterend", authorEvent);
    descriptionEvent.insertAdjacentElement("afterend", h4Participants);
    participateButton.append(participateImage, spanparticipateButton);
    divActionsButtons.append(participateButton);
    eventDivEnlarged.append(belowDiv, divParticipants, divActionsButtons, returnHomeButton);

    returnHomeButton.addEventListener("click", async (event)=>{ 
        event.preventDefault();
        await leaveEvent(sectionEvents, eventDivEnlarged);
    });
    participateButton.addEventListener("click", async function (event){
        event.target.disabled ? (event.preventDefault(), event.stopPropagation()) : null;
        event.preventDefault();
        await fetchSignUp(eventId);
        await infoSingleEvent(eventId);
    });
};