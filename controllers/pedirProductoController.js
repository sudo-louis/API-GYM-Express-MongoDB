const PedirProducto = require("../models/PedirProducto");
const Producto = require("../models/Producto");

exports.crearPedido = async (req, res) => {
    try {
        const { producto, cantidad, direccion_entrega } = req.body;

        const productoEncontrado = await Producto.findById(producto);
        if (!productoEncontrado) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        if (productoEncontrado.cantidad_en_stock < cantidad) {
            return res.status(400).json({ error: "No hay suficiente stock disponible" });
        }

        const total = productoEncontrado.precio * cantidad;

        productoEncontrado.cantidad_en_stock -= cantidad;
        await productoEncontrado.save();

        const nuevoPedido = new PedirProducto({
            cliente: req.cliente.id,
            producto,
            cantidad,
            total,
            direccion_entrega
        });

        await nuevoPedido.save();
        res.status(201).json({ message: "Pedido creado exitosamente", pedido: nuevoPedido });

    } catch (error) {
        res.status(500).json({ error: "Error al crear el pedido", detalle: error.message });
    }
};

exports.obtenerPedidosCliente = async (req, res) => {
    try {
        const pedidos = await PedirProducto.find({ cliente: req.cliente.id }).populate("producto");
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los pedidos" });
    }
};

exports.actualizarPedido = async (req, res) => {
    try {
        const { cantidad, direccion_entrega } = req.body;
        const pedidoId = req.params.id;

        const pedido = await PedirProducto.findById(pedidoId).populate("producto");

        if (!pedido) {
            return res.status(404).json({ error: "Pedido no encontrado" });
        }

        if (pedido.cliente.toString() !== req.cliente.id) {
            return res.status(403).json({ error: "No tienes permiso para modificar este pedido" });
        }

        if (direccion_entrega) {
            pedido.direccion_entrega = direccion_entrega;
        }

        if (cantidad && cantidad !== pedido.cantidad) {
            const producto = await Producto.findById(pedido.producto);

            if (!producto) {
                return res.status(404).json({ error: "El producto del pedido ya no existe" });
            }

            const diferenciaCantidad = cantidad - pedido.cantidad;

            if (diferenciaCantidad > 0 && producto.cantidad_en_stock < diferenciaCantidad) {
                return res.status(400).json({ error: "No hay suficiente stock disponible para actualizar el pedido" });
            }

            producto.cantidad_en_stock -= diferenciaCantidad;
            await producto.save();

            pedido.cantidad = cantidad;

            pedido.total = producto.precio * cantidad;
        }

        await pedido.save();
        res.json({ message: "Pedido actualizado correctamente", pedido });

    } catch (error) {
        console.error("Error al actualizar el pedido:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

exports.eliminarPedido = async (req, res) => {
    try {
        const pedido = await PedirProducto.findById(req.params.id);

        if (!pedido || pedido.cliente.toString() !== req.cliente.id) {
            return res.status(403).json({ error: "No tienes permiso para eliminar este pedido" });
        }

        const producto = await Producto.findById(pedido.producto);
        if (producto) {
            producto.cantidad_en_stock += pedido.cantidad;
            await producto.save();
        }

        await pedido.deleteOne();
        res.json({ message: "Pedido eliminado y stock restaurado" });

    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el pedido" });
    }
};