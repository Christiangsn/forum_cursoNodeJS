const express = require('express');
const { ServerResponse } = require('http');
const server = express();
const bodyParser = require("body-parser"); // importar bodyParser para usa-lo
const connection = require("./Database/db");
const asking = require("./Database/Question");                // Importar a tabela criada para o BD // o Model
const Question = require('./Database/Question');                // <-- representa a tabela do banco de dados
const Answer = require('./Database/Answer')

 //tentando logar ao mysql
connection.authenticate()
.then(() => {
    console.log("conection DB")
})
.catch((msgErro) => {
    console.log("msgErro");
})

server.set('view engine', 'ejs')  /// < Utilizandoa EJS
server.use(express.static('public')); // sessão onde colocar arquivos estaticos para funcionar
server.use(bodyParser.urlencoded({extended: false})) //body pega e traduz os dados enviado pelo formulario
server.use(bodyParser.json());



server.get("/", (req, res) => {
    Question.findAll({raw: true, order:[   // ordenar os valores
        ['id','DESC']
    ]}).then(perguntas => {                        // Lista tudo que tem na tabela e retorna
        res.render("index", {
            perguntas: perguntas
        });
    })                                   
});

server.get("/perguntar", (req, res) => {
    res.render("question");
});



server.post("/salvarpergunta", (req, res) => { //enviar dados do formulario ao backEnd // metodo POST // criar uma rota para enviar no metodo post no server
    //pegar informação do formulario
    var titulo = req.body.titulo; // Dado do Formulario
    var descricao = req.body.descricao;
    Question.create({                                  //Recebe o model e chama create para salvar // INSERT INTO
           titulo: titulo,                          /// <-- salvou a pergunta no banco de dados
           descricao: descricao
    }).then(() =>{
        res.redirect("/");
    })  
});

server.get("/perguntar/:id", (req, res) => {
    var id = req.params.id;
    Question.findOne({              // busca no banco de dados 1 dados só
        where: {id: id}             // o que eu quero pesquisar, com oq voce ira buscar no banco de dados
    }).then(Question => {          // quando a pergunta for achada ele vai chamar o then e redirecionar
         if (Question != undefined){
            
             Answer.findAll({
                 where: {ID_ask: Question.id},
                 order:[ ['id', 'DESC'] ]
             }).then( respostas => {
                     res.render("ask", {
                    pergunta: Question,
                    respostas: respostas
                 });
             });
         }else{
             res.redirect("/");
         }
    });
});

server.post("/answer", (req, res) => {
    var corpo = req.body.corpo;
    var resposta = req.body.pergunta;
    Answer.create({
        corpo: corpo,
        ID_ask: resposta
    }).then(() =>{
        res.redirect("/perguntar/"+resposta);
    });
});

//
server.listen(2000,()=>{
})