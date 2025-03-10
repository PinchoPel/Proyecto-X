require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateSign = (user) => {
    return jwt.sign({ 
        id: user._id,          
        userName: user.userName, 
        role: user.role
    },
     process.env.JWT_SECRET, {expiresIn: "1week"})
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
};

module.exports = {generateSign, verifyToken};