const express = require("express");
const router = express.Router();
const clienteAuthController = require("../controllers/clienteAuthController");

router.post("/register", clienteAuthController.registerCliente);
router.post("/login", clienteAuthController.loginCliente);
router.get("/logout", clienteAuthController.logoutCliente);

module.exports = router;