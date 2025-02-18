const Category = require("../models/Categoria");

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        console.error("Error al obtener categorías:", err);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        }
        res.json(category);
    } catch (err) {
        console.error("Error al obtener categoría:", err);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

exports.createCategory = async (req, res) => {
    try {
        const { nombre_categoria } = req.body;
        if (!nombre_categoria) return res.status(400).json({ error: "El nombre es obligatorio" });

        const newCategory = new Category({ nombre_categoria });
        await newCategory.save();
        res.json({ message: "Categoría creada con éxito", category: newCategory });
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

        const updatedCategory = await Category.findByIdAndUpdate(id, { nombre_categoria }, { new: true });
        if (!updatedCategory) return res.status(404).json({ error: "Categoría no encontrada" });

        res.json({ message: "Categoría actualizada con éxito", category: updatedCategory });
    } catch (err) {
        console.error("Error al actualizar categoría:", err);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) return res.status(404).json({ error: "Categoría no encontrada" });

        res.json({ message: "Categoría eliminada con éxito" });
    } catch (err) {
        console.error("Error al eliminar categoría:", err);
        res.status(500).json({ error: "Error en el servidor" });
    }
};