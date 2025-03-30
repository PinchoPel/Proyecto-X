import { fetchFunction } from "../../componentes/common/fetchFunction.js";
import { loadedContent, loadScreen } from "../../componentes/common/loadScreen.js";

export const fetchSignUp = async (eventId) => {
    try {
        loadScreen();
        const token = localStorage.getItem("userToken");

        const response = await fetchFunction("PUT", `events/signupevent/${eventId}`, {"Content-Type": "application/json", "Authorization": `Bearer ${token}`})

        await response.json(); 
       } catch (error) {
               console.error("Error al realizar el registro:", error);
       }finally{
           loadedContent();
       }
};