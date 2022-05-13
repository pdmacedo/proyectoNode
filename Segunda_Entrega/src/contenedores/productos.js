const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    nombre: {type: String},
    descripcion: {type: String},
    codigo: {
        type: String,
        unique: true
    },
    foto: {type: String}, 
    precio: {type: Number},
    stock: {type: Number}
});

const userModel = mongoose.model('productos', userSchema);

module.exports = userModel;