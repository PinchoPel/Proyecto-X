import { linkCSS } from "../../componentes/common/linkCSS.js";
import { loginForm } from "./login.js";
import { registerForm } from "./register.js";

export const sectionLogin = () => {
    const main = document.querySelector("main");
    const navBar = document.querySelector("nav");
    main.innerHTML = "";
    navBar.innerHTML = "";
    linkCSS("./src/pages/login-register/login.css");
    const sectionLogin = document.createElement("section");
    const buttonHome = document.createElement("button");
    const divLogin = loginForm();
    const divRegister = registerForm();

    buttonHome.id = "buttonHome";
    buttonHome.textContent = "Volver a Inicio";
    sectionLogin.id = "sectionLogin";
    navBar.classList = "navBarLogin"
    buttonHome.addEventListener("click", () => {location.reload()});

    navBar.append(buttonHome);
    sectionLogin.append(divLogin);
    sectionLogin.append(divRegister);
    main.append(sectionLogin);
}