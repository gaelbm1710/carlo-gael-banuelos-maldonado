const Catalog_products = require("../models/products");
const Joi = require("joi");

//Validar PRODUCTOS con JOI
const productSchema = Joi.object({
  name: Joi.string().min(1).max(100).required().messages({
    "string.empty": "El nombre es obligatorio",
  }),
  description: Joi.string().max(250).optional().messages({
    "string.max": "La descripción no debe exceder los 249 caracteres",
  }),
  height: Joi.number().min(0).required().messages({
    "number.base": "Altura debe ser un número",
  }),
  length: Joi.number().min(0).required().messages({
    "number.base": "Largo debe ser un número",
  }),
  width: Joi.number().min(0).required().messages({
    "number.base": "Altura debe ser un número",
  }),
});

//CRUD DE PRODUCTOS
async function createProducto(req, res) {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) return res.status(400).send({ msg: error.details[0].message });
    const producto = new Catalog_products(req.body);
    const productStored = await producto.save();
    res.status(200).send({ msg: "Producto creado con Exito", productStored });
  } catch (error) {
    res.status(400).send({ msg: "Error al crear el producto", error });
  }
}

async function getProductos(req, res) {
  const { page = 1, limit = 10 } = req.query;
  const options = {
    page,
    limit: parseInt(limit),
  };
  Catalog_products.paginate({}, options, (error, productos) => {
    if (error) {
      res.status(400).send({ msg: "Error al obtenet la información", error });
    } else {
      res.status(200).send(productos);
    }
  });
}

async function updateProductos(req, res) {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) return res.status(400).send({ msg: error.details[0].message });

    const { id } = req.params;
    const productosData = req.body;
    const updateProducto = await Catalog_products.findByIdAndUpdate(
      { _id: id },
      productosData,
      { new: true }
    );

    if (!updateProducto) {
      res.status(404).send({ msg: "Producto no encontrado" });
    } else {
      res.status(200).send({ msg: "Actualización exitosa: ", updateProducto });
    }
  } catch (error) {
    res.status(400).send({ msg: "Error al actualizar la información", error });
  }
}

async function deleteProducto(req, res) {
  const { id } = req.params;
  try {
    const deleteProduct = await Catalog_products.findByIdAndDelete(id);
    if (deleteProduct) {
      res.status(200).send({ msg: "Producto Eliminado" });
    } else {
      res.status(404).send({ msg: "Producto no Encontrado" });
    }
  } catch (error) {
    res.status(500).send({ msg: "Error al eliminar el producto", error });
  }
}

module.exports = {
  createProducto,
  getProductos,
  updateProductos,
  deleteProducto,
};
