import { loadedContent, loadScreen } from "../../../componentes/common/loadScreen.js";

const token = localStorage.getItem("userToken");
const auth= token ? { "Authorization": `Bearer ${token}` } : {};

export const eventsFetch = async (route) => {
    try {
        loadScreen();
        const response = await fetch(`http://localhost:3000/api/v1/events/${route}`, {
            method: "GET",
            headers:
            {"Content-Type": "application/json",
            ...auth}
        });
        const events = await response.json();
        if (!response.ok) {
            console.error("Petición fallida");  
        }
        return events;
    } catch (error) {
            console.error("Error al cargar los eventos:", error);
    }finally{
        loadedContent();
    }
};