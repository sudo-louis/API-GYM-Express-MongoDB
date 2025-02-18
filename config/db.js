const mysql = require("mysql2");
require("dotenv").config();

if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME) {
    console.error("❌ ERROR: Variables de entorno faltantes en .env");
    process.exit(1);
}

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) {
        console.error("❌ Error de conexión a MySQL:", err.message);
        return;
    }
    console.log("✅ Conectado a MySQL");
});

module.exports = connection;