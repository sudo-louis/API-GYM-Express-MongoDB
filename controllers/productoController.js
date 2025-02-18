const Producto = require("../models/Producto");

exports.getAllProductos = async (req, res) => {
    try {
        const results = await Producto.getAll();
        res.json(results);
    } catch (err) {
        console.error("Error al obtener productos:", err);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

exports.getProductoById = async (req, res) => {
    try {
        const { id } = req.params;
        const results = await Producto.getById(id);
        if (results.length === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.json(results[0]);
    } catch (err) {
        console.error("Error al obtener producto:", err);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

exports.createProducto = async (req, res) => {
    try {
        const { nombre_producto, descripcion, proveedor, categoria, cantidad_en_stock, precio } = req.body;
        if (!nombre_producto || !proveedor || !categoria) {
            return res.status(400).json({ error: "Los campos nombre_producto, proveedor y categoria son obligatorios" });
        }

        await Producto.create({ nombre_producto, descripcion, proveedor, categoria, cantidad_en_stock, precio });
        res.json({ message: "Producto creado con éxito" });
    } catch (err) {
        console.error("Error al crear producto:", err);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

exports.updateProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_producto, descripcion, proveedor, categoria, cantidad_en_stock, precio } = req.body;
        if (!nombre_producto || !proveedor || !categoria) {
            return res.status(400).json({ error: "Los campos nombre_producto, proveedor y categoria son obligatorios" });
        }

        await Producto.update(id, { nombre_producto, descripcion, proveedor, categoria, cantidad_en_stock, precio });
        res.json({ message: "Producto actualizado con éxito" });
    } catch (err) {
        console.error("Error al actualizar producto:", err);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

exports.deleteProducto = async (req, res) => {
    try {
        const { id } = req.params;
        await Producto.delete(id);
        res.json({ message: "Producto eliminado con éxito" });
    } catch (err) {
        console.error("Error al eliminar producto:", err);
        res.status(500).json({ error: "Error en el servidor" });
    }
};