const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const productoController = require("../controllers/productoController");

router.get("/", authMiddleware, productoController.getAllProductos);
router.post("/", authMiddleware, productoController.createProducto);
router.get("/:id", authMiddleware, productoController.getProductoById);
router.put("/:id", authMiddleware, productoController.updateProducto);
router.delete("/:id", authMiddleware, productoController.deleteProducto);

module.exports = router;