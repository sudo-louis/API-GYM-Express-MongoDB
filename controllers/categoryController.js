const Category = require("../models/Category");

exports.getAllCategories = async (req, res) => {
    try {
        const results = await Category.getAll();
        res.json(results);
    } catch (err) {
        console.error("Error al obtener categorías:", err);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const results = await Category.getById(id);
        if (results.length === 0) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        }
        res.json(results[0]);
    } catch (err) {
        console.error("Error al obtener categoría:", err);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

exports.createCategory = async (req, res) => {
    try {
        const { nombre_categoria } = req.body;
        if (!nombre_categoria) return res.status(400).json({ error: "El nombre es obligatorio" });

        await Category.create(nombre_categoria);
        res.json({ message: "Categoría creada con éxito" });
    } catch (err) {
        console.error("Error al crear categoría:", err);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_categoria } = req.body;
        if (!nombre_categoria) return res.status(400).json({ error: "El nombre es obligatorio" });

        await Category.update(id, nombre_categoria);
        res.json({ message: "Categoría actualizada con éxito" });
    } catch (err) {
        console.error("Error al actualizar categoría:", err);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await Category.delete(id);
        res.json({ message: "Categoría eliminada con éxito" });
    } catch (err) {
        console.error("Error al eliminar categoría:", err);
        res.status(500).json({ error: "Error en el servidor" });
    }
};