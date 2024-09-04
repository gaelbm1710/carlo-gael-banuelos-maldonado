const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const ProductsSchema = mongoose.Schema({
  name: String,
  description: String,
  height: Number,
  length: Number,
  width: Number,
});

ProductsSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Catalog_products", ProductsSchema);
