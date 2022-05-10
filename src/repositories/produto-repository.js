'user strict'

const mongoose = require('mongoose');
const Produto = mongoose.model('Produto');

exports.get = async() => {
    const res = await Produto.find({
        active : true
    }, 'titulo price slug');
    return res;
}

exports.getBySlug = async(slug) => {
    const res = await Produto.findOne({ 
        slug : slug,
        active : true }, 'titulo descricao preco slug tags');
    return res;
}

exports.getById = async(id) => {
    const res = await Produto.findById(id, 'titulo descricao preco' );
    return res;
}

exports.getByTag = async(tag) => {
    const res = await Produto.find({ 
        tags : tag }, 'titulo descricao preco slug tags');
    return res;
}

exports.create = async(data) => {
    var produto = new Produto(data);     
    await produto.save();
}

exports.update = async(id, data) => {
    await Produto
    .findByIdAndUpdate(id, {
        $set: {
            titulo : data.titulo,
            descricao : data.descricao,
            slug: data.slug,
            preco : data.preco
        }
    });
}

exports.delete = async(id) => {
    await Produto.findOneAndRemove(id);
}