import { loadedContent, loadScreen } from "../../componentes/common/loadScreen.js";

export const fetchSignUp = async (eventId) => {
    try {
        loadScreen();
        const token = localStorage.getItem("userToken");
        const response = await fetch(`http://localhost:3000/api/v1/events/signupevent/${eventId}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
                },
            });
        await response.json(); 
       } catch (error) {
               console.error("Error al realizar el registro:", error);
       }finally{
           loadedContent();
       }
};