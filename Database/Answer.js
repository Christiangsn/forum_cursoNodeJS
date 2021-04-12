const Sequelize = require("sequelize");
const connection = require("./db");


const Resposta = connection.define("respostas", {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    ID_ask: {
        type: Sequelize.INTEGER, 
        allowNull: false
    }
})


Resposta.sync({force: false})

module.exports = Resposta;
