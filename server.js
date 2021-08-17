//const app = require("./app");

//conexão com bd
const moongose = require('mongoose');

const express = require("express");
//setar arquivo de config variaveis
require('dotenv').config({path: 'variables.env'});
const cors = require('cors');
const fileUpload = require('express-fileupload');

const apiRouters = require('./src/routes/routers');

moongose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true});
moongose.Promise = global.Promise;
moongose.connection.on ('error', (error)=>{
    console.error ("Deu erro:" + error.message);
});

const server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended: true}));

//fileUpload => biblioteca 
server.use(fileUpload());


/*server.use('/', apiRouters);*/

//futuro: implementar pasta/diretorio publico
/*
//para testar servico rota ping... depois excluir quando as rotas estarem implementadas


//setar rotas
*/


server.listen(process.env.PORT, () =>{
    console.log(`servidor rodando na porta ${process.env.PORT}`);
});



/*
app.set('port', process.env.PORT || 7778);

const server = app.listen(app.get('port'), () =>{
    console.log("Servidor rodando na porta " + server.address().port);
});*/
