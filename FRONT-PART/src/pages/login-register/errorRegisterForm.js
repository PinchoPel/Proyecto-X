export const errorRegisterForm = (error) => {
    const divRegister = document.querySelector("#divRegister");
    const inputNameRegister = document.querySelector("#usernameRegister");
    const inputEmailRegister = document.querySelector("#emailRegister");
    const inputPasswordRegister = document.querySelector("#passwordRegister");
 
    const manageErrors = (index, message, input, ownClass, textContent) =>{
        const pError = document.createElement("p");
        if (error.errors[index] == message || input.value == "" ) {
            pError.classList.add(ownClass, "errorFormMessage");
            if (!document.querySelector(`.${ownClass}`)) {
                pError.textContent = textContent;
                divRegister.append(pError);
            }
        }
        else {
            const element = document.querySelector(`.${ownClass}`);
            if (element) {
                element.remove();
            }
        }
    };
    manageErrors(0,`"userName" length must be at least 3 characters long`, inputNameRegister, "errorNameMessage", "El nombre de usuario debe tener entre 3 y 10 caracteres");
    manageErrors(1, '"email" must be a valid email', inputEmailRegister, "errorEmailMessage", "Se debe introducir un correo electrónico válido");
    manageErrors( 2, '"password" length must be at least 5 characters long', inputPasswordRegister, "errorPasswordMessage", "La contraseña debe tener 5 caracteres como mínimo")

};