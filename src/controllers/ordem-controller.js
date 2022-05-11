'user strict'

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/ordem-repository');
const guid = require('guid');

exports.post = async(req, res, next) => {
    try {
        await repository.create({
            cliente: req.body.cliente,
            numero: guid.raw().substring(0, 6),
            itens: req.body.itens
        });
        res.status(201).send({ message: 'Pedido cadastrado com sucesso!' });
    } catch (e) {
        MensagemErro(e.message, res); 
    }
};

exports.get = async(req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);  
    } catch (e) {
        MensagemErro(e.message, res);
    }
}

function MensagemErro (msg, res) {
    res.status(500).send({
        message: msg
    });
}