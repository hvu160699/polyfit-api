const Sequelize = require('sequelize').Sequelize;

const sequelize = new Sequelize('heroku_9f7e3b228eeceaf', 'bb89a7761eac60', '1e6644a0', {
    host: 'us-cdbr-iron-east-05.cleardb.net',
    dialect: 'mysql',
    define: {
        freezeTableName: true,
        underscored: false,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

// const sequelize = new Sequelize({
//     database: 'polyfit_local',
//     username: 'root',
//     password: null,
//     host: '127.0.0.1',
//     port: '3306',
//     dialect: 'mysql',
// })

module.exports = sequelize;
