export function getUserName() {
    const token = localStorage.getItem("userToken");
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));                
        return payload.userName || null; 
    } catch (error) {
        return null;
    }
};