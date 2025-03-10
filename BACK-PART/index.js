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
    origin: ['http://127.0.0.1:5501', 'http://localhost:3000', 'https://proyecto-x-kohl.vercel.app'],  
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }));
app.use(express.json());

app.use("/ping", (req,res,next) => {
    return res.status(200).json("pong10")
});

app.use("/api/v1", mainRoutes);

app.use("*", (req,res,next) => {
    return res.status(404).json("Ruta no encontrada")
});

const port = process.env.PORT || 3000; 
app.listen(port, () => {
    console.log(`Servidor conectado en: http://localhost:${port}/`);   
});
