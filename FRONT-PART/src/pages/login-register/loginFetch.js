import { fetchFunction } from "../../componentes/common/fetchFunction.js";
import { loadedContent, loadScreen } from "../../componentes/common/loadScreen.js";

export const loginFetch = async (userNameEmail, password) => {
    try {
        loadScreen();

        const response = await fetchFunction( "POST", `users/login`, { "Content-Type": "application/json" },  JSON.stringify({userNameEmail, password}))

        if (!response.ok) {
            const error = await response.json();
            if (!document.querySelector(".errorLoginMessage")) {
                const divLogin = document.querySelector("#divLogin");
                const errorFormMessage = document.createElement("p");
                errorFormMessage.classList.add( "errorLoginMessage", "errorFormMessage");
                errorFormMessage.textContent = error;
                divLogin.append(errorFormMessage);
            }
            return;
        }
            const responseToken = await response.json();
            localStorage.setItem("userToken", responseToken.token)
            location.reload();
       } catch (error) {
               console.error("Error al realizar al iniciar sesión", error);
       }finally{
           loadedContent();
       }
};