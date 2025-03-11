import { loadedContent, loadScreen } from "../../componentes/common/loadScreen.js";

export const loginFetch = async (userNameEmail, password) => {
    try {
        loadScreen();
        const response = await fetch("https://proyecto-x-backend.vercel.app/api/v1/users/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
                },
            body: JSON.stringify({
                userNameEmail,
                password
                })
            });
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