import { linkCSS } from "../../componentes/common/linkCSS.js";
import { arrayProvinces, arrayTags } from "../home/aside/arraysForSelects.js";
import { createEventFetch } from "./createEventFetch.js";
import { multiselectionTag } from "./multiselectionTag.js";
import { previousSight } from "./previousSight.js";
import { noTag, warningsCreateEventForm } from "./warningCreateEventForm.js";

linkCSS("./src/pages/createEvent/createEvent.css");
export const createEvent = () =>{
    const sectionEvents = document.querySelector("#sectionEvents");
    const returnToMenu = document.querySelector("#Crear-evento");
    sectionEvents.classList = "CreateEvent";
    sectionEvents.innerHTML = "";
    returnToMenu.textContent = "Volver al Inicio";

    const createEventDiv = document.createElement("div");
    const createElementFieldset = document.createElement("fieldset");
    const createElementLegend = document.createElement("legend");
    const createEventForm = document.createElement("form");
    const createEventTitleLabel = document.createElement("label");
    const createEventTitleInput = document.createElement("input");
    const createEventImageLabel = document.createElement("label");
    const createEventImageInput = document.createElement("input");
    const createEventDateLabel = document.createElement("label");
    const createEventDateInput= document.createElement("input");
    const createEventLocationLabel = document.createElement("label");
    const createEventLocationSelect = document.createElement("select");
    const createEventTagLabel = document.createElement("label");
    const createEventTagSelect = document.createElement("select");
    const selectedOptions = document.createElement("p");
    const createEventDescriptionLabel = document.createElement("label");
    const createEventDescription = document.createElement("textarea");
    const createEventButtonSubmit = document.createElement("button");
    const imagePreviousSight = document.createElement("img");

    createEventDiv.id= "createEventDiv";
    createEventForm.id = "createEventForm";
    createElementFieldset.id = "createElementFieldset";
    createElementLegend.id = "createElementLegend";
    createElementLegend.textContent = "Crea tu evento";
    createEventTitleLabel.setAttribute("for", "createEventTitle");
    createEventTitleLabel.textContent = "Título del evento";
    createEventTitleInput.type = "text";
    createEventTitleInput.required = true;
    createEventTitleInput.id = "createEventTitle";
    createEventTitleInput.name = "title";
    createEventTitleInput.placeholder = "Elige un título";

    createEventImageLabel.textContent = `Haz clic aquí para subir una imagen relacionada con el evento`;
    createEventImageLabel.setAttribute("for", "createEventImage")
    createEventImageLabel.id = "createEventImageLabel";
    createEventImageInput.type = "file";
    createEventImageInput.id = "createEventImage";
    createEventImageInput.required = true;
    createEventImageInput.name = "image";
    imagePreviousSight.id = "imagePreviousSight";

    createEventDateLabel.textContent = "Cuándo se va a realizar el evento";
    createEventDateLabel.setAttribute("for", "createEventDate");
    createEventDateInput.id = "createEventDate";
    createEventDateInput.name = "date";
    createEventDateInput.type = "date";
    createEventDateInput.required = true;

    createEventLocationLabel.textContent = "Dónde se va a realizar el evento";
    createEventLocationLabel.setAttribute("for", "createEventLocation");
    createEventLocationSelect.id = "createEventLocation";
    createEventLocationSelect.name = "location";
    createEventLocationSelect.required = true;
    createEventLocationSelect.size = 5;
    for (const province of arrayProvinces) {
        const option = document.createElement("option");
        option.textContent = province;
        option.value = province;
        createEventLocationSelect.append(option);
    };

    createEventTagLabel.setAttribute("for", "createEventTag");
    createEventTagLabel.textContent = "Elige al menos una temática";
    createEventTagSelect.id = "createEventTag";
    createEventTagSelect.multiple = true;
    createEventTagSelect.name = "tags";
    createEventTagSelect.required = true;
    for (const tag of arrayTags) {
        const option = document.createElement("option");
        option.value = tag
;       option.textContent = tag;
        createEventTagSelect.append(option);
    };
    selectedOptions.id = "selectedOptions";

    createEventDescriptionLabel.setAttribute("for", "createEventDescription");
    createEventDescriptionLabel.textContent = "Puedes poner una descripción para el evento (opcional)";
    createEventDescription.id = "createEventDescription";
    createEventDescription.name = "description";
    createEventDescription.rows = 5;
    createEventDescription.cols = 15;
    createEventDescription.placeholder = "Escribe aquí la descripción de tu evento. Es recomendable indicar de qué trata el evento, en qué localidad y dirección se va realizar, la duración del mismo y cómo llegar ";

    createEventButtonSubmit.textContent = "Crear evento";
    createEventButtonSubmit.id = "createEventButtonSubmit";

    createElementFieldset.append(createElementLegend, createEventTitleLabel, createEventTitleInput, createEventImageLabel, createEventImageInput, imagePreviousSight, createEventDateLabel, createEventDateInput, createEventLocationLabel, createEventLocationSelect, createEventTagLabel, createEventTagSelect, selectedOptions, createEventDescriptionLabel, createEventDescription);
    createEventForm.append(createElementFieldset, createEventButtonSubmit);
    createEventDiv.append(createEventForm);
    sectionEvents.append(createEventDiv);

    createEventImageInput.addEventListener("change",() => previousSight("#createEventImage", "#imagePreviousSight", "#createEventImageLabel"));

    let selected = [];
    createEventTagSelect.addEventListener("click", ()=>{
        multiselectionTag(selected);
        selectedOptions.textContent= `Interes marcados: ${Array.from(selected).join(" ")}`;
    });

    createEventButtonSubmit.addEventListener("click", async (event)=>{ 
        event.preventDefault();
        warningsCreateEventForm(); 
        noTag(selected);
        if (!document.querySelector(".errorFormMessage")) {
            await createEventFetch(selected); 
        }
    });
};