const Producto = require("../models/Producto");

exports.getAllProductos = async (req, res) => {
    try {
        const productos = await Producto.find().populate("proveedor").populate("categoria");
        res.json(productos);
    } catch (err) {
        console.error("Error al obtener productos:", err);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

exports.getProductoById = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findById(id).populate("proveedor").populate("categoria");
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.json(producto);
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

        const newProducto = new Producto({ nombre_producto, descripcion, proveedor, categoria, cantidad_en_stock, precio });
        await newProducto.save();
        res.json({ message: "Producto creado con éxito", producto: newProducto });
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

        const updatedProducto = await Producto.findByIdAndUpdate(id, { nombre_producto, descripcion, proveedor, categoria, cantidad_en_stock, precio }, { new: true });
        if (!updatedProducto) return res.status(404).json({ error: "Producto no encontrado" });

        res.json({ message: "Producto actualizado con éxito", producto: updatedProducto });
    } catch (err) {
        console.error("Error al actualizar producto:", err);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

exports.deleteProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProducto = await Producto.findByIdAndDelete(id);
        if (!deletedProducto) return res.status(404).json({ error: "Producto no encontrado" });

        res.json({ message: "Producto eliminado con éxito" });
    } catch (err) {
        console.error("Error al eliminar producto:", err);
        res.status(500).json({ error: "Error en el servidor" });
    }
};