import { fetchFunction } from "../../componentes/common/fetchFunction.js";
import { loadedContent, loadScreen } from "../../componentes/common/loadScreen.js";
import { fetchUser } from "./fetchUser.js";
import { renderMyProfile } from "./myProfileElements.js";

export const fetchModifyProfile = async (route, formSelector) => {
    try {
        loadScreen();
        const userId = document.querySelector("#userId");
        const token = localStorage.getItem("userToken");
        const modifyProfileForm = new FormData(document.querySelector(formSelector));

        const response = await fetchFunction( "PUT", `users/${route}/${userId.textContent}`, { "Authorization": `Bearer ${token}`}, modifyProfileForm )
        
        if (response.ok) {
            const userModified =  await response.json();
            localStorage.setItem("userToken", userModified.token);
            renderMyProfile(await fetchUser(`myProfile/${userId.textContent}`));
        }
       else if (!response.ok) {
        const errorMessage = await response.json();
        let arrayErrors = errorMessage.errors;
        const divDataProfile = document.querySelector("#divDataProfile");            
        const createPError =  (ownClass, textContent) => {
            const errorFormMessage = document.createElement("p");
            errorFormMessage.classList.add(ownClass, "errorFormMessage");
            errorFormMessage.textContent = textContent;
            divDataProfile.append(errorFormMessage);
        };
        arrayErrors.forEach(error => {
            if (error.includes("userName") && !document.querySelector(".errorModifProfileName")) {
                createPError("errorModifProfileName", "El nombre de usuario debe tener entre 3 y 10 caracteres");
            }
            if (error.includes("email") && !document.querySelector(".errorModifProfileEmail")) {
                createPError("errorModifProfileEmail", "Se debe introducir un correo electrónico válido");
            }
            if (error.includes("password") && !document.querySelector(".errorModifProfilePass")) {
                createPError("errorModifProfilePass", "La contraseña debe tener 5 caracteres como mínimo");
            }
        });
    return;
        }
       } catch (error) {
               console.error("Error al cargar el perfil:", error);
       }finally{
           loadedContent();
       }
};