const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const schemaUserValidation = Joi.object({
    userName: Joi.string().alphanum().min(3).max(10).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
});

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true, enum:["admin","user"]}
},{
    timestamps: true, 
    collection: "users",
    versionKey: false
});

userSchema.pre("save", function () {
    this.password = bcrypt.hashSync(this.password, 10)
});

const User = mongoose.model("user", userSchema, "users");

module.exports = {User, schemaUserValidation};