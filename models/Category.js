const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    nombre_categoria: { type: String, required: true }
}, { timestamps: true });

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;