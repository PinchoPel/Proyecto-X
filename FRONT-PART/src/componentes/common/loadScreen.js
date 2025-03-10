import { linkCSS } from "./linkCSS.js";

export const loadScreen =  () => {
    linkCSS("./src/componentes/common/loadScreen.css")
    const divLoading = document.createElement("div");
    const pLoading = document.createElement("p");

    divLoading.id = "secondaryLoad";
    divLoading.classList = "divLoading";
    pLoading.id = "pLoading";
    pLoading.textContent = "Cargando..."
    divLoading.append(pLoading);
    document.body.append(divLoading);
};

export const loadedContent = async () => {
    linkCSS("./src/componentes/common/loadScreen.css")
    const secondaryLoad = document.querySelector("#secondaryLoad");
    secondaryLoad.remove();
};