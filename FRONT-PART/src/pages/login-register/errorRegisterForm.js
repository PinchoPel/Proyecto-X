export const errorRegisterForm = (error, divSelector) => {
    const div = document.querySelector(divSelector);
    const inputNameRegister = document.querySelector("#usernameRegister");
    const inputEmailRegister = document.querySelector("#emailRegister");
    const inputPasswordRegister = document.querySelector("#passwordRegister");

    const manageErrors = (message, input, ownClass, textContent) =>{
        const pError = document.createElement("p");
        let arrayErrors = error.errors;
        for (let index = 0; index < error.errors.length; index++){
            if (arrayErrors[index] == message || input.value == "") {
                pError.classList.add(ownClass, "errorFormMessage");
                if (!document.querySelector(`.${ownClass}`)) {
                    pError.textContent = textContent;
                    div.append(pError);
                }
            }
            else {
                const element = document.querySelector(`.${ownClass}`);
                if (element) {
                    element.remove();
                }
            }
        } 
    };

    manageErrors(`"userName" length must be at least 3 characters long`, inputNameRegister, "errorNameMessage", "El nombre de usuario debe tener entre 3 y 10 caracteres");
    manageErrors('"email" must be a valid email', inputEmailRegister, "errorEmailMessage", "Se debe introducir un correo electrónico válido");
    manageErrors('"password" length must be at least 5 characters long', inputPasswordRegister, "errorPasswordMessage", "La contraseña debe tener 5 caracteres como mínimo")
};