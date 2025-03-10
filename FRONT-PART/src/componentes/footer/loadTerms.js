import { eventsFetch } from "../../pages/home/section/eventsFetch.js";
import { renderEvents } from "../../pages/home/section/renderEvents.js";

export const loadTerms =  () => {
    const sectionEvents = document.querySelector("#sectionEvents");
    const aside = document.querySelector("#asideSectionHome");
    const footer = document.querySelector("footer");
    const h2Terms= document.createElement("h2");
    const h3Introduction = document.createElement("h3");
    const pTerms = document.createElement("p");
    const h3Servicies = document.createElement("h3");
    const pServicies = document.createElement("p");
    const h3Register = document.createElement("h3");
    const pRegister = document.createElement("p");
    const h3Suitable = document.createElement("h3");
    const ulSuitable = document.createElement("ul");
    const arraySuitable = ["No utilizar la plataforma para fines ilegales o no autorizados.", "No utilizar palabras, términos ni imágenes ofensivos.", "No utilizar la publicación de eventos con fines comerciales salvo la propia publicación del evento."]
    for (let index = 0; index < arraySuitable.length; index++) {
        const liSuitable = document.createElement("li");
        liSuitable.textContent = arraySuitable[index];
        ulSuitable.append(liSuitable);
    }
    const h3Content = document.createElement("h3");
    const pContent = document.createElement("p");
    const h3Responsability = document.createElement("h3");
    const ulResponsability = document.createElement("ul");
    const arrayResponsability = ["Zona de Eventos 10 no se hace responsable de los daños o perjuicios causados por los eventos creados por sus usuarios y/o participantes de los mismos.", "Tampoco Zona de Eventos 10 será responsable de los eventos cancelados por el usuario que los creó.", "Cada usuario es responsable de sus propios comentarios y anotaciones y, en su caso, de los eventos que publique."]
    for (let index = 0; index < arrayResponsability.length; index++) {
        const liResponsability = document.createElement("li");
        liResponsability.textContent = arrayResponsability[index];
        ulResponsability.append(liResponsability)
    }
    const h3Modification= document.createElement("h3");
    const pModification= document.createElement("p");
    const returnButton = document.createElement("button");
    sectionEvents.innerHTML = "";

    footer.classList = "termsFooter";
    aside.classList = "hidden";
    h2Terms.textContent = "Terminos y Condiciones de Uso";
    h3Introduction.textContent ="Introducción"
    pTerms.textContent = "Bienvenido a Zona de Eventos 10. Al acceder y utilizar nuestros servicios, aceptas cumplir con los presentes términos y condiciones. Si no estás de acuerdo, te recomendamos no utilizar nuestra plataforma."
    h3Servicies.textContent = "Servicios";
    pServicies.textContent = "Zona de Eventos 10 es una web dedicada a la organización y gestión de eventos. A través de nuestra plataforma, los usuarios pueden crear eventos de todo tipo así como apuntarse a los creados por otros."
    h3Register.textContent = "Registro";
    pRegister.textContent = "Es necesario registrarse en la plataforma para poder apuntarse a los eventos o para crearlos.";
    h3Suitable.textContent = "Uso adecuado";
    h3Content.textContent = "Contenido";
    pContent.textContent = "Todos los contenidos de la plataforma, incluyendo logos, textos e imágenes, están protegidos por derechos de propiedad intelectual y no pueden ser utilizados sin autorización expresa de Zona de Eventos 10.";
    h3Responsability.textContent = "Responsabilidad";
    h3Modification.textContent = "Revisión normativa";
    pModification.textContent = "Zona de Eventos 10 se reserva el derecho de modificar estos términos y condiciones en cualquier momento. Los cambios serán publicados en nuestra plataforma y entrarán en vigor inmediatamente.";
    returnButton.textContent = "Salir";
    sectionEvents.classList = "terms";

    sectionEvents.append(h2Terms, h3Introduction, pTerms, h3Servicies, pServicies, h3Register, pRegister, h3Suitable, ulSuitable, h3Content, pContent, h3Responsability, ulResponsability, h3Modification, pModification, returnButton)

    returnButton.addEventListener("click", async ()=>{
        aside.classList.remove("hidden");
        sectionEvents.classList.remove("terms");
        footer.classList.remove("termsFooter");
        const events = await eventsFetch("orderdates/1");
        await renderEvents(events);
    });
};
