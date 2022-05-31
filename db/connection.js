const mysql = require('mysql2');

//connect to the database
const db =mysql.createConnection(
    {
        host: 'localhost',
        //mysql username
        user: 'root',
        //mysql password
        password: '',
        database: 'election'
    },
    console.log('Connected to the election database.')
);

module.exports = db;