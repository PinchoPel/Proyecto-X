import { loadedContent, loadScreen } from "../../componentes/common/loadScreen.js";
import { errorRegisterForm } from "./errorRegisterForm.js";

export const registerFetch = async (userName, email, password) => { 
    try {
        loadScreen();
        const response = await fetch("https://proyecto-x-backend.vercel.app/api/v1/users/register",{
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
                },
            body: JSON.stringify({
                userName,
                email,
                password
                })
            });
            if (!response.ok) {
                const error = await response.json();
                errorRegisterForm(error, "#divRegister");
                return;
            }
            else if (response.ok) {
                const responseNewUser = await response.json();
                localStorage.setItem("userToken", responseNewUser.token);
                location.reload();
            }
    }catch (error) {
            console.error("Error al tratar de registrarse", error);
    }finally{
        loadedContent();
    }   
};