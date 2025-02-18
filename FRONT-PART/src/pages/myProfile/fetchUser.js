const token = localStorage.getItem("userToken");
const auth= token ? { "Authorization": `Bearer ${token}` } : {};

export const fetchUser = async (route) => {
    const response = await fetch(`http://localhost:3000/api/v1/users/${route}`, {
        method: "GET",
        headers:
        {"Content-Type": "application/json",
        ...auth}
    });
    const user = await response.json();
    if (!response.ok) {
        console.error("Petición fallida");  
    }
    return user;
};