const { User } = require("../api/models/users");
const { verifyToken } = require("../config/jwt");

const auth = async (req,res,next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            let {id} = verifyToken(token);
            let user = await User.findById(id);
            req.user = user;
            let {role} = req.user;
                if (role === "admin") {
                    return next();
                }
                else if (role === "user") {
                    return next();
                }
        }
        else if (!req.headers.authorization) {  
            return next();
        }
    } catch (error) {
        return res.status(400).json("error de verificación")
    }   
};

module.exports = {auth};