'user strict'

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/cliente-repository');
const md5 = require('md5');
const emailService = require('../services/email-service');
const authService = require('../services/auth-service');

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
            senha: md5(req.body.senha + global.SALT_KEY),
            roles: ['user']
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

exports.authenticate = async(req, res, next) => {
    try {

        const cliente = await repository.authenticate({
            email: req.body.email,
            senha: md5(req.body.senha + global.SALT_KEY)
        });

        if (!cliente) {
            res.status(404).send({ message: 'Usuário ou senha inválidos!' });
            return;
        }

        const token = await authService.generateToken({
            id: cliente._id,
            email: cliente.email,
            nome: cliente.nome,
            roles: cliente.roles
        });

        res.status(201).send({
            token: token,
            data: {
                email: cliente.email,
                nome: cliente.nome
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição!'
        });
    }
};

exports.refreshToken = async(req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        const cliente = await repository.getById(data.id);

        if (!cliente) {
            res.status(404).send({
                message: 'Cliente não encontrado'
            });
            return;
        }

        const tokenData = await authService.generateToken({
            id: cliente._id,
            email: cliente.email,
            nome: cliente.nome,
            roles: cliente.roles
        });

        res.status(201).send({
            token: token,
            data: {
                email: cliente.email,
                nome: cliente.nome
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição!'
        });
    }
};

function MensagemErro (msg, res) {
    res.status(500).send({
        message: msg
    });
}