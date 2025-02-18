import { renderMyProfile } from "./myProfileElements.js";

export const fetchModifyProfile = async (route, formSelector) => { //correo mailjet cambio perfil
    const token = localStorage.getItem("userToken");
    const modifyProfileForm = new FormData(document.querySelector(formSelector));

    const response = await fetch(`http://localhost:3000/api/v1/users/${route}`,{
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: modifyProfileForm
    })
    if (response.ok) {
        await response.json();
        renderMyProfile();
    }
   else if (!response.ok) {
    const errorMessage = await response.json();
        if (!document.querySelector(".errorModifProfile")) {
            const divDataProfile = document.querySelector("#divDataProfile");
            const errorFormMessage = document.createElement("p");
            errorFormMessage.classList.add( "errorModifProfile", "errorFormMessage");
            if (errorMessage.details[0].message == `"userName" length must be at least 3 characters long`) {
                errorFormMessage.textContent = "El nombre de usuario debe tener entre 3 y 10 caracteres";
            }
            else if (errorMessage.details[0].message == `"email" must be a valid email`) {
                errorFormMessage.textContent = "Se debe introducir un correo electrónico válido";
            }
            else if (errorMessage.details[0].message == `"password" length must be at least 5 characters long`) {
                errorFormMessage.textContent = "La contraseña debe tener 5 caracteres como mínimo";
            }
            divDataProfile.append(errorFormMessage);
        }
        return;
    }
};