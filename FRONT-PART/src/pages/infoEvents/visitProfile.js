export const visitProfile =  (participant) => {
    const body = document.querySelector("body");
            const backgroundDiv = document.createElement("div");
            const modalDiv = document.createElement("div");
            const imageProfile = document.createElement("img");
            const close = document.createElement("img");
            const name = document.createElement("p");
            const button = document.createElement("button");

            backgroundDiv.classList = "backgroundDivParticipant";
            modalDiv.classList = "modalDivParticipant";
            imageProfile.classList = "checkParticipant";
            imageProfile.src = participant.image;
            name.textContent = participant.userName;
            close.classList = "toggleeye";
            close.src = "./src/images/close-bold-svgrepo-com.svg";

            button.append(close);
            modalDiv.append(imageProfile, name, button);
            backgroundDiv.append(modalDiv);
            body.append(backgroundDiv);

            button.addEventListener("click", ()=> backgroundDiv.remove());
};