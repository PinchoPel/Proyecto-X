const { auth } = require("../../middlewares/auth");
const upload = require("../../middlewares/cloudinary");
const { register, login, getUser, getAllUser, deleteUser, modifyDataUser, modifyImageUser } = require("../controllers/users");

const userRoutes = require("express").Router();

userRoutes.get("/myProfile/:id?",[auth], getUser);
userRoutes.get("/user/:inputUserAdmin",[auth], getAllUser);

userRoutes.post("/register", register);
userRoutes.post("/login", login);

userRoutes.put("/modifyDataUser/:id", [auth], [upload.none()],  modifyDataUser);
userRoutes.put("/modifyImageUser/:id", [auth], [upload.single("image")],  modifyImageUser);

userRoutes.delete("/deleteProfile/:id/:userName",[auth], deleteUser);

module.exports = userRoutes;