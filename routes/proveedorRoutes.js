const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const proveedorController = require("../controllers/proveedorController");

router.get("/", authMiddleware, proveedorController.getAllProveedores);
router.post("/", authMiddleware, proveedorController.createProveedor);
router.get("/:id", authMiddleware, proveedorController.getProveedorById);
router.put("/:id", authMiddleware, proveedorController.updateProveedor);
router.delete("/:id", authMiddleware, proveedorController.deleteProveedor);

module.exports = router;