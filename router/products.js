const express = require("express");
const ProductoController = require("../controllers/products");
const md_Auth = require("../middlewares/authenticated");

const api = express.Router();

//Rutas
api.get("/products", [md_Auth.actionAuth], ProductoController.getProductos);
api.post("/products", [md_Auth.actionAuth], ProductoController.createProducto);
api.patch(
  "/products/:id",
  [md_Auth.actionAuth],
  ProductoController.updateProductos
);
api.delete(
  "/products/:id",
  [md_Auth.actionAuth],
  ProductoController.deleteProducto
);

module.exports = api;
