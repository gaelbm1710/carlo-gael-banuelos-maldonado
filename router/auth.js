const express = require("express");
const AuthController = require("../controllers/auth");
const multiparty = require("connect-multiparty");
const md_upload = multiparty({ uploadDir: "./uploads/avatar" });

const api = express.Router();

//Rutas para Registro e Inicio de Sesion
api.post("/auth/register", [md_upload], AuthController.register);
api.post("/auth/login", AuthController.login);

module.exports = api;
