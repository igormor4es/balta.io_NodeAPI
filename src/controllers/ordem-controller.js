'user strict'

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/ordem-repository');
const guid = require('guid');
const authService = require('../services/auth-service');

exports.post = async(req, res, next) => {
    try {
        //Recupera o Token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        //Decodifica o Token
        const data = await authService.decodeToken(token);

        await repository.create({
            cliente: data.id,
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