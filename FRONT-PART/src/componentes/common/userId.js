export function getUserId() {
    const token = localStorage.getItem("userToken");
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));        
        return payload.id || null; 
    } catch (error) {
        return null;
    }
};