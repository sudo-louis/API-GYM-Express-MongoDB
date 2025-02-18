const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

exports.login = (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email, (err, results) => {
        if (err || results.length === 0) return res.status(400).json({ error: "Usuario no encontrado" });

        const user = results[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (!isMatch) return res.status(400).json({ error: "Contraseña incorrecta" });

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

            res.json({ message: "Login exitoso", token });
        });
    });
};

exports.logout = (req, res) => {
    res.json({ message: "Logout exitoso, token invalidado en el cliente" });
};