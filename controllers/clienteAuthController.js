const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ClienteLogin = require("../models/ClienteLogin");
require("dotenv").config();

exports.registerCliente = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        const existingCliente = await ClienteLogin.findOne({ email });
        if (existingCliente) {
            return res.status(400).json({ error: "El email ya está registrado" });
        }

        const nuevoCliente = new ClienteLogin({ nombre, email, password });
        await nuevoCliente.save();

        res.status(201).json({ message: "Registro exitoso" });
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
};

exports.loginCliente = async (req, res) => {
    try {
        const { email, password } = req.body;
        const cliente = await ClienteLogin.findOne({ email });

        if (!cliente) return res.status(400).json({ error: "Cliente no encontrado" });

        const isMatch = await bcrypt.compare(password, cliente.password);
        if (!isMatch) return res.status(400).json({ error: "Contraseña incorrecta" });

        const token = jwt.sign({ id: cliente._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login exitoso", token });
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
};

exports.logoutCliente = (req, res) => {
    res.json({ message: "Logout exitoso, token invalidado en el cliente" });
};