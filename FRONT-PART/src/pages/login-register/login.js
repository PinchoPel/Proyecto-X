import { linkCSS } from "../../componentes/common/linkCSS.js";
import { eyePassword } from "./eyePassword.js";
import { loginFetch } from "./loginFetch.js";


export const loginForm = () => {
    const divLogin = document.createElement("div");
    const h2Login = document.createElement("h2");
    const formToLogin = document.createElement("form");
    const labelNameLogin = document.createElement("label");
    const inputNameLogin = document.createElement("input");
    const labelPasswordLogin = document.createElement("label");
    const inputPasswordLogin = document.createElement("input");
    const toggleButtonPasswordLogin = document.createElement("button");
    const imageToggleLogin = document.createElement("img");
    const divToggleLogin = document.createElement("div");
    const buttonLogin = document.createElement("button");
    linkCSS("./src/pages/login-register/login.css");
       
    divLogin.id = "divLogin";
    h2Login.textContent = "Iniciar sesión";

    labelNameLogin.setAttribute("for", "usernameLogin");
    labelNameLogin.textContent = "Introduce tu nombre de usuario o correo electrónico";
    inputNameLogin.type = "text";
    inputNameLogin.id = "usernameLogin";
    inputNameLogin.name = "userNameEmail";
    inputNameLogin.placeholder = "Usuario o correo electrónico";

    labelPasswordLogin.setAttribute("for", "passwordLogin");
    labelPasswordLogin.textContent = "Introduce tu contraseña";
    inputPasswordLogin.type = "password";
    inputPasswordLogin.id = "passwordLogin";
    inputPasswordLogin.name = "password";
    inputPasswordLogin.placeholder = "Contraseña";

    formToLogin.id = "formToLogin";
    buttonLogin.textContent = "Inicio de sesión";
    toggleButtonPasswordLogin.id = "toggleButtonPasswordLogin";
    imageToggleLogin.src = "./src/images/eye-svgrepo-com.svg";
    imageToggleLogin.classList = "toggleeye";
    divToggleLogin.id = "divToggleLogin";

    formToLogin.append(labelNameLogin, inputNameLogin, labelPasswordLogin, inputPasswordLogin, buttonLogin);
    toggleButtonPasswordLogin.append(imageToggleLogin);
    divToggleLogin.append(formToLogin, toggleButtonPasswordLogin);
    divLogin.append(h2Login, divToggleLogin);

    formToLogin.addEventListener("submit", async (event) => {
    event.preventDefault();
    await loginFetch (inputNameLogin.value, inputPasswordLogin.value)});

    toggleButtonPasswordLogin.addEventListener("click", () => eyePassword(inputPasswordLogin, imageToggleLogin))

    return divLogin;
};