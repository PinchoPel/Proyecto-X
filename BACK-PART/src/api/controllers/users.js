const bcrypt = require("bcrypt");
const {User, schemaUserValidation} = require("../models/users");
const { generateSign } = require("../../config/jwt");
const { welcomeEmail } = require("../../utils/mailjet");


const getAllUser = async (req,res,next) => {
    try {
        let allUsers = await User.find();
        return res.status(200).json(allUsers);
    } catch (error) {
        return res.status(400).json("Ha fallado la petición")
    }
}

const getUser = async (req,res,next) => { 
    try {
        let {id} = req.params;     
        let user = await User.findById(id);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }
};

const register = async (req,res,next) => {
    try { 
     let user = await User.findOne({$or: [{ name: req.body.userName }, { email: req.body.email }]});
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
            const { error } = schemaUserValidation.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            let newUser = new User({
                name: req.body.userName,
                email: req.body.email,
                password: req.body.password,
                role: "user"
            });
            let userSaved = await newUser.save();    
            welcomeEmail(userSaved.email, userSaved.name);
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
        let user = await User.findOne( {$or: [{ name: userNameEmail }, { email: userNameEmail }]} ); 
            const correctPassword = await bcrypt.compare(password, user.password);
            if (!correctPassword) {
                return res.status(400).json("Usuario o contraseña incorrectos")
            }
            else if (correctPassword && user) {
                const token = generateSign(user._id);
                return res.status(200).json({user, token});
            }
    } catch (error) {
        return res.status(400).json("Usuario o contraseña incorrectos")
    }
};

const modifyUser = async (req,res,next) => { 
    try {
        let {id} = req.params;
        if (req.body.password) {
            let user = await User.findById(id);
            user.password = req.body.password;
            await user.save();
            return res.status(200).json(user)
        }
        else{
        let {role, ...changes} = req.body;
        let updatedUser = await User.findByIdAndUpdate(id, {$set: changes}, {new:true});
        return res.status(200) .json(updatedUser);  
        }        
    } catch (error) {
        return res.status(400).json("No ha sido posible actualizar el perfil")
    }
};

const deleteUser = async (req,res,next) => {
    try {
        let {id} = req.params;
        let userDeleted = await User.findByIdAndDelete(id);
        return res.status(200).json(userDeleted)
    } catch (error) {
        return res.status(400).json("No se ha borrado el usuario")
    }
}

module.exports = {register, login, getUser, getAllUser, modifyUser, deleteUser};