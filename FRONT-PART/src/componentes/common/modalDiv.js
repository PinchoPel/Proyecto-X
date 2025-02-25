import { linkCSS } from "./linkCSS.js";
linkCSS("./src/pages/myProfile/myProfile.css");

export const createModalDiv =  (textConfirm,  functionParam) => {
    const body = document.querySelector("body");
    const backgroundDiv = document.createElement("div");
    const modalDiv = document.createElement("div");
    const buttonDiv = document.createElement("div");
    const h4 = document.createElement("h4");
    const buttonConfirm = document.createElement("button");
    const buttonCancel = document.createElement("button");

    backgroundDiv.id = "backgroundDiv";
    modalDiv.id = "modalDiv";
    h4.textContent = textConfirm;
    buttonConfirm.id = "buttonConfirm";
    buttonConfirm.textContent = "Confirmar";
    buttonCancel.id = "buttonCancel";
    buttonCancel.textContent = "Cancelar";

    buttonDiv.append(buttonCancel, buttonConfirm, )
    modalDiv.append(h4, buttonDiv);
    backgroundDiv.append(modalDiv);
    body.append(backgroundDiv);

    buttonConfirm.addEventListener("click", ()=>  functionParam());
    buttonCancel.addEventListener("click", ()=> backgroundDiv.remove());
};
