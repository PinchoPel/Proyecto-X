import { previousSight } from "../createEvent/previousSight.js";
import { eyePassword } from "../login-register/eyePassword.js";
import { fetchUser } from "./fetchUser.js";
import { renderMyProfile } from "./myProfileElements.js";

export const changeImageProfile = (input, label, button) => {
    const userId = document.querySelector("#userId");
    input.disabled = false;
    label.classList.remove("hidden");
    button.textContent = "No hacer cambios";
    if (button.textContent = "No hacer cambios") {         
        button.addEventListener("click", async ()=> await renderMyProfile(await fetchUser(`myProfile/${userId.textContent}`)));
    }
};

export const uploadImageProfile = async (button, image) => {
        button.textContent = "Guardar cambio";
        button.classList.remove("hidden");
        previousSight("#ImageMyProfile", "#previousSightImage", "#labelImageMyProfile");
        image.classList = "hidden";
};

export const enableDataInputProfile =  (button, inputUserName, inputEmail, inputPass) => {
    const userId = document.querySelector("#userId");
    button.textContent = "No hacer cambios";
    inputUserName.disabled = false;
    inputEmail.disabled = false;
    inputPass.disabled = false;
    inputUserName.classList = "modify";
    inputEmail.classList = "modify";
    inputPass.classList = "modify";
    inputPass.value = "";
    inputPass.placeholder = "Nueva contraseña..."
    if (button.textContent = "No hacer cambios") {         
        button.addEventListener("click", async ()=> await renderMyProfile(await fetchUser(`myProfile/${userId.textContent}`)));
    }
};

export const revealPasswordProfile =  (button, input) => {
    const revealButton = document.createElement("button");
    const eyeImage = document.createElement("img");
    revealButton.id = "revealButton";
    eyeImage.src = "./src/images/eye-svgrepo-com.svg";
    eyeImage.classList = "toggleeye";
    eyeImage.id = "eyeImageProfile";
    revealButton.append(eyeImage);
    button.classList.remove("hidden");
    button.textContent = "Guardar nueva contraseña";
    revealButton.addEventListener("click", (event)=> {
    event.preventDefault();
    eyePassword(input, eyeImage)
    });
    input.insertAdjacentElement("afterend", revealButton);
};