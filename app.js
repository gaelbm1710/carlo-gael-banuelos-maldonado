const express = require("express");
const { api_Version } = require("./constants");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

//Importar Rutas
const authRoutes = require("./router/auth");
const productsRoutes = require("./router/products");

//Configurar bodyParse
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Cors
app.use(cors());

//Imagenes Estaticas
app.use(express.static("uploads"));

//Configuracion de Rutas
app.use(`/api/${api_Version}`, authRoutes);
app.use(`/api/${api_Version}`, productsRoutes);

module.exports = app;
