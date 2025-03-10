const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Servidor del Proyecto X funcionando");       
    } catch (error) {
        console.log("NO se ha podido conectar al servidor");       
    }
};

module.exports = {connectDB};