const { auth } = require("../../middlewares/auth");
const upload = require("../../middlewares/cloudinary");
const { postEvent, getSingleEvent, getEvents, deleteEvent, modifyEvent, searchByTag, searchByLocation, searchByRangeDate, getMyEvents} = require("../controllers/events");

const eventRoutes = require("express").Router();

eventRoutes.get("/:id",[auth], getSingleEvent);
eventRoutes.get("/eventstag/:tag",[auth], searchByTag);
eventRoutes.get("/eventlocation/:province",[auth], searchByLocation);
eventRoutes.get("/rangedates/:startDate/to/:endDate", [auth], searchByRangeDate);
eventRoutes.get("/orderdates/:order",[auth], getEvents);
eventRoutes.get("/mysite/myevents", [auth], getMyEvents);

eventRoutes.post("/newEvent",[auth],[upload.single("image")], postEvent);

eventRoutes.put("/:id",[upload.single("image")], modifyEvent);

eventRoutes.delete("/:id",[auth], deleteEvent);

module.exports = {eventRoutes};