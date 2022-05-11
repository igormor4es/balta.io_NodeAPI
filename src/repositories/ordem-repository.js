'user strict'

const mongoose = require('mongoose');
const Ordem = mongoose.model('Ordem');

exports.get = async() => {
    return await Ordem.find().populate('cliente').populate('itens.produto');
}

exports.create = async(data) => {
    var ordem = new Ordem(data);     
    await ordem.save();
}