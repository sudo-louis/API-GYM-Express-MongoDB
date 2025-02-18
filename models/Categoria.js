const mongoose = require("mongoose");

const CategoriaSchema = new mongoose.Schema({
    nombre_categoria: { type: String, required: true }
}, { timestamps: true });

const Categoria = mongoose.model("Categoria", CategoriaSchema);

module.exports = Categoria;