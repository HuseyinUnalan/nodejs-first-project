const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'node-app',
    password: '12345678',
    port: '8279'
});

module.exports = connection.promise();