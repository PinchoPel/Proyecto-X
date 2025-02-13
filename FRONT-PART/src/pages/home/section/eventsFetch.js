const token = localStorage.getItem("userToken");
const auth= token ? { "Authorization": `Bearer ${token}` } : {};

export const eventsFetch = async (route) => {
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
};