/* importar o modulo do framework express */
var express = require("express");

/* importar o modulo do consign */
var consign = require("consign");

/* importar o modulo body-parser */
var bodyParser = require("body-parser");

/* importar o modulo express-validator */
var expressValidator = require("express-validator");

/* iniciar o objeto do express */
var app = express();

/* setar as variaveis que a 'view engine' e 'views' do express */
app.set("view engine", "ejs"); // qual eh a engine de processamento
app.set("views", "./app/views"); // local onde pode ser encontrada

/* configurar o middleware express.static */
app.use(express.static("./app/public"));

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({ extended: true }));

/* configurar o middleware express-validator */
app.use(expressValidator());

/* auto loader das rotas, models, controllers para o objeto app */
consign()
    .include("app/routes")
    .include("app/models")
    .include("app/controllers")
    .into(app);

/* exportar o objeto app */
module.exports = app;
