import { fetchFunction } from "../../componentes/common/fetchFunction.js";
import { loadedContent, loadScreen } from "../../componentes/common/loadScreen.js";
import { errorRegisterForm } from "./errorRegisterForm.js";

export const registerFetch = async (userName, email, password) => { 
    try {
        loadScreen();
        
        const response = await fetchFunction("POST", "users/register", {                "Content-Type": "application/json" },  JSON.stringify({userName, email, password}))

            if (!response.ok) {
                const error = await response.json();
                if (error == "Nombre de usuario o contraseña incorrectos" && !document.querySelector(".errorLoginMessage")) {
                    const divLogin = document.querySelector("#divRegister");
                    const errorFormMessage = document.createElement("p");
                    errorFormMessage.classList.add( "errorLoginMessage", "errorFormMessage");
                    errorFormMessage.textContent = error;
                    divLogin.append(errorFormMessage);
                }
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