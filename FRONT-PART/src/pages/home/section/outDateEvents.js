import { fetchDeleteEvent } from "../../infoEvents/deleteEvent.js";

export const deleteOutDateEvents = async (events) => {
    const today = new Date().toISOString().split("T")[0];
    for (const event of events) {
        if (event.date.split("T")[0] < today) {
            fetchDeleteEvent(event._id)
        }
    };
};