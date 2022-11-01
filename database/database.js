const Sequelize = require("sequelize");
const NameBD = process.env.NameBD
const hostBD = process.env.hostBD
const userBD = process.env.userBD
const passBD = process.env.passBD

const connection = new Sequelize(NameBD, userBD, passBD, {
    host: hostBD,
    dialect: "mysql",
    timezone: "-03:00"
});

module.exports = connection;