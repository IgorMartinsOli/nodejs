require('dotenv').config({path: 'variables.env'});

const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const apiRouters = require('./src/routes/routers');

mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
mongoose.connection.on ('error', (error)=>{
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