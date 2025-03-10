import { linkCSS } from "../common/linkCSS.js";
import { createNavBar } from "./navBar/navBar.js";

export const createHeader = () => {
    document.body.innerHTML = "";
    const header = document.createElement("header");
    const h1 = document.createElement("h1");
    linkCSS("./src/componentes/header/header.css");
    const nav = createNavBar();

    h1.textContent = "Zona de eventos 10";

    h1.addEventListener("click", async ()=> location.reload());

    header.append(h1);
    header.append(nav);
    document.body.append(header);
};