const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'sistema_nomina'
});

connection.connect((err) => {
    if (err) {
        console.log('Error connecting to database ', err);
        return;
    }

    console.log('Conectado a la base de datos MySQL');
    console.log('Base de datos: sistema_nomina');
});

module.exports = connection;