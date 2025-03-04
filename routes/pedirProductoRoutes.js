const express = require("express");
const router = express.Router();
const pedirProductoController = require("../controllers/pedirProductoController");
const clienteAuthMiddleware = require("../middleware/clienteAuthMiddleware");

router.post("/", clienteAuthMiddleware, pedirProductoController.crearPedido);
router.get("/", clienteAuthMiddleware, pedirProductoController.obtenerPedidosCliente);
router.put("/:id", clienteAuthMiddleware, pedirProductoController.actualizarPedido);
router.delete("/:id", clienteAuthMiddleware, pedirProductoController.eliminarPedido);

module.exports = router;