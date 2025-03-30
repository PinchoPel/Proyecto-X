import { fetchFunction } from "../../componentes/common/fetchFunction.js";
import { loadedContent } from "../../componentes/common/loadScreen.js";

const token = localStorage.getItem("userToken");
const auth= token ? { "Authorization": `Bearer ${token}` } : {};

export const deleteMyProfile = async () => {
    try {
        const userId = document.querySelector("#userId");
        const userName = document.querySelector("#myUserName");
        
        const response = await fetchFunction("DELETE", `/users/deleteProfile/${userId.textContent}/${userName.value}`, {"Content-Type": "application/json", ...auth})

        await response.json();
        localStorage.removeItem("userToken");
        location.reload();
       } catch (error) {
               console.error("Error al cargar los eventos:", error);
       }finally{
           loadedContent();
       }
};

