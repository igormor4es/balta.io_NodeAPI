'user strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

//Conexão Banco de Dados
mongoose.connect('mongodb+srv://igormoraes90:igor1990@balta.ujnuq.mongodb.net/test');

//Carrega as Models
const Produto = require('./models/produto');

//Carrega as Rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', indexRoute);
app.use('/produtos', productRoute);

module.exports = app;
