
import { sectionLogin } from "../../../pages/login-register/sectionLogin.js";
import { linkCSS } from "../../common/linkCSS.js";

export const createNavBar = () => {
    const nav = document.createElement("nav");
    const aLogin = document.createElement("a");
    linkCSS("./src/componentes/header/navBar/navBar.css");
    const arrayAnchor = ["Mi perfil", "Mis eventos", "Cerrar sesión"];

    if (localStorage.getItem("userToken")) {
            for (let index = 0; index < arrayAnchor.length; index++) {
                const anchorLoggedNavbar = document.createElement("a");
                anchorLoggedNavbar.textContent = arrayAnchor[index];
                anchorLoggedNavbar.classList = "anchorLoggedNavbar";
                nav.append(anchorLoggedNavbar);
            }
    }
    else{
        aLogin.href = "#";
        aLogin.textContent = "Inicio de sesión/Registro";
        aLogin.addEventListener("click", sectionLogin);
        nav.append(aLogin);
    }
    return nav;
};