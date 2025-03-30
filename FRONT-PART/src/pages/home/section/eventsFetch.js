import { fetchFunction } from "../../../componentes/common/fetchFunction.js";
import { loadedContent, loadScreen } from "../../../componentes/common/loadScreen.js";

const token = localStorage.getItem("userToken");
const auth= token ? { "Authorization": `Bearer ${token}` } : {};

export const eventsFetch = async (route) => {
    try {
        loadScreen();

        const response = await fetchFunction("GET", `events/${route}`, {"Content-Type": "application/json", ...auth})
        const events = await response.json();
        
        if (!response.ok) {
            if (!document.querySelector(".internalError")) {
                const divLogin = document.querySelector("#sectionEvents");
                const errorFormMessage = document.createElement("p");
                errorFormMessage.classList.add( "internalError", "errorFormMessage");
                errorFormMessage.textContent = "Fallo interno del servidor. Inténtelo más tarde.";
                divLogin.append(errorFormMessage);
            };
        };
        return events;
    } catch (error) {
            console.error("Error al cargar los eventos:", error);
    }finally{
        loadedContent();
    }
};