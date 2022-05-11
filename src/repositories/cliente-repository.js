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

exports.authenticate = async(data) => {
    const auth = await Cliente.findOne({
        email: data.email,
        senha: data.senha
    });
    return auth;
}

exports.getById = async(id) => {
    const auth = await Cliente.findById(id);
    return auth;
}