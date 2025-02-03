export const eventsFetch = async (route) => {
    const response = await fetch(`http://localhost:3000/api/v1/events/${route}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json" 
            },
    });
    const events = await response.json();
    return events;
};