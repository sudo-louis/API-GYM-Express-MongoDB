const mongoose = require("mongoose");

const PedirProductoSchema = new mongoose.Schema({
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: "ClienteLogin", required: true },
    producto: { type: mongoose.Schema.Types.ObjectId, ref: "Producto", required: true },
    cantidad: { type: Number, required: true, min: 1 },
    total: { type: Number, required: true },
    estado: { type: String, enum: ["Pendiente", "Enviado", "Entregado"], default: "Pendiente" },
    direccion_entrega: { type: String, required: true },
}, { timestamps: true });

const PedirProducto = mongoose.model("PedirProducto", PedirProductoSchema);

module.exports = PedirProducto;