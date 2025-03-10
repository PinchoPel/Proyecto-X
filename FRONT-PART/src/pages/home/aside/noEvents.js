export const noEvents = async (message) =>{
    const events = document.querySelectorAll(".eventDiv");
    const sectionEvents = document.querySelector("#sectionEvents");
    if (events.length <= 0 ) {
        if (!document.querySelector(".errorAsideMessage")) {          
        }
            const noEventsMessage = document.createElement("p");
            noEventsMessage.classList.add("errorAsideMessage");
            noEventsMessage.textContent = message;
            sectionEvents.append(noEventsMessage);
    }
    else if(events.length >=1){
        const errorAsideMessage = document.querySelector(".errorAsideMessage");
        if (errorAsideMessage) {
            errorAsideMessage.remove();
        }
    }
};