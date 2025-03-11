require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const { mainRoutes } = require("./src/utils/mainRoutes");
const { connectCloudinary } = require("./src/config/cloudinary");
const cors = require("cors");

const app = express();
connectDB();
connectCloudinary();
app.use(cors({
    origin: "https://proyecto-x-theta.vercel.app", 
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
  }));
app.use(express.json());

app.use("/ping", (req,res,next) => {
    return res.status(200).json("pong10")
});

app.use("/api/v1", mainRoutes);

app.use("*", (req,res,next) => {
    return res.status(404).json("Ruta no encontrada")
});

app.listen(3000, () => {
    console.log("Servidor conectado en: http://localhost:3000/");   
});
