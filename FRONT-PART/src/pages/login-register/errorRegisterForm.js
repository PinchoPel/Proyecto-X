export const errorRegisterForm = (error) => {
    const divRegister = document.querySelector("#divRegister");
    const inputNameRegister = document.querySelector("#usernameRegister");
    const inputEmailRegister = document.querySelector("#emailRegister");
    const inputPasswordRegister = document.querySelector("#passwordRegister");
    const errorNameMessage = document.createElement("p");
    const errorEmailMessage = document.createElement("p");
    const errorPasswordMessage = document.createElement("p");

    errorNameMessage.classList.add("errorNameMessage", "errorFormMessage");
    errorEmailMessage.classList.add("errorEmailMessage", "errorFormMessage");
    errorPasswordMessage.classList.add("errorPasswordMessage", "errorFormMessage");

    const manageErrors = (message, input, selector, textContent, variable) =>{
        if (error.message == message || input.value == "" ) {
            if (!document.querySelector(selector)) {        
                variable.textContent = textContent;
                divRegister.append(variable);
            }
        }
        else {
            const element = document.querySelector(selector);
            if (element) {
                element.remove();
            }
        }
    };
    
    manageErrors(`"userName" length must be at least 3 characters long`, inputNameRegister, ".errorNameMessage", "El nombre de usuario debe tener entre 3 y 10 caracteres", errorNameMessage);
    manageErrors('"email" must be a valid email', inputEmailRegister, ".errorEmailMessage", "Se debe introducir un correo electrónico válido", errorEmailMessage);
    manageErrors( '"password" length must be at least 5 characters long', inputPasswordRegister, ".errorPasswordMessage", "La contraseña debe tener 5 caracteres como mínimo", errorPasswordMessage)
};
