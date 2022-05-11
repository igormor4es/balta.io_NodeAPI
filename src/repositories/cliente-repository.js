'user strict'

const mongoose = require('mongoose');
const Cliente = mongoose.model('Cliente');

exports.get = async() => {
    return await Cliente.find();
}

exports.create = async(data) => {
    var cliente = new Cliente(data);     
    await cliente.save();
}