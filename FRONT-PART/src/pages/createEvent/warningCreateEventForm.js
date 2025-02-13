import { linkCSS } from "../../componentes/common/linkCSS.js";
linkCSS("./src/pages/createEvent/createEvent.css");
    
export const warningsCreateEventForm = () =>{
    const title = document.querySelector("#createEventTitle");
    const image = document.querySelector("#createEventImage");
    const date = document.querySelector("#createEventDate");
    const location = document.querySelector("#createEventLocation");
    const tag = document.querySelector("#createEventTag");

    function error (ownClass, element, message) {
        const pError = document.createElement("p");
        if (element.value == "") {
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
error("tagWarning", tag, "Hay que indicar una temática al menos");
};