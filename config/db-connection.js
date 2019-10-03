var mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-05.cleardb.net',
    user: 'bb89a7761eac60',
    password: '1e6644a0',
    database: 'heroku_9f7e3b228eeceaf'
})

// const connection = mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'root',
//     password: 'root',
//     database: 'poly_fit_database'
// })

module.exports = connection
