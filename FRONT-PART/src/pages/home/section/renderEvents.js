export const renderEvents = async (events) =>{
    const sectionEvents = document.querySelector("#sectionEvents");
    sectionEvents.innerHTML = "";
    const h2 = document.createElement("h2");
    h2.id = "h2SectionEvents";
    h2.textContent = "Todos los eventos";
    sectionEvents.append(h2);
    for (const event of events) {
        const eventDiv = document.createElement("div");
        const eventImage = document.createElement("img");
        const eventDivInfo = document.createElement("div");
        const eventTitle = document.createElement("h3");
        const dateP = document.createElement("p");
        const eventDate = document.createElement("p");
        const locationP = document.createElement("p");
        const eventLocation = document.createElement("p");
        const selectEvent = document.createElement("a");

        eventDiv.classList = "eventDiv";
        eventDivInfo.classList = "eventDivInfo";
        eventImage.src = event.image;
        eventImage.classList = "eventImage";
        eventTitle.textContent = event.title;
        eventTitle.classList = "eventTitle";
        dateP.textContent = "Fecha del evento: "
        dateP.classList = "dateP";
        eventDate.textContent =  event.date;
        const formattedDate = new Intl.DateTimeFormat('es-ES').format(new Date(eventDate.textContent.split("T")[0]));
        eventDate.textContent = formattedDate;
        eventDate.classList = "eventDate";
        locationP.textContent = "Provincia del evento: ";
        locationP.classList = "locationP";
        eventLocation.textContent = event.location;
        eventLocation.classList = "eventLocation";
        selectEvent.classList = "selectEvent";
        selectEvent.textContent = "Más información..."

        eventDate.insertAdjacentElement("afterbegin", dateP);
        eventLocation.insertAdjacentElement("afterbegin", locationP);
        eventDivInfo.append(eventTitle, eventDate, eventLocation, selectEvent);
        eventDiv.append(eventImage, eventDivInfo);
        sectionEvents.append(eventDiv);
    }
};
   