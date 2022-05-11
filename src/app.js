'user strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const app = express();
const router = express.Router();

//Conexão Banco de Dados
mongoose.connect(
    //process.env.MONGODB_URI,
    config.connectionString,
    { 
        useUnifiedTopology: true, 
        useNewUrlParser: true, 
    }, (err) => {
        if (err) 
            return console.log("Error: ", err);
        console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
    }
);

//Carrega as Models
const Produto = require('./models/produto');
const Cliente = require('./models/cliente');
const Ordem = require('./models/ordem');

//Carrega as Rotas
const rotaIndex = require('./routes/index-route');
const rotaProduto = require('./routes/produto-route');
const rotaCliente = require('./routes/cliente-route');
const rotaOrdem = require('./routes/ordem-route');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Inicializa as Rotas
app.use('/', rotaIndex);
app.use('/produtos', rotaProduto);
app.use('/clientes', rotaCliente);
app.use('/pedidos', rotaOrdem);

module.exports = app;
