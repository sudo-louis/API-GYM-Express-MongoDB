const db = require("../config/db");

const Category = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM categorias", (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    getById: (id) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM categorias WHERE id = ?", [id], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    create: (nombre_categoria) => {
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO categorias (nombre_categoria) VALUES (?)", [nombre_categoria], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    update: (id, nombre_categoria) => {
        return new Promise((resolve, reject) => {
            db.query("UPDATE categorias SET nombre_categoria = ? WHERE id = ?", [nombre_categoria, id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.query("DELETE FROM categorias WHERE id = ?", [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    }
};

module.exports = Category;