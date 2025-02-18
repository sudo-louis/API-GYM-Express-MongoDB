const db = require("../config/db");

const Proveedor = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM proveedores", (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    getById: (id) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM proveedores WHERE id = ?", [id], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    create: ({ nombre_empresa, nombre_contacto, telefono, correo, productos_suministrados }) => {
        return new Promise((resolve, reject) => {
            db.query(
                "INSERT INTO proveedores (nombre_empresa, nombre_contacto, telefono, correo, productos_suministrados) VALUES (?, ?, ?, ?, ?)",
                [nombre_empresa, nombre_contacto, telefono, correo, productos_suministrados],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
        });
    },

    update: (id, { nombre_empresa, nombre_contacto, telefono, correo, productos_suministrados }) => {
        return new Promise((resolve, reject) => {
            db.query(
                "UPDATE proveedores SET nombre_empresa = ?, nombre_contacto = ?, telefono = ?, correo = ?, productos_suministrados = ? WHERE id = ?",
                [nombre_empresa, nombre_contacto, telefono, correo, productos_suministrados, id],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
        });
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.query("DELETE FROM proveedores WHERE id = ?", [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    }
};

module.exports = Proveedor;