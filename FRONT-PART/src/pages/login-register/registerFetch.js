import { errorRegisterForm } from "./errorRegisterForm.js";

export const registerFetch = async (userName, email, password) => { 
    const response = await fetch("http://localhost:3000/api/v1/users/register",{
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
};