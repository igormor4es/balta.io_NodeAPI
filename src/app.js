'user strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

//Conexão Banco de Dados
mongoose.connect(
    process.env.MONGODB_URI,
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

//Carrega as Rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', indexRoute);
app.use('/produtos', productRoute);

module.exports = app;
