'user strict'

const mongoose = require('mongoose');
const Produto = mongoose.model('Produto');

exports.post = (req, res, next) => {
    
    var produto = new Produto(req.body);
    
    produto
    .save()
    .then(p => {
        res.status(201).send({ 
            message: 'Produto cadastrado com sucesso!' 
        });
    }).catch(e => {
        res.status(400).send({ 
            message: 'Falha ao cadastrar o Produto!', data: e 
        });
    });
};

exports.put = (req, res, next) => {
    let id = req.params.id;
    res.status(201).send({ 
        id: id , 
        item: req.body 
    });
};

exports.delete = (req, res, next) => {
    res.status(200).send(req.body);
};