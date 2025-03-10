const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const userNameJoiSchema = Joi.object({
    userName: Joi.string().alphanum().min(3).max(10).required(),
});
const emailJoiSchema = Joi.object({
    email: Joi.string().email().required(),
});
const passwordJoiSchema = Joi.object({
    password: Joi.string().min(5).required(),
});

const userSchema = new mongoose.Schema({
    userName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    image: {type: String, required: false},
    role: {type: String, required: true, enum:["admin","user"]}
},{
    timestamps: true, 
    collection: "users",
    versionKey: false
});

userSchema.pre("save", function () {
    this.password = bcrypt.hashSync(this.password, 10)
});

const User = mongoose.model("User", userSchema, "users");

module.exports = {User, userNameJoiSchema, emailJoiSchema, passwordJoiSchema};