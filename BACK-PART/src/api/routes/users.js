const { auth } = require("../../middlewares/auth");
const upload = require("../../middlewares/cloudinary");
const { register, login, getUser, getAllUser, deleteUser, modifyDataUser, modifyImageUser } = require("../controllers/users");

const userRoutes = require("express").Router();

userRoutes.get("/myProfile",[auth], getUser);
userRoutes.get("/",[auth], getAllUser);

userRoutes.post("/register", register);
userRoutes.post("/login", login);

userRoutes.put("/modifyDataUser", [auth], [upload.none()],  modifyDataUser);
userRoutes.put("/modifyImageUser", [auth], [upload.single("image")],  modifyImageUser);

userRoutes.delete("/:id", deleteUser);

module.exports = userRoutes;