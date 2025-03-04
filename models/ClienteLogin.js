const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const ClienteLoginSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });

ClienteLoginSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const ClienteLogin = mongoose.model("ClienteLogin", ClienteLoginSchema);
module.exports = ClienteLogin;