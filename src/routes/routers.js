const express = require('express');
const router = express.Router();

const Auth = require('../middleware/middleware');
const AuthValidator = require('../validator/Authvalidator');

const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');
const AdsController = require('./controllers/AdsController');


router.get('/', (req, res) =>{
    res.send("Funfando");
    console.log("funfando");
});

router.get('/ping', (req, res) =>{
    res.json({pong: true});
});

//obter estados
router.get('/states', UserController.getStats);

//rota para login/logoff
router.post('/user/singin', AuthController.signin);
router.post('/user/signup',AuthValidator.signup, AuthController.signup);

//obter informações do usuario
router.get('/user/me', Auth.private, UserController.info);
router.put('/user/me', Auth.private, AuthController.editAction); //*

//obter categorias
router.get('/categories', AdsController.getCategories);

//rota referente a informações do proprio anuncio
router.post('/ad/add', AdsController.addAction);
router.get('/ad/list', AdsController.getList);
router.get('/ad/item', AdsController.getItem);
router.put('/ad/:id', AdsController.editAction);

module.exports = router;