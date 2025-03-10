const { eventRoutes } = require("../api/routes/events");
const userRoutes = require("../api/routes/users");


const mainRoutes = require("express").Router();

mainRoutes.use("/users", userRoutes);
mainRoutes.use("/events", eventRoutes)

module.exports = {mainRoutes};