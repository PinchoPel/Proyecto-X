import { createEvent } from "../../../pages/createEvent/createEventElements.js";
import { eventsFetch } from "../../../pages/home/section/eventsFetch.js";
import { renderEvents } from "../../../pages/home/section/renderEvents.js";
import { sectionLogin } from "../../../pages/login-register/sectionLogin.js";
import { renderMyEvents } from "../../../pages/myEvents.js/myEvents.js";
import { linkCSS } from "../../common/linkCSS.js";
import { waitForDOM } from "../../common/waitForDOM.js";

export const createNavBar = () => {
    const nav = document.createElement("nav");
    const aLogin = document.createElement("a");
    linkCSS("./src/componentes/header/navBar/navBar.css");
    const arrayAnchor = ["Mi perfil", "Crear evento", "Mis eventos", "Cerrar sesión"];

    if (localStorage.getItem("userToken")) {
        const ulLoggedNavBar = document.createElement("ul");
            for (let index = 0; index < arrayAnchor.length; index++) {
                const liLoggedNavbar = document.createElement("li");
                const anchorLoggedNavbar = document.createElement("a");
                anchorLoggedNavbar.textContent = arrayAnchor[index];
                anchorLoggedNavbar.id = `${arrayAnchor[index].replace(" ", "-")}`;
                anchorLoggedNavbar.classList.add("anchorLoggedNavbar");
                liLoggedNavbar.append(anchorLoggedNavbar);
                ulLoggedNavBar.append(liLoggedNavbar);
            }
            nav.append(ulLoggedNavBar);

        waitForDOM("#Mis-eventos").then(anchor => {anchor.addEventListener("click", async ()=>{
            if (anchor.textContent == "Mis eventos") {
                renderMyEvents();
                const createEvent = document.querySelector("#Crear-evento");
                createEvent.textContent = "Crear evento";
            }
            else if (anchor.textContent == "Volver al Inicio") {
                    const aside = document.querySelector("#asideSectionHome");
                    const sectionEvents = document.querySelector("#sectionEvents");
                    const createEvent = document.querySelector("#Crear-evento");
                    const events = await eventsFetch("orderdates/1");
                    sectionEvents.classList.remove("myEvents");
                    aside.classList.remove("hidden");
                    await renderEvents(events);
                    anchor.textContent = "Mis eventos";
                    createEvent.textContent = "Crear evento";
            }
        })});
        waitForDOM("#Crear-evento").then(anchor => {anchor.addEventListener("click", async () => {
            if (anchor.textContent == "Crear evento") {
                createEvent();
                const myEvents = document.querySelector("#Mis-eventos");
                myEvents.textContent = "Mis eventos";
            }
            else if (anchor.textContent == "Volver al Inicio") {
                const aside = document.querySelector("#asideSectionHome");
                const sectionEvents = document.querySelector("#sectionEvents");
                const myEvents = document.querySelector("#Mis-eventos");
                const events = await eventsFetch("orderdates/1");
                sectionEvents.classList.remove("CreateEvent");
                aside.classList.remove("hidden");
                await renderEvents(events);
                anchor.textContent = "Crear evento";
                myEvents.textContent = "Mis eventos";
        }
        })});
    }
    else{
        aLogin.href = "#";
        aLogin.textContent = "Inicio de sesión/Registro";
        aLogin.addEventListener("click", sectionLogin);
        nav.append(aLogin);
    }
    return nav;
};