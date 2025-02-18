const Proveedor = require("../models/Proveedor");

exports.getAllProveedores = async (req, res) => {
    try {
        const proveedores = await Proveedor.find();
        res.json(proveedores);
    } catch (err) {
        console.error("Error al obtener proveedores:", err);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

exports.getProveedorById = async (req, res) => {
    try {
        const { id } = req.params;
        const proveedor = await Proveedor.findById(id);
        if (!proveedor) {
            return res.status(404).json({ error: "Proveedor no encontrado" });
        }
        res.json(proveedor);
    } catch (err) {
        console.error("Error al obtener proveedor:", err);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

exports.createProveedor = async (req, res) => {
    try {
        const { nombre_empresa, nombre_contacto, telefono, correo, productos_suministrados } = req.body;
        if (!nombre_empresa) return res.status(400).json({ error: "El nombre de la empresa es obligatorio" });

        const newProveedor = new Proveedor({ nombre_empresa, nombre_contacto, telefono, correo, productos_suministrados });
        await newProveedor.save();
        res.json({ message: "Proveedor creado con éxito", proveedor: newProveedor });
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

        const updatedProveedor = await Proveedor.findByIdAndUpdate(id, { nombre_empresa, nombre_contacto, telefono, correo, productos_suministrados }, { new: true });
        if (!updatedProveedor) return res.status(404).json({ error: "Proveedor no encontrado" });

        res.json({ message: "Proveedor actualizado con éxito", proveedor: updatedProveedor });
    } catch (err) {
        console.error("Error al actualizar proveedor:", err);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

exports.deleteProveedor = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProveedor = await Proveedor.findByIdAndDelete(id);
        if (!deletedProveedor) return res.status(404).json({ error: "Proveedor no encontrado" });

        res.json({ message: "Proveedor eliminado con éxito" });
    } catch (err) {
        console.error("Error al eliminar proveedor:", err);
        res.status(500).json({ error: "Error en el servidor" });
    }
};