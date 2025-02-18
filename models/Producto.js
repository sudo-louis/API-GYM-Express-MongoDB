const db = require("../config/db");

const Producto = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT p.*, c.nombre_categoria, pr.nombre_empresa 
                 FROM productos p 
                 JOIN categorias c ON p.categoria = c.id 
                 JOIN proveedores pr ON p.proveedor = pr.id`, 
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                }
            );
        });
    },

    getById: (id) => {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT p.*, c.nombre_categoria, pr.nombre_empresa 
                 FROM productos p 
                 JOIN categorias c ON p.categoria = c.id 
                 JOIN proveedores pr ON p.proveedor = pr.id 
                 WHERE p.id = ?`, 
                [id], (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                }
            );
        });
    },

    create: ({ nombre_producto, descripcion, proveedor, categoria, cantidad_en_stock, precio }) => {
        return new Promise((resolve, reject) => {
            db.query(
                "INSERT INTO productos (nombre_producto, descripcion, proveedor, categoria, cantidad_en_stock, precio) VALUES (?, ?, ?, ?, ?, ?)",
                [nombre_producto, descripcion, proveedor, categoria, cantidad_en_stock, precio],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
        });
    },

    update: (id, { nombre_producto, descripcion, proveedor, categoria, cantidad_en_stock, precio }) => {
        return new Promise((resolve, reject) => {
            db.query(
                "UPDATE productos SET nombre_producto = ?, descripcion = ?, proveedor = ?, categoria = ?, cantidad_en_stock = ?, precio = ? WHERE id = ?",
                [nombre_producto, descripcion, proveedor, categoria, cantidad_en_stock, precio, id],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
        });
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.query("DELETE FROM productos WHERE id = ?", [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    }
};

module.exports = Producto;