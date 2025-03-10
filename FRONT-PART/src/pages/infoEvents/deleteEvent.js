import { loadedContent, loadScreen } from "../../componentes/common/loadScreen.js";

export const fetchDeleteEvent = async (eventId) => {
    try {
        loadScreen();
        const token = localStorage.getItem("userToken");
        const auth= token ? { "Authorization": `Bearer ${token}` } : {};
    
        const response = await fetch(`http://localhost:3000/api/v1/events/deleteEvent/${eventId}`, {
            method: "DELETE",
            headers:
            {"Content-Type": "application/json",
            ...auth}
        })
        await response.json();
        location.reload();
    } catch (error) {
        console.error("Error al borrar el evento:", error);
    }finally{
        loadedContent();
    }
};