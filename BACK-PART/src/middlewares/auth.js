const { User } = require("../api/models/users");
const { verifyToken } = require("../config/jwt");

const auth = async (req,res,next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            let {id} = verifyToken(token);
            let user = await User.findById(id);
            req.user = user;
            return next();
        }
        else if (!req.headers.authorization) {             
            return res.status(401).json("Autorización insuficiente")
        }
    } catch (error) {
        return res.status(400).json("error de verificación")
    }   
};

module.exports = {auth};