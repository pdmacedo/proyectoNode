const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    productos: [{
        nombre: {type: String},
        codigo: {
            type: String,
            unique: true
        },
        precio: {type: Number} 
    }]
});

const userModelCar = mongoose.model('carritos', userSchema);

module.exports = userModelCar;