var mysql = require('mysql');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'poly_fit_database'
})

module.exports = connection
