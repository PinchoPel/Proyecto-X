import { loadedContent } from "../../componentes/common/loadScreen.js";

const token = localStorage.getItem("userToken");
const auth= token ? { "Authorization": `Bearer ${token}` } : {};

export const deleteMyProfile = async () => {
    try {
        const userId = document.querySelector("#userId");
        const userName = document.querySelector("#myUserName");
        
        const response = await fetch(`http://localhost:3000/api/v1/users/deleteProfile/${userId.textContent}/${userName.value}`, {
            method: "DELETE",
            headers:
            {"Content-Type": "application/json",
            ...auth}
        })
        await response.json();
        localStorage.removeItem("userToken");
        location.reload();
       } catch (error) {
               console.error("Error al cargar los eventos:", error);
       }finally{
           loadedContent();
       }
};

