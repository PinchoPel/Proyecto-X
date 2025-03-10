import { linkCSS } from "../../componentes/common/linkCSS.js";
import { fetchModifyProfile } from "./fetchModifyProfile.js";
import { changeImageProfile, enableDataInputProfile, revealPasswordProfile, uploadImageProfile } from "./eventListeners.js";
import { createModalDiv } from "../../componentes/common/modalDiv.js";
import { deleteMyProfile } from "./deleteMyProfile.js";
import { getUserRole } from "../../componentes/common/userRole.js";
import { createInputAdmin } from "./inputAdmin.js";
linkCSS("./src/pages/myProfile/myProfile.css");

export const renderMyProfile = async (functionParam)=>{
    const sectionEvents = document.querySelector("#sectionEvents");
    const returnToMenu = document.querySelector("#Mi-perfil");
    sectionEvents.classList = "myProfile";
    sectionEvents.innerHTML = "";
    const userRole = getUserRole(); 
    const user = await functionParam;
    userRole == "admin" ? createInputAdmin() : null;
    const divMyProfile = document.createElement("div");
    const upperDiv = document.createElement("div");
    const divDataProfile = document.createElement("div");
    const formDataProfile = document.createElement("form");
    const formImage = document.createElement("form");
    const divButton = document.createElement("div");
    const h3Profile = document.createElement("h3");
    const pId = document.createElement("p");
    const labelName = document.createElement("label");
    const inputName = document.createElement("input");
    const labelEmail = document.createElement("label");
    const inputEmailUser = document.createElement("input");
    const labelPassword = document.createElement("label");
    const inputPasswordUser = document.createElement("input");
    const pCreated= document.createElement("p");
    const pCreatedUser = document.createElement("p");
    const labelImage = document.createElement("label");
    const inputImage = document.createElement("input");
    const imageProfile = document.createElement("img");
    const previousSightImage = document.createElement("img");
    const buttonImage = document.createElement("button");
    const buttonModifyDataProfile= document.createElement("button");
    const saveNewName = document.createElement("button");
    const saveNewEmail = document.createElement("button");
    const saveNewPass = document.createElement("button");
    const saveNewImage = document.createElement("button");
    const deleteProfile = document.createElement("button");

    divMyProfile.id = `divMyProfile`;
    upperDiv.id = "upperDiv";
    divDataProfile.id = "divDataProfile";
    formDataProfile.id = "formDataProfile";
    formImage.id = "formImage";
    divButton.id = "divButton";
    h3Profile.textContent = "Mi Perfil";
    pId.textContent = user._id;
    pId.id = "userId";
    labelName.textContent = "Nombre de usuario: ";
    labelName.setAttribute("for", "myUserName");
    inputName.value = user.userName;
    inputName.id = "myUserName";
    inputName.name = "userName";
    inputName.type = "text";
    inputName.disabled = true;
    labelEmail.textContent = "Correo electrónico: ";
    labelEmail.setAttribute("for", "myEmail");
    inputEmailUser.value =  user.email;
    inputEmailUser.id = "myEmail";
    inputEmailUser.name = "email";
    inputEmailUser.type = "text";
    inputEmailUser.disabled = true;
    labelPassword.textContent = "Contraseña: "
    labelPassword.setAttribute("for", "myPassword")
    inputPasswordUser.type = "password";
    inputPasswordUser.value = user.password;
    inputPasswordUser.id = "myPassword";
    inputPasswordUser.disabled = true;
    inputPasswordUser.name = "password";
    pCreated.textContent = "Perfil creado el: ";
    pCreated.id = "pCreated";
    pCreatedUser.textContent = new Intl.DateTimeFormat('es-ES').format(new Date(user.createdAt.split("T")[0]));
    labelImage.setAttribute("for", "ImageMyProfile");
    labelImage.textContent =`Pulsa para subir imagen` ;
    labelImage.id = "labelImageMyProfile";
    labelImage.classList ="hidden";
    inputImage.disabled = true;
    inputImage.id = "ImageMyProfile";
    inputImage.name = "image";
    inputImage.type = "file";
    imageProfile.id = "imageUploadProfile";
    imageProfile.src = user.image;
    previousSightImage.id = "previousSightImage";
    buttonModifyDataProfile.textContent = "Modificar perfil";
    buttonModifyDataProfile.id = "buttonModifyProfile";
    deleteProfile.textContent = "Borrar perfil";
    buttonImage.textContent = "Cambiar imagen";
    buttonImage.id = "buttonImage";
    saveNewName.classList = "hidden";
    saveNewEmail.classList = "hidden";
    saveNewPass.classList = "hidden";
    saveNewImage.classList = "hidden";
    returnToMenu.textContent = "Volver al Inicio";

    formDataProfile.append(labelName, inputName, saveNewName, labelEmail, inputEmailUser, saveNewEmail,  pCreated, pCreatedUser, labelPassword, inputPasswordUser, saveNewPass, buttonModifyDataProfile);
    formImage.append( inputImage, imageProfile, previousSightImage, labelImage, buttonImage, saveNewImage);
    divDataProfile.append( formDataProfile);
    upperDiv.append(formImage, divDataProfile);
    divButton.append(deleteProfile);
    divMyProfile.append(pId, upperDiv, divButton);
    sectionEvents.append(divMyProfile);

    buttonImage.addEventListener("click",  (event)=>{
        event.preventDefault();
    changeImageProfile(inputImage, labelImage, buttonImage);
    });
    inputImage.addEventListener("change", ()=>{
        uploadImageProfile(saveNewImage, imageProfile);
    })
    saveNewImage.addEventListener("click", async (event)=>{
        event.preventDefault();
        await fetchModifyProfile( "modifyImageUser", "#formImage")
    });

    buttonModifyDataProfile.addEventListener("click", (event)=>{
        event.preventDefault();
        enableDataInputProfile(buttonModifyDataProfile, inputName, inputEmailUser, inputPasswordUser);
    });    
    inputName.addEventListener("input", ()=>{
        if (!document.querySelector("#saveNewName")) {
            saveNewName.textContent = "Guardar nuevo nombre";
            saveNewName.classList.remove("hidden");
        }
    });
    inputEmailUser.addEventListener("input", ()=>{
        if (!document.querySelector("#saveNewEmail")) {
            saveNewEmail.textContent = "Guardar nuevo email";
            saveNewEmail.classList.remove("hidden");
        }
    });
    inputPasswordUser.addEventListener("input", ()=>{
        if (!document.querySelector("#saveNewPass") && !document.querySelector("#eyeImageProfile")) {
        revealPasswordProfile(saveNewPass, inputPasswordUser);
        }
    });
    saveNewPass.addEventListener("click", async(event)=>{
        event.preventDefault();
        await fetchModifyProfile("modifyDataUser", "#formDataProfile")});
    saveNewName.addEventListener("click", async(event)=>{
        event.preventDefault();
        await fetchModifyProfile("modifyDataUser", "#formDataProfile")});
    saveNewEmail.addEventListener("click", async(event)=>{ 
        event.preventDefault();
        await fetchModifyProfile("modifyDataUser", "#formDataProfile")});

        deleteProfile.addEventListener("click",  ()=> createModalDiv("¿Seguro que quieres eliminar tu perfil? Se eliminarán también todos los eventos que hayas creado.",  deleteMyProfile));
};