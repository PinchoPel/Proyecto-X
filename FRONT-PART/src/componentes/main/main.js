import { createAsideHome } from "../../pages/home/aside/createAside.js";
import { createSectionHome } from "../../pages/home/section/sectionHome.js";
import { linkCSS } from "../common/linkCSS.js";


export const createMain = () => {
    const main = document.createElement("main");
    main.innerHTML = "";
    const divHome = document.createElement("div");
    linkCSS("./src/componentes/main/main.css");
    
    divHome.id = "divHome"; 

    main.append(divHome);
    document.body.append(main);
    createSectionHome();
    createAsideHome();
};