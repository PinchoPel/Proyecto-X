const { auth } = require("../../middlewares/auth");
const upload = require("../../middlewares/cloudinary");
const { postEvent, getSingleEvent, getEvents, deleteEvent, modifyEvent, searchByTag, searchByLocation, searchByRangeDate, getMyEvents, signUpEvent, getMyCreatedEvents} = require("../controllers/events");

const eventRoutes = require("express").Router();

eventRoutes.get("/:id", getSingleEvent);
eventRoutes.get("/eventstag/:tag", searchByTag);
eventRoutes.get("/eventlocation/:province", searchByLocation);
eventRoutes.get("/rangedates/:startDate/to/:endDate",  searchByRangeDate);
eventRoutes.get("/orderdates/:order", getEvents);
eventRoutes.get("/mysite/myevents", [auth], getMyEvents);
eventRoutes.get("/mysite/createdEvents", [auth], getMyCreatedEvents);

eventRoutes.post("/newEvent",[auth],[upload.single("image")], postEvent);

eventRoutes.put("/modifyEvent/:id", [auth], [upload.single("image")], modifyEvent);
eventRoutes.put("/signupevent/:eventId", [auth], signUpEvent);

eventRoutes.delete("/deleteEvent/:id",[auth], deleteEvent);

module.exports = {eventRoutes};