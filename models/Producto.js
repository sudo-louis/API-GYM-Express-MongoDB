const mongoose = require("mongoose");

const ProductoSchema = new mongoose.Schema({
    nombre_producto: { type: String, required: true },
    descripcion: { type: String },
    proveedor: { type: mongoose.Schema.Types.ObjectId, ref: "Proveedor", required: true },
    categoria: { type: mongoose.Schema.Types.ObjectId, ref: "Categoria", required: true },
    cantidad_en_stock: { type: Number, required: true },
    precio: { type: Number, required: true }
}, { timestamps: true });

const Producto = mongoose.model("Producto", ProductoSchema);

module.exports = Producto;