const express = require('express');
const router = express.Router();

//Template
router.get('/', (req, res)=>{
    let obj ={
        nome: req.query.nome,
        idade: req.query.idade,
        mostrar: true,
        alunos:[
            {aluno: "alexandre", nota: 9},
            {aluno: "igor", nota: 8},
        ],
        interesses: ["Computação"],
        //pageTitle: "Titulo de Teste",
        conteudo: '<strong>Quero esse texto em negrito</strong>',
    }

    res.render('home', obj);
});





router.get('/', (req, res) => {
    let nome = req.query.nome;
    let idade = req.query.idade;
    res.send(`olá ${idade}, você tem ${idade} anos!!`);
});

router.get('/ajuda', (req, res) =>{
    res.send("Pagina de ajuda");
});

router.get('/posts/:id', (req, res)=>{
    let id = req.params.id;

    res.send(`Id do post: ${id}`);
});


module.exports = router;