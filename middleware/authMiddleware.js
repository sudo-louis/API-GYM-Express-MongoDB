const jwt = require("jsonwebtoken");
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

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.id) {
            return res.status(400).json({ error: "Token inválido: Payload incompleto" });
        }

        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Token expirado: Vuelva a iniciar sesión" });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(400).json({ error: "Token inválido: Firma incorrecta" });
        } else {
            console.error("Error en la verificación del token:", error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }
};