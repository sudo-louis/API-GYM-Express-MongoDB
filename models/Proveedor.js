const mongoose = require("mongoose");

const ProveedorSchema = new mongoose.Schema({
    nombre_empresa: { type: String, required: true },
    nombre_contacto: { type: String },
    telefono: { type: String },
    correo: { type: String },
    productos_suministrados: { type: String }
}, { timestamps: true });

const Proveedor = mongoose.model("Proveedor", ProveedorSchema);

module.exports = Proveedor;