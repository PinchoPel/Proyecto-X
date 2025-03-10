export function getUserRole() {
    const token = localStorage.getItem("userToken");
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));        
        return payload.role || null; 
    } catch (error) {
        return null;
    }
};