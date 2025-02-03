const { auth } = require("../../middlewares/auth");
const { register, login, getUser, getAllUser, modifyUser, deleteUser } = require("../controllers/users");

const userRoutes = require("express").Router();

userRoutes.get("/:id",[auth], getUser);
userRoutes.get("/",[auth], getAllUser);

userRoutes.post("/register", register);
userRoutes.post("/login", login);

userRoutes.put("/:id",[auth], modifyUser);

userRoutes.delete("/:id", deleteUser);

module.exports = userRoutes;