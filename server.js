const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

connectDB();

require("./models/Categoria");
require("./models/Proveedor");
require("./models/Producto");
require("./models/ClienteLogin");
require("./models/PedirProducto");

const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const proveedorRoutes = require("./routes/proveedorRoutes");
const productoRoutes = require("./routes/productoRoutes");
const clienteAuthRoutes = require("./routes/clienteAuthRoutes");
const pedirProductoRoutes = require("./routes/pedirProductoRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/categories", categoryRoutes);
app.use("/proveedores", proveedorRoutes);
app.use("/productos", productoRoutes);
app.use("/clientes/auth", clienteAuthRoutes);
app.use("/clientes/pedidos", pedirProductoRoutes);

app.use((err, req, res, next) => {
    console.error("Error en el servidor:", err);
    res.status(500).json({ error: "Error en el servidor", details: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));