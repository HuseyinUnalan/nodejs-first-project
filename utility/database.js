const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-app', 'root', '12345678', {
    dialect: 'mysql',
    host: 'localhost',
    port: '8279'
});

module.exports = sequelize;