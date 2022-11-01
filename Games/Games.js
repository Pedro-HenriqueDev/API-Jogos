const Sequelize = require("sequelize");
const connection = require("../database/database");

const Games = connection.define("jogos", {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }, genus:{
        type: Sequelize.STRING,
        allowNull: false,
    },producer: {
        type: Sequelize.STRING,
        allowNull: false
    }, year: {
        type: Sequelize.INTEGER,
        allowNull: true
    }, picture: {
        type: Sequelize.TEXT,
        allowNull: true
    }
});

Games.sync({force: false});

module.exports = Games;