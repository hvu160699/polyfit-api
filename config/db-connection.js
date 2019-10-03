const Sequelize = require('sequelize');
const db = {}
const sequelize = new Sequelize('heroku_9f7e3b228eeceaf', 'bb89a7761eac60', '1e6644a0', {
    host: 'us-cdbr-iron-east-05.cleardb.net',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }

})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
