const bcrypt = require("bcrypt");
const {User, userNameJoiSchema, emailJoiSchema, passwordJoiSchema, } = require("../models/users");
const { generateSign } = require("../../config/jwt");
const { welcomeEmail } = require("../../utils/mailjet");
const { delCloudinary } = require("../../utils/deleteInCloudinary");
const Event = require("../models/events");

const getAllUser = async (req,res,next) => { 
    try {
        if (req.user.role == "admin") {
            const {inputUserAdmin} = req.params;
            let allUsers = await User.findOne( {$or: [{ userName: inputUserAdmin }, { email: inputUserAdmin }]});       
            return res.status(200).json(allUsers);
        }
    } catch (error) {
        return res.status(400).json("Ha fallado la petición")
    }
};

const getUser = async (req,res,next) => { 
    try {
        const userId = req.params.id || req.user.id;
        let user = await User.findById(userId);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }
};

const register = async (req,res,next) => {
    try { 
     let user = await User.findOne({$or: [{ userName: req.body.userName }, { email: req.body.email }]});
        if (user) {
            let correctPassword = await bcrypt.compare(req.body.password, user.password);
            if (!correctPassword) {
                return res.status(400).json("Nombre de usuario o contraseña incorrectos");
            }
            else if (correctPassword && user) {
                const token = generateSign(user._id);       
                return res.status(200).json({user, token});
            }
        }
        else if (!user) {
            const {userName, email, password} = req.body;
            const userNameError = userNameJoiSchema.validate({ userName });
            const emailError = emailJoiSchema.validate({ email });
            const passwordError = passwordJoiSchema.validate({ password });  
            const errors = [];
            
            if (userNameError.error) { 
                errors.push(userNameError.error.details[0].message);
            }  
            if (emailError.error) {
                errors.push(emailError.error.details[0].message);
            }
            if (passwordError.error) {
                errors.push(passwordError.error.details[0].message);
            }
            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }
            let newUser = new User({
                userName: req.body.userName,
                email: req.body.email,
                password: req.body.password,
                image: "https:res.cloudinary.com/dp5dafjas/image/upload/v1739621786/user-front-side-with-white-background_ia49bu.jpg",
                role: "user"
            });
            let userSaved = await newUser.save();    
            welcomeEmail(userSaved.email, userSaved.userName);
            const token = generateSign(userSaved._id);
            return res.status(201).json({userSaved, token});
        }
    } catch (error) {
        return res.status(400).json("No ha sido posible darse de alta en el sistema")
    }
};

const login = async (req,res,next) => {
    try {
        let {userNameEmail, password} = req.body;
        let user = await User.findOne( {$or: [{ userName: userNameEmail }, { email: userNameEmail }]} );      
            const correctPassword = await bcrypt.compare(password, user.password);
            if (!correctPassword) {
                return res.status(400).json("Usuario o contraseña incorrectos")
            }
            else if (correctPassword && user) {
                const token = generateSign(user);
                return res.status(200).json({user, token});
            }
    } catch (error) {
        return res.status(400).json("Usuario o contraseña incorrectos")
    }
};

const modifyImageUser = async (req, res, nest) => {
    try {
        const { id } = req.params;      
        delete req.body.role;
        const user = await User.findById(id);
        if (user.image !== "https://res.cloudinary.com/dp5dafjas/image/upload/v1739621786/user-front-side-with-white-background_ia49bu.jpg") {
            delCloudinary(user.image)
        }
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { image: req.file.path },
            { new: true, runValidators: true }
          );
        return res.status(200).json(updatedUser)
    } catch (error) {
        return res.status(400).json("No ha sido posible actualizar el perfil")
    }
};

const modifyDataUser = async (req,res,next) => { 
    try {
        const { id } = req.params; 
        const { password, ...updatedData } = req.body;
        await User.findById(id);

        const errors = [];
        const userNameError = userNameJoiSchema.validate({ userName: updatedData.userName });
        const emailError = emailJoiSchema.validate({ email: updatedData.email });
        if (password) {
            const passwordError = passwordJoiSchema.validate( {password} );
            if (passwordError.error) {
                errors.push(passwordError.error.details[0].message);
            }
        }
        if (userNameError.error) { 
            errors.push(userNameError.error.details[0].message);
        }  
        if (emailError.error) {
            errors.push(emailError.error.details[0].message);
        }
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        const updatedUser = await User.findByIdAndUpdate(id, updatedData , { new: true });
        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(400).json("No ha sido posible actualizar el perfil")
    }
};

const deleteUser = async (req,res,next) => {
    try {
        const {id, userName} = req.params;
        const user = await User.findById(id);
        const authorEvent = await Event.find({author: userName});

        if (authorEvent.length > 0) {
            for (let index = 0; index < authorEvent.length; index++) {               
                delCloudinary(authorEvent[index].image);
            }
        } 
        await Event.deleteMany({author: userName});

        if (user.image !== "https://res.cloudinary.com/dp5dafjas/image/upload/v1739621786/user-front-side-with-white-background_ia49bu.jpg") {
            delCloudinary(user.image)
        }
        await Event.updateMany(
            { participants: user._id },
            { $pull: { participants: user._id } }
        );
        const userDeleted = await User.findByIdAndDelete(id);
        return res.status(200).json(userDeleted)
    } catch (error) {
        return res.status(400).json("No se ha borrado el usuario")
    }
}

module.exports = {register, login, getUser, getAllUser, modifyDataUser, deleteUser, modifyImageUser};