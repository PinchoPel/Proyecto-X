import { linkCSS } from "../../componentes/common/linkCSS.js";
linkCSS("./src/pages/createEvent/createEvent.css");
    
export const warningsCreateEventForm = () =>{
    const title = document.querySelector("#createEventTitle");
    const image = document.querySelector("#createEventImage");
    const date = document.querySelector("#createEventDate");
    const location = document.querySelector("#createEventLocation");

    function error (ownClass, element, message) {
        const pError = document.createElement("p");
        if (element && element.value == "") {
            pError.classList.add(ownClass, "errorFormMessage");
            if (!document.querySelector(`.${ownClass}`)) {
                pError.textContent = message;
                element.insertAdjacentElement("afterend", pError);           
            }
        }
        else{
            const error = document.querySelector(`.${ownClass}`); 
                if (error) {
                    error.remove();
                }
        }
    };

error("titleWarning", title, "Es necesario introducir un título" );
error("imageWarning", image, "Selecciona una imagen para el evento");
error("dateWarning", date, "Indica la fecha de celebración del evento");
error("locationWarning", location, "Indica dónde se va a celebrar el evento");
};

export const noTag = (selected) => {
    const pError = document.createElement("p");  
    if (selected.length < 1) {
        pError.classList.add("tagWarning", "errorFormMessage");
        if (!document.querySelector(`.tagWarning`)) {
            pError.textContent = "Se debe indicar al menos una temática para el evento";
            document.querySelector("#createEventTag").insertAdjacentElement("afterend", pError);
        }
    }else if(selected.length >= 1){
        const error = document.querySelector(`.tagWarning`); 
            if (error) {
                error.remove();
            }
    }
};