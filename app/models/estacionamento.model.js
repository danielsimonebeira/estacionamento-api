const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Estacionamento = sequelize.define("Estacionamento", {
        entrada: {
            type: Sequelize.DATE
        },
        saida: {
            type: Sequelize.DATE
        },
        valor: {
            type: Sequelize.DECIMAL
        }
    });
    return Estacionamento;
}