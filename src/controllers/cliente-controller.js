'user strict'

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/cliente-repository');
const md5 = require('md5');
const emailService = require('../services/email-service');

exports.post = async(req, res, next) => {
    try {

        let contract = new ValidationContract();
        contract.hasMinLen(req.body.nome, 3, 'O nome deve conter pelo menos 3 caracteres.');
        contract.isEmail(req.body.email, 'Email inválido.');
        contract.hasMinLen(req.body.senha, 6, 'A senha deve conter pelo menos 3 caracteres.');
    
        //Verifica se os dados são válidos
        if (!contract.isValid()) {
            res.status(400).send(contract.errors()).end();
            return;
        }

        await repository.create({
            nome: req.body.nome,
            email: req.body.email,
            senha: md5(req.body.senha + global.SALT_KEY)
        });

        emailService.send(
            req.body.email,
            'Bem Vindo ao Node Store by Igor de Moraes - Developed by balta.io',
            global.EMAIL_TMPL.replace('{0}', req.body.name)
        );

        res.status(201).send({ message: 'Cliente cadastrado com sucesso!' });

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