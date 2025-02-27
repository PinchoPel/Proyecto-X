
export const toggleParticipate = (image) => {
    let trusie = true;
    if (trusie == true) {
        image.src = "./src/images/exit-door-sign-svgrepo-com.svg";
        trusie = false
    } else {
    trusie = true;
    image.src = "./src/images/star-svgrepo-com.svg";
    }
  /*
    if (!button.classList.contains("signUp")) {
        button.classList.add("signUp");
        image.src = "./src/images/exit-door-sign-svgrepo-com.svg";
        console.log(button);
        
    } else {
    button.classList.remove("signUp");
    image.src = "./src/images/star-svgrepo-com.svg";
    }
    */
};