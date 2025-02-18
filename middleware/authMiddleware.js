const jwt = require("jsonwebtoken");
const tokenBlacklist = require("../utils/tokenBlacklist");
require("dotenv").config();

module.exports = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        return res.status(401).json({ error: "Acceso denegado: Token no proporcionado" });
    }

    const token = authHeader.replace("Bearer ", "").trim();
    if (!token) {
        return res.status(401).json({ error: "Acceso denegado: Formato de token inválido" });
    }

    if (tokenBlacklist.has(token)) {
        return res.status(401).json({ error: "Token inválido o expirado. Por favor, inicie sesión de nuevo." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Token expirado: Vuelva a iniciar sesión" });
        } else {
            return res.status(400).json({ error: "Token inválido" });
        }
    }
};