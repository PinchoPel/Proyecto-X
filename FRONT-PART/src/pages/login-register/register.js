import { linkCSS } from "../../componentes/common/linkCSS.js";
import { eyePassword } from "./eyePassword.js";
import { registerFetch } from "./registerFetch.js";

export const registerForm = () => {
    const divRegister = document.createElement("div");
    const h2Register = document.createElement("h2");
    const formToRegister = document.createElement("form");
    const labelNameRegister = document.createElement("label");
    const inputNameRegister = document.createElement("input");
    const labelEmailRegister = document.createElement("label");
    const inputEmailRegister = document.createElement("input");
    const labelPasswordRegister = document.createElement("label");
    const inputPasswordRegister = document.createElement("input");
    const divToggleRgister = document.createElement("div");
    const toggleButtonPasswordRegister = document.createElement("button");
    const imageToggleRegister= document.createElement("img");
    const buttonRegister = document.createElement("button");
    linkCSS("./src/pages/login-register/login.css");

    divRegister.id = "divRegister";
    h2Register.textContent = "Registro de usuario";

    labelNameRegister.setAttribute("for", "usernameRegister");
    labelNameRegister.textContent = "Elige tu nombre de usuario";
    inputNameRegister.type = "text";
    inputNameRegister.id = "usernameRegister";
    inputNameRegister.name = "userName";
    inputNameRegister.placeholder = "Nombre de usuario";
    labelEmailRegister.setAttribute("for", "emailRegister");
    labelEmailRegister.textContent = "Introduce tu correo electrónico";
    inputEmailRegister.type = "text";
    inputEmailRegister.id = "emailRegister";
    inputEmailRegister.name = "email";
    inputEmailRegister.placeholder = "Correo electrónico";
    labelPasswordRegister.setAttribute("for", "passwordRegister");
    labelPasswordRegister.textContent = "Elige una contraseña";
    inputPasswordRegister.type = "password";
    inputPasswordRegister.id = "passwordRegister";
    inputPasswordRegister.name = "passwordRegister";
    inputPasswordRegister.placeholder = "Contraseña";

    imageToggleRegister.src = "./src/images/eye-svgrepo-com.svg";
    imageToggleRegister.classList = "toggleeye";
    toggleButtonPasswordRegister.id = "toggleButtonPasswordRegister";
    buttonRegister.textContent = "Registrarme";
    formToRegister.id = "formToRegister";
    divToggleRgister.id = "divToggleRgister";

    formToRegister.append(labelNameRegister, inputNameRegister, labelEmailRegister, inputEmailRegister, labelPasswordRegister, inputPasswordRegister, buttonRegister);
    toggleButtonPasswordRegister.append(imageToggleRegister);
    divToggleRgister.append(toggleButtonPasswordRegister, formToRegister)
    divRegister.append(h2Register, divToggleRgister)

    formToRegister.addEventListener("submit", async (event) => {
        event.preventDefault();
        await registerFetch (inputNameRegister.value, inputEmailRegister.value, inputPasswordRegister.value)});

    toggleButtonPasswordRegister.addEventListener("click", () => eyePassword(inputPasswordRegister, imageToggleRegister));

    return divRegister;
};