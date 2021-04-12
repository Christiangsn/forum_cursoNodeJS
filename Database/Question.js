//Primeiro importar o sequelize
const Sequelize = require("sequelize");
const connection = require("./db"); // importar conexão com o banco


//receber o MODEL  // Criar tabela na BD
const Question = connection.define('Pergunta', {  // <-- Definindo nome da tabela
    titulo:{                                      // <-- Definir nome do campo
        type: Sequelize.STRING,                   // <-- Definir tipo do campo
        allowNull: false                         // Impedir que o campo receba algo vazio
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    },
});

Question.sync({force: false}).then(() => {       // <-- cria e sincroniza isso com o BD
});                 

module.exports = Question;