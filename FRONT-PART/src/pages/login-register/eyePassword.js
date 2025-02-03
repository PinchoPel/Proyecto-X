 export const eyePassword = (input, image) => {
    if (input.type === "password") {
        input.type = "text";
        image.src = "./src/images/eye-slash-svgrepo-com.svg";
        } else {
        input.type = "password";
        image.src = "./src/images/eye-svgrepo-com.svg";
        }
};

