'user strict'

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/produto-repository');
const azure = require('azure-storage');
const guid = require('guid');
const config = require('../config');

exports.get = async(req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);  
    } catch (e) {
        MensagemErro(e.message, res);
    }
}

exports.getBySlug = async(req, res, next) => {
    try {
        var data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (e) {
        MensagemErro(e.message, res); 
    }
}

exports.getById = async(req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        MensagemErro(e.message, res); 
    }
}

exports.getByTag = async(req, res, next) => {
    try {
        var data = await repository.getByTag(req.params.tags);
        res.status(200).send(data);
    } catch (e) {
        MensagemErro(e.message, res); 
    }
}

exports.post = async(req, res, next) => {

    let contract = new ValidationContract();
    contract.hasMinLen(req.body.titulo, 3, 'O título deve conter pelo menos 3 caracteres.');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres.');
    contract.hasMinLen(req.body.descricao, 3, 'A descrição deve conter pelo menos 3 caracteres.');

    //Verifica se os dados são válidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        /* --> Deixei comentado pois não estou utilizando esse serviço da Azure para Imagens
        //Cria o Blob Service
        const blobSvc = azure.createBlobService(config.userImagesBlobConnectionString);

        let filename = guid.raw().toString() + '.jpg';
        let rawdata = req.body.image;
        let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        let type = matches[1];
        let buffer = new Buffer(matches[2], 'base64');
        let url = 'https://nodestr.blob.core.windows.net/product-images/' + filename;

        //Salva a imagem
        await blobSvc.createBlockBlobFromText('product-images', filename, buffer, {
            contentType: type
        }, function (error, result, response) {
            if (error) {
                filename = 'default-product.png'
            }
        });
        */
        await repository.create({
            titulo: req.body.titulo,
            preco: req.body.preco,
            slug: req.body.slug,
            descricao: req.body.descricao,
            ativo: true,
            tags: req.body.tags,
            imagem: req.body.imagem
        });

        res.status(201).send({ message: 'Produto cadastrado com sucesso!' });

    } catch (e) {
        MensagemErro(e.message, res); 
    }
};

exports.put = async(req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({ message: 'Produto atualizado com sucesso!' });
    } catch (e) {
        MensagemErro(e.message, res); 
    }
};

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.body.id);
        res.status(200).send({ message: 'Produto removido com sucesso!' });
    } catch (e) {
        MensagemErro(e.message, res); 
    }
};

function MensagemErro (msg, res) {
    res.status(500).send({
        message: msg
    });
}