import { loadedContent, loadScreen } from "../../componentes/common/loadScreen.js";

const token = localStorage.getItem("userToken");
const auth= token ? { "Authorization": `Bearer ${token}` } : {};

export const fetchUser = async (route) => {
    try {
        loadScreen();
        const response = await fetch(`http://localhost:3000/api/v1/users/${route}`, {
            method: "GET",
            headers:
            {"Content-Type": "application/json",
            ...auth}
        });
        const user = await response.json();
        setTimeout(() => {
            if (!document.querySelector("#divMyProfile")) {
                const divFormAdmin = document.querySelector("#divFormAdmin");
                const pUserNotFound = document.createElement("p");
                pUserNotFound.textContent = "Nombre de usuario o correo electrónico no encontrado";
                pUserNotFound.classList = "errorFormMessage";
                divFormAdmin.append(pUserNotFound);
                console.error("Petición fallida");
            }
        }, 150);
        return user;
       } catch (error) {
               console.error("Error al cargar los eventos:", error);
       }finally{
           loadedContent();
       }
};