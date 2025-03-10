import { createEvent } from "../../../pages/createEvent/createEventElements.js";
import { sectionLogin } from "../../../pages/login-register/sectionLogin.js";
import { renderSignedUpEvent } from "../../../pages/myEvents.js/signedUpEvents.js";
import { fetchUser } from "../../../pages/myProfile/fetchUser.js";
import { renderMyProfile } from "../../../pages/myProfile/myProfileElements.js";
import { linkCSS } from "../../common/linkCSS.js";
import { waitForDOM } from "../../common/waitForDOM.js";
import { returnHome } from "./returnHome.js";

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
                const aside = document.querySelector("#asideSectionHome");
                const footer = document.querySelector("footer");
                aside.classList = "hidden";
                footer.classList = "termsFooter";
                await renderSignedUpEvent();          
                const createEvent = document.querySelector("#Crear-evento");
                createEvent.textContent = "Crear evento";
                const myProfile = document.querySelector("#Mi-perfil");
                myProfile.textContent = "Mi perfil";
            }
            else if (anchor.textContent == "Volver al Inicio") {
                const sectionEvents = document.querySelector("#sectionEvents");
                if (sectionEvents.classList.contains("myEventsSignedUp")) {
                    sectionEvents.classList.remove("myEventsSignedUp")
                }
                else if (sectionEvents.classList.contains("myEventsCreated")) {
                    sectionEvents.classList.remove("myEventsCreated")
                }
                anchor.textContent = "Mis eventos";
                returnHome("#Crear-evento", "Crear evento", "myEvents")
            }
        })});
        waitForDOM("#Crear-evento").then(anchor => {anchor.addEventListener("click", async () => {
            if (anchor.textContent == "Crear evento") {
                const aside = document.querySelector("#asideSectionHome");
                const footer = document.querySelector("footer");
                aside.classList = "hidden";
                footer.classList = "termsFooter";
                createEvent();
                const myEvents = document.querySelector("#Mis-eventos");
                myEvents.textContent = "Mis eventos";
                const myProfile = document.querySelector("#Mi-perfil");
                myProfile.textContent = "Mi perfil";
            }
            else if (anchor.textContent == "Volver al Inicio") {
                anchor.textContent = "Crear evento";
                returnHome("#Mis-eventos", "Mis eventos", "CreateEvent")
            }
        })});
        waitForDOM("#Mi-perfil").then(anchor =>{anchor.addEventListener("click", async () => {
            if (anchor.textContent == "Mi perfil") {
                const aside = document.querySelector("#asideSectionHome");
                const footer = document.querySelector("footer");
                aside.classList = "hidden";
                footer.classList = "termsFooter";
                await renderMyProfile(await fetchUser("/myProfile"));
                const myEvents = document.querySelector("#Mis-eventos");
                myEvents.textContent = "Mis eventos";
                const createEvent = document.querySelector("#Crear-evento");
                createEvent.textContent = "Crear evento";
            }
            else if (anchor.textContent == "Volver al Inicio") {
                anchor.textContent = "Crear evento";
                returnHome("#Mi-perfil", "Mi perfil", "myProfile");
            }
        })});
        waitForDOM("#Cerrar-sesión").then(anchor =>{anchor.addEventListener("click", ()=>{
            localStorage.removeItem("userToken");
            location.reload();
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