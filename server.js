require('dotenv').config({path: 'variables.env'});

const express = require("express");
const moongose = require('mongoose');
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

server.use(express.static('public'));
server.use('/', apiRouters);

server.listen(process.env.PORT, () =>{
    console.log(`servidor rodando na porta ${process.env.PORT}`);
});