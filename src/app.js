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
app.use(bodyParser.json({ limit: '5mb' }));

/* Habilita o CORS - Cross-Origin Resource Sharing ou CORS é um mecanismo que permite que recursos restritos em uma 
página da web sejam recuperados por outro domínio fora do domínio ao qual pertence o recurso que será recuperado.*/
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

//Inicializa as Rotas
app.use('/', rotaIndex);
app.use('/produtos', rotaProduto);
app.use('/clientes', rotaCliente);
app.use('/pedidos', rotaOrdem);

module.exports = app;
