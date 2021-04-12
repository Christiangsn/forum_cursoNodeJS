// para se conectar ao banco de dados é necessario ao codigo 
// chamar o sequelize, ele a quem faz isso
const sequelize = require('sequelize');


//estrutura da conexão
const connection = new sequelize('asking', 'root', 'Christian222', {
    host: 'localhost', //servidor onde está rodando, no caso, meu computador
    dialect: 'mysql' // qual tipo de banco destá se conectando
})// Onde está o banco a qual voce ira colocar

module.exports = connection; // exportando a conexão a qual foi criada