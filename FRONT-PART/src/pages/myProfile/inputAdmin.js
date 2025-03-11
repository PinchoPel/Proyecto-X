import { fetchUser } from "./fetchUser.js";
import { renderMyProfile } from "./myProfileElements.js";

export const createInputAdmin = () =>{
    const sectionEvents = document.querySelector("#sectionEvents");
    const divFormAdmin = document.createElement("div");
    const formAdmin = document.createElement("form");
    const inputUser = document.createElement("input");
    const labelUser = document.createElement("label");
    const buttonSearch = document.createElement("button");

    divFormAdmin.id = "divFormAdmin";
    formAdmin.id = "formAdminSearchUser";
    labelUser.setAttribute("for", "searchOtherUser");
    labelUser.textContent = "Introducir nombre de usuario o correo electrónico";
    inputUser.id = "searchOtherUser";
    inputUser.name = "inputUserAdmin";
    inputUser.type = "text";
    buttonSearch.textContent = "Buscar";

    formAdmin.append(labelUser, inputUser, buttonSearch);
    divFormAdmin.append(formAdmin);
    sectionEvents.append(divFormAdmin);

    buttonSearch.addEventListener("click", async (event)=> {
        if (inputUser.value.trim() === "") {
            event.preventDefault(); 
            return;
          }
        event.preventDefault()
        await renderMyProfile(await fetchUser(`user/${inputUser.value}`));
    });
};