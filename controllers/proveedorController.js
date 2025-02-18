const Proveedor = require("../models/Proveedor");

exports.getAllProveedores = async (req, res) => {
    try {
        const results = await Proveedor.getAll();
        res.json(results);
    } catch (err) {
        console.error("Error al obtener proveedores:", err);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

exports.getProveedorById = async (req, res) => {
    try {
        const { id } = req.params;
        const results = await Proveedor.getById(id);
        if (results.length === 0) {
            return res.status(404).json({ error: "Proveedor no encontrado" });
        }
        res.json(results[0]);
    } catch (err) {
        console.error("Error al obtener proveedor:", err);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

exports.createProveedor = async (req, res) => {
    try {
        const { nombre_empresa, nombre_contacto, telefono, correo, productos_suministrados } = req.body;
        if (!nombre_empresa) return res.status(400).json({ error: "El nombre de la empresa es obligatorio" });

        await Proveedor.create({ nombre_empresa, nombre_contacto, telefono, correo, productos_suministrados });
        res.json({ message: "Proveedor creado con éxito" });
    } catch (err) {
        console.error("Error al crear proveedor:", err);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

exports.updateProveedor = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_empresa, nombre_contacto, telefono, correo, productos_suministrados } = req.body;
        if (!nombre_empresa) return res.status(400).json({ error: "El nombre de la empresa es obligatorio" });

        await Proveedor.update(id, { nombre_empresa, nombre_contacto, telefono, correo, productos_suministrados });
        res.json({ message: "Proveedor actualizado con éxito" });
    } catch (err) {
        console.error("Error al actualizar proveedor:", err);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

exports.deleteProveedor = async (req, res) => {
    try {
        const { id } = req.params;
        await Proveedor.delete(id);
        res.json({ message: "Proveedor eliminado con éxito" });
    } catch (err) {
        console.error("Error al eliminar proveedor:", err);
        res.status(500).json({ error: "Error en el servidor" });
    }
};