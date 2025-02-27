export const fetchSignUp = async (eventId) => {
    const token = localStorage.getItem("userToken");
    const response = await fetch(`http://localhost:3000/api/v1/events/signupevent/${eventId}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
            },
        });
    await response.json(); 
};